// producer.ts
import redis from "./config/redis.config.js";
function objectToArgs(obj) {
    return Object.entries(obj).flatMap(([key, value]) => [key, String(value)]);
}
export const produceMessage = async (stream, message) => {
    try {
        const formattedMessage = {};
        for (const key in message) {
            if (message[key] !== undefined && message[key] !== null) {
                formattedMessage[key] = String(message[key]);
            }
        }
        await redis.call("XADD", stream, "*", ...objectToArgs(formattedMessage));
        console.log(`Produced message to stream '${stream}'`, formattedMessage);
    }
    catch (err) {
        console.error(`Error producing message to stream '${stream}':`, err);
    }
};

import { redis } from "./messageQueue.config.js";
export const createConsumerGroup = async (stream, group) => {
    try {
        await redis.xGroupCreate(stream, group, "0", { MKSTREAM: true });
        console.log("Consumer group created");
    }
    catch (err) {
        if (!err.message.includes("BUSYGROUP"))
            throw err;
    }
};
export const consumeMessages = async (stream, group, consumer) => {
    const response = await redis.xReadGroup(group, consumer, [{ key: stream, id: ">" }], { COUNT: 10, BLOCK: 5000 });
    if (Array.isArray(response)) {
        for (const streamEntry of response) {
            if (streamEntry &&
                typeof streamEntry === "object" &&
                "messages" in streamEntry &&
                Array.isArray(streamEntry.messages)) {
                for (const [id, data] of streamEntry.messages) {
                    console.log(`[${id}]`, data);
                    await redis.xAck(stream, group, id);
                }
            }
        }
    }
};

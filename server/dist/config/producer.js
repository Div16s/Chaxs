import { redis } from "./messageQueue.config.js";
export const sendMessage = async (streamName, message) => {
    const entryId = await redis.xAdd(streamName, "*", {
        ...message,
        timestamp: Date.now().toString(),
    });
    console.log("Message sent to stream:", entryId);
};

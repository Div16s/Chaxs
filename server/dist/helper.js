// redisConsumer.ts
import prisma from "./config/db.config.js";
import { redis } from "./config/messageQueue.config.js";
export const createConsumerGroup = async (stream, groupName) => {
    try {
        await redis.xGroupCreate(stream, groupName, "0", { MKSTREAM: true });
        console.log(`Consumer group '${groupName}' created for stream '${stream}'`);
    }
    catch (err) {
        if (!err.message.includes("BUSYGROUP")) {
            throw err;
        }
    }
};
export const consumeMessages = async (stream) => {
    const groupName = `group-${stream}`;
    const consumerName = `consumer-${Math.random().toString(36).substring(2, 10)}`;
    await createConsumerGroup(stream, groupName);
    try {
        const response = await redis.xReadGroup(groupName, consumerName, [{ key: stream, id: ">" }], {
            COUNT: 10,
            BLOCK: 5000,
        });
        if (Array.isArray(response)) {
            for (const streamEntry of response) {
                // Type guard to check if streamEntry has 'messages' property
                if (streamEntry &&
                    typeof streamEntry === "object" &&
                    "messages" in streamEntry &&
                    Array.isArray(streamEntry.messages)) {
                    for (const [id, message] of streamEntry.messages) {
                        console.log(`Consumed [${id}]:`, message);
                        try {
                            await prisma.chats.create({
                                data: {
                                    ...message,
                                    timestamp: new Date(Number(message.timestamp)),
                                },
                            });
                            await redis.xAck(stream, groupName, id);
                        }
                        catch (err) {
                            console.error("DB insert error:", err);
                        }
                    }
                }
            }
        }
    }
    catch (err) {
        console.error(`Error consuming messages from stream '${stream}':`, err);
    }
};

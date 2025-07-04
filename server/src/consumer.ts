// redisConsumer.ts
import prisma from "./config/db.config.js";
import redis from "./config/redis.config.js"

export const createConsumerGroup = async (
  stream: string,
  groupName: string
) => {
  try {
    await redis.call('XGROUP', 'CREATE', stream, groupName, '0', 'MKSTREAM');
    console.log(`Consumer group '${groupName}' created for stream '${stream}'`);
  } catch (err: any) {
    if (!err.message.includes("BUSYGROUP")) {
      throw err;
    }
  }
};

export const consumeMessages = async (stream: string) => {
  const groupName = `chaxs:chat<${stream}>`;
  const streamName = `chaxs:chat<${stream}>`;
  const consumerName = `consumer-${Math.random().toString(36).substring(2, 10)}`;

  await createConsumerGroup(streamName, groupName);

  while(true) {
    try {
    const response = await redis.call(
      'XREADGROUP',
      'GROUP',
      groupName,
      consumerName,
      'COUNT',
      10,
      'BLOCK',
      5000,
      'STREAMS',
      streamName,
      '>'
    );

    console.log(`Response from XREADGROUP for stream '${streamName}':`, response);

    if (Array.isArray(response)) {
      for (const [streamKey, messages] of response as [string, any[]][]) {
        for (const [id, entries] of messages) {
          const message: Record<string, string> = {};

          // entries = ['key1', 'value1', 'key2', 'value2']
          for (let i = 0; i < entries.length; i += 2) {
            message[entries[i]] = entries[i + 1];
          }

          console.log(`Consumed [${id}]:`, message);

          try {
            await prisma.chats.create({
              data: message as any
            });

            await redis.call("XACK", streamName, groupName, id);
          } catch (err) {
            console.error("DB insert error:", err);
          }
        }
      }
    }
  } catch (err) {
    console.error(`Error consuming messages from stream '${stream}':`, err);
  }
  }
};
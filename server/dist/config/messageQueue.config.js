import { createClient } from "redis";
export const redis = createClient({
    url: process.env.REDIS_URL, // Example: redis://default:pwd@host:port
    socket: { tls: true, host: process.env.REDIS_HOST }, // If using Upstash or any TLS-enabled Redis
});
redis.on("error", (err) => console.error("Redis Client Error", err));
export const connectRedis = async () => {
    await redis.connect();
    console.log("Redis Client connected...");
};

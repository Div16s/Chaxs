import { Redis } from 'ioredis';

// const redis = new Redis({
//     host: "localhost",
//     port: 6379,
// });

const redis = new Redis(process.env.REDIS_URL as string);

export default redis;
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Routes from './routes/index.js';
import {Server} from "socket.io"
import { createServer } from 'http';
import { setupSocket } from './socket.js';
import { createAdapter } from '@socket.io/redis-streams-adapter';
import redis from './config/redis.config.js';
import client from './config/mQueue.config.js';
import { consumeMessages } from './consumer.js';

const consumedRooms = new Set<string>();

const app: Application = express();
dotenv.config();
const PORT = process.env.PORT || 8000;

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "https://chaxs.vercel.app"],
        credentials: true,
    },
    adapter: createAdapter(redis)
})

setupSocket(io);
export { io };

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Chaxs API');
});

// Routes
app.use('/api', Routes);

server.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
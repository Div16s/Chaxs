import { Server, Socket } from 'socket.io';
import { produceMessage } from './producer.js';
import { consumeMessages } from './consumer.js';

const consumedRooms = new Set<string>();
const onlineUsers = new Map<string, string>();

interface CustomSocket extends Socket {
  room?: string;
}

export function setupSocket(io: Server) {

    io.use((socket: CustomSocket, next) => {
        const room = socket.handshake.auth.room || socket.handshake.headers.room;
        if (!room) {
            return next(new Error("Invalid room"));
        }

        socket.room = room;
        next();
    });


    io.on('connection', (socket: CustomSocket)=>{
        const userId = socket.handshake.auth.userId || socket.handshake.headers.userId;
        console.log(`Socket connected: ${socket.id}, Room: ${socket.room}, User ID: ${userId}`);
        if (socket.room) {
            socket.join(socket.room);
            if (userId) {
                onlineUsers.set(userId, socket.id);
                io.emit("online-users", Array.from(onlineUsers.keys())); // 🔄 Broadcast
            }

        } else {
            console.error(`Socket ${socket.id} has no room assigned.`);
        }

        socket.on("message", async (data) => {
            if (socket.room) {
                socket.to(socket.room).emit("message", data);

                if (!consumedRooms.has(socket.room)) {
                    consumeMessages(socket.room);
                    consumedRooms.add(socket.room);
                }
            } else {
                console.error(`Cannot emit message: socket ${socket.id} has no room assigned.`);
            }

            try {
                // console.log("Received message:", data);
                await produceMessage(`chaxs:chat<${data.group_id}>`, data);
            } catch (error) {
                console.log("The REDIS produce error is", error);
            }
        });

        console.log(`Socket connected: ${socket.id}`);

        socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${socket.id}`);
            if (userId) {
                onlineUsers.delete(userId);
                io.emit("online-users", Array.from(onlineUsers.keys())); // 🔄 Broadcast
            }
        });
    })
}
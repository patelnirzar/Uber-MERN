import { Server } from 'socket.io';
import { User } from './model/user.model.js';
import { Captain } from './model/captain.model.js';

let io;

export const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on('join', async (data) => {
            const { userId, userType } = data;

            console.log(`User ${userId} joined as ${userType}`);

            if (userType === 'user') {
                await User.findByIdAndUpdate(userId, { socketId: socket.id });
            } else if (userType === 'captain') {
                await Captain.findByIdAndUpdate(userId, { socketId: socket.id });
            }
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });

    return io;
};

export const sendMessageToSocketId = (socketId, event, data) => {
    if (io) {
        io.to(socketId).emit(event, data);
    }
};

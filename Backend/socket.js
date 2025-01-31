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

            if (userId) {
                if (userType === 'user') {
                    await User.findByIdAndUpdate(userId, { socketId: socket.id });
                } else if (userType === 'captain') {
                    await Captain.findByIdAndUpdate(userId, { socketId: socket.id });
                }
                console.log(`User ${userId} joined as ${userType}`);
            }
        });

        socket.on("update-location-captain",async (data) => {
            const { userId, location } = data;

            if (!location || !location.ltd || !location.lng) {
                return socket.emit('error', { message: 'Invalid location data' });
            }

            // console.log(`updating location of ${userId}`)
            await Captain.findByIdAndUpdate(userId, {
                location: {
                    ltd: location.ltd,
                    lng: location.lng
                }
            });
        })

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });

    return io;
};

export const sendMessageToSocketId = (socketId, messageObject) => {

    console.log(`Sending message on ${messageObject.event} to ${socketId}`);

    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket.io not initialized.');
    }
}

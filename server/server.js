import express from 'express';
import http from 'http'; // Import http to create server
import { Server } from 'socket.io'; // Import Socket.IO
import cors from 'cors';
import connectDB from './config/dbConfig.js';
import riderRoutes from './routes/RiderRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 5010;

// Create an HTTP server and setup socket.io
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins for simplicity; adjust as needed
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
connectDB();

// Routes
app.use('/api/users', riderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', riderRoutes);
app.use('/api/auth', userRoutes);

// Socket.IO logic
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle ride request
    socket.on('rideRequest', (userData) => {
        // Broadcast the ride request to all riders
        io.emit('newRideRequest', { ...userData, socketId: socket.id });
    });

    // Handle accepting a ride
    socket.on('acceptRide', (rideDetails) => {
        if (rideDetails.userDetails) { // Check if userDetails exist
            // Notify the specific user about the accepted ride
            io.to(rideDetails.userSocketId).emit('rideAccepted', rideDetails);

            // Notify all riders to remove the accepted request
            io.emit('removeRideRequest', rideDetails.userSocketId);

            // Send the accepted ride details to the accepting rider
            io.to(socket.id).emit('acceptedRideDetails', rideDetails);
        } else {
            console.error('userDetails is undefined in rideDetails:', rideDetails);
        }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

// Generate OTP (if needed for your application)
function generateOTP() {
    const otp = Math.floor(1000 + Math.random() * 9000);
    console.log(`Generated OTP: ${otp}`);
}
generateOTP();

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

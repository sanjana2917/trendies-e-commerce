
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './Routes/authRoutes.js';
import cartRoutes from './Routes/cartRoutes.js';

dotenv.config();

const app = express();

app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
         'http://localhost:5179'
    ]
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Shopora Backend is Running!');
});

// AUTH ROUTES
app.use('/api/auth', authRoutes);

// CART ROUTES
app.use('/api/cart', cartRoutes);

const startServer = async () => {

    try {

        if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
            throw new Error('MONGO_URI or JWT_SECRET is missing in .env');
        }

        await mongoose.connect(process.env.MONGO_URI);

        console.log('MongoDB Connected Successfully');

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {

        console.error('Server Error:', error.message);

        process.exit(1);

    }

};

startServer();

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';
import authRoutes from './routes/authRoute.js';
import postRoute from './routes/postRoute.js';
import commentRoute from './routes/commentRoute.js';
import cookieParser from 'cookie-parser';

dotenv.config();

mongoose.connect(process.env.MONGO)

.then(() => {
    console.log('MongoDB connected successfully');
});


const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(8080, () => {
    console.log('server is running on port 8080');
});

app.use('/api/user', userRoute);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoute);
app.use('/api/comment', commentRoute);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({ 
        success: false,
        statusCode,
        message,
    });
});
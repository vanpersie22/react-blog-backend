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

//

const app = express();
const port = process.env.PORT || 4040;

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => res.status(200).send("Hello World"))

// listen
app.listen(port,() => {
    console.log(`Listening on http://localhost:${port}`)
})

app.use('/api/user', userRoute);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoute);
app.use('/api/comment', commentRoute);



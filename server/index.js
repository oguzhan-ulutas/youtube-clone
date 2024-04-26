import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import UserRoutes from './routes/users.js';
import VideoRoutes from './routes/videos.js';
import CommentRoutes from './routes/comments.js';
import AuthRoute from './routes/auth.js';

const app = express();
dotenv.config();

const connect = () => {
  mongoose.connect(process.env.MONGO)
    .then(() => {
      console.log('Connected to DB!');
    })
    .catch((err) => {
      throw err;
    });
};

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', AuthRoute);
app.use('/api/users', UserRoutes);
app.use('/api/comments', CommentRoutes);
app.use('/api/videos', VideoRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';

  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(8800, () => {
  connect();
  console.log('Connected to server!!');
});

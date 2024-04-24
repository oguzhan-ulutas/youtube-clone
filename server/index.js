import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import UserRoutes from './routes/users.js';
import VideoRoutes from './routes/videos.js';
import CommentRoutes from './routes/comments.js';
import AuthRotue from './routes/auth.js';

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

app.use('/api/auth', AuthRotue);
app.use('/api/users', UserRoutes);
app.use('/api/comments', CommentRoutes);
app.use('/api/videos', VideoRoutes);

app.listen(8800, () => {
  connect();
  console.log('Connected to server!!');
});

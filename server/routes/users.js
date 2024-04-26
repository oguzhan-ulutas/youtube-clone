import express from 'express';
import {
  deleteUser, dislike, like, subscribe, unsubscribe, update,
} from '../controllers/user.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

// Update user
router.put('/:id', verifyToken, update);

// Delete user
router.delete('/:id', verifyToken, deleteUser);

// Get a user
router.get('/find/:id');

// Subscribe to a user
router.put('/sub/:id', verifyToken, subscribe);

// Unsubscribe to a user
router.put('/unsub/:id', verifyToken, unsubscribe);

// Like a video
router.put('/like/:videoId', verifyToken, like);

// Dislike a video
router.put('/dislike/:videoId', verifyToken, dislike);

export default router;

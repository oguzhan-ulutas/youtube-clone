import express from 'express';
import { update } from '../controllers/user.js';

const router = express.Router();

// Update user
router.put('/:id', update);

// Delete user

// Get a user

// Subscribe to a user

// Unsubscribe to a user

// Like a video

// Dislike a video

export default router;

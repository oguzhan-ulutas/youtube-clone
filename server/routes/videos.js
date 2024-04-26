import express from 'express';
import { verifyToken } from '../verifyToken.js';
import {
  addVideo, updateVideo, deleteVideo, getVideo,
  addView,
  trend,
  random,
  sub,
} from '../controllers/video.js';

const router = express.Router();

// Create video
router.post('/', verifyToken, addVideo);

// Update video
router.put('/:id', verifyToken, updateVideo);

// Delete video
router.post('/:id', verifyToken, deleteVideo);

// Get video
router.post('/find/:id', getVideo);

// Increment view
router.put('/view/id', addView);

// Get trend videos
router.get('/trend', trend);

// Get random videos
router.get('/random', random);

// Get subscribed videos
router.get('/sub', verifyToken, sub);

export default router;

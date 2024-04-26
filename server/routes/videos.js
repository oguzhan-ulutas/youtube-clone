import express from 'express';
import { verifyToken } from '../verifyToken.js';
import {
  addVideo, updateVideo, deleteVideo, getVideo,
} from '../controllers/video.js';

const router = express.Router();

// Create video
router.post('/', verifyToken, addVideo);

router.put('/:id', verifyToken, updateVideo);

router.post('/:id', verifyToken, deleteVideo);

router.post('/find/:id', getVideo);

export default router;

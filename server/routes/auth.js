import express from 'express';

const router = express.Router();

// Create a user
router.post('/signup');

// Sign in
router.post('/signin');

// Google auth
router.post('/google');

export default router;

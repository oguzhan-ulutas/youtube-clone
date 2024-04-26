import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { createError } from '../error.js';

// Create a user
export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password);

    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    res.status(200).send('User has been created');
  } catch (error) {
    next(error);
  }
};

// Sign in
export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) return next(createError(404, 'User not found!'));

    // Compare password
    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) return next(createError(400, 'Wrong cridentials!'));

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWTSecretKey);
    const { password, ...others } = user._doc;

    res.cookie('access_token', token, {
      httpOnly: true,
    }).status(200).json(others);
  } catch (error) {
    next(error);
  }
};

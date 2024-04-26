import { createError } from '../error.js';
import User from '../models/user.js';

export const update = async (req, res, next) => {
  console.log('heloo');
  console.log(req.user);
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      }, { new: true });
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, 'You can only update your account!'));
  }
};

export const deleteUser = async (req, res, next) => {

};

export const getUser = async (req, res, next) => {

};

export const subscribe = async (req, res, next) => {

};

export const unsubscribe = async (req, res, next) => {

};

export const like = async (req, res, next) => {

};

export const dislike = async (req, res, next) => {

};

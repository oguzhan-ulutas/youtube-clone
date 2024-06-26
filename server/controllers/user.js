import { createError } from '../error.js';
import User from '../models/user.js';
import Video from '../models/video.js';

export const update = async (req, res, next) => {
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
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json('User has benn deleted');
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, 'You can only delete your account!'));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const subscribe = async (req, res, next) => {
  try {
    try {
      await User.findByIdAndUpdate(req.user.id, {
        $push: { subscribedUsers: req.params.id },
      });

      await User.findByIdAndUpdate(req.user.id, {
        $inc: { subscribers: 1 },
      });

      res.status(200).json('Subscrition successfull!');
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const unsubscribe = async (req, res, next) => {
  try {
    try {
      await User.findByIdAndUpdate(req.user.id, {
        $push: { subscribedUsers: req.params.id },
      });

      await User.findByIdAndUpdate(req.user.id, {
        $inc: { subscribers: -1 },
      });

      res.status(200).json('Unsubscrition successfull!');
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const like = async (req, res, next) => {
  const { id } = req.user;
  const { videoId } = req.user;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { dislikes: id },
    });
    res.status(200).json('Video has been liked!');
  } catch (error) {
    next(error);
  }
};

export const dislike = async (req, res, next) => {
  const { id } = req.user;
  const { videoId } = req.user;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    });
    res.status(200).json('Video has been disliked!');
  } catch (error) {
    next(error);
  }
};

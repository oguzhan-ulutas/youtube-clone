import { createError } from '../error.js';
import Video from '../models/video.js';
import User from '../models/user.js';

export const addVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (error) {
    next(error);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, 'Video can not be found!'));

    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      }, { new: true });
      res.status(200).json(updateVideo);
    } else {
      return next(createError(403, 'You can update only your videos!'));
    }
  } catch (error) {
    next(error);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, 'Video can not be found!'));

    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json('The video has benn deleted!');
    } else {
      return next(createError(403, 'You can delete only your videos!'));
    }
  } catch (error) {
    next(error);
  }
};

export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (error) {
    next(error);
  }
};

export const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
    res.status(200).json('The view has been increased!');
  } catch (error) {
    next(error);
  }
};

export const random = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

export const trend = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

export const sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;

    const list = Promise.all(
      subscribedChannels.map((channelId) => Video.find({ userId: channelId })),
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

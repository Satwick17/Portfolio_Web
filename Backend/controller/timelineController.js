import { catchAssyncError } from "../middleware/catchAssyncErrors.js";
import Errorhandler from "../middleware/error.js";
import { Timeline } from "../models/timelineSchema.js";

export const postTimeline = catchAssyncError(async (req, res, next) => {
  const { title, description, from, to } = req.body;
  const newTimeline = await Timeline.create({
    title,
    description,
    timeline: {
      from,
      to,
    },
  });

  res.status(200).json({
    success: true,
    message: "Timeline Added!",
    newTimeline,
  });
});

export const deleteTimeline = catchAssyncError(async (req, res, next) => {
  const { id } = req.params;
  const timeline = await Timeline.findById(id);
  if (!timeline) return next(new Errorhandler("Timeline not Found!", 404));
  await timeline.deleteOne();

  res.status(200).json({
    success: true,
    message: "Timeline Delted!",
  });
});

export const getAllTimeline = catchAssyncError(async (req, res, next) => {
  const timelines = await Timeline.find();

  res.status(200).json({
    success: true,
    timelines,
  });
});

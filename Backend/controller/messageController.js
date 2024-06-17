import { catchAssyncError } from "../middleware/catchAssyncErrors.js";
import Errorhandler from "../middleware/error.js";
import { Message } from "../models/messageSchema.js";

export const sendMessage = catchAssyncError(async (req, res, next) => {
  const { senderName, subject, message } = req.body;

  if (!senderName || !subject || !message) {
    return next(new Errorhandler("Please fill all details!", 400));
  }

  const data = await Message.create({ senderName, subject, message });

  res.status(200).json({
    success: true,
    message: "Message sent",
    data,
  });
});

export const getAllMessages = catchAssyncError(async (req, res, next) => {
  const messages = await Message.find();
  res.status(200).json({
    success: true,
    messages,
  });
});

export const deleteMessage = catchAssyncError(async (req, res, next) => {
  const { id } = req.params;
  const message = await Message.findById(id);

  if (!message) return next(new Errorhandler("Message not Exist!", 400));
  await message.deleteOne();

  res.status(200).json({
    success: true,
    message: "Message Deleted",
  });
});

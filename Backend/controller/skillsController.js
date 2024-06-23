import { catchAssyncError } from "../middleware/catchAssyncErrors.js";
import { Skills } from "../models/skillSchema.js";
import Errorhandler from "../middleware/error.js";
import { v2 as cloudinary } from "cloudinary";

export const addNewSkill = catchAssyncError(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new Errorhandler("Image For Skill Required!", 404));
  }
  const { svg } = req.files;
  const { title, proficiency } = req.body;
  if (!title || !proficiency) {
    return next(new Errorhandler("Please Fill Full Form!", 400));
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    svg.tempFilePath,
    { folder: "PORTFOLIO SKILL IMAGES" }
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(new Errorhandler("Failed to upload avatar to Cloudinary", 500));
  }
  const skill = await Skills.create({
    title,
    proficiency,
    svg: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(201).json({
    success: true,
    message: "New Skill Added",
    skill,
  });
});

export const deleteSkill = catchAssyncError(async (req, res, next) => {
  const { id } = req.params;
  const skill = await Skills.findById(id);
  if (!skill) return next(new Errorhandler("Skill Not Found!", 404));
  if (!skill) {
    return next(new Errorhandler("Already Deleted!", 404));
  }
  const skillSvgId = skill.svg.public_id;
  await cloudinary.uploader.destroy(skillSvgId);
  await skill.deleteOne();
  res.status(200).json({
    success: true,
    message: "Skill Deleted!",
  });
});
export const updateSkill = catchAssyncError(async (req, res, next) => {
  const { id } = req.params;
  let skill = await Skills.findById(id);
  if (!skill) return next(new Errorhandler("Skill Not Found!", 404));
  const { proficiency } = req.body;
  skill = await Skills.findByIdAndUpdate(
    id,
    { proficiency },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    message: "Skill Updated!",
    skill,
  });
});
export const getAllSkills = catchAssyncError(async (req, res, next) => {
  const skill = await Skills.find();
  res.status(200).json({
    success: true,
    skill,
  });
});

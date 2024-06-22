import { catchAssyncError } from "../middleware/catchAssyncErrors.js";
import { SoftwareApplication } from "../models/softwareApplicationSchema.js";
import Errorhandler from "../middleware/error.js";
import { v2 as cloudinary } from "cloudinary";

export const addNewApplications = catchAssyncError(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(
      new Errorhandler("Software Application Icon/Image Required!", 404)
    );
  }
  const { svg } = req.files;
  const { name } = req.body;
  if (!name) {
    return next(new Errorhandler("Please Provide Software's Name!", 400));
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    svg.tempFilePath,
    { folder: "PORTFOLIO SOFTWARE APPLICATION IMAGES" }
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(new Errorhandler("Failed to upload avatar to Cloudinary", 500));
  }
  const softwareApplication = await SoftwareApplication.create({
    name,
    svg: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(201).json({
    success: true,
    message: "New Software Application Added!",
    softwareApplication,
  });
});


export const deleteApplication = catchAssyncError(async (req, res, next) => {
  const { id } = req.params;
  let softwareApplication = await SoftwareApplication.findById(id);
  if (!softwareApplication) {
    return next(new Errorhandler("Already Deleted!", 404));
  }
  const softwareApplicationSvgId = softwareApplication.svg.public_id;
  await cloudinary.uploader.destroy(softwareApplicationSvgId);
  await softwareApplication.deleteOne();
  res.status(200).json({
    success: true,
    message: "Software Application Deleted!",
  });
});


export const getAllApplications = catchAssyncError(async (req, res, next) => {
  const softwareApplications = await SoftwareApplication.find();
  res.status(200).json({
    success: true,
    softwareApplications,
  });
});

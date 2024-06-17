import { User } from "../models/userSchema.js";
import { catchAssyncError } from "./catchAssyncErrors.js";
import Errorhandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticatedUser = catchAssyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return next(new Errorhandler("User not Authenticated!", 400));

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
  next();
});

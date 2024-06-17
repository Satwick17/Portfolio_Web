import express from "express";
import {
  getUser,
  getUserPortfolio,
  login,
  logout,
  register,
  updatePassword,
  updateProfile,
} from "../controller/userController.js";
import { isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticatedUser, logout);
router.get("/me", isAuthenticatedUser, getUser);
router.put("/update/me", isAuthenticatedUser, updateProfile);
router.put("/update/password", isAuthenticatedUser, updatePassword);
router.get("/me/portfolio", getUserPortfolio);

export default router;

import express from "express";
import {
  addNewProject,
  deleteProject,
  updateProject,
  getAllProject,
  getSingleProject
} from "../controller/projectController.js";
import { isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/add",isAuthenticatedUser, addNewProject);
router.delete("/delete/:id",isAuthenticatedUser, deleteProject);
router.put("/update/:id",isAuthenticatedUser, updateProject);
router.get("/getall", getAllProject);
router.get("/get/:id", getSingleProject);

export default router;

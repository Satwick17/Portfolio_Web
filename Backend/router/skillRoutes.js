import express from "express";
import {
  addNewSkill,
  updateSkill,
  deleteSkill,
  getAllSkills,
} from "../controller/skillsController.js";
import { isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/add", isAuthenticatedUser, addNewSkill);
router.delete("/delete/:id", isAuthenticatedUser, deleteSkill);
router.put("/update/:id", isAuthenticatedUser, updateSkill);
router.get("/getall", getAllSkills);

export default router;

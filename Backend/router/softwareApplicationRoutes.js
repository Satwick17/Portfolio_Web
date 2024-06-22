import express from "express";
import {
  addNewApplications,
  deleteApplication,
  getAllApplications,
} from "../controller/softwareApplicationController.js";
import { isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/add", isAuthenticatedUser, addNewApplications);
router.delete("/delete/:id", isAuthenticatedUser, deleteApplication);
router.get("/getall", getAllApplications);

export default router;

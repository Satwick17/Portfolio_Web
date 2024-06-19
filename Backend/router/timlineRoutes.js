import express from "express";
import { postTimeline, deleteTimeline, getAllTimeline } from "../controller/timelineController.js";
import { isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/add", isAuthenticatedUser, postTimeline);
router.delete("/delete/:id", isAuthenticatedUser, deleteTimeline);
router.get("/getall", getAllTimeline)

export default router;

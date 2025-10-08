import express from "express";
import { getEventByDate, getWowEvent, addEvent } from "../controllers/eventController.js";

const router = express.Router();

router.get("/getevent", getEventByDate);      // /api/event?date=MM-DD
router.get("/wow", getWowEvent);           // /api/wow
router.post("/event", addEvent);           // POST to add event

export default router;

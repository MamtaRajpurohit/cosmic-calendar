// src/routes/spaceEventRoutes.js
import express from 'express';
import { getSpaceEvent } from '../controllers/spaceEventController.js';
const router = express.Router();

router.post('/', getSpaceEvent);
export default router;

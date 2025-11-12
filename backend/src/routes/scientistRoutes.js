// src/routes/scientistRoutes.js
import express from 'express';
import { getScientist } from '../controllers/scientistController.js';
const router = express.Router();

router.get('/', getScientist);
export default router;

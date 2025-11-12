// src/routes/spaceFactRoutes.js
import express from 'express';
import { getSpaceFact } from '../controllers/spaceFactController.js';
const router = express.Router();

router.get('/', getSpaceFact);
export default router;

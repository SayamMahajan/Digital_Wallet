import express from 'express';
import { getUserDetails } from '../controllers/userController.js';

const router = express.Router();

router.get('/:upi_id', getUserDetails);

export default router;

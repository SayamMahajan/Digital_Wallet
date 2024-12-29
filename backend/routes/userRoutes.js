import express from 'express';
import { getUserDetails, updateUserDetails } from '../controllers/userController.js';
import { verifyToken } from "../middlewares/authentication.js";

const router = express.Router();

router.get('/profile', verifyToken, getUserDetails);

router.put('/profile', verifyToken, updateUserDetails);

export default router;

import express from 'express';
import { getUserDetails, getReceiverByUPI, updateUserDetails } from '../controllers/userController.js';
import { verifyToken } from "../middlewares/authentication.js";

const router = express.Router();

router.get('/profile', verifyToken, getUserDetails);

router.get("/upi/:upiId", verifyToken, getReceiverByUPI);

router.put('/profile', verifyToken, updateUserDetails);

export default router;

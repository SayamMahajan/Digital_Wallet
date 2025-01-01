import express from 'express';
import { getRequest, sendRequest, updateRequestStatus } from '../controllers/requestController.js';
import { verifyToken } from "../middlewares/authentication.js";

const router = express.Router();

router.get('/', verifyToken, getRequest); 

router.post('/send-request', verifyToken, sendRequest); 

router.post('/update-status', verifyToken, updateRequestStatus); 

export default router;

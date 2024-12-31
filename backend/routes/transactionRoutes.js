import express from 'express';
import { createTransaction, getTransactions } from '../controllers/transactionController.js';
import { verifyToken } from "../middlewares/authentication.js";

const router = express.Router();

router.post('/', verifyToken, createTransaction);
router.get('/', verifyToken, getTransactions);


export default router;

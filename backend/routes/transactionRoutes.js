import express from 'express';
import { createTransaction, getTransactions, addDeposit, handlePaymentSuccess } from '../controllers/transactionController.js';
import { verifyToken } from "../middlewares/authentication.js";

const router = express.Router();

router.post('/', verifyToken, createTransaction);
router.get('/', verifyToken, getTransactions);
router.post('/deposit', verifyToken, addDeposit);
router.post('/handlePaymentSuccess', verifyToken, handlePaymentSuccess);


export default router;

import express from 'express';
import { createTransaction, getTransactions } from '../controllers/transactionController.js';

const router = express.Router();

router.post('/', createTransaction);
router.get('/:upi_id', getTransactions);

export default router;

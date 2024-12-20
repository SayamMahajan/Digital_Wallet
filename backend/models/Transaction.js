import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  sender_upi_id: { type: String, required: true },
  receiver_upi_id: { type: String, required: true },
  amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Transaction = mongoose.model('transaction', transactionSchema);

export default Transaction;

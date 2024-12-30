import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  sender_upi_id: { 
    type: String, 
    required: true 
  },
  receiver_upi_id: { 
    type: String, 
    required: true 
  },
  amount: { 
    type: Number, 
    required: true 
  },
  type: { 
    type: String, 
    required: true, 
    enum: ['credit', 'debit'] 
  },
  description: { 
    type: String, 
    required: false, 
    maxlength: 20, 
    validate: {
      validator: function (value) {
        return value.length <= 20;
      },
      message: 'Description cannot exceed 20 characters including spaces.',
    },
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  },
});

const Transaction = mongoose.model('transaction', transactionSchema);

export default Transaction;

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
  paymentId: { 
    type: String,  
  },
  amount: { 
    type: Number, 
    required: true 
  },
  description: { 
    type: String, 
    required: false, 
    maxlength: 40, 
    default: "No description provided", 
    validate: {
      validator: function (value) {
        return value.length <= 40;
      },
      message: 'Description cannot exceed 40 characters including spaces.',
    },
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  },
});

const Transaction = mongoose.model('transaction', transactionSchema);

export default Transaction;

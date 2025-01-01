import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
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
  status: { 
    type: String, 
    default: "pending", 
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  },
});

const Request = mongoose.model('request', requestSchema);

export default Request;

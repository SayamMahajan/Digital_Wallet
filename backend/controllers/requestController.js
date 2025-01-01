import User from '../models/User.js';
import Request from '../models/Request.js';
import Transaction from '../models/Transaction.js';

export const getRequest = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const upi_id = user.upi_id;
    const requests = await Request.find({
      $or: [{ sender_upi_id: upi_id }, { receiver_upi_id: upi_id }],
    }).sort({ timestamp: -1 });

    return res.status(200).json({ 
      success: true, 
      requests, 
      user: { ...user._doc, password: undefined } 
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const sendRequest = async (req, res) => {
  try {
    const { sender_upi_id, receiver_upi_id, amount, description } = req.body;

    if (amount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid amount' });
    }

    const sender = await User.findOne({ upi_id: sender_upi_id });
    if (!sender) {
      return res.status(404).json({ success: false, message: 'Sender not found' });
    }

    const receiver = await User.findOne({ upi_id: receiver_upi_id });
    if (!receiver) {
      return res.status(404).json({ success: false, message: 'Receiver not found' });
    }

    // Prevent sending request to oneself
    if (sender_upi_id === receiver_upi_id) {
      return res.status(400).json({ success: false, message: 'You cannot request money from yourself.' });
    }

    const request = new Request({
      sender_upi_id,
      receiver_upi_id,
      amount,
      description,
    });

    await request.save();

    return res.status(200).json({ success: true, message: 'Request sent successfully!' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateRequestStatus = async (req, res) => {
  try {
    const { requestId, action, sender_upi_id, receiver_upi_id, amount} = req.body;

    if (amount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid amount' });
    }

    const sender = await User.findOne({ upi_id: sender_upi_id });
    if (!sender) {
      return res.status(404).json({ success: false, message: 'Sender not found' });
    }

    const receiver = await User.findOne({ upi_id: receiver_upi_id });
    if (!receiver) {
      return res.status(404).json({ success: false, message: 'Receiver not found' });
    }

    if (!['accept', 'reject'].includes(action)) {
      return res.status(400).json({ success: false, message: 'Invalid action' });
    }

    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    if (action === 'accept') {
      request.status = 'Accepted';
    } else if (action === 'reject') {
      request.status = 'Rejected';
    }

    await request.save();

    sender.balance += amount;
    receiver.balance -= amount;

    await sender.save();
    await receiver.save();

    const transaction = new Transaction({
      sender_upi_id,
      receiver_upi_id,
      amount,
      description: 'Request Method Used',
    });

    await transaction.save();

    return res.status(200).json({ success: true, message: `Request ${action}ed successfully!` });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

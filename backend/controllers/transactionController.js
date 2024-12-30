import User from '../models/User.js';
import Transaction from '../models/Transaction.js';

export const createTransaction = async (req, res) => {
  try {
    const { sender_upi_id, receiver_upi_id, amount, description } = req.body;

    if (amount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid amount' });
    }

    const sender = await User.findOne({ upi_id: sender_upi_id });
    const receiver = await User.findOne({ upi_id: receiver_upi_id });

    if (!sender) {
      return res.status(404).json({ success: false, message: 'Sender not found' });
    }

    if (!receiver) {
      return res.status(404).json({ success: false, message: 'Receiver not found' });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ success: false, message: 'Insufficient balance' });
    }

    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save();
    await receiver.save();

    const senderTransaction = new Transaction({
      sender_upi_id,
      receiver_upi_id,
      amount,
      type: 'debit',
      description,
    });

    const receiverTransaction = new Transaction({
      sender_upi_id,
      receiver_upi_id,
      amount,
      type: 'credit',
      description,
    });

    await senderTransaction.save();
    await receiverTransaction.save();

    res.status(200).json({ success: true, message: 'Transaction successful!' });
  } catch (error) {
    console.error('Transaction error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID is required' });
    }
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const upi_id = user.upi_id;
    const transactions = await Transaction.find({
      $or: [{ sender_upi_id: upi_id }, { receiver_upi_id: upi_id }],
    }).sort({ timestamp: -1 }); 

    res.status(200).json({ success: true, transactions });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

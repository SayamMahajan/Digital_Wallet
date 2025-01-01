import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import { v4 as uuidv4 } from 'uuid';
import paypal from 'paypal-rest-sdk';

paypal.configure({
  mode: 'sandbox', // Use 'live' in production
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});


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

    const transaction = new Transaction({
      sender_upi_id,
      receiver_upi_id,
      amount,
      description,
    });

    await transaction.save();

    res.status(200).json({ success: true, message: 'Transaction successful!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get list of transactions for a user
export const getTransactions = async (req, res) => {
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
    const transactions = await Transaction.find({
      $or: [{ sender_upi_id: upi_id }, { receiver_upi_id: upi_id }],
    }).sort({ timestamp: -1 });

    res.status(200).json({ 
      success: true, 
      transactions, 
      user: { ...user._doc, password: undefined } 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const INR_TO_USD_CONVERSION_RATE = 0.012; // Example: 1 INR = 0.012 USD

export const addDeposit = async (req, res) => {
  try {
    const userId = req.userId;
    const { amount } = req.body;

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid amount' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Convert INR to USD
    const amountInUSD = (numericAmount * INR_TO_USD_CONVERSION_RATE).toFixed(2);

    const paymentJson = {
      intent: 'sale',
      payer: { payment_method: 'paypal' },
      redirect_urls: {
        return_url: 'http://localhost:5173/transactions',
        cancel_url: 'http://localhost:5173/transactions',
      },
      transactions: [{
        amount: {
          total: amountInUSD,
          currency: 'USD', // Use supported currency
        },
        description: `Deposit of ₹${numericAmount.toFixed(2)} converted to USD`,
      }],
    };

    paypal.payment.create(paymentJson, (error, payment) => {
      if (error) {
        return res.status(500).json({ success: false, message: 'Error creating PayPal payment' });
      }

      const approvalUrl = payment.links.find(link => link.rel === 'approval_url')?.href;

      if (!approvalUrl) {
        return res.status(500).json({ success: false, message: 'Approval URL not found' });
      }

      res.status(200).json({ success: true, approvalUrl });
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const handlePaymentSuccess = async (req, res) => {
  const { paymentId, payerId } = req.body;

  try {
    const existingTransaction = await Transaction.findOne({ paymentId });
    if (existingTransaction) {
      return res.status(200).json({ success: true, message: 'Payment already processed' });
    }

    paypal.payment.execute(paymentId, { payer_id: payerId }, async (error, payment) => {
      if (error) {
        return res.status(400).json({ success: false, message: 'Payment verification failed' });
      }

      if (payment.state === 'approved') {
        const user = await User.findById(req.userId);
        if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Convert USD back to INR for user's wallet balance
        const amountInUSD = parseFloat(payment.transactions[0].amount.total);
        const amountInINR = (amountInUSD / INR_TO_USD_CONVERSION_RATE).toFixed(2);

        user.balance += parseFloat(amountInINR);
        await user.save();

        const newTransaction = new Transaction({
          sender_upi_id: user.upi_id,
          receiver_upi_id: user.upi_id,
          amount: parseFloat(amountInINR),
          description: `Deposit of ₹${amountInINR} (= $${amountInUSD})`,
          paymentId,
        });
        await newTransaction.save();

        res.status(200).json({ success: true, message: 'Deposit successful!' });
      } else {
        return res.status(400).json({ success: false, message: 'Payment not approved' });
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
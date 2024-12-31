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
    console.error('Transaction error:', error);
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

    const formattedTransactions = transactions.map((transaction) => {
      const type = transaction.sender_upi_id === upi_id ? 'debit' : 'credit';
      return { ...transaction._doc, type };
    });

    res.status(200).json({ 
      success: true, 
      transactions: formattedTransactions, 
      user: { ...user._doc, password: undefined } 
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
export const addDeposit = async (req, res) => {
  try {
    const userId = req.userId;
    const { amount } = req.body;

    // Ensure amount is a valid number and greater than 0
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid amount' });
    }

    // Find the user
    const user = await User.findById(userId);

    // Prepare PayPal payment request
    const paymentJson = {
      intent: 'sale',
      payer: { payment_method: 'paypal' },
      redirect_urls: {
        return_url: 'http://localhost:5173/transactions',
        cancel_url: 'http://localhost:5173/transactions',
      },
      transactions: [{
        amount: {
          total: numericAmount.toFixed(2), // Ensure it's a number and format it to 2 decimal places
          currency: 'USD',
        },
        description: 'Deposit to your wallet',
      }],
    };

    // Create PayPal payment
    paypal.payment.create(paymentJson, async function (error, payment) {
      if (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error creating PayPal payment' });
      }

      // Get the approval_url for the payment
      const approvalUrl = payment.links.find(link => link.rel === 'approval_url').href;

      // Optionally save transaction info in the database
      const newTransaction = new Transaction({
        sender_upi_id: user.upi_id,
        receiver_upi_id: user.upi_id,
        amount: numericAmount, // Use the numeric value here
        description: 'Deposit',
      });
      await newTransaction.save();

      // Return the approval URL to the client
      res.status(200).json({
        success: true,
        approvalUrl,
      });
    });
  } catch (error) {
    console.error('Error during deposit:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};


export const handlePaymentSuccess = async (req, res) => {
  const { paymentId, payerId } = req.body;

  try {
    // Execute PayPal payment
    paypal.payment.execute(paymentId, { payer_id: payerId }, async function (error, payment) {
      if (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: 'Payment verification failed' });
      }

      if (payment.state === 'approved') {
        const user = await User.findById(req.userId);
        if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Add deposit amount to user balance
        user.balance += payment.transactions[0].amount.total;
        await user.save();

        // Optionally, create a transaction entry
        const newTransaction = new Transaction({
          sender_upi_id: req.userId,
          receiver_upi_id: req.userId,
          amount: payment.transactions[0].amount.total,
          description: 'Deposit',
        });
        await newTransaction.save();

        res.status(200).json({ success: true, message: 'Deposit successful!' });
      } else {
        return res.status(400).json({ success: false, message: 'Payment not approved' });
      }
    });
  } catch (error) {
    console.error('Error during payment success handling:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

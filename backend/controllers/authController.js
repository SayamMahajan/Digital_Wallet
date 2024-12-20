import User from '../models/User.js';
import generateUPI from '../utils/generateUPI.js';

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).send({ message: 'User already exists' });

    const upi_id = generateUPI();
    user = new User({ name, email, password, upi_id });
    await user.save();

    res.status(201).send({ message: 'User registered successfully!', upi_id });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).send({ message: 'Server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password)
      return res.status(400).send({ message: 'Invalid credentials' });

    res.status(200).send({ message: 'Login successful!', upi_id: user.upi_id, balance: user.balance });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send({ message: 'Server error' });
  }
};

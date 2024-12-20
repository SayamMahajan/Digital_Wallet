import User from '../models/User.js';

export const getUserDetails = async (req, res) => {
  try {
    const { upi_id } = req.params;
    const user = await User.findOne({ upi_id });
    if (!user) return res.status(404).send({ message: 'User not found' });

    res.status(200).send(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send({ message: 'Server error' });
  }
};

import User from '../models/User.js';

export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    return res.status(200).json({ success: true, user: {...user._doc, password: undefined }});
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const getReceiverByUPI = async (req, res) => {
  const { upiId } = req.params;
  try {
    const user = await User.findOne({ upi_id: upiId });

    if (!user) {
      return res.status(404).json({ success: false, message: "Receiver not found." });
    }
    const name = user.firstName + " " + user.lastName;

    res.status(200).json({ success: true, name });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching receiver details.", error });
  }
};

export const updateUserDetails = async (req, res) => {
  const { name } = req.body;
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    user.name = name || user.name;

    await user.save();

    return res.json({ success: true, message: 'Profile updated successfully' });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

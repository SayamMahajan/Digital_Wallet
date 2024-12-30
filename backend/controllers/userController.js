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

import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import crypto from "crypto";
import 'dotenv/config';
import { generateUPI } from '../utils/generateUPI.js';
import { generateVerificationToken } from "../utils/generateVerificationToken.js";
import { generateJWTToken } from "../utils/generateJWTToken.js";
import { sendConfirmationEmail, sendResetPasswordEmail, sendResetPasswordSuccessEmail, sendVerificationEmail } from "../resend/email.js";

export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    if (!firstName || !lastName || !email || !password){
      return res.status(400).json({ success: false,  message: "Enter all fields"});
    }
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) return res.status(400).json({ success: false, message: 'User already exists' });

    const upi_id = firstName+generateUPI();
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationToken();

    const user = new User({ 
      firstName,
      lastName, 
      email, 
      password : hashedPassword, 
      upi_id,
      verificationToken,
      verificationTokenExpiresAt : Date.now() + 24 * 60 * 60 * 1000, 
    });
    await user.save();

    await sendVerificationEmail(user.email, verificationToken);

    return res.status(201).json({ success: true, message: 'User registered successfully!', user: {
      ...user._doc,
      password: undefined,
    } });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message});
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user )
      return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const verifyPassword = await bcrypt.compare(password, user.password);
    if(!verifyPassword){
      return res.status(400).json({ success: false, message: "Invalid Password"});
    }

    const isVerified = user.isVerified;
    if(!isVerified){
      return res.status(400).json({ success: false, message: "Verify Email"});
    }

    generateJWTToken(res, user._id, user.email);

    return res.status(200).json({ success: true, message: 'Login successful!'});

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token").status(200).json({ success: true, message: "Logout Successfully"})
}

export const verifyEmail = async (req, res) => {
  const { otp } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: otp,
      verificationTokenExpiresAt : { $gt: Date.now()},
    });
    if(!user){
      return res.status(400).json({ success: false, message: "Invalid or expired verification code"});
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendConfirmationEmail(user.email, user.firstName);

    return res.status(200).json({ success: true, message: "Email verified successfully"});

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if(!user){
      return res.status(400).json({ success: false, message: "User not found"});
    }
    const resetPasswordToken = crypto.randomBytes(32).toString("hex");
    const resetPasswordExpiresAt = Date.now() + 1*60*60*1000;

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpiresAt = resetPasswordExpiresAt;

    await user.save();
    await sendResetPasswordEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`);

    return res.status(200).json({ success: true, message: "Reset password link sent to your email"});
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try{
    const token = req.params.token;
    const { newPassword } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: {$gt: Date.now()},
    });
    if(!user){
      return res.status(400).json({ success: false, message: "Invalid or expired reset password link"});
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    await sendResetPasswordSuccessEmail(user.email);

    return res.status(200).json({success: true, message: "Password reset successful"});
  } catch (error) { 
    return res.status(500).json({ success: false, message: error.message });
  }
}

export const resendVerificationToken = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ success: false, message: "Email is already verified" });
    }

    const newVerificationToken = generateVerificationToken();
    user.verificationToken = newVerificationToken;
    user.verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();
    await sendVerificationEmail(user.email, newVerificationToken);

    return res.status(200).json({ success: true, message: "New verification token sent to your email" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if(!user){
      return res.status(400).json({ success: false, message: "User not found"});
    }

    return res.status(200).json({ success: true, user: {...user._doc, password: undefined }});
  } catch (error) { 
    return res.status(500).json({ success: false, message: error.message });
  }
}
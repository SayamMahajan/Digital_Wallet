import jwt from "jsonwebtoken";
import 'dotenv/config';

export const generateJWTToken = (res, userId, email) => {
  const payload = {
    userId,
    email,
  }

  const token =jwt.sign( payload, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });

  res.cookie('token', token, {
    httpOnly : true,
    // secure: process.env.NODE_ENV === 'production',
    // sameSite : 'strict',
    maxAge: 7*24*60*60*1000,
  })

  return token;
}
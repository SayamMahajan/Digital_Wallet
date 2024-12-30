import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName : {
    type : String,
    required : true,
  },
  lastName : {
    type : String,
    required : true,
  },
  email : {
    type : String,
    required : true,
    unique : true,
  },  
  password : {
    type : String,
    required : true,
  },
  upi_id: { 
    type: String, 
    unique: true,
    required : true,
  },
  balance: { 
    type: Number, 
    default: 0, 
  },
  isVerified : {
    type : Boolean,
    default : false
  },
  resetPasswordToken : String,
  resetPasswordExpiresAt : Date,
  verificationToken : String,
  verificationTokenExpiresAt : Date,
},{timestamps : true});

const User = mongoose.model('user', userSchema);

export default User;

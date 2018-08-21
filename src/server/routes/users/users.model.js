import mongoose from 'mongoose';
import { saltRounds } from '../../config';
import bcrypt from 'bcrypt';
const Schema = mongoose.Schema;

// User schema
const User = new Schema({
  username: { type: String, required: true, index: { unique: true }},
  password: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true }},
  createdAt: { type: String, default: Date.now },
  updatedAt: { type: String, default: Date.now },
  wallet: { type: Number, required: true, default: 100 }
})

// Hash password before save
User.pre('save', async function(next) {
  try {
    const hash = await bcrypt.hash(this.password, saltRounds);
    this.password = hash;
    next();
  } catch(e) {
    next(e);
  }
})

export default mongoose.model('User', User);
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Bet schema
const Bet = new Schema({
  user: { type: Schema.Types.ObjectId, requried: true, ref: 'User' },
  event: { type: Schema.Types.ObjectId, required: true, ref: 'Event' },
  option: { type: Schema.Types.ObjectId, required: true },
  amount: { type: Number, required: true },
  resolved: { type: Boolean, default: false },
  won: { type: Number, default: 0 },
  createdAt: { type: Number, default: Date.now }
})

export default mongoose.model('Bet', Bet);
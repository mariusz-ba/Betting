import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Event schema
const Event = new Schema({
  name: { type: String, required: true },
  organiser: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now },
  options: [{
    name: { type: String, required: true }
  }],
  result: {
    finished: { type: Boolean, default: false },
    option: { type: Schema.Types.ObjectId, required: true }
  }
})

export default mongoose.model('Event', Event);
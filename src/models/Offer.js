import mongoose from 'mongoose';

const OfferSchema = new mongoose.Schema({
  task_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
  worker_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  proposed_rate: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
}, { timestamps: true });

export default mongoose.model('Offer', OfferSchema);

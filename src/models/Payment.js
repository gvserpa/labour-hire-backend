import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  task_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
  client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  worker_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  platform_fee: { type: Number, required: true },
  worker_amount: { type: Number, required: true },
  total_amount: { type: Number, required: true },
  stripe_payment_id: { type: String },
  status: { type: String, enum: ['pending', 'succeeded', 'failed'], default: 'pending' },
}, { timestamps: true });

export default mongoose.model('Payment', PaymentSchema);

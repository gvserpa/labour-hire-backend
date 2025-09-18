import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    client_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    rate_per_hour: { type: Number, required: true },
    hours: { type: Number, required: true },
    total_amount: { type: Number, required: true },
      offers: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      amount: { type: Number, required: true },
      comment: { type: String },
      status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
      createdAt: { type: Date, default: Date.now },
    }
  ],
    status: {
      type: String,
      enum: ["open", "negotiation", "accepted", "completed", "cancelled"],
      default: "open",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", TaskSchema);

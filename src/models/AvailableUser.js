import mongoose from "mongoose";

const availableUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, enum: ["driver", "offsider"], required: true },
  rate: { type: Number, required: true },
  availableDays: { type: [String], required: true },
  score: { type: Number, default: 0 },
  client_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export default mongoose.model("AvailableUser", availableUserSchema);

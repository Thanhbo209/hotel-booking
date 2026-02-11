// models/OwnerRequest.js
import mongoose from "mongoose";

const OwnerRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // mỗi user chỉ gửi 1 request pending
    },

    message: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
      index: true,
    },

    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // ADMIN
    },

    reviewedAt: Date,
  },
  { timestamps: true },
);

export default mongoose.model("OwnerRequest", OwnerRequestSchema);

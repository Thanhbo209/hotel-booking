// models/OwnerRequest.js
import mongoose from "mongoose";

const OwnerRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
OwnerRequestSchema.index(
  { user: 1 },
  { unique: true, partialFilterExpression: { status: "PENDING" } },
);

export default mongoose.model("OwnerRequest", OwnerRequestSchema);

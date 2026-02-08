import mongoose, { mongo } from "mongoose";

const sessionSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    refreshToken: {
      type: String,
      required: true,
      unique: true,
    },

    expiredsAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

sessionSchema.index({ expiredsAt: 1 }, { expireAfterSeconds: 0 });

const Session = mongoose.model("Session", sessionSchema);
export default Session;

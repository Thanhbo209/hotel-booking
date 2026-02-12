import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: { type: String, required: true },
    description: String,
    address: { type: String, required: true },
    city: { type: String, index: true },
    rating: { type: Number, default: 0 },
    amenities: {
      restaurant: Boolean,
      swimmingPool: Boolean,
      gym: Boolean,
      spa: Boolean,
      parking: Boolean,
      bar: Boolean,
    },
  },
  { timestamps: true },
);

const Hotel = mongoose.model("Hotel", HotelSchema);
export default Hotel;

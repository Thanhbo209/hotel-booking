import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    hotelId: { type: Types.ObjectId, ref: "Hotel", required: true },
    roomId: { type: Types.ObjectId, ref: "Room", required: true },

    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },

    roomsBooked: { type: Number, required: true },

    totalPrice: Number,

    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "CANCELLED"],
      default: "PENDING",
    },
  },
  { timestamps: true },
);
const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;

import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    hotelId: {
      type: Types.ObjectId,
      ref: "Hotel",
      required: true,
      index: true,
    },
    name: { type: String, required: true },
    roomType: {
      type: String,
      enum: ["SINGLE", "DOUBLE", "DELUXE", "SUITE"],
      required: true,
    },
    pricePerNight: { type: Number, required: true },
    capacity: { type: Number, required: true },
    totalRooms: { type: Number, required: true },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },

    amenities: {
      wifi: Boolean,
      airConditioner: Boolean,
      tv: Boolean,
      minibar: Boolean,
      balcony: Boolean,
      bedType: String,
    },
    images: [String],
  },
  { timestamps: true },
);

const Room = mongoose.model("Room", RoomSchema);
export default Room;

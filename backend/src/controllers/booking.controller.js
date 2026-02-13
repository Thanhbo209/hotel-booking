import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";

export const getBookingsOfMyHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find({ ownerId: req.user._id }).select("_id");

    const bookings = await Booking.find({
      hotelId: { $in: hotels.map((h) => h._id) },
    })
      .populate("roomId")
      .populate("userId", "name email");

    return res.json(bookings);
  } catch (error) {
    console.error("getBookingsOfMyHotels error:", error);
    return res.status(500).json({ message: "Fetch bookings failed" });
  }
};

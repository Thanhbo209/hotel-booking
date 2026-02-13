import { Router } from "express";
import { authenticate, authorize } from "../middlewares/ProtectedRoute.js";
import {
  createHotel,
  deleteHotel,
  getMyHotels,
  updateHotel,
} from "../controllers/hotel.controller.js";
import {
  createRoom,
  getRoomsByHotel,
  toggleRoomStatus,
  updateRoom,
} from "../controllers/room.controller.js";
import { getBookingsOfMyHotels } from "../controllers/booking.controller.js";

const router = Router();

router.use(authenticate, authorize("OWNER"));

// Hotel
router.post("/hotels", createHotel);
router.get("/hotels", getMyHotels);
router.put("/hotels/:id", updateHotel);
router.delete("/hotels/:id", deleteHotel);

// Room
router.post("/rooms", createRoom);
router.get("/hotels/:hotelId/rooms", getRoomsByHotel);
router.put("/rooms/:id", updateRoom);
router.patch("/rooms/:id/status", toggleRoomStatus);

// Booking
router.get("/bookings", getBookingsOfMyHotels);

export default router;

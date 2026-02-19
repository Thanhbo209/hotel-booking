import express from "express";
import { getPublicHotels } from "../controllers/hotel.controller.js";
import {
  getPublicRoomById,
  getPublicRooms,
  getRelatedRooms,
} from "../controllers/room.controller.js";

const router = express.Router();

/* ===== PUBLIC ===== */
router.get("/hotels", getPublicHotels);
// ===== PUBLIC =====
router.get("/rooms", getPublicRooms);

router.get("/rooms/:id", getPublicRoomById);
router.get("/rooms/:id/related", getRelatedRooms);

export default router;

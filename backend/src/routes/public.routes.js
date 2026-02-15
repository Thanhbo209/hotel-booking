import express from "express";
import { getPublicHotels } from "../controllers/hotel.controller.js";
import { getPublicRooms } from "../controllers/room.controller.js";

const router = express.Router();

/* ===== PUBLIC ===== */
router.get("/hotels", getPublicHotels);
// ===== PUBLIC =====
router.get("/rooms", getPublicRooms);

export default router;

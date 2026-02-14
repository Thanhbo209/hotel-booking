import express from "express";
import { getPublicHotels } from "../controllers/hotel.controller.js";

const router = express.Router();

/* ===== PUBLIC ===== */
router.get("/hotels", getPublicHotels);

export default router;

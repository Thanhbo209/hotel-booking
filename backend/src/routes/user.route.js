import express from "express";
import { authMe } from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/ProtectedRoute.js";

const router = express.Router();

router.use(authenticate);
router.get("/me", authMe);

export default router;

import express from "express";
import { authMe } from "../controllers/user.controller.js";
import { authenticate, authorize } from "../middlewares/ProtectedRoute.js";
import { createOwnerRequest } from "../controllers/ownerRequest.controller.js";

const router = express.Router();

router.use(authenticate);
router.post("/create-request", authorize("USER"), createOwnerRequest);
router.get("/me", authMe);

export default router;

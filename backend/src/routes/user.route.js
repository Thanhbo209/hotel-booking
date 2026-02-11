import express from "express";
import { authMe } from "../controllers/user.controller.js";
import { authenticate, authorize } from "../middlewares/ProtectedRoute.js";
import { createOwnerRequest } from "../controllers/ownerRequest.controller.js";

const router = express.Router();

router.use(authenticate);
router.get("/me", authMe);
router.post("/", authorize("USER"), createOwnerRequest);

export default router;

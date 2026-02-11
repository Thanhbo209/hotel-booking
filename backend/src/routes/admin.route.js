// src/routes/admin.routes.js
import express from "express";
import {
  getOwnerRequests,
  approveOwnerRequest,
  rejectOwnerRequest,
} from "../controllers/admin.controller.js";
import { authenticate, authorize } from "../middlewares/ProtectedRoute.js";

const router = express.Router();
router.use(authenticate);
router.get("/owner-requests", authorize("ADMIN"), getOwnerRequests);

router.patch(
  "/owner-requests/:id/approve",
  authorize("ADMIN"),
  approveOwnerRequest,
);

router.patch(
  "/owner-requests/:id/reject",
  authorize("ADMIN"),
  rejectOwnerRequest,
);

export default router;

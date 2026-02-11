// src/controllers/admin.controller.js
import OwnerRequest from "../models/OwnerRequest.js";
import User from "../models/User.js";

export const getOwnerRequests = async (req, res) => {
  const requests = await OwnerRequest.find({ status: "PENDING" })
    .populate("user", "email fullName")
    .sort({ createdAt: -1 });

  res.json(requests);
};

export const approveOwnerRequest = async (req, res) => {
  const request = await OwnerRequest.findById(req.params.id);

  if (!request || request.status !== "PENDING") {
    return res.status(404).json({ message: "Invalid request" });
  }

  await User.findByIdAndUpdate(request.user, {
    role: "OWNER",
  });

  request.status = "APPROVED";
  request.reviewedBy = req.user._id;
  request.reviewedAt = new Date();
  await request.save();

  res.json({ message: "User promoted to OWNER" });
};

export const rejectOwnerRequest = async (req, res) => {
  const request = await OwnerRequest.findById(req.params.id);

  if (!request || request.status !== "PENDING") {
    return res.status(404).json({ message: "Invalid request" });
  }

  request.status = "REJECTED";
  request.reviewedBy = req.user._id;
  request.reviewedAt = new Date();
  await request.save();

  res.json({ message: "Request rejected" });
};

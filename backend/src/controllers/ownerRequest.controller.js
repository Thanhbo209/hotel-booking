// src/controllers/ownerRequest.controller.js
import OwnerRequest from "../models/OwnerRequest.js";

export const createOwnerRequest = async (req, res) => {
  try {
    const existing = await OwnerRequest.findOne({
      user: req.user._id,
      status: "PENDING",
    });

    if (existing) {
      return res.status(409).json({
        message: "You already have a pending request",
      });
    }

    const request = await OwnerRequest.create({
      user: req.user._id,
      message: req.body.message,
    });

    res.status(201).json({
      message: "Owner request submitted",
      request,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

import mongoose from "mongoose";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const getPublicRooms = async (req, res) => {
  try {
    const { hotelId, minPrice, maxPrice, capacity, roomType } = req.query;
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 20);
    const skip = (page - 1) * limit;
    const query = {
      status: "ACTIVE",
    };

    if (hotelId) {
      query.hotelId = hotelId;
    }

    if (capacity) {
      query.capacity = { $gte: Number(capacity) };
    }

    if (roomType) {
      query.roomType = roomType;
    }

    if (minPrice != null || maxPrice != null) {
      query.pricePerNight = {};
      if (minPrice != null) query.pricePerNight.$gte = Number(minPrice);
      if (maxPrice != null) query.pricePerNight.$lte = Number(maxPrice);
    }

    const [rooms, total] = await Promise.all([
      Room.find(query)
        .populate("hotelId", "name city address")
        .sort({ pricePerNight: 1 })
        .skip(skip)
        .limit(limit),
      Room.countDocuments(query),
    ]);

    res.json({
      rooms,
      total,
      page,
      limit,
    });
  } catch (error) {
    console.error("getPublicRooms error:", error);
    res.status(500).json({ message: "Get public rooms failed" });
  }
};

export const getPublicRoomById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid room id",
      });
    }

    const room = await Room.findById(id)
      .populate("hotelId", "name address city")
      .lean();

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    // (optional) chỉ cho room ACTIVE
    if (room.status !== "ACTIVE") {
      return res.status(404).json({
        message: "Room not available",
      });
    }

    return res.json(room);
  } catch (error) {
    console.error("getPublicRoomById error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getRelatedRooms = async (req, res) => {
  try {
    const { id } = req.params;
    const limit = Math.min(10, parseInt(req.query.limit) || 3);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid room id" });
    }

    // 1️⃣ lấy room hiện tại
    const currentRoom = await Room.findById(id).lean();

    if (!currentRoom) {
      return res.status(404).json({ message: "Room not found" });
    }

    // ✅ FIX: đảm bảo amenities là array
    const amenitiesArray = Array.isArray(currentRoom.amenities)
      ? currentRoom.amenities
      : [];

    const query = {
      _id: { $ne: currentRoom._id },
      status: "ACTIVE",
      hotelId: currentRoom.hotelId,
    };

    // ✅ chỉ thêm $in khi có amenities
    if (amenitiesArray.length > 0) {
      query.amenities = { $in: amenitiesArray };
    }

    const relatedRooms = await Room.find(query)
      .populate("hotelId", "name city address")
      .sort({ pricePerNight: 1 })
      .limit(limit)
      .lean();

    res.json({ rooms: relatedRooms });
  } catch (error) {
    console.error("getRelatedRooms error:", error);
    res.status(500).json({ message: "Get related rooms failed" });
  }
};

export const createRoom = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({
      _id: req.body.hotelId,
      ownerId: req.user._id,
    });

    if (!hotel) {
      return res.status(403).json({ message: "Not your hotel" });
    }

    const room = await Room.create(req.body);
    return res.status(201).json(room);
  } catch (error) {
    console.error("createRoom error:", error);
    return res.status(500).json({ message: "Create room failed" });
  }
};

export const getRoomsByHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({
      _id: req.params.hotelId,
      ownerId: req.user._id,
    });

    if (!hotel) {
      return res.status(403).json({ message: "Not your hotel" });
    }

    const rooms = await Room.find({ hotelId: hotel._id });

    res.json({
      rooms,
      total: rooms.length,
    });
  } catch (error) {
    console.error("Get room error:", error);
    return res.status(500).json({ message: "Get room failed" });
  }
};

export const updateRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const hotel = await Hotel.findOne({
      _id: room.hotelId,
      ownerId: req.user._id,
    });

    if (!hotel) {
      return res.status(403).json({ message: "Not your hotel" });
    }

    const { name, type, price, capacity, amenities, description } = req.body;
    Object.assign(room, {
      name,
      type,
      price,
      capacity,
      amenities,
      description,
    });
    await room.save();

    res.json(room);
  } catch (error) {
    console.error("Update room error:", error);
    return res.status(500).json({ message: "Update room failed" });
  }
};

export const toggleRoomStatus = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const hotel = await Hotel.findOne({
      _id: room.hotelId,
      ownerId: req.user._id,
    });

    if (!hotel) {
      return res.status(403).json({ message: "Not your hotel" });
    }

    room.status =
      req.body.status ?? (room.status === "ACTIVE" ? "INACTIVE" : "ACTIVE");
    await room.save();

    return res.json(room);
  } catch (error) {
    console.error("toggleRoomStatus error:", error);
    return res.status(500).json({ message: "Toggle status failed" });
  }
};

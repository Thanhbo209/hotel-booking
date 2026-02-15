import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const getPublicRooms = async (req, res) => {
  try {
    const { hotelId, minPrice, maxPrice, capacity, roomType } = req.query;

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

    if (minPrice || maxPrice) {
      query.pricePerNight = {};
      if (minPrice) query.pricePerNight.$gte = Number(minPrice);
      if (maxPrice) query.pricePerNight.$lte = Number(maxPrice);
    }

    const rooms = await Room.find(query)
      .populate("hotelId", "name city address")
      .sort({ pricePerNight: 1 });

    res.json({
      rooms,
      total: rooms.length,
    });
  } catch (error) {
    console.error("getPublicRooms error:", error);
    res.status(500).json({ message: "Get public rooms failed" });
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

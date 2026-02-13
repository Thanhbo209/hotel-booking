import Hotel from "../models/Hotel.js";

export const getMyHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find({ ownerId: req.user._id });
    res.json(hotels);
  } catch (error) {
    console.error("Get hotels error:", error);
    return res.status(500).json({ message: "Get hotels lists failed" });
  }
};

export const createHotel = async (req, res) => {
  try {
    const hotel = await Hotel.create({
      ...req.body,
      ownerId: req.user._id,
    });

    return res.status(201).json(hotel);
  } catch (error) {
    console.error("createHotel error:", error);
    return res.status(500).json({ message: "Create hotel failed" });
  }
};

export const updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findOneAndUpdate(
      { _id: req.params.id, ownerId: req.user._id },
      req.body,
      { new: true },
    );

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    return res.json(hotel);
  } catch (error) {
    console.error("updateHotel error:", error);
    return res.status(500).json({ message: "Update hotel failed" });
  }
};

export const deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findOneAndDelete({
      _id: req.params.id,
      ownerId: req.user._id,
    });

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Delete hotels error:", error);
    return res.status(500).json({ message: "Delete hotel failed" });
  }
};

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

export const getPublicHotels = async (req, res) => {
  try {
    const hotels = await Hotel.aggregate([
      {
        $lookup: {
          from: "rooms",
          localField: "_id",
          foreignField: "hotelId",
          as: "rooms",
        },
      },
      {
        $addFields: {
          activeRooms: {
            $filter: {
              input: "$rooms",
              as: "room",
              cond: { $eq: ["$$room.status", "ACTIVE"] },
            },
          },
        },
      },
      {
        $addFields: {
          minPrice: { $min: "$activeRooms.pricePerNight" },
        },
      },
      {
        $project: {
          name: 1,
          images: 1,
          address: 1,
          city: 1,
          amenities: 1,
          rating: 1,
          minPrice: 1,
        },
      },
      {
        $sort: { rating: -1 },
      },
    ]);

    const normalized = hotels.map((h) => ({
      ...h,
      amenities: Array.isArray(h.amenities)
        ? h.amenities
        : h.amenities
          ? Object.keys(h.amenities).filter((k) => h.amenities[k])
          : [],
      image:
        Array.isArray(h.images) && h.images.length > 0 ? h.images[0] : null,
    }));

    res.json(normalized);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Get public hotels failed" });
  }
};

export const createHotel = async (req, res) => {
  try {
    const {
      name,
      address,
      city,
      description,
      images = [],
      amenities,
    } = req.body;

    const hotel = await Hotel.create({
      name,
      address,
      city,
      description,
      images,
      amenities,
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
    const { name, address, city, description, images, amenities } = req.body;
    const hotel = await Hotel.findOneAndUpdate(
      { _id: req.params.id, ownerId: req.user._id },
      { name, address, city, description, images, amenities },
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

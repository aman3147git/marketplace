import { List } from "../models/listing.js";

export const searched = async (req, res) => {
  const { query } = req.query;

  try {
    const listings = await List.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { type: { $regex: query, $options: "i" } },
        
      ],
    }).limit(10);

    res.status(200).json(listings);
  } catch (error) {
    console.error("Error in search:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const searchedItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await List.findById(id);

    res.status(200).json(item || { message: "Item not found" });
  } catch (error) {
    res.status(500).json({ message: "Fetch failed", error });
  }
};

import { Item } from "../models/index.js";
import { ApiError } from "../utility/ApiError.js";
import { ApiResponse } from "../utility/ApiResponse.js";

const createItems = async (req, res) => {
  try {
    const item = await Item.create(req.body);
    if (!item) {
      throw new ApiError(500,"Unable to create item");
    } else {
      return res.status(201).json(new ApiResponse({
        status: 201,
        message: "Item created successfully",
        data: item,
      })); // Sending JSON response directly
    }
  } catch (error) {
    throw new ApiError(500,"Something went wrong",error.message);
  }
};

const getItems = async (req, res) => {
  try {
    const { limit, page } = req.query;
    // Calculate the offset based on the page number and limit
    const offset = (page - 1) * limit;
    const items = await Item.find().skip(offset).limit(limit);
  
    if (!items) {
      throw new ApiError(404,"Record not found");
    } else {
      return res.status(201).json({
        status: 201,
        message: "Record found",
        data: items,
      }); // Sending JSON response directly
    }
  } catch (error) {
    throw new ApiError(500,"Something went wrong",error.message);
  }
};

const updateItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    if (!itemId) {
      throw new ApiError(400,"Item ID is required");
    }
    const { name, quantity } = req.body;
    const item = await Item.findByIdAndUpdate(
      itemId,
      {
        $set: {
          name,
          quantity,
        },
      },
      { new: true }
    );
    if (!item) {
      throw new ApiError(500,"Unable to update record");
    } else {
      return res.status(201).json({
        status: 201,
        message: "Item updated",
        data: item,
      }); // Sending JSON response directly
    }
  } catch (error) {
    throw new ApiError(500,"Something went wrong",error.message);
  }
};          

const deleteItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    if (!itemId) {
      throw new ApiError(500,"Item ID is required");
    }
    const item = await Item.findByIdAndDelete(itemId);
    if (!item) {
    throw new ApiError(500,"Unable to delete record");
    } else {
      return res.status(201).json({
        status: 201,
        message: "Item deleted",
        data: item,
      }); // Sending JSON response directly
    }
  } catch (error) {
    throw new ApiError(500,"Something went wrong",error.message);
  }
};

export { createItems, getItems, updateItem, deleteItem };

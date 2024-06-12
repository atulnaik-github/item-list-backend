import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter item name"],
  },
  quantity: {
    type: Number,
    required: [true, "Please enter quantity"],
    min: 1,
  },
});

const Item = mongoose.model("Item", itemSchema);

export default Item;

import { Router } from "express";
import {
  createItems,
  deleteItem,
  getItems,
  updateItem,
} from "../controllers/items.controller.js";

const router = Router();

router.route("/create").post(createItems);
router.route("/get").get(getItems);
router.route("/update/:itemId").put(updateItem);
router.route("/delete/:itemId").delete(deleteItem);

export default router;

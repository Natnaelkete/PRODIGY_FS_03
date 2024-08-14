import express from "express";
import {
  createCart,
  getCart,
  updateCartQuantity,
} from "../controllers/cartController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create/:id", protect, createCart);
router.get("/", protect, getCart);
router.patch("/:id", protect, updateCartQuantity);
export default router;

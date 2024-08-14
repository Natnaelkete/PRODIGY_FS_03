import express from "express";
import { protect, admin } from "../middlewares/authMiddleware.js";
import {
  createProduct,
  getProduct,
  getProductById,
  topProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/create", protect, admin, createProduct);
router.get("/top", topProducts, getProduct);
router.get("/", getProduct);
router.get("/:id", getProductById);

export default router;

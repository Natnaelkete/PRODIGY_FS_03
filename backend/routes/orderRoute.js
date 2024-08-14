import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { createOrder, getOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/create", protect, createOrder);
router.get("/", protect, getOrder);
export default router;

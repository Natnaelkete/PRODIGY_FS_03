import asyncHandler from "../middlewares/asyncHandler.js";
import Cart from "../models/cartModel.js";
import Order from "../models/orderModel.js";

export const createOrder = asyncHandler(async (req, res, next) => {
  try {
    const { cart: cartItems, address, isPaid, colors } = req.body;

    const order = new Order({
      user: req.user._id,
      cart: [...cartItems],
      colors: [...colors],
      address,
      isPaid,
    });

    order.save();
    res.status(200).json(order);
  } catch (error) {
    console.log(`createOrder Error ${error.message}`);
    next(error);
  }
});

export const getOrder = asyncHandler(async (req, res, next) => {
  try {
    const order = await Order.find({ user: req.user.id }).populate("user");

    if (!order) {
      res.status(200).json([]);
    }

    res.status(200).json(order);
  } catch (error) {
    console.log(`createOrder Error ${error.message}`);
    next(error);
  }
});

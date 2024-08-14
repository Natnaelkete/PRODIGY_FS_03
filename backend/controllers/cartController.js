import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import Cart from "../models/cartModel.js";

export const createCart = asyncHandler(async (req, res, next) => {
  try {
    const { quantity, colors } = req.body;
    const { id } = req.params;
    const userId = req.user._id;

    const product = await Product.findById(id);
    if (!product) {
      res.status(404);
      throw new Error("No such product found");
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        product: [
          {
            productId: product._id,
            quantity,
            colors: [...colors],
          },
        ],
      });
    } else {
      const productExists = cart.product.find(
        (item) => item.productId.toString() === id
      );

      if (productExists) {
        res.status(400);
        throw new Error("Product is already in the cart");
      }

      cart.product.push({
        productId: product._id,
        quantity: Number(quantity),
        colors: [...colors],
      });
    }

    await cart.save();

    res.status(200).json({ data: cart, message: "Product is added" });
  } catch (error) {
    console.log(`createCart Error ${error.message}`);
    next(error);
  }
});

export const getCart = asyncHandler(async (req, res, next) => {
  try {
    const cart = await Cart.find({ user: req.user._id }).populate("product");

    if (!cart) {
      res.status(200).json([]);
    }

    res.status(200).json(cart);
  } catch (error) {
    console.log(`getCart Error ${error.message}`);
    next(error);
  }
});

export const updateCartQuantity = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      res.status(404);
      throw new Error("Cart not found");
    }

    const product = cart.product.id(id);

    if (product) {
      product.quantity = quantity;
    } else {
      res.status(404);
      throw new Error("No such product found in the cart");
    }

    await cart.save();

    res.status(200).json({ data: cart, message: "Product quantity updated" });
  } catch (error) {
    console.log(`updateCartQuantity Error: ${error.message}`);
    next(error);
  }
});

export const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.product = cart.product.filter((prod) => prod.toString() !== productId);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error(`Error in removeFromCart: ${error.message}`);
    next(error);
  }
};

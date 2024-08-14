import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

export const createProduct = asyncHandler(async (req, res, next) => {
  try {
    const {
      title,
      price,
      image,
      description,
      colors,
      featured,
      shipping,
      company,
    } = req.body;

    if (!req.body) {
      res.status(400);
      throw new Error("Please fill the inputs correctly");
    }

    const newProduct = await Product.create({
      title,
      price,
      description,
      image,
      featured,
      shipping,
      company,
      colors: [...colors],
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.log(`createProduct Error ${error.message}`);
    next(error);
  }
});

export const topProducts = asyncHandler(async (req, res, next) => {
  req.query.limit = 2;
  req.query.sort = "-price";
  next();
});

export const getProduct = asyncHandler(async (req, res, next) => {
  try {
    const product = await Product.find({})
      .sort(req.query.sort)
      .limit(parseInt(req.query.limit));

    if (!product || product.length === 0) {
      res.status(200).json([]);
    }

    res.status(200).json(product);
  } catch (error) {
    console.log(`getProduct Error ${error.message}`);
    next(error);
  }
});

export const getProductById = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      res.status(404);
      throw new Error("No such product found");
    }

    res.status(200).json(product);
  } catch (error) {
    console.log(`getProductById Error ${error.message}`);
    next(error);
  }
});

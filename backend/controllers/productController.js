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
    const pageSize = parseInt(req.query.pageSize) || 10;
    const page = parseInt(req.query.page) || 1;

    let filters = {};

    if (req.query.search) {
      filters.name = { $regex: req.query.search, $options: "i" };
    }

    if (req.query.minPrice || req.query.maxPrice) {
      filters.price = {};
      if (req.query.minPrice) {
        filters.price.$gte = Number(req.query.minPrice);
      }
      if (req.query.maxPrice) {
        filters.price.$lte = Number(req.query.maxPrice);
      }
    }

    if (req.query.shipping) {
      filters.shipping = req.query.shipping === "true";
    }

    let sort = {};
    if (req.query.sort === "name-asc") {
      sort.name = 1;
    } else if (req.query.sort === "name-desc") {
      sort.name = -1;
    } else if (req.query.sort) {
      sort[req.query.sort] = 1;
    }

    const count = await Product.countDocuments(filters);

    const products = await Product.find(filters)
      .sort(sort)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    if (!products || products.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      totalProducts: count,
    });
  } catch (error) {
    console.log(`getProduct Error: ${error.message}`);
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

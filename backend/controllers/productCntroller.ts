import express from "express";
import asyncHandler from "express-async-handler";
import Product, { ProductType, ReviewType } from "../models/productModel";

export type KeywordType =
  | {
      name: {
        $regex: string;
        $option: string;
      };
    }
  | {};

// @desc Fetch all procuts
// @route Get /api/products
// @access Public
const getProducts = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const pageSize = 8;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
      ? ({
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        } as KeywordType)
      : ({} as KeywordType);

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  }
);

// @desc Fetch single procut
// @route GET /api/products/:id
// @access Public
const getProductByID = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product Not Found");
    }
  }
);

// @desc Delete a procut
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.remove();
      res.json({ message: "Product removed" });
    } else {
      res.status(404);
      throw new Error("Product Not Found");
    }
  }
);

// @desc Create a procut
// @route POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const product = new Product({
      name: "Sample name",
      price: 0,
      user: req.user._id,
      image: "/images/sample.jpg",
      brand: "Sample brand",
      category: "Sample category",
      countInStock: 0,
      numReviews: 0,
      description: "Sample description",
      rating: 0,
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  }
);

// @desc Update a procut
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const { name, price, description, image, brand, category, countInStock } =
      req.body as Pick<
        ProductType,
        | "name"
        | "price"
        | "description"
        | "image"
        | "brand"
        | "category"
        | "countInStock"
      >;

    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  }
);

// @desc Create a new review
// @route POST /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const { rating, comment } = req.body as Pick<
      ReviewType,
      "rating" | "comment"
    >;

    const product = await Product.findById(req.params.id);
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r: ReviewType) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(404);
        throw new Error("Product already reviewed");
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment: comment,
        user: req.user._id,
      } as ReviewType;

      product.reviews.push(review);

      product.numReviews = product.review?.length ?? 1;

      product.rating = product.reviews.reduce(
        (acc: number, item: ReviewType) =>
          item.rating + acc / product.reviews.length,
        0
      );

      await product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  }
);

// @desc Get top rated
// @route GET /api/products/top
// @access Public
const getTopProducts = asyncHandler(async ({}, res: express.Response) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

export {
  getProducts,
  getProductByID,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
};

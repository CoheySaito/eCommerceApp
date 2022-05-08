import mongoose from "mongoose";

export type ReviewType = {
  name: string;
  rating: number;
  comment: number;
  user: mongoose.Schema.Types.ObjectId | string;
};

export type ProductType = {
  _id: mongoose.Schema.Types.ObjectId | string;
  name: string;
  price: number;
  description: string;
  image: string;
  brand: string;
  category: string;
  countInStock: number;
  reviews: ReviewType;
  numReviews: number;
  createdAt: string;
  updatedAt: string;
};

type ReviewDoc = ReviewType & Document;

type ProductDoc = ProductType & Document;

const reviewSchema = new mongoose.Schema<ReviewDoc>(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const productModel = new mongoose.Schema<ProductDoc>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      defalt: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      defalt: 0,
    },
    price: {
      type: Number,
      required: true,
      defalt: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      defalt: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productModel);

export default Product;

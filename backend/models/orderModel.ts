import mongoose from "mongoose";

export type CartPayloadType = {
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
};

export type shippingDataType = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

export type OrderType = {
  orderItems: CartPayloadType[];
  shippingAddress: shippingDataType;
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
};

export type CreatedOrderDoc = OrderType & {
  user: mongoose.Schema.Types.ObjectId | string;
  _id: mongoose.Schema.Types.ObjectId | string;
  email: string;
  isPaid: boolean;
  paidAt: string;
  isDeliverd: boolean;
  deliverdAt: string;
} & Document;

const opderModel = new mongoose.Schema<CreatedOrderDoc>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: { type: String, requied: true },
        qty: { type: Number, requied: true },
        image: { type: String, requied: true },
        price: { type: Number, requied: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          requied: true,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDeliverd: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliverdAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", opderModel);

export default Order;

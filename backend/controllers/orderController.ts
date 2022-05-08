import express from "express";
import asyncHandler from "express-async-handler";
import Order from "../models/orderModel";

type CartPayloadType = {
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
};

type shippingDataType = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

type OrderType = {
  orderItems: CartPayloadType[];
  shippingAddress: shippingDataType;
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
};

// @desc Create all procuts
// @route Post /api/orders
// @access Private
const addOrderitems = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body as OrderType;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items");
      return;
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();

      res.status(201).json(createdOrder);
    }
  }
);

// @desc Get Order by ID
// @route GET /api/orders/:id
// @access Private
const getOrderByID = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    //populate refを解決　joinのようなもの
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  }
);

// @desc Update order to paid
// @route PUT /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };

      const updatedOrder = await order.save();

      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  }
);

// @desc Update order to deliverd
// @route PUT /api/orders/:id/deliver
// @access Private/Admin
const updateOrderToDeliverd = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDeliverd = true;
      order.deliverdAt = Date.now();

      const updatedOrder = await order.save();

      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  }
);

// @desc Get logged in user orders
// @route GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  }
);

// @desc Get all orders
// @route GET /api/orders
// @access Private/Admin
const getOrders = asyncHandler(async ({}, res: express.Response) => {
  const orders = await Order.find().populate("user", "id name");
  res.json(orders);
});

export {
  addOrderitems,
  getOrderByID,
  updateOrderToPaid,
  updateOrderToDeliverd,
  getMyOrders,
  getOrders,
};

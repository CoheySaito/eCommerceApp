import express from "express";
import {
  addOrderitems,
  getMyOrders,
  getOrderByID,
  getOrders,
  updateOrderToDeliverd,
  updateOrderToPaid,
} from "../controllers/orderController";
import { admin, protect } from "../middleware/atuthMiddleware";

const router = express.Router();

router.route("/").post(protect, addOrderitems).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderByID);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDeliverd);

export default router;

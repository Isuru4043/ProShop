const express = require("express");

console.log("test-OR-1");
const router = express.Router();
console.log("test-OR-2");
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} = require("../controllers/orderController.js");

console.log("test-OR-3");

const { protect, admin } = require("../middleware/authMiddleware.js");
console.log("test-OR-4");

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/mine").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);
console.log("test-OR-5");

module.exports = router;

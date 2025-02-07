const express = require("express");
const router = express.Router();
const {
  getProducts,
  getproductById,
  createProduct,
  updateProduct,
} = require("../controllers/productController");

const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id").get(getproductById).put(protect, admin, updateProduct);

module.exports = router;

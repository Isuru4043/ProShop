const express = require("express");
const router = express.Router();
const {
  getProducts,
  getproductById,
} = require("../controllers/productController");
router.route("/").get(getProducts);
router.route("/:id").get(getproductById);

module.exports = router;

import express from "express";
const router = express.Router();
import {
  getProducts,
  getproductById,
  createProduct,
  updateProduct,
  getTopProducts,
} from "../controllers/productController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.get("/top", getTopProducts);
router.route("/:id").get(getproductById).put(protect, admin, updateProduct);

export default router;

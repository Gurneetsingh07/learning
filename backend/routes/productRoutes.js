import express from "express";
import { getAllProducts, addNewProduct, getSearchedProducts, updateProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/addProducts", addNewProduct);
router.get("/search", getSearchedProducts)
router.patch("/:id", updateProduct)

export default router;

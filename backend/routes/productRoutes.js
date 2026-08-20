import express from "express";
import { getAllProducts, addNewProduct, getSearchedProducts, updateProduct } from "../controllers/productController.js";
import authMiddleware ,{authorizeRoles} from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", getAllProducts);
router.post("/addProducts",authMiddleware,authorizeRoles("admin"), addNewProduct);
router.get("/search", getSearchedProducts)
router.patch("/:id",authMiddleware,authorizeRoles("admin"), updateProduct)

export default router;

import express from "express";
import { signup, login, logout, addtocart } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js"
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/cart", authMiddleware, addtocart);
export default router;
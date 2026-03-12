import express from "express";
import { addToCart, getCartProducts, removeAllFromCart, updateQuantity } from "../controllers/cartController.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();
// Route: Add item to the cart 
router.post("/", protectRoute, addToCart);

// Route: Get the cart for the logged-in user
router.get("/", protectRoute, getCartProducts);

// Route: Remove an item from the cart
router.delete("/", protectRoute, removeAllFromCart);
router.put("/:id", protectRoute, updateQuantity);

export default router;

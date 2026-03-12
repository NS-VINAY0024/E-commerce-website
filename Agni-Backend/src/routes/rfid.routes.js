import express from "express";
import { addItemFromRFID, getCartProducts } from "../controllers/cartController.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/add", protectRoute, addItemFromRFID);
router.get("/", protectRoute, getCartProducts);

export default router;

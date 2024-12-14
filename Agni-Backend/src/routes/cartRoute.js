const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authenticateToken = require("../middlewares/authmiddleware"); // Ensure user is authenticated

// Route: Add item to the cart (from RFID or frontend)
router.post("/add", authenticateToken, async (req, res) => {
    try {
        await cartController.addItemFromRFID(req, res);
    } catch (error) {
        console.error("Error in addItemFromRFID route:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
});

// Route: Get the cart for the logged-in user
router.get("/", authenticateToken, async (req, res) => {
    try {
        await cartController.getCart(req, res);
    } catch (error) {
        console.error("Error in getCart route:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
});

// Route: Remove an item from the cart
router.delete("/items/:productId", authenticateToken, async (req, res) => {
    try {
        await cartController.removeItem(req, res);
    } catch (error) {
        console.error("Error in removeItem route:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
});

module.exports = router;

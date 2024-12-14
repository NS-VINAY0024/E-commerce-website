const Cart = require("../models/Cart"); // Import the Cart model

// Add item to the cart (RFID-based or frontend request)
exports.addItemFromRFID = async (req, res) => {
    const { uid, name, price } = req.body; // Data from RFID scanner
    const userId = req.user?.id; // User ID from the token (check if it's set)

    // Log to check if userId is correctly set
    console.log("Authenticated userId:", userId);

    try {
        // Ensure all required fields are provided
        if (!uid || !name || !price) {
            return res.status(400).json({ success: false, message: "Invalid data provided." });
        }

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is missing." });
        }

        // Find or create a cart for the user
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        // Check if the item already exists in the cart
        const itemIndex = cart.items.findIndex((item) => item.productId === uid);

        if (itemIndex > -1) {
            // If the item exists, increment the quantity
            cart.items[itemIndex].quantity += 1;
        } else {
            // Add new item to the cart
            cart.items.push({ productId: uid, name, price, quantity: 1 });
        }

        // Save the updated cart
        await cart.save();

        return res.status(200).json({ success: true, message: "Item added to cart successfully.", cart });
    } catch (error) {
        console.error("Error adding item to cart:", error);
        return res.status(500).json({ success: false, message: "Failed to add item to the cart.", error });
    }
};


// Fetch the cart for the logged-in user
exports.getCart = async (req, res) => {
    const userId = req.user.id; // Assume user is authenticated via a token

    try {
        // Fetch the user's cart
        const cart = await Cart.findOne({ userId });

        if (!cart || cart.items.length === 0) {
            return res.status(404).json({ success: false, message: "Cart is empty or not found." });
        }

        return res.status(200).json({ success: true, cart });
    } catch (error) {
        console.error("Error fetching cart:", error);
        return res.status(500).json({ success: false, message: "Failed to fetch cart.", error });
    }
};

// Remove item from the cart
exports.removeItem = async (req, res) => {
    const userId = req.user.id; // Assume user is authenticated via a token
    const { productId } = req.params; // Item ID to be removed

    try {
        // Fetch the user's cart
        const cart = await Cart.findOne({ userId });

        if (!cart || cart.items.length === 0) {
            return res.status(404).json({ success: false, message: "Cart is empty or not found." });
        }

        // Filter out the item to be removed
        const updatedItems = cart.items.filter((item) => item.productId !== productId);

        if (updatedItems.length === cart.items.length) {
            return res.status(404).json({ success: false, message: "Item not found in the cart." });
        }

        cart.items = updatedItems;

        // Save the updated cart
        await cart.save();

        return res.status(200).json({ success: true, message: "Item removed successfully.", cart });
    } catch (error) {
        console.error("Error removing item from cart:", error);
        return res.status(500).json({ success: false, message: "Failed to remove item from the cart.", error });
    }
};

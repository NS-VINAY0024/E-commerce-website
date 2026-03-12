import Cart from '../models/cart.model.js';
// Add item to the cart (RFID-based or frontend request)
export const addItemFromRFID = async (req, res) => {
    const { uid, name, price } = req.body;
    const userId = req.user?._id;
    try {
        if (!uid || !name || !price) {
            return res.status(400).json({ success: false, message: "Invalid data provided." });
        }

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is missing." });
        }

        // Find or create a cart for the user
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, items: [], rfidItems: [] });
        }

        // Check if the RFID item exists
        const itemIndex = cart.rfidItems.findIndex((item) => item.productId === uid);

        if (itemIndex > -1) {
            cart.rfidItems[itemIndex].quantity += 1; // Increase quantity if item exists
        } else {
            cart.rfidItems.push({ productId: uid, name, price, quantity: 1 });
        }

        // Save updated cart
        await cart.save();

        return res.status(200).json({ success: true, message: "RFID item added to cart successfully.", cart });
    } catch (error) {
        console.error("Error adding RFID item to cart:", error);
        return res.status(500).json({ success: false, message: "Failed to add item to cart.", error });
    }
};


export const addToCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user._id;

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        const existingItem = cart.items.find((item) => item.product.toString() === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.items.push({ product: productId, quantity: 1 });
        }

        await cart.save();
        res.json(cart.items);
    } catch (error) {
        console.log("Error in addToCart controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Fetch the cart for the logged-in user
export const getCartProducts = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id })
            .populate("items.product")
            .lean();

        if (!cart) {
            return res.json({
                cartItems: [],
                rfidItems: [],
            });
        }

        res.json({
            cartItems: (cart.items || [])
                .filter((item) => item.product)
                .map((item) => ({
                ...item.product,
                quantity: item.quantity,
            })),
            rfidItems: cart.rfidItems || [],
        });
    } catch (error) {
        console.log("Error in getCartProducts controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// Remove item from the cart
export const removeAllFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user._id;

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        if (!productId) {
            cart.items = [];
        } else {
            cart.items = cart.items.filter((item) => item.product.toString() !== productId);
        }

        await cart.save();
        res.json(cart.items);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const updateQuantity = async (req, res) => {
    try {
        const { id: productId } = req.params;
        const quantity = Number(req.body.quantity);
        const userId = req.user._id;

        if (!Number.isInteger(quantity) || quantity < 0) {
            return res.status(400).json({ message: "Quantity must be a non-negative integer" });
        }

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const existingItem = cart.items.find((item) => item.product.toString() === productId);

        if (existingItem) {
            if (quantity === 0) {
                cart.items = cart.items.filter((item) => item.product.toString() !== productId);
            } else {
                existingItem.quantity = quantity;
            }

            await cart.save();
            res.json(cart.items);
        } else {
            res.status(404).json({ message: "Product not found in cart" });
        }
    } catch (error) {
        console.log("Error in updateQuantity controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

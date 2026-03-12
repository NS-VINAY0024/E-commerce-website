import mongoose from "mongoose";

// Define schema for cart items
const cartItemRFIDSchema = new mongoose.Schema({
    productId: {
        type: String, // UID from RFID or frontend
        required: true
    },
    name: {
        type: String, // Product name from RFID or frontend
        required: true
    },
    price: {
        type: Number, // Price passed from RFID or frontend
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1 // Default quantity to 1 when item is added
    }
});

// Define schema for the cart itself
const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
        min: 1,
    },
});

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        items: [cartItemSchema],
        rfidItems: [cartItemRFIDSchema],
    },
    { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;

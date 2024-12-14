const mongoose = require("mongoose");

// Define schema for cart items
const cartItemSchema = new mongoose.Schema({
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
const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true
    },
    items: [cartItemSchema] // Array of cart items
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

// Ensure that cart items are correctly added or updated before saving
cartSchema.pre("save", function (next) {
    this.items.forEach(item => {
        // Ensure price is always a number (in case of validation issues from frontend)
        if (typeof item.price !== "number") {
            item.price = parseFloat(item.price);
        }
    });
    next();
});

module.exports = mongoose.model("Cart", cartSchema);

// services/cartservice.js
import axios from "axios";

// Set up the base URL for your API
const apiUrl = "http://localhost:5000/api/cart"; // Update this to match your backend URL

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
    baseURL: apiUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

// Utility function to get the user's cart
export const getCart = async () => {
    try {
        const response = await axiosInstance.get("/");
        return response.data; // Assuming your API returns { success: true, cart: {...} }
    } catch (err) {
        throw new Error(err.response ? err.response.data.message : "Failed to fetch cart");
    }
};

// Utility function to add an item to the cart
export const addItem = async (item) => {
    try {
        const response = await axiosInstance.post("/add", item);
        return response.data; // Assuming your API returns { success: true, cart: {...} }
    } catch (err) {
        throw new Error(err.response ? err.response.data.message : "Failed to add item to cart");
    }
};

// Utility function to remove an item from the cart
export const removeItem = async (itemId) => {
    try {
        const response = await axiosInstance.delete(`/remove/${itemId}`);
        return response.data; // Assuming your API returns { success: true, cart: {...} }
    } catch (err) {
        throw new Error(err.response ? err.response.data.message : "Failed to remove item from cart");
    }
};

// Export the functions
export default {
    getCart,
    addItem,
    removeItem,
};

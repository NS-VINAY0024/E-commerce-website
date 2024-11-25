// api.jsx
const BASE_URL = process.env.REACT_APP_API_URL;


const handleResponse = async (response) => {
    const text = await response.text(); // Get raw response text

    if (!response.ok) {
        console.error(`Error fetching data: ${text}`); // Corrected
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    try {
        return JSON.parse(text); // Try to parse the text as JSON
    } catch (error) {
        console.error("Failed to parse JSON:", text); // Log if JSON parsing fails
        throw new Error("Response is not valid JSON");
    }
};

export const api = {
    get: async (endpoint) => {
        const response = await fetch(`${BASE_URL}${endpoint}`);
        return handleResponse(response);
    },
    post: async (endpoint, data) => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },
};

export const fetchSmartCartData = async () => {
    try {
        return await api.get("/api/smartcart");
    } catch (error) {
        console.error("Failed to fetch smart cart data:", error);
        throw error;
    }
};

export const processPayment = async (items) => {
    try {
        return await api.post("/api/payment", { items });
    } catch (error) {
        console.error("Payment processing failed:", error);
        throw error;
    }
};

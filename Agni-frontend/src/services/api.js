// api.jsx
const BASE_URL = process.env.REACT_APP_API_URL;


const handleResponse = async (response) => {
    const text = await response.text(); // Get raw response text

    if (!response.ok) {
        console.error(`Error fetching data: ${text}`); // Log the error response
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

// Fetch data for the smart cart
export const fetchSmartCartData = async () => {
    return await api.get("/api/smartcart");
};

// Process payment
export const processPayment = async (items) => {
    return await api.post("/api/payment", { items });
};

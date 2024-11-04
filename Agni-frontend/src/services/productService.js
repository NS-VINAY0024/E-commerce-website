import { api } from './api';

export const productService = {
    getAll: async () => {
        try {
            return await api.get('../pages/Products');
        } catch (error) {
            console.error("Failed to fetch products:", error);
            throw error; // Rethrow the error for further handling
        }
    },
    getById: async (id) => {
        try {
            return await api.get(`../pages/Products/${id}`);
        } catch (error) {
            console.error(`Failed to fetch product with ID ${id}:`, error);
            throw error;
        }
    },
    /*
    getByCategory: async (categoryId) => {
        try {
            return await api.get(`/products/category/${categoryId}`);
        } catch (error) {
            console.error(`Failed to fetch products for category ${categoryId}:`, error);
            throw error;
        }
    },
    */
};

import { api } from './api';

export const productService = {
    getAll: () => api.get('/products'),
    getById: (id) => api.get(`/products/${id}`),
    getByCategory: (categoryId) => api.get(`/products/category/${categoryId}`)
};
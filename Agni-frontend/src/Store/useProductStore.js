import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useProductStore = create((set) => ({
	products: [],
	loading: false,
	error: null,

	setProducts: (products) => set({ products }),
	createProduct: async (productData) => {
		set({ loading: true, error: null });
		try {
			const res = await axios.post("/product", productData);
			set((prevState) => ({
				products: [...prevState.products, res.data],
				loading: false,
			}));
		} catch (error) {
			const message = error.response?.data?.error || error.response?.data?.message || "Failed to create product";
			toast.error(message);
			set({ loading: false, error: message });
		}
	},
	fetchAllProducts: async () => {
		set({ loading: true, error: null });
		try {
			const response = await axios.get("/product");
			set({ products: response.data.products, loading: false });
		} catch (error) {
			const message = error.response?.data?.error || error.response?.data?.message || "Failed to fetch products";
			set({ error: message, loading: false });
			toast.error(message);
		}
	},
	fetchProductsByCategory: async (category) => {
		set({ loading: true, error: null });
		try {
			const response = await axios.get(`/product/category/${category}`);
			set({ products: response.data.products, loading: false });
		} catch (error) {
			const message = error.response?.data?.error || error.response?.data?.message || "Failed to fetch products";
			set({ error: message, loading: false });
			toast.error(message);
		}
	},
	deleteProduct: async (productId) => {
		set({ loading: true });
		try {
			await axios.delete(`/product/${productId}`);
			set((prevProducts) => ({
				products: prevProducts.products.filter((product) => product._id !== productId),
				loading: false,
			}));
		} catch (error) {
			const message = error.response?.data?.error || error.response?.data?.message || "Failed to delete product";
			set({ loading: false, error: message });
			toast.error(message);
		}
	},
	toggleFeaturedProduct: async (productId) => {
		set({ loading: true });
		try {
			const response = await axios.patch(`/product/${productId}`);
			// this will update the isFeatured prop of the product
			set((prevProducts) => ({
				products: prevProducts.products.map((product) =>
					product._id === productId ? { ...product, isFeatured: response.data.isFeatured } : product
				),
				loading: false,
			}));
		} catch (error) {
			const message = error.response?.data?.error || error.response?.data?.message || "Failed to update product";
			set({ loading: false, error: message });
			toast.error(message);
		}
	},
	fetchFeaturedProducts: async () => {
		set({ loading: true, error: null });
		try {
			const response = await axios.get("/product/featured");
			set({ products: response.data, loading: false });
		} catch (error) {
			const message = error.response?.data?.message || "Failed to fetch featured products";
			set({ error: message, loading: false, products: [] });
		}
	},
}));

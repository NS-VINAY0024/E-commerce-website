import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export const useCart = () => {
  const { state, dispatch } = useContext(CartContext);
  if (!state || !dispatch) {
    throw new Error("useCart must be used within CartProvider");
  }

  const addToCart = (item) => dispatch({ type: "ADD_TO_CART", payload: item });
  const removeFromCart = (itemId) => dispatch({ type: "REMOVE_FROM_CART", payload: itemId });

  // Additional selectors for convenience
  const cartItems = state.items || [];
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return { state, cartItems, cartTotal, addToCart, removeFromCart };
};

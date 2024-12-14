import React, { createContext, useReducer, useContext, useEffect } from "react";
import cartService from "../services/cartservice"; // Import cart service for backend interactions

// Define initial state for the cart
const initialState = {
  items: [],
  total: 0,
  finalBill: [],
  loading: false,
  error: null,
};

// Create the CartContext
export const CartContext = createContext(initialState);

// Define the cart reducer
export const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      const total = action.payload.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      return {
        ...state,
        items: action.payload,
        total,
        loading: false,
        error: null,
      };

    case "ADD_TO_CART":
    case "REMOVE_FROM_CART":
      return { ...state, loading: true }; // Simplified for both add/remove actions

    case "CART_OPERATION_SUCCESS":
      const updatedTotal = action.payload.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      return {
        ...state,
        items: action.payload,
        total: updatedTotal,
        loading: false,
        error: null,
      };

    case "CART_OPERATION_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "CLEAR_CART":
      return initialState;

    case "SET_FINAL_BILL":
      return { ...state, finalBill: action.payload };

    default:
      return state;
  }
};

// Create the CartProvider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Fetch the cart from the backend when the component mounts or when the user is authenticated
  useEffect(() => {
    if (state.items.length === 0) {
      fetchCart();
    }
  }, [state.items]);

  // Fetch cart items from backend
  const fetchCart = async () => {
    try {
      dispatch({ type: "ADD_TO_CART" });
      const { cart } = await cartService.getCart();
      dispatch({ type: "SET_CART", payload: cart.items });
    } catch (err) {
      dispatch({ type: "CART_OPERATION_FAILURE", payload: err.message });
    }
  };

  // Add an item to the cart
  const addToCart = async (item) => {
    try {
      dispatch({ type: "ADD_TO_CART" });
      const { cart } = await cartService.addItem(item);
      dispatch({ type: "CART_OPERATION_SUCCESS", payload: cart.items });
    } catch (err) {
      dispatch({ type: "CART_OPERATION_FAILURE", payload: err.message });
    }
  };

  // Remove an item from the cart
  const removeFromCart = async (itemId) => {
    try {
      dispatch({ type: "REMOVE_FROM_CART" });
      const { cart } = await cartService.removeItem(itemId);
      dispatch({ type: "CART_OPERATION_SUCCESS", payload: cart.items });
    } catch (err) {
      dispatch({ type: "CART_OPERATION_FAILURE", payload: err.message });
    }
  };

  // Clear the cart
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  // Set the final bill (useful for checkout operations)
  const setFinalBill = (items) => {
    dispatch({ type: "SET_FINAL_BILL", payload: items });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        fetchCart,
        addToCart,
        removeFromCart,
        clearCart,
        setFinalBill,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for using cart context
export const useCart = () => {
  return useContext(CartContext);
};

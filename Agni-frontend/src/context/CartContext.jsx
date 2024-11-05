import React, { createContext, useReducer, useContext } from "react";

// Define initial state for the cart
const initialState = {
  items: [],
  total: 0,
  finalBill: [], // State for final bill
};

// Create the CartContext
export const CartContext = createContext(initialState);

// Define the cart reducer
export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        items: [...state.items, action.payload],
        total: state.total + action.payload.price, // Update total
      };
    case "REMOVE_FROM_CART":
      const updatedItems = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      const updatedTotal = updatedItems.reduce(
        (acc, item) => acc + item.price,
        0
      );
      return {
        ...state,
        items: updatedItems,
        total: updatedTotal, // Update total
      };
    case "CLEAR_CART":
      return initialState; // Reset to initial state
    case "SET_FINAL_BILL": // New action to set final bill
      return {
        ...state,
        finalBill: action.payload, // Update final bill with the payload
      };
    default:
      return state; // Return current state if action type is unknown
  }
};

// Create the CartProvider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Add item to cart
  const addToCart = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  // Remove item from cart
  const removeFromCart = (item) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item });
  };

  // Clear the cart
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  // Set the final bill
  const setFinalBill = (items) => {
    dispatch({ type: "SET_FINAL_BILL", payload: items });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        clearCart,
        setFinalBill, // Expose setFinalBill to the context
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

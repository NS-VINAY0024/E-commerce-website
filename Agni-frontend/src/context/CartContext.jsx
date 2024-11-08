// CartContext.js
import React, { createContext, useReducer, useContext } from "react";

// Define initial state for the cart
const initialState = {
  items: [],
  total: 0,
  finalBill: [],
};

// Create the CartContext
export const CartContext = createContext(initialState);

// Define the cart reducer
export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const updatedItemsAdd = [...state.items, action.payload];
      const newTotalAdd = updatedItemsAdd.reduce(
        (acc, item) => acc + item.price,
        0
      );
      return {
        ...state,
        items: updatedItemsAdd,
        total: newTotalAdd,
      };
    case "REMOVE_FROM_CART":
      const updatedItemsRemove = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      const newTotalRemove = updatedItemsRemove.reduce(
        (acc, item) => acc + item.price,
        0
      );
      return {
        ...state,
        items: updatedItemsRemove,
        total: newTotalRemove,
      };
    case "CLEAR_CART":
      return initialState;
    case "SET_FINAL_BILL":
      return {
        ...state,
        finalBill: action.payload,
      };
    default:
      return state;
  }
};

// Create the CartProvider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  const removeFromCart = (item) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

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
        setFinalBill,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for using cart context
export const useCart = () => {
  const context = useContext(CartContext);
  return context; // Return the entire context, including state and functions
};

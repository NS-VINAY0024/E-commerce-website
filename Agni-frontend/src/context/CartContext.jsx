import React, { createContext, useReducer } from "react";

const initialState = {
  items: [],
  total: 0,
};

export const CartContext = createContext(initialState);

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        items: [...state.items, action.payload],
        total: state.total + action.payload.price,
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
        total: updatedTotal,
      };
    case "CLEAR_CART":
      return initialState; // Reset to initial state
    // Add other cases as needed
    default:
      return state;
  }
};

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

  return (
    <CartContext.Provider
      value={{ state, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

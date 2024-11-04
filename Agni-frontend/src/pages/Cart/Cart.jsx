// src/Cart/Cart.jsx
import React from "react";
import { useCart } from "../../hooks/useCart";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import CartEmpty from "./CartEmpty";

const Cart = () => {
  const { state } = useCart();

  if (state.items.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        {state.items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <CartSummary items={state.items} />
    </div>
  );
};

export default Cart;

// src/Cart/CartSummary.jsx
import React from "react";

const CartSummary = ({ items }) => {
  const total = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold">Summary</h2>
      <p className="text-lg">Total: ${total.toFixed(2)}</p>
      <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;

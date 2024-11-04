// src/Cart/CartEmpty.jsx
import React from "react";
import { Link } from "react-router-dom";

const CartEmpty = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <h2 className="text-lg font-bold">Your cart is empty</h2>
      <Link to="/items" className="text-blue-600 hover:underline mt-2">
        Browse items
      </Link>
    </div>
  );
};

export default CartEmpty;

import React from "react";
import { useNavigate } from "react-router-dom";

const CartSummary = ({ items }) => {
  const navigate = useNavigate();
  const total = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="mt-4 bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-lg font-bold mb-2">Cart Summary</h2>

      {/* Display itemized list of cart items */}
      <ul className="mb-4">
        {items.map((item, index) => (
          <li key={index} className="flex justify-between mb-2">
            <span>{item.name}</span>
            <span>${item.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>

      {/* Display total price */}
      <p className="text-lg font-semibold">Total: ${total.toFixed(2)}</p>

      {/* Proceed to Payment button */}
      <button
        onClick={() => navigate("/payment")}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default CartSummary;

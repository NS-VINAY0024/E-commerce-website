import React from "react";
import { useCart } from "../../hooks/useCart"; // Import the useCart hook

const CartItem = ({ item }) => {
  const { removeFromCart } = useCart(); // Use the custom hook to access cart functions

  return (
    <div className="flex justify-between items-center border-b py-2">
      <div className="flex-1">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-gray-600">${item.price}</p>
      </div>
      <button
        className="text-red-500 hover:text-red-700"
        onClick={() => removeFromCart(item)} // Call removeFromCart with the item
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;

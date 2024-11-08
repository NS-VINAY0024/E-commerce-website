// Cart.jsx
import React, { useEffect } from "react";
import { useCart } from "../../context/CartContext";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import CartEmpty from "./CartEmpty";
import { fetchSmartCartData } from "../../services/api";

const Cart = () => {
  const { state, addToCart, removeFromCart } = useCart();

  // Fetch smart cart data on load and on update
  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await fetchSmartCartData();
        items.forEach((item) => addToCart(item)); // Add each fetched item to the cart
      } catch (error) {
        console.error("Error fetching smart cart data:", error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 5000); // Poll every 5 seconds for updates
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [addToCart]);

  if (state.items.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      <div className="bg-white shadow-md rounded-lg p-4 grid grid-cols-2 gap-4">
        <div className="col-span-2 md:col-span-1">
          {state.items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              removeFromCart={removeFromCart}
            />
          ))}
        </div>
        <div className="col-span-2 md:col-span-1">
          <CartSummary items={state.items} total={state.total} />
        </div>
      </div>
    </div>
  );
};

export default Cart;

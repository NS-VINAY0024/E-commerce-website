import React, { useEffect } from "react";
import { useCart } from "../../hooks/useCart";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import CartEmpty from "./CartEmpty";
import { fetchSmartCartData } from "../../services/api"; // Import API function

const Cart = () => {
  const { state, setCartItems } = useCart(); // Ensure your hook can set items

  // Fetch smart cart data on load and on update
  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await fetchSmartCartData(); // Fetching data from smart cart
        setCartItems(items); // Update the cart with smart cart data
      } catch (error) {
        console.error("Error fetching smart cart data:", error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 5000); // Poll every 5 seconds for updates
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [setCartItems]);

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

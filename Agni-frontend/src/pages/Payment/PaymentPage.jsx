// src/pages/Payment/PaymentPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { processPayment } from "../../services/api"; // Import payment API
import CartSummary from "../Cart/CartSummary";

const PaymentPage = () => {
  const { state } = useCart();
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const navigate = useNavigate();

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await processPayment(state.items); // Send cart items for payment processing
      setPaymentStatus(
        response.success ? "Payment Successful" : "Payment Failed"
      );
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentStatus("Payment Failed");
    } finally {
      setLoading(false);
    }
  };

  // Redirect to FinalBillPage on successful payment
  useEffect(() => {
    if (paymentStatus === "Payment Successful") {
      navigate("/final-bill");
    }
  }, [paymentStatus, navigate]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Payment</h1>
      <CartSummary items={state.items} />
      {paymentStatus && <p className="mt-4 text-lg">{paymentStatus}</p>}
      <button
        onClick={handlePayment}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Processing..." : "Proceed to Pay"}
      </button>
    </div>
  );
};

export default PaymentPage;

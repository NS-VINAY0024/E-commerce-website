// src/pages/FinalBillPage.jsx
import React from "react";
import { jsPDF } from "jspdf";
import { useCart } from "../../hooks/useCart";

const FinalBillPage = () => {
  const { state } = useCart();

  // Calculate total
  const total = state.items.reduce((acc, item) => acc + item.price, 0);

  // Generate and download PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Final Bill", 10, 10);

    // Add items to PDF
    state.items.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.name} - $${item.price.toFixed(2)}`,
        10,
        20 + index * 10
      );
    });

    // Add total amount
    doc.text(`Total: $${total.toFixed(2)}`, 10, 30 + state.items.length * 10);

    // Save PDF
    doc.save("FinalBill.pdf");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Final Bill</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-bold mb-2">Purchased Items</h2>
        <ul>
          {state.items.map((item) => (
            <li key={item.id} className="mb-2">
              {item.name} - ${item.price.toFixed(2)}
            </li>
          ))}
        </ul>
        <p className="text-lg font-semibold mt-4">Total: ${total.toFixed(2)}</p>
      </div>
      <button
        onClick={handleDownloadPDF}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Download Bill as PDF
      </button>
    </div>
  );
};

export default FinalBillPage;

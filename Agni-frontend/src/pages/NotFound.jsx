// src/pages/NotFound.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center">
        {/* 404 Header */}
        <h1 className="text-9xl font-bold text-gray-300">404</h1>

        {/* Error Message */}
        <div className="mt-4 mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-3">
            Page Not Found
          </h2>
          <p className="text-gray-600">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors duration-200"
          >
            Go Back
          </button>

          <Link
            to="/"
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
          >
            Return Home
          </Link>
        </div>

        {/* Help Text */}
        <p className="mt-8 text-gray-600 text-sm">
          Need help?{" "}
          <a href="/contact" className="text-blue-600 hover:underline">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
};

export default NotFound;

// src/pages/NotFound.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = ({
  errorCode = "404",
  errorMessage = "Page Not Found",
  backButtonText = "Go Back",
  homeButtonText = "Return Home",
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-[100vh] bg-gray-700 flex items-center justify-center px-4"
      role="alert" // ARIA role for alert
      aria-labelledby="error-title" // Associate with the title
      aria-describedby="error-description" // Associate with the description
    >
      <div className="text-center">
        {/* Error Code */}
        <h1 id="error-title" className="text-9xl font-bold text-gray-400">
          {errorCode}
        </h1>

        {/* Error Message */}
        <div className="mt-4 mb-8" id="error-description">
          <h2 className="text-3xl font-semibold text-gray-800 mb-3">
            {errorMessage}
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
            {backButtonText}
          </button>

          <Link
            to="/"
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
          >
            {homeButtonText}
          </Link>
        </div>

        {/* Help Text */}
        <p className="mt-8 text-gray-600 text-sm">
          Need help?{" "}
          <Link to="/contact" className="text-blue-600 hover:underline">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;

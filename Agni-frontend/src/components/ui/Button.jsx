import React from "react";

const Button = ({
  type = "button",
  onClick,
  disabled = false,
  className,
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-purple-600 text-white py-2 rounded w-full transition duration-300 hover:bg-blue-500 ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;

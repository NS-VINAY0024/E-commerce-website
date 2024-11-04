import React from "react";

const Input = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  className,
}) => {
  return (
    <div className={`relative mb-6 ${className}`}>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full p-2 border-b-2 border-gray-300 focus:border-purple-600 outline-none"
      />
    </div>
  );
};

export default Input;

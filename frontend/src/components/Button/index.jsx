import React from 'react'

const Button = ({ children, color = "indigo", onClick, className = "", ...props }) => {
  const base =
    "px-4 py-2 rounded shadow text-white text-base font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ";
  const colorClass =
    color === "indigo"
      ? "bg-indigo-500 hover:bg-indigo-600 focus:ring-indigo-500"
      : color === "red"
      ? "bg-red-500 hover:bg-red-600 focus:ring-red-500"
      : color === "gray"
      ? "bg-gray-500 hover:bg-gray-600 focus:ring-gray-500"
      : "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500";

  return (
    <button
      className={`${base} ${colorClass} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
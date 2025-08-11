import type { ReactNode } from "react";

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

function Button({
  onClick,
  children,
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md transition-colors duration-200 ${
        disabled
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-blue-600 text-white hover:bg-blue-700"
      } ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;

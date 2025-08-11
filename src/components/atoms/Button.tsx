import type { ReactNode } from "react";
import { icons } from "lucide-react";

type IconName = keyof typeof icons;

interface ButtonProps {
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  iconName?: IconName;
  iconSize?: number;
  iconPosition?: "left" | "right";
}

function Button({
  onClick,
  children,
  className = "",
  type = "button",
  disabled = false,
  iconName,
  iconSize = 16,
  iconPosition = "left",
}: ButtonProps) {
  const IconComponent = iconName ? icons[iconName] : null;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-2 ${
        disabled
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-blue-600 text-white hover:bg-blue-700"
      } ${className}`}
    >
      {IconComponent && iconPosition === "left" && (
        <IconComponent size={iconSize} />
      )}
      {children}
      {IconComponent && iconPosition === "right" && (
        <IconComponent size={iconSize} />
      )}
    </button>
  );
}

export default Button;

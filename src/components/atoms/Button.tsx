import type { ReactNode } from "react";
import { icons } from "lucide-react";

type IconName = keyof typeof icons;

type ButtonVariant = "primary" | "secondary";

interface ButtonProps {
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: ButtonVariant;
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
  variant = "primary",
  iconName,
  iconSize = 16,
  iconPosition = "left",
}: ButtonProps) {
  const IconComponent = iconName ? icons[iconName] : null;

  // Build base classes
  const baseClasses =
    "px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-2 cursor-pointer";

  // Build color classes and styles
  const getButtonStyles = () => {
    if (disabled) {
      return {
        className: "bg-gray-300 text-gray-500 cursor-not-allowed",
        style: {},
      };
    }

    switch (variant) {
      case "primary":
        return {
          className: "text-white hover:opacity-90 transition-opacity",
          style: {
            backgroundColor: "var(--color-primary)",
          },
        };
      case "secondary":
        return {
          className: "text-white hover:opacity-90 transition-opacity",
          style: {
            backgroundColor: "var(--color-secondary)",
          },
        };
      default:
        return {
          className: "bg-blue-600 text-white hover:bg-blue-700",
        };
    }
  };

  const { className: colorClasses, style: buttonStyle } = getButtonStyles();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${colorClasses} ${className}`}
      style={buttonStyle}
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

import React from "react";
import { Button } from "react-bootstrap";

interface ButtonProps {
  text?: string;
  icon?: React.ReactNode;
  variant?: string;
  size?: "sm" | "lg";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  color?: string;
  backgroudColor?: string;
  style?: object;
  type?: "button" | "submit" | "reset";
}

const ButtonComponent: React.FC<ButtonProps> = ({
  text,
  icon,
  variant = "primary",
  size,
  onClick,
  disabled = false,
  className = "",
  color,
  backgroudColor,
  style,
  type
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{ backgroundColor: backgroudColor, color: color, ...style }}
      type={type}
    >
      {icon && <span className="me-2" >{icon}</span>}
      {text}
    </Button>
  );
};

export default ButtonComponent;

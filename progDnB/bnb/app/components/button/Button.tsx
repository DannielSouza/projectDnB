"use client";

import React from "react";
import { IconType } from "react-icons/lib";

interface ButtonProps {
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative
  disabled:opacity-70
  disabled:cursor-not-allowed
  rounded-lg
  hover:opacity-80
  transition
  w-full
  ${disabled && "opacity-75"}
  ${disabled && "!border-gray-600"}
  ${outline ? "bg-white" : "bg-[#159a9c]"}
  ${outline ? "border-black" : "border-[#159a9c]"}
  ${outline ? "text-black" : "text-white"}
  ${small ? "py-1" : "py-3"}
  ${small ? "text-sm" : "text-md"}
  ${small ? "font-light" : "font-semibold"}
  ${small ? "border-[1px]" : "border-2"}
  `}
    >
      {Icon ? <Icon size={24} className="absolute left-3 top-3" /> : null}
      {label}
    </button>
  );
};

export default Button;

import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary";
}

export default function Button({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  className = "",
  type = "button",
  ...rest
}: ButtonProps) {
  const variantStyle =
    {
      primary: "bg-primary hover:bg-[#8628da] text-white py-2 px-4",
      secondary: "py-3 px-6 bg-gray-300 text-gray-500 cursor-not-allowed",
      tertiary: "bg-[linear-gradient(45deg,#9013FE,#FF8687)] text-white py-2 px-4  text-sm"
    }[variant];

  return (
    <button
      type={type}
      className={` rounded-full font-semibold gap-2 text-center text-[14px] transition-all duration-200 flex items-center justify-center ${variantStyle} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}

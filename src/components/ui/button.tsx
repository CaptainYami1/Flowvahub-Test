import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "tertiary" | "disabled";
  disabled?: boolean;
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
  const effectiveVariant = disabled ? "disabled" : variant;
  const variantStyle = {
    primary:
      "bg-primary hover:bg-[#8628da] text-white py-2 px-4 hover:shadow-[0_4px_12px_rgba(144,19,254,0.2)] hover:-translate-y-0.5",
    tertiary:
      "bg-[linear-gradient(45deg,#9013FE,#FF8687)] text-white py-2 px-4  text-sm",
    disabled: "bg-gray-300 text-gray-500 cursor-not-not-allowed py-2 px-4",
  }[effectiveVariant];

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

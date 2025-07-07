import React from "react";

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  className = "",
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-gradient-to-r from-violet-600/20 to-purple-600/20 border-violet-500/30 hover:from-violet-500/30 hover:to-purple-500/30 hover:border-violet-400/50 text-white";
      case "secondary":
        return "bg-gradient-to-r from-slate-600/20 to-slate-700/20 border-slate-500/30 hover:from-slate-500/30 hover:to-slate-600/30 hover:border-slate-400/50 text-gray-300 hover:text-white";
      case "danger":
        return "bg-gradient-to-r from-red-600/20 to-red-700/20 border-red-500/30 hover:from-red-500/30 hover:to-red-600/30 hover:border-red-400/50 text-red-300 hover:text-white";
      default:
        return "bg-gradient-to-r from-violet-600/20 to-purple-600/20 border-violet-500/30 hover:from-violet-500/30 hover:to-purple-500/30 hover:border-violet-400/50 text-white";
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative overflow-hidden px-6 py-3 rounded-xl font-semibold
        backdrop-blur-xl border transition-all duration-300 ease-out
        transform hover:scale-102 hover:shadow-sm
        before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/5 before:to-transparent
        before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700
        after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent
        after:translate-x-[-100%] hover:after:translate-x-[100%] after:transition-transform after:duration-1000 after:delay-200
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none
        ${getVariantClasses()}
        ${className}
      `}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};

export default AnimatedButton;

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = "glass-noise inline-flex items-center justify-center font-bold tracking-wide rounded-full transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]";

  const variants = {
    // Liquid Glass Primary: frosted white with deeper blur
    primary: "bg-white/10 backdrop-blur-2xl border border-white/30 text-white shadow-[0_8px_32px_0_rgba(255,255,255,0.1),inset_0_0_8px_rgba(255,255,255,0.2)] hover:bg-white/20 hover:shadow-[0_8px_32px_0_rgba(255,255,255,0.3),inset_0_0_12px_rgba(255,255,255,0.4)] hover:border-white/50",

    // Liquid Glass Secondary: more transparent dark glass
    secondary: "bg-black/20 backdrop-blur-xl border border-white/10 text-white hover:border-white/30 hover:bg-black/40 shadow-xl",

    // Liquid Glass Outline: thin border with specular highlight
    outline: "bg-white/5 backdrop-blur-md border border-white/20 text-white hover:bg-white/15 hover:border-white/60 shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]",

    // Liquid Glass Danger: subtle red tint with glow
    danger: "bg-red-500/10 backdrop-blur-md border border-red-500/20 text-red-100 hover:bg-red-500/30 hover:border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.15)]",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs uppercase",
    md: "px-6 py-3 text-sm uppercase",
    lg: "px-8 py-4 text-base uppercase",
    xl: "px-12 py-5 text-lg uppercase tracking-[0.2em]",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
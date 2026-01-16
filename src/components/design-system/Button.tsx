import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  type = 'button',
  disabled = false,
  fullWidth = false,
  icon
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-[#016cb7] text-white hover:bg-[#006cb7] active:bg-[#005a9e]',
    secondary: 'bg-[#a6c8ff] text-[#016cb7] hover:bg-[#8fb5ff] active:bg-[#7aa3ff]',
    outline: 'border-2 border-[#016cb7] text-[#016cb7] hover:bg-[#e7efff] active:bg-[#a6c8ff]',
    ghost: 'text-[#016cb7] hover:bg-[#e7efff] active:bg-[#a6c8ff]'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5',
    md: 'px-4 py-2',
    lg: 'px-6 py-3'
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} cursor-pointer`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
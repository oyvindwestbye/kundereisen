import React from 'react';

interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  fullWidth = false,
  icon
}: InputProps) {
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <div className={`flex flex-col gap-1.5 ${widthClass}`}>
      {label && (
        <label className="text-[#21272a]">
          {label}
          {required && <span className="text-[#da1e28] ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#697077]">
            {icon}
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`w-full px-4 py-2.5 border rounded-lg transition-all duration-200
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-[#da1e28]' : 'border-[#dde1e6]'}
            ${disabled ? 'bg-[#f4f4f4] cursor-not-allowed' : 'bg-white'}
            focus:outline-none focus:ring-2 focus:ring-[#016cb7] focus:border-transparent
            hover:border-[#c0c4cf]`}
        />
      </div>
      {error && (
        <span className="text-[#da1e28] text-sm">{error}</span>
      )}
    </div>
  );
}

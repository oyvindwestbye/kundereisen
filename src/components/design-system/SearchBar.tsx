import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: () => void;
}

export function SearchBar({ 
  placeholder = 'Søk...', 
  value, 
  onChange,
  onSearch 
}: SearchBarProps) {
  return (
    <div className="relative w-full">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#697077]">
        <Search size={20} />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch?.()}
        className="w-full pl-10 pr-4 py-2.5 border border-[#dde1e6] rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-[#016cb7] focus:border-transparent
          hover:border-[#c0c4cf] transition-all duration-200"
      />
    </div>
  );
}

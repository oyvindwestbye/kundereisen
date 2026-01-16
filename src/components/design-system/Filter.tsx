import React, { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterProps {
  label: string;
  options: FilterOption[];
  value?: string[];
  onChange?: (values: string[]) => void;
  multiple?: boolean;
}

export function Filter({ label, options, value = [], onChange, multiple = false }: FilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleSelect = (optionValue: string) => {
    if (multiple) {
      const newValue = value.includes(optionValue)
        ? value.filter(v => v !== optionValue)
        : [...value, optionValue];
      onChange?.(newValue);
    } else {
      onChange?.([optionValue]);
      setIsOpen(false);
    }
  };
  
  const clearAll = () => {
    onChange?.([]);
  };
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border border-[#dde1e6] rounded-lg 
          hover:border-[#c0c4cf] transition-all duration-200 bg-white"
      >
        <span className="text-sm">{label}</span>
        {value.length > 0 && (
          <span className="bg-[#016cb7] text-white rounded-full px-2 py-0.5 text-xs">
            {value.length}
          </span>
        )}
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full mt-2 left-0 bg-white border border-[#dde1e6] rounded-lg shadow-lg z-20 min-w-[200px]">
            <div className="p-2">
              {value.length > 0 && (
                <button
                  onClick={clearAll}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#da1e28] hover:bg-[#ffd7d9] rounded transition-colors"
                >
                  <X size={16} />
                  Fjern alle
                </button>
              )}
              {options.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-[#f4f4f4] rounded cursor-pointer transition-colors"
                >
                  <input
                    type={multiple ? 'checkbox' : 'radio'}
                    checked={value.includes(option.value)}
                    onChange={() => handleSelect(option.value)}
                    className="accent-[#016cb7]"
                  />
                  <span className="text-sm">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

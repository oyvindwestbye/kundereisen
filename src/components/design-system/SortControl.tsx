import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

interface SortControlProps {
  label: string;
  direction?: 'asc' | 'desc' | null;
  onSort?: (direction: 'asc' | 'desc' | null) => void;
}

export function SortControl({ label, direction, onSort }: SortControlProps) {
  const handleClick = () => {
    if (!direction) {
      onSort?.('asc');
    } else if (direction === 'asc') {
      onSort?.('desc');
    } else {
      onSort?.(null);
    }
  };
  
  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#dde1e6] rounded-lg 
        hover:border-[#c0c4cf] hover:bg-[#f4f4f4] transition-all duration-200 bg-white"
    >
      <span className="text-sm">{label}</span>
      {!direction && <ArrowUpDown size={16} className="text-[#697077]" />}
      {direction === 'asc' && <ArrowUp size={16} className="text-[#016cb7]" />}
      {direction === 'desc' && <ArrowDown size={16} className="text-[#016cb7]" />}
    </button>
  );
}

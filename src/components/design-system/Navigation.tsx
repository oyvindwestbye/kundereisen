import React from 'react';
import { LogOut, Menu, X } from 'lucide-react';

interface NavigationProps {
  logo?: React.ReactNode;
  items?: Array<{
    label: string;
    onClick: () => void;
    active?: boolean;
    href?: string;
  }>;
  onLogout?: () => void;
  userRole?: string;
  insuranceLogo?: string;
}

export function Navigation({ logo, items = [], onLogout, userRole, insuranceLogo }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  
  return (
    <nav className="bg-white border-b border-[#dde1e6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and User Role */}
          <div className="flex items-center gap-4">
            {logo || (
              <img 
                src="https://ocab.no/wp-content/uploads/2025/04/ocab-logo-01.svg" 
                alt="Ocab" 
                className="h-8"
              />
            )}
            {userRole && <h3 className="text-[#697077]">{userRole}</h3>}
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  item.onClick();
                }}
                className={`transition-colors ${
                  item.active
                    ? 'text-[#016CB7]'
                    : 'text-[#1c1c1c] hover:text-[#016CB7]'
                }`}
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-[#697077] hover:text-[#1c1c1c] border border-[#dde1e6] rounded-lg hover:border-[#697077] transition-colors cursor-pointer"
            >
              <LogOut size={20} />
              Logg ut
            </button>
          </div>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[#f4f4f4]"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#dde1e6] bg-white">
          <div className="px-4 py-2 space-y-1">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.onClick();
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  item.active
                    ? 'bg-[#e7efff] text-[#016cb7]'
                    : 'text-[#21272a] hover:bg-[#f4f4f4]'
                }`}
              >
                {item.label}
              </button>
            ))}
            {onLogout && (
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-2 px-4 py-2 bg-[#016cb7] text-white rounded-lg hover:bg-[#006cb7] transition-colors"
              >
                Logg ut
                <LogOut size={16} />
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
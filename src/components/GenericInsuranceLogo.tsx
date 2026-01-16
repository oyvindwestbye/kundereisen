import React from 'react';

interface GenericInsuranceLogoProps {
  className?: string;
}

export function GenericInsuranceLogo({ className = "h-10" }: GenericInsuranceLogoProps) {
  return (
    <svg 
      viewBox="0 0 200 60" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Shield icon */}
      <path
        d="M30 10C30 10 20 13 15 13C15 13 15 23 15 30C15 40 22 48 30 50C38 48 45 40 45 30C45 23 45 13 45 13C40 13 30 10 30 10Z"
        fill="#016CB7"
      />
      <path
        d="M30 14C30 14 23 16 20 16C20 16 20 23 20 28C20 35 25 41 30 43C35 41 40 35 40 28C40 23 40 16 40 16C37 16 30 14 30 14Z"
        fill="#006CB7"
      />
      <path
        d="M27 32L25 30L23 32L27 36L37 26L35 24L27 32Z"
        fill="white"
      />
      
      {/* Text */}
      <text
        x="55"
        y="38"
        fontFamily="Open Sans, sans-serif"
        fontSize="20"
        fontWeight="600"
        fill="#21272a"
      >
        Din logo
      </text>
    </svg>
  );
}

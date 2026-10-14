import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const imageSizes = {
    sm: 'w-[140px]',
    md: 'w-[170px]',
    lg: 'w-[220px] md:w-[260px]'
  };

  return (
    <img
      src="/assets/images/Flyvora_logo_transparent.png"
      alt="Flyvora — Explore, Travel, Create Memories"
      className={`block h-auto select-none ${imageSizes[size]} ${className}`}
    />
  );
};

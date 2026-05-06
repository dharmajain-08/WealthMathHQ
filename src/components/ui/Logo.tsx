import React from 'react';

export const Logo = ({ className = "", dark = false }: { className?: string; iconOnly?: boolean; dark?: boolean }) => {
  return (
    <div className={`flex items-center font-bold text-xl md:text-2xl tracking-tight ${className}`} style={{ fontFamily: "'Poppins', sans-serif" }}>
      <span className={dark ? 'text-brand-navy' : 'text-white'}>WealthMath</span>
      <span className="text-brand-gold">HQ</span>
    </div>
  );
};

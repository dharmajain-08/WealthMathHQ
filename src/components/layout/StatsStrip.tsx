import React from 'react';

export const StatsStrip = () => {
  return (
    <div className="bg-white border-t border-brand-border py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="flex flex-col">
            <span className="text-[18px] font-heading font-extrabold text-brand-navy leading-none">9+</span>
            <span className="text-[12px] text-brand-muted font-medium uppercase tracking-wider mt-1">Premium Tools</span>
          </div>
          <div className="hidden md:block w-px h-10 bg-brand-border"></div>
          <div className="flex flex-col">
            <span className="text-[18px] font-heading font-extrabold text-brand-navy leading-none">100%</span>
            <span className="text-[12px] text-brand-muted font-medium uppercase tracking-wider mt-1">Inflation Aware</span>
          </div>
          <div className="hidden md:block w-px h-10 bg-brand-border"></div>
          <div className="flex flex-col">
            <span className="text-[18px] font-heading font-extrabold text-brand-navy leading-none">Excel Exports</span>
            <span className="text-[12px] text-brand-muted font-medium uppercase tracking-wider mt-1">Branded Exports</span>
          </div>
          <div className="md:flex-1"></div>
          <div className="text-center md:text-right">
            <span className="text-[11px] text-brand-muted font-bold uppercase tracking-widest block mb-1">Data precision ensured for</span>
            <span className="text-[14px] font-heading font-bold text-brand-navy">Indian Tax & Banking Rules</span>
          </div>
        </div>
      </div>
    </div>
  );
};

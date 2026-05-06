import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Info } from 'lucide-react';

/**
 * Utility for merging tailwind classes
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 1. Shared Label
export const Label = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <label className={cn("block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-2 transition-colors group-focus-within:text-brand-primary", className)}>
    {children}
  </label>
);

// 2. Premium Numeric Input
export const NumericInput = ({ 
  label, 
  value, 
  onChange, 
  prefix = "₹", 
  suffix,
  min,
  max,
  className,
  tooltip
}: { 
  label: string; 
  value: number; 
  onChange: (val: number) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  className?: string;
  tooltip?: string;
}) => {
  return (
    <div className={cn("group px-[16px] py-[13px] bg-[#f0f7ff] border border-brand-border rounded-[12px] transition-all focus-within:border-brand-primary focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(79,70,229,0.08)]", className)}>
      <div className="flex items-center justify-between">
        <Label className="text-[10px] tracking-[1.5px] font-black text-brand-primary/60 uppercase">{label}</Label>
        {tooltip && (
          <div className="relative group/tooltip">
            <Info className="w-3.5 h-3.5 text-brand-primary/40 cursor-help hover:text-brand-primary transition-colors" />
            <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-brand-navy text-white text-[10px] rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-20 pointer-events-none shadow-xl border border-white/10">
              {tooltip}
              <div className="absolute top-full right-1.5 border-4 border-transparent border-t-brand-navy" />
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center mt-1">
        {prefix && <span className="text-brand-navy/30 font-bold mr-2 text-lg">{prefix}</span>}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min}
          max={max}
          className="bg-transparent border-none focus:outline-none focus:ring-0 p-0 w-full font-heading font-extrabold text-[20px] text-brand-navy placeholder:text-gray-300"
        />
        {suffix && <span className="text-brand-navy/30 font-bold ml-2 text-[14px]">{suffix}</span>}
      </div>
    </div>
  );
};

// 3. Slider with manual input
export const InputSlider = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  suffix = "%",
  className,
  tooltip
}: {
  label: string;
  value: number;
  onChange: (val: number) => void;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  className?: string;
  tooltip?: string;
}) => {
  return (
    <div className={cn("space-y-4 px-4 py-4 rounded-2xl border border-transparent transition-all hover:bg-[#f0f7ff]", className)}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-2">
        <div className="flex items-center space-x-2 flex-1">
          <Label className="mb-0 text-[11px] leading-tight">{label}</Label>
          {tooltip && (
            <div className="relative group/tooltip">
              <Info className="w-3 h-3 text-brand-primary/40 cursor-help hover:text-brand-primary transition-colors" />
              <div className="absolute bottom-full left-0 mb-2 w-48 p-2 bg-brand-navy text-white text-[10px] rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-20 pointer-events-none shadow-xl border border-white/10">
                {tooltip}
                <div className="absolute top-full left-1.5 border-4 border-transparent border-t-brand-navy" />
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center bg-[#f0f7ff] border border-brand-border rounded-lg overflow-hidden focus-within:border-brand-primary h-8 self-end sm:self-auto">
          <input 
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            min={min}
            max={max}
            step={step}
            className="w-16 p-1 text-center font-heading font-black text-brand-primary text-sm focus:ring-0 border-none bg-transparent"
          />
          <span className="bg-brand-primary/10 px-2 py-1 text-[10px] font-bold text-brand-primary border-l border-brand-border h-full flex items-center">
            {suffix}
          </span>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-brand-primary h-1.5 cursor-pointer"
      />
    </div>
  );
};

// 4. KPI Card
export const KpiCard = ({ 
  label, 
  value, 
  description, 
  variant = 'default',
  icon: Icon
}: { 
  label: string; 
  value: string; 
  description?: string; 
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  icon?: any;
}) => {
  const styles = {
    default: "bg-white border-brand-border",
    primary: "bg-white border-brand-primary border-l-8",
    success: "bg-white border-brand-secondary border-l-8",
    warning: "bg-brand-bg border-brand-gold border-l-8",
    danger: "bg-brand-bg border-brand-danger border-l-8",
  };

  return (
    <div className={cn("kpi-card flex flex-col justify-between min-h-[140px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)]", styles[variant])}>
      <div className="flex justify-between items-start mb-3">
        <span className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">{label}</span>
        {Icon && <Icon className="w-5 h-5 text-brand-primary opacity-20" />}
      </div>
      <div>
        <div className="text-3xl font-heading font-black text-brand-navy tracking-tight leading-none mb-1">{value}</div>
        {description && <p className="text-[10px] text-brand-muted font-bold mt-2 uppercase tracking-tighter opacity-80">{description}</p>}
      </div>
    </div>
  );
};

// 5. Accordion (Using <details>)
export const Accordion = ({ title, children, isOpen = false }: { title: string; children: React.ReactNode; isOpen?: boolean }) => {
  return (
    <details className="group bg-white border border-brand-border rounded-xl overflow-hidden" open={isOpen}>
      <summary className="flex justify-between items-center p-5 cursor-pointer hover:bg-brand-bg transition-colors list-none">
        <span className="font-heading font-bold text-brand-navy">{title}</span>
        <div className="w-6 h-6 rounded-full bg-brand-bg flex items-center justify-center transition-transform group-open:rotate-180">
          <svg className="w-4 h-4 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </summary>
      <div className="p-5 border-t border-brand-border">
        {children}
      </div>
    </details>
  );
};

// 6. Styled Button
export const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className,
  type = 'button',
  icon: Icon
}: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'success' | 'outline';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: any;
}) => {
  const variants = {
    primary: "bg-brand-primary text-white hover:bg-opacity-90 shadow-md hover:shadow-lg",
    secondary: "bg-white border-brand-border text-brand-primary border hover:bg-brand-bg",
    danger: "bg-white border-brand-danger border text-brand-danger hover:bg-brand-danger hover:text-white",
    success: "bg-white border-brand-secondary border text-brand-secondary hover:bg-brand-secondary hover:text-white",
    ghost: "bg-transparent text-brand-muted hover:text-brand-primary hover:bg-brand-bg",
    outline: "bg-transparent border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white shadow-sm",
  };

  return (
    <button 
      type={type}
      onClick={onClick}
      className={cn(
        "flex items-center justify-center space-x-2 px-6 py-3 rounded-[8px] font-bold font-heading text-[12px] uppercase tracking-[1px] transition-all transform active:scale-95",
        variants[variant],
        className
      )}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span>{children}</span>
    </button>
  );
};

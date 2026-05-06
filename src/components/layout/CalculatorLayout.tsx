import React, { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, FileText, Download, Share2, Info, User, Briefcase as BriefcaseIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { Logo } from '../ui/Logo';

interface CalculatorLayoutProps {
  title: string;
  description: string;
  breadcrumb: string;
  inputs: ReactNode;
  outputs: ReactNode;
  kpiCards: ReactNode;
  insightStrip?: string;
  charts: ReactNode;
  details?: ReactNode;
  exports?: (clientName: string) => ReactNode;
}

export const CalculatorLayout: React.FC<CalculatorLayoutProps> = ({
  title,
  description,
  breadcrumb,
  inputs,
  outputs,
  kpiCards,
  insightStrip,
  charts,
  details,
  exports
}) => {
  const [clientName, setClientName] = useState('');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-6 md:py-10"
    >
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-[12px] font-semibold text-brand-muted mb-3 uppercase tracking-[0.5px]">
        <Link to="/" className="hover:text-brand-primary">Home</Link>
        <span className="text-gray-300">/</span>
        <Link to="/financial-calculators" className="hover:text-brand-primary">Financial Calculators</Link>
        <span className="text-gray-300">/</span>
        <span className="text-brand-navy">{breadcrumb}</span>
      </nav>

      {/* Header */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-[36px] font-heading font-extrabold text-brand-navy mb-2 tracking-tight">
          {title}
        </h1>
        <p className="text-[16px] text-brand-muted max-w-2xl font-medium">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Inputs */}
        <div className="lg:col-span-4 bg-white rounded-2xl shadow-sm border border-brand-border p-5 md:p-6 lg:sticky lg:top-24 print:hidden">
          <div className="flex items-center space-x-2 mb-6 border-b border-brand-border pb-4">
             <div className="w-8 h-8 bg-brand-bg rounded-lg flex items-center justify-center">
               <FileText className="w-4 h-4 text-brand-primary" />
             </div>
             <h3 className="font-heading font-bold text-lg text-brand-navy uppercase tracking-wider text-sm">Input Parameters</h3>
          </div>
          <div className="space-y-8">
            {inputs}
          </div>
          
          <div className="mt-8 pt-6 border-t border-brand-border space-y-6">
            <div>
              <h4 className="font-heading font-bold text-xs text-brand-muted uppercase tracking-widest mb-4">Report Details</h4>
              <div className="space-y-3">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                  <input 
                    type="text" 
                    placeholder="Client Name" 
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-brand-bg border border-brand-border rounded-xl py-2 pl-10 pr-4 text-sm font-bold text-brand-navy outline-none focus:border-brand-primary"
                  />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-heading font-bold text-xs text-brand-muted uppercase tracking-widest mb-4">Export Report</h4>
              <div className="grid grid-cols-2 gap-3">
                 {exports?.(clientName || 'Valued Client')}
              </div>
            </div>

            <p className="text-[10px] text-brand-muted mt-4 leading-tight italic">
              *All projections are estimates. Market returns are not guaranteed. Inflation-adjusted values use today's purchasing power as baseline.
            </p>
          </div>
        </div>

        {/* Right Side: Outputs & Charts */}
        <div className="lg:col-span-8 flex flex-col space-y-8" id="report-content">
          {/* Main Chart Card - Growth Projection */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", damping: 20 }}
            className="bg-white rounded-3xl shadow-sm border border-brand-border p-6 md:p-8 overflow-hidden"
          >
             <div className="flex justify-between items-center mb-6">
               <h3 className="font-heading font-black text-xl text-brand-navy tracking-tight">Growth Projection</h3>
               <div className="bg-brand-bg px-4 py-1.5 rounded-full border border-brand-border">
                  <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">Growth Trends</span>
               </div>
             </div>
             <div className="w-full h-[400px]">
               {charts}
             </div>
          </motion.div>

          {/* Visual Evaluation Section - Segregated */}
          <div className={`grid grid-cols-1 ${outputs ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-8`}>
             {/* Breakdown Chart (Pie) */}
             {outputs && (
               <motion.div 
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6 }}
                 className="bg-white rounded-3xl shadow-sm border border-brand-border p-6 md:p-8"
               >
                  <h4 className="font-heading font-black text-lg text-brand-navy mb-8 tracking-tight text-center">Wealth Breakdown</h4>
                  <div className="w-full">
                    {outputs}
                  </div>
               </motion.div>
             )}

             {/* Quick Reference / KPIs */}
             <motion.div 
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
               className="bg-white rounded-3xl shadow-sm border border-brand-border p-6 md:p-8"
             >
                <h4 className="font-heading font-black text-lg text-brand-navy mb-8 tracking-tight text-center">Quick Reference</h4>
                <div className="space-y-4">
                  {kpiCards}
                </div>
             </motion.div>
          </div>

          {/* Advisor Insight / Verdict */}
          {insightStrip && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-brand-bg border-l-4 border-brand-primary rounded-3xl p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3"></div>
              <div className="relative z-10">
                 <div className="flex items-center space-x-3 mb-4">
                   <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center">
                     <Info className="w-5 h-5 text-brand-primary" />
                   </div>
                   <h4 className="text-[11px] font-black text-brand-primary uppercase tracking-[2px]">Advisor's Verdict</h4>
                 </div>
                 <p className="text-xl md:text-2xl text-brand-navy font-heading font-black leading-tight">
                   "{insightStrip}"
                 </p>
              </div>
            </motion.div>
          )}

          <div className="space-y-4">
            {details}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

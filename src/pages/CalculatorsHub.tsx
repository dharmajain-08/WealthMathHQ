import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Target, 
  Home, 
  BarChart3, 
  Wallet, 
  Banknote, 
  ArrowRight,
  Zap,
  Scale,
  Flame,
  RotateCcw,
  Search
} from 'lucide-react';
import { CATEGORIES, CALCULATORS } from '../constants';
import { StatsStrip } from '../components/layout/StatsStrip';
import { Button } from '../components/ui';

const categoryIcons: Record<string, any> = {
  "Investment Growth": TrendingUp,
  "Goal Planning": Target,
  "Loan Decisions": Home,
  "Income & Withdrawal": Wallet,
  "Deposits": Banknote
};

const calcIcons: Record<string, any> = {
  "compound-inflation": TrendingUp,
  "sip-step-up": BarChart3,
  "cagr-reverse": RotateCcw,
  "goal-planner": Target,
  "fire-number": Flame,
  "loan-part-payments": Home,
  "emi-vs-invest": Scale,
  "swp": Wallet,
  "fd-rd": Banknote
};

export const CalculatorsHubView = () => {
  return (
    <div className="bg-brand-bg-alt min-h-screen flex flex-col">
      <div className="flex-grow pb-24">
        {/* Header */}
        <div className="bg-gradient-to-b from-slate-50 to-brand-bg-alt pt-24 pb-48 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-10 text-center md:text-left">
            <nav className="flex items-center space-x-2 text-[12px] font-bold text-brand-muted mb-4 uppercase tracking-[1px]">
              <Link to="/" className="hover:text-brand-primary transition-colors">Home</Link>
              <span className="text-slate-300">/</span>
              <span className="text-brand-navy">Calculators</span>
            </nav>
            <h1 className="text-[40px] md:text-[56px] font-heading font-black text-brand-navy mb-6 tracking-[-1px] leading-none">Financial Tools</h1>
            <p className="text-[18px] text-brand-muted max-w-2xl mb-8 font-medium leading-relaxed">
              Advanced calculators for modern financial planning. Inflation-aware modules, comparison engines, and advisor-ready exports.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-10 -mt-32 relative z-10">
           <div className="flex flex-col lg:flex-row gap-12">
             <div className="lg:flex-1 space-y-20">
               {CATEGORIES.map(category => {
                  const Icon = categoryIcons[category];
                  const categoryCalcs = CALCULATORS.filter(c => c.category === category);
                  
                  return (
                    <div key={category} className="space-y-10">
                      <div className="flex items-center space-x-4 border-b border-brand-border/50 pb-4">
                        <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center">
                           <Icon className="text-white w-5 h-5" />
                        </div>
                        <h2 className="text-[20px] font-heading font-extrabold text-brand-navy uppercase tracking-[1px]">{category}</h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {categoryCalcs.map(calc => {
                           const CalcIcon = calcIcons[calc.id];
                           return (
                             <Link 
                               key={calc.id} 
                               to={calc.path}
                               className="group bg-white rounded-[16px] border border-brand-border p-8 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02)] hover:shadow-xl transition-all flex flex-col h-full hover:border-brand-primary/20"
                             >
                               <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-brand-primary transition-colors">
                                 <CalcIcon className="text-brand-primary w-6 h-6 group-hover:text-white transition-colors" />
                               </div>
                               <h3 className="text-[20px] font-heading font-bold text-brand-navy mb-3 group-hover:text-brand-primary transition-colors">{calc.name}</h3>
                               <p className="text-brand-muted text-[14px] font-medium leading-relaxed flex-grow mb-8 line-clamp-2">{calc.description}</p>
                               <div className="inline-flex items-center text-[12px] uppercase tracking-[1px] font-bold text-brand-primary">
                                 Explore Tool <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" />
                               </div>
                             </Link>
                           );
                        })}
                      </div>
                    </div>
                  );
               })}
             </div>

             {/* Sidebar Highlights */}
             <div className="lg:w-80 space-y-8">
                <div className="bg-brand-secondary text-white p-8 rounded-3xl shadow-2xl sticky top-24 pointer-events-auto">
                   <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-[1px] mb-6">Advisor Ready</div>
                   <h3 className="text-[20px] font-heading font-black mb-4">Export reports</h3>
                   <p className="text-white/80 text-sm leading-relaxed mb-8 font-medium">Generate professional Excel exports with client names and WealthMathHQ branding.</p>
                   <Link to="/contact">
                     <Button variant="secondary" className="w-full bg-white text-brand-secondary border-none hover:bg-white/90 uppercase text-[11px]">Talk to advisor</Button>
                   </Link>
                </div>

                <div className="bg-white border border-brand-border p-8 rounded-[16px] space-y-6">
                   <h4 className="text-[12px] font-bold text-brand-muted uppercase tracking-[1px]">Popular This Week</h4>
                   <div className="space-y-4">
                      {CALCULATORS.slice(0, 3).map(c => (
                        <Link key={c.id} to={c.path} className="flex items-center space-x-3 group">
                          <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-brand-primary transition-colors">
                            <Zap className="w-3 h-3 text-brand-primary group-hover:text-white" />
                          </div>
                          <span className="text-sm font-bold text-brand-navy group-hover:text-brand-primary transition-colors">{c.name}</span>
                        </Link>
                      ))}
                   </div>
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Target, 
  ShieldCheck, 
  TrendingUp, 
  Briefcase, 
  Globe,
  User,
  Building,
  Anchor,
  Zap,
  Wallet,
  Banknote,
  FileText,
  PieChart,
  Calendar,
  Database,
  HeartHandshake
} from 'lucide-react';

const ServeCard = ({ icon: Icon, label }: { icon: any, label: string }) => (
  <div className="bg-white p-6 rounded-2xl border border-brand-border flex items-center space-x-4 shadow-sm hover:shadow-md transition-shadow">
    <div className="w-10 h-10 bg-brand-bg rounded-lg flex items-center justify-center shrink-0 border border-brand-border">
      <Icon className="w-5 h-5 text-brand-primary" />
    </div>
    <span className="text-sm font-bold text-brand-navy tracking-tight">{label}</span>
  </div>
);

const ExpertiseCard = ({ label, desc }: { label: string, desc: string }) => (
  <div className="bg-brand-bg-alt p-6 rounded-2xl border border-brand-border group hover:border-brand-primary transition-colors">
    <div className="flex items-center space-x-2 mb-2">
      <div className="w-1.5 h-1.5 rounded-full bg-brand-primary"></div>
      <h4 className="text-base font-bold text-brand-navy">{label}</h4>
    </div>
    <p className="text-xs text-brand-muted font-medium leading-relaxed">{desc}</p>
  </div>
);

export const AboutView = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-24 border-b border-brand-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-brand-bg text-brand-primary px-4 py-2 rounded-full mb-8 border border-brand-border">
              <span className="text-[10px] font-black uppercase tracking-[2px]">PAN-INDIA · NRI-READY · DATA-DRIVEN</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-heading font-black text-brand-navy mb-8 tracking-tighter">
              Precision Wealth. <br />
              Personal Approach.
            </h1>
            <p className="text-xl md:text-2xl text-brand-muted max-w-4xl mx-auto font-medium leading-relaxed">
              As dedicated financial advisors, our mission is to help Indian families and NRIs achieve financial independence through evidence-based planning. Every recommendation is backed by transparent calculations, every risk named honestly, and every plan built to survive market cycles — not just look good on paper.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-24 bg-brand-bg-alt">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-heading font-black text-brand-navy tracking-tight">Built for Every Stage of <br /> Your Financial Life</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServeCard icon={User} label="Salaried Professionals" />
            <ServeCard icon={Building} label="Business Owners" />
            <ServeCard icon={Globe} label="NRIs" />
            <ServeCard icon={Anchor} label="Retirees & Pre-Retirees" />
            <ServeCard icon={Zap} label="First-Time Investors" />
            <ServeCard icon={Users} label="Families Planning for the Long Term" />
          </div>
        </div>
      </section>

      {/* Our Core Pillars */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-brand-bg rounded-xl flex items-center justify-center border border-brand-border">
                <Database className="w-6 h-6 text-brand-primary" />
              </div>
              <h4 className="text-xl font-bold text-brand-navy">Data-Driven Strategies</h4>
              <p className="text-brand-muted font-medium leading-relaxed italic text-sm">Every plan is optimized using historical simulations and monte-carlo projections. No guesswork, just math.</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-12 bg-brand-bg rounded-xl flex items-center justify-center border border-brand-border">
                <ShieldCheck className="w-6 h-6 text-brand-primary" />
              </div>
              <h4 className="text-xl font-bold text-brand-navy">Zero Conflict of Interest</h4>
              <p className="text-brand-muted font-medium leading-relaxed italic text-sm">We follow a 100% commission-disclosed advisory model. What’s good for your portfolio is our only priority.</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-12 bg-brand-bg rounded-xl flex items-center justify-center border border-brand-border">
                <HeartHandshake className="w-6 h-6 text-brand-primary" />
              </div>
              <h4 className="text-xl font-bold text-brand-navy">Human-First Approach</h4>
              <p className="text-brand-muted font-medium leading-relaxed italic text-sm">Behind every calculation is a real family goal. We balance rigorous analysis with empathy for your unique journey.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-24 bg-brand-navy relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(79,70,229,0.2),transparent)]"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-heading font-black text-white mb-8 tracking-tight">Ready to secure your financial future?</h2>
          <a 
            href="/contact" 
            className="inline-flex items-center bg-brand-primary hover:bg-brand-primary/90 text-white font-black px-10 py-5 rounded-2xl transition-all hover:scale-105 shadow-xl hover:shadow-brand-primary/20"
          >
            Talk to an Advisor
          </a>
        </div>
      </section>
    </div>
  );
};

import React from 'react';
import { 
  ShieldCheck, 
  TrendingUp, 
  HandCoins, 
  Globe, 
  UserRoundCheck, 
  Scale,
  ArrowRight,
  Briefcase,
  Wallet
} from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../components/ui';
import { Link } from 'react-router-dom';

const ServiceCard = ({ title, description, icon: Icon, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="bg-white p-10 rounded-[32px] border border-brand-border shadow-sm hover:shadow-2xl hover:shadow-brand-primary/5 transition-all group"
  >
    <div className="w-16 h-16 bg-brand-bg rounded-2xl flex items-center justify-center mb-8 border border-brand-border group-hover:border-brand-primary transition-colors">
      <Icon className="w-8 h-8 text-brand-primary" />
    </div>
    <h3 className="text-2xl font-heading font-black text-brand-navy mb-4 tracking-tight">{title}</h3>
    <p className="text-brand-muted text-lg leading-relaxed mb-8 font-medium">{description}</p>
    <Link to="/contact">
      <div className="flex items-center text-brand-primary font-bold transition-all group-hover:translate-x-2">
        Inquire for details <ArrowRight className="w-4 h-4 ml-2" />
      </div>
    </Link>
  </motion.div>
);

export const ServicesView = () => {
  const services = [
    {
      title: "Investment Planning",
      description: "Customized portfolio strategies across Mutual Funds, Equities, and Fixed Income based on your risk profile and future goals.",
      icon: TrendingUp
    },
    {
      title: "Wealth Building",
      description: "Strategic accumulation strategies like Step-Up SIPs and dynamic asset allocation to grow your long-term corpus efficiently.",
      icon: HandCoins
    },
    {
      title: "Insurance / Protection",
      description: "Ensuring your family and assets are protected with the right Term Life, Health, and Critical Illness coverage.",
      icon: ShieldCheck
    },
    {
      title: "Tax Planning",
      description: "Optimizing your investments for maximum tax efficiency under Indian tax laws while ensuring compliance and growth.",
      icon: Scale
    },
    {
      title: "Global Investments",
      description: "Diversify your wealth beyond Indian borders with access to US Equities and international fund of funds.",
      icon: Globe
    },
    {
      title: "NRI Wealth Mgmt.",
      description: "Specific financial planning and compliance-safe investment strategies for Non-Resident Indians looking to build wealth in India.",
      icon: UserRoundCheck
    },
    {
      title: "Debt Management",
      description: "Strategic advice on optimizing interest costs, restructuring liabilities, and becoming debt-free efficiently.",
      icon: Wallet
    }
  ];

  return (
    <div className="bg-brand-bg-alt min-h-screen pb-32">
      {/* Header */}
      <section className="bg-brand-navy text-white pt-32 pb-40">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 text-white px-4 py-2 rounded-full mb-8 border border-white/10">
              <span className="w-2 h-2 bg-brand-primary rounded-full"></span>
              <span className="text-[10px] font-bold uppercase tracking-[2px]">Financial Planning Services</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-black mb-6 tracking-tight">Our Expertise.</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto font-medium">
              We provide institution-grade financial planning with a human touch, backed by rigorous research and data-driven analysis.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="-mt-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <ServiceCard 
              key={i} 
              {...service} 
              delay={i * 0.1} 
            />
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center py-24 bg-white border-t border-brand-border">
         <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-heading font-black text-brand-navy mb-8 tracking-tight">Ready to optimize your wealth?</h2>
            <Link to="/contact">
              <Button variant="outline" className="h-16 px-12 text-xl border-2 hover:bg-brand-navy hover:text-white transition-all">Start Your Journey Today</Button>
            </Link>
            <p className="text-[10px] text-brand-muted font-medium mt-16 italic">
              *All investments are subject to market risks. Please read all scheme-related documents carefully before investing.
            </p>
         </div>
      </section>
    </div>
  );
};

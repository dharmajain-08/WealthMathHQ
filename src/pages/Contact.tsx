import React from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  MapPin, 
  MessageSquare, 
  Clock, 
  ArrowRight,
  Globe,
  Users
} from 'lucide-react';
import { Button } from '../components/ui';

const ContactCard = ({ icon: Icon, label, value, description }: any) => (
  <div className="bg-white p-8 rounded-3xl border border-brand-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
    <div className="w-12 h-12 bg-brand-bg rounded-xl flex items-center justify-center mb-6 border border-brand-border group-hover:border-brand-primary transition-colors">
      <Icon className="w-6 h-6 text-brand-primary" />
    </div>
    <div className="text-[10px] font-black text-brand-muted uppercase tracking-[2px] mb-1">{label}</div>
    <div className="text-xl font-heading font-black text-brand-navy mb-2">{value}</div>
    <p className="text-xs text-brand-muted font-medium leading-relaxed">{description}</p>
  </div>
);

export const ContactView = () => {
  return (
    <div className="bg-brand-bg-alt min-h-screen">
      {/* Header */}
      <section className="bg-brand-navy text-white pt-32 pb-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-8xl font-heading font-black mb-8 tracking-tighter leading-none">
                Let's start your <br />
                <span className="text-brand-primary">wealth journey.</span>
              </h1>
              <p className="text-xl text-brand-muted font-medium max-w-xl">
                Ready to optimize your portfolio or need help with a specific financial goal? Reach out to our experts today.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="-mt-20 px-6 mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <ContactCard 
              icon={Mail}
              label="Email Address"
              value="WealthMathHQ@gmail.com"
              description="Drop us a line anytime for inquiries or portfolio reviews."
            />
            <ContactCard 
              icon={Clock}
              label="Business Hours"
              value="10 AM - 6 PM"
              description="Monday to Friday (Available on weekends by appointment)."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

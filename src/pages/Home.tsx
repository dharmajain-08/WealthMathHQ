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
  ShieldCheck,
  Zap,
  LayoutDashboard,
  Smartphone,
  Briefcase,
  FileText,
  MapPin,
  Globe,
  ChevronDown
} from 'lucide-react';
import { Button } from '../components/ui';
import { CALCULATORS } from '../constants';
import { motion } from 'motion/react';

const HeroSection = () => (
  <section className="relative bg-white pt-32 pb-48 overflow-hidden">
    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #000 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
    <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-5xl md:text-8xl font-heading font-black text-brand-navy leading-[0.95] mb-10 tracking-tighter">
          Most Indians are investing. <br />
          <span className="text-brand-primary italic">Almost none</span> are doing it right.
        </h1>
        <p className="text-xl md:text-2xl text-brand-muted mb-12 leading-relaxed max-w-3xl mx-auto font-medium">
          Personalized investment planning backed by transparent, inflation-aware financial math.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link to="/financial-calculators">
            <Button className="w-full sm:w-auto h-[72px] px-12 text-xl shadow-2xl shadow-brand-primary/20 hover:scale-105 transition-all" icon={ArrowRight}>Explore Calculators</Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" className="w-full sm:w-auto h-[72px] px-12 text-xl border-2 hover:bg-brand-navy hover:text-white transition-all">CONTACT US</Button>
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

const ValueStrip = () => (
  <section className="bg-brand-bg-alt border-y border-brand-border py-10">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { icon: Zap, text: "Data-Driven Math" },
          { icon: ShieldCheck, text: "Risk-First Approach" },
          { icon: LayoutDashboard, text: "Unified Reporting" },
          { icon: Globe, text: "Global Asset Access" }
        ].map((item, i) => (
          <div key={i} className="flex items-center space-x-3 justify-center md:justify-start group">
            <div className="w-10 h-10 rounded-xl bg-white border border-brand-border flex items-center justify-center group-hover:border-brand-primary transition-colors">
              <item.icon className="w-5 h-5 text-brand-primary" />
            </div>
            <span className="text-sm font-bold text-brand-navy tracking-tight">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FeaturesSection = () => (
  <section className="py-32 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h2 className="text-[10px] font-black text-brand-primary uppercase tracking-[4px] mb-4 text-center">Our Expertise</h2>
        <h2 className="text-4xl md:text-6xl font-heading font-black text-brand-navy mb-6 tracking-tight">
          How we architect <br /> your wealth.
        </h2>
        <p className="text-xl text-brand-muted font-medium">
          Whether you are just starting or looking to optimize a multi-crore portfolio, we provide the clarity and expertise needed for Indian wealth creation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         <FeatureCard 
           title="Tailored Portfolios"
           desc="We don't believe in one-size-fits-all. Every portfolio is architected around your unique tax status, risk tolerance, and time horizon."
           icon={Briefcase}
           delay={0.1}
         />
         <FeatureCard 
           title="Inflation-Aware Planning"
           desc="Purchasing power is everything. Our strategies explicitly account for Indian inflation to ensure your future corpus actually lasts."
           icon={Zap}
           delay={0.2}
         />
         <FeatureCard 
           title="Advanced Research"
           desc="Direct access to institutional-grade equity research and high-conviction ideas to alpha-optimize your equity exposure."
           icon={TrendingUp}
           delay={0.3}
         />
         <FeatureCard 
           title="Tax Optimization"
           desc="Maximizing after-tax returns through strategic holding periods and selection of tax-efficient instruments."
           icon={ShieldCheck}
           delay={0.4}
         />
         <FeatureCard 
           title="Goal-Based Execution"
           desc="From retirement to children's education, we map individual instruments to specific life milestones."
           icon={Target}
           delay={0.5}
         />
         <FeatureCard 
           title="Legacy & Estate"
           desc="Ensuring your hard-earned wealth is passed down smoothly with structured nomination and succession support."
           icon={Home}
           delay={0.6}
         />
         <FeatureCard 
           title="Debt Management"
           desc="Strategic advice on optimizing interest costs, restructuring liabilities, and becoming debt-free efficiently."
           icon={Wallet}
           delay={0.7}
         />
      </div>
    </div>
  </section>
);

const FeatureCard = ({ title, desc, icon: Icon, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -15, scale: 1.02 }}
    className="bg-brand-bg-alt p-10 rounded-[40px] border border-brand-border group hover:bg-white hover:shadow-3xl hover:shadow-brand-primary/10 transition-all"
  >
    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 border border-brand-border group-hover:bg-brand-primary group-hover:text-white transition-all shadow-sm">
      <Icon className="w-8 h-8 text-brand-primary" />
    </div>
    <h3 className="text-2xl font-heading font-black text-brand-navy mb-4 tracking-tight">{title}</h3>
    <p className="text-brand-muted text-lg leading-relaxed font-medium">{desc}</p>
  </motion.div>
);

const FAQItem = ({ question, answer }: { question: string; answer: string; [key: string]: any }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-b border-brand-border mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:bg-brand-bg-alt/50 transition-colors px-4 rounded-xl group"
      >
        <span className="text-lg md:text-xl font-heading font-bold text-brand-navy leading-tight pr-8">{question}</span>
        <ChevronDown 
          className={`w-6 h-6 text-brand-navy shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      {isOpen && (
        <div className="px-4 pb-8">
          <p className="text-brand-muted text-lg font-medium leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQSection = () => {
  const faqs = [
    {
      question: "What does WealthMathHQ actually do?",
      answer: "We help individuals and families build wealth through personalized investment planning, tax-efficient strategies, and data-driven financial advice. We also provide free financial calculators so you can run the numbers yourself before making any decision."
    },
    {
      question: "How are your calculators different from the basic SIP calculators online?",
      answer: "Standard calculators use CAGR — a lumpsum metric that overestimates SIP returns. Our tools use inflation-adjusted projections, show real purchasing power (not just nominal numbers), and let you model step-ups, part payments, and goal-specific targets. They're built for how Indians actually invest."
    },
    {
      question: "Are your calculators free to use?",
      answer: "Yes. All 9+ calculators on this site are completely free. No login required, no data stored."
    },
    {
      question: "Do I need to create an account to use the tools?",
      answer: "No account needed. Open any calculator, enter your numbers, get your results. Your data stays on your device."
    },
    {
      question: "Who is your financial planning service for?",
      answer: "Working professionals between 25–50 who want clarity on their investments, tax planning, and retirement planning. We also specialize in NRI financial planning for Indians living abroad who want to invest or plan in India."
    },
    {
      question: "How do I get personalized financial advice?",
      answer: "Submit your inquiry on the Contact page. We'll get back to you within 24 hours to discuss your situation and goals."
    },
    {
      question: "What is a Step-Up SIP and why does it matter?",
      answer: "A Step-Up SIP increases your monthly investment by a fixed percentage every year — typically 10%. Because of compounding, a 10% annual increase doesn't produce a 10% larger corpus over 20 years. It produces more than double. Our SIP Step-Up calculator shows you this difference exactly."
    },
    {
      question: "I already have a financial advisor. Why would I come to you?",
      answer: "Most advisors don't show you the full math — XIRR vs CAGR differences, hidden commission drag, inflation impact on your corpus, or LTCG tax implications. We do. Whether you work with us directly or just use our tools to verify what you're being told — both are valid."
    },
    {
      question: "Are your services available for NRIs?",
      answer: "Yes. We specifically work with NRIs in the US, UK, Australia, and Gulf countries who want to build or manage wealth in India. We understand the compliance requirements, FEMA rules, and tax implications for NRI investments."
    },
    {
      question: "Is my financial data safe on your calculators?",
      answer: "All calculator inputs are processed locally in your browser. We don't store, transmit, or have access to any numbers you enter."
    }
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-[10px] font-black text-brand-primary uppercase tracking-[4px] mb-4">Common Questions</h2>
          <h2 className="text-4xl md:text-6xl font-heading font-black text-brand-navy tracking-tight italic">Frequently <br /> Asked.</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12">
          <div className="flex flex-col">
            {faqs.slice(0, 5).map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
          <div className="flex flex-col">
            {faqs.slice(5).map((faq, index) => (
              <FAQItem key={index + 5} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const CategoryPreview = () => (
  <section className="py-32 bg-brand-bg-alt">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
         <div className="max-w-2xl">
           <h2 className="text-[10px] font-black text-brand-primary uppercase tracking-[4px] mb-4">Precision Tools</h2>
           <h2 className="text-4xl md:text-6xl font-heading font-black text-brand-navy mb-4 tracking-tight leading-none text-left italic">Calculators for life.</h2>
         </div>
         <Link to="/financial-calculators">
           <Button variant="secondary" className="px-10 h-16 text-lg" icon={ArrowRight}>View All Tools</Button>
         </Link>
       </div>
       
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {CALCULATORS.slice(0, 3).map((calc, i) => (
           <Link key={calc.id} to={calc.path} className="group">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -15, scale: 1.02 }}
                className="bg-white border border-brand-border rounded-[40px] p-12 h-full transition-all group-hover:shadow-3xl group-hover:shadow-brand-primary/10"
              >
                <div className="flex items-center space-x-4 mb-10">
                  <div className="w-16 h-16 bg-brand-bg rounded-2xl flex items-center justify-center text-brand-primary border border-brand-border group-hover:bg-brand-primary group-hover:text-white transition-all shadow-sm">
                    {calc.icon === 'TrendingUp' && <TrendingUp className="w-8 h-8" />}
                    {calc.icon === 'BarChart3' && <BarChart3 className="w-8 h-8" />}
                    {calc.icon === 'RotateCcw' && <Zap className="w-8 h-8" />}
                    {calc.icon === 'Target' && <Target className="w-8 h-8" />}
                    {calc.icon === 'Home' && <Home className="w-8 h-8" />}
                  </div>
                </div>
                <h4 className="text-2xl font-heading font-black text-brand-navy mb-4 tracking-tight">{calc.name}</h4>
                <p className="text-brand-muted text-lg leading-relaxed mb-10 line-clamp-2 font-medium">{calc.description}</p>
                <div className="flex items-center text-brand-primary font-black uppercase text-[10px] tracking-widest">
                  Try Tool <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2" />
                </div>
              </motion.div>
           </Link>
         ))}
       </div>
    </div>
  </section>
);

const FinalCTA = () => (
  <section className="py-32 bg-white text-center relative overflow-hidden">
    <div className="max-w-4xl mx-auto px-6 relative z-10">
      <h2 className="text-4xl md:text-7xl font-heading font-black text-brand-navy mb-10 tracking-tighter leading-none">Your wealth, <br /> architected.</h2>
      <p className="text-xl text-brand-muted mb-12 font-medium max-w-2xl mx-auto italic">"Your money is already working. The question is whether it's working hard enough."</p>
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
        <Link to="/contact">
          <Button className="h-[72px] px-14 text-xl shadow-2xl transition-all">CONTACT US</Button>
        </Link>
        <Link to="/services">
          <Button variant="outline" className="h-[72px] px-14 text-xl border-2 hover:bg-brand-navy hover:text-white transition-all">OUR SERVICES</Button>
        </Link>
      </div>
    </div>
  </section>
);

export const HomeView = () => {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <ValueStrip />
      <FeaturesSection />
      <FAQSection />
      <CategoryPreview />
      <FinalCTA />
    </div>
  );
};

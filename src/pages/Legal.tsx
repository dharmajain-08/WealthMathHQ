import React from 'react';
import { motion } from 'motion/react';
import { Shield, FileText, Scale } from 'lucide-react';

const LegalLayout = ({ title, icon: Icon, children }: any) => (
  <div className="bg-brand-bg-alt min-h-screen pt-32 pb-24">
    <div className="max-w-4xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[40px] p-12 md:p-20 border border-brand-border shadow-2xl"
      >
        <div className="w-16 h-16 bg-brand-bg rounded-2xl flex items-center justify-center mb-8 border border-brand-border">
          <Icon className="w-8 h-8 text-brand-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-heading font-black text-brand-navy mb-12 tracking-tight">{title}</h1>
        <div className="prose prose-slate prose-lg max-w-none prose-headings:text-brand-navy prose-strong:text-brand-navy prose-p:text-brand-muted prose-p:font-medium">
          {children}
        </div>
      </motion.div>
    </div>
  </div>
);

export const PrivacyView = () => (
  <LegalLayout title="Privacy Policy" icon={Shield}>
    <p>Last Updated: May 2026</p>
    <p>WealthMathHQ ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.</p>
    
    <h3>1. Information Collection</h3>
    <p>We may collect personal information such as your name, email address, and financial preferences when you voluntarily submit them through our contact forms or when requesting a consultation.</p>
    
    <h3>2. Use of Information</h3>
    <p>We use the information we collect to:</p>
    <ul>
      <li>Provide and maintain our financial planning services.</li>
      <li>Respond to your inquiries and support requests.</li>
      <li>Send you educational content and updates about our services.</li>
      <li>Improve the functionality and user experience of our financial calculators.</li>
    </ul>

    <h3>3. Data Protection</h3>
    <p>We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.</p>

    <h3>4. Third-Party Disclosure</h3>
    <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties unless we provide users with advance notice, except as required by law.</p>

    <h3>5. Cookies</h3>
    <p>We use cookies to understand and save your preferences for future visits and compile aggregate data about site traffic and site interaction.</p>
  </LegalLayout>
);

export const TermsView = () => (
  <LegalLayout title="Terms of Service" icon={FileText}>
    <p>Last Updated: May 2026</p>
    <p>By accessing this website, you agree to be bound by these Terms of Service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
    
    <h3>1. Use License</h3>
    <p>Permission is granted to temporarily use the financial calculators on WealthMathHQ's website for personal, non-commercial transitory viewing only.</p>
    
    <h3>2. Disclaimer of Financial Advice</h3>
    <p>The materials on WealthMathHQ's website are provided on an 'as is' basis. The calculators and tools are for educational purposes only and do not constitute professional financial advice. Always consult with a qualified financial advisor before making investment decisions.</p>
    
    <h3>3. Limitations</h3>
    <p>In no event shall WealthMathHQ or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on WealthMathHQ's website.</p>

    <h3>4. Revisions and Errata</h3>
    <p>The materials appearing on WealthMathHQ's website could include technical, typographical, or photographic errors. WealthMathHQ does not warrant that any of the materials on its website are accurate, complete, or current.</p>

    <h3>5. Governing Law</h3>
    <p>Any claim relating to WealthMathHQ's website shall be governed by the laws of India without regard to its conflict of law provisions.</p>
  </LegalLayout>
);

export const DisclaimerView = () => (
  <LegalLayout title="Disclaimer" icon={Scale}>
    <p>Last Updated: May 2026</p>
    
    <h3>1. General Information</h3>
    <p>The content provided by WealthMathHQ is for informational and educational purposes only. It is not intended to be a substitute for professional financial advice.</p>
    
    <h3>2. Investment Risk</h3>
    <p>Investment in securities market are subject to market risks. Read all the related documents carefully before investing. Past performance is not an indicator of future results. There is no guarantee of returns or capital protection in any investment strategy.</p>
    
    <h3>3. Calculator Accuracy</h3>
    <p>While our calculators are built with precision, the results are estimates based on user inputs and assumed rates of return. Actual results may vary significantly based on taxation, market volatility, and other external factors.</p>

    <h3>4. No Liability</h3>
    <p>WealthMathHQ shall not be held responsible for any financial loss or damage resulting from the use of our tools or the information provided on this website.</p>

    <h3>5. Regulatory Compliance</h3>
    <p>Users are encouraged to verify the registration and credentials of any financial professional before engaging in a formal advisory relationship.</p>
  </LegalLayout>
);

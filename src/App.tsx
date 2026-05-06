import React from 'react';
import { BrowserRouter as Router, Routes, Route, ScrollRestoration } from 'react-router-dom';
import { Navbar, Footer } from './components/layout/NavbarFooter';
import { StatsStrip } from './components/layout/StatsStrip';
import { HomeView } from './pages/Home';
import { AboutView } from './pages/About';
import { ContactView } from './pages/Contact';
import { PrivacyView, TermsView, DisclaimerView } from './pages/Legal';
import { CalculatorsHubView } from './pages/CalculatorsHub';

// Calculator Views
import { WealthGrowthAnalyserView as CompoundInflationView } from './pages/calculators/CompoundInflation';
import { GoalPlannerView } from './pages/calculators/GoalPlanner';
import { LoanPartPaymentsView } from './pages/calculators/LoanPartPayments';
import { SIPStepUpView } from './pages/calculators/SIPStepUp';
import { SWPView } from './pages/calculators/SWP';
import { FDRDView } from './pages/calculators/FDRD';
import { CAGRReverseView } from './pages/calculators/CAGRReverse';
import { EMIvsInvestView } from './pages/calculators/EMIvsInvest';
import { FIRENumberView } from './pages/calculators/FIRENumber';

// New Business Pages
import { ServicesView } from './pages/Services';
import { YouTubeView } from './pages/YouTube';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { NotFoundView } from './pages/NotFound';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-[80px]">
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/about" element={<AboutView />} />
            <Route path="/contact" element={<ContactView />} />
            <Route path="/services" element={<ServicesView />} />
            <Route path="/youtube" element={<YouTubeView />} />
            <Route path="/privacy" element={<PrivacyView />} />
            <Route path="/terms" element={<TermsView />} />
            <Route path="/disclaimer" element={<DisclaimerView />} />
            
            {/* Calculator Hub */}
            <Route path="/financial-calculators" element={<><CalculatorsHubView /><StatsStrip /></>} />
            
            {/* Calculator Routes */}
            <Route path="/financial-calculators/compound-inflation" element={<><CompoundInflationView /><StatsStrip /></>} />
            <Route path="/financial-calculators/goal-planner" element={<><GoalPlannerView /><StatsStrip /></>} />
            <Route path="/financial-calculators/loan-part-payments" element={<><LoanPartPaymentsView /><StatsStrip /></>} />
            <Route path="/financial-calculators/sip-step-up" element={<><SIPStepUpView /><StatsStrip /></>} />
            <Route path="/financial-calculators/swp-calculator" element={<><SWPView /><StatsStrip /></>} />
            <Route path="/financial-calculators/fd-rd-calculator" element={<><FDRDView /><StatsStrip /></>} />
            <Route path="/financial-calculators/cagr-reverse-calculator" element={<><CAGRReverseView /><StatsStrip /></>} />
            <Route path="/financial-calculators/emi-vs-invest-calculator" element={<><EMIvsInvestView /><StatsStrip /></>} />
            <Route path="/financial-calculators/fire-number-calculator" element={<><FIRENumberView /><StatsStrip /></>} />

            {/* 404 Route */}
            <Route path="*" element={<NotFoundView />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

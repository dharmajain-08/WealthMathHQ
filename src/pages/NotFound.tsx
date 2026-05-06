import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui';

export const NotFoundView = () => (
  <div className="min-h-[80vh] flex items-center justify-center bg-brand-bg px-6">
    <div className="max-w-xl w-full text-center">
      <div className="text-9xl font-heading font-black text-brand-primary/20 mb-8 select-none tracking-tighter">404</div>
      <h1 className="text-4xl md:text-5xl font-heading font-black text-brand-navy mb-6 tracking-tight">Page Not Found.</h1>
      <p className="text-xl text-brand-muted font-medium mb-12">
        The page you are looking for doesn't exist or has been moved. Let's get you back on track.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Link to="/">
          <Button className="w-full sm:w-auto h-16 px-10" icon={Home}>Back to Home</Button>
        </Link>
        <Link to="/financial-calculators">
          <Button variant="outline" className="w-full sm:w-auto h-16 px-10" icon={ArrowRight}>Use Calculators</Button>
        </Link>
      </div>
    </div>
  </div>
);

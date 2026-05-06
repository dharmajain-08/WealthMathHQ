import React from 'react';
import { Youtube, Play, ExternalLink, Calendar, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../components/ui';

const VideoCard = ({ title, description, date, duration, videoId }: any) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="flex flex-col md:flex-row gap-8 bg-white p-8 rounded-[32px] border border-brand-border hover:shadow-2xl hover:shadow-brand-primary/5 transition-all group"
  >
    <div className="md:w-1/3 shrink-0 relative group">
      <div className="aspect-video bg-brand-bg rounded-2xl overflow-hidden relative border border-brand-border">
        <img 
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
          alt={title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-brand-navy/20 group-hover:bg-brand-navy/10 transition-colors flex items-center justify-center">
           <div className="w-14 h-14 bg-brand-primary/90 text-white rounded-full flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110">
              <Play className="w-6 h-6 fill-current" />
           </div>
        </div>
      </div>
    </div>
    <div className="flex-1 flex flex-col justify-center">
      <div className="flex items-center space-x-4 mb-4 text-[10px] font-black text-brand-muted tracking-[2px] uppercase">
         <div className="flex items-center"><Calendar className="w-3 h-3 mr-1.5" /> {date}</div>
         <div className="flex items-center"><Clock className="w-3 h-3 mr-1.5" /> {duration}</div>
      </div>
      <h3 className="text-2xl font-heading font-black text-brand-navy mb-4 tracking-tight group-hover:text-brand-primary transition-colors">{title}</h3>
      <p className="text-brand-muted text-lg leading-relaxed mb-6 font-medium line-clamp-2">{description}</p>
      <a 
        href={`https://youtube.com/watch?v=${videoId}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center text-brand-primary font-black uppercase text-xs tracking-widest hover:underline"
      >
        Watch on YouTube <ExternalLink className="w-3 h-3 ml-2" />
      </a>
    </div>
  </motion.div>
);

export const YouTubeView = () => {
  return (
    <div className="bg-brand-bg min-h-screen pb-32">
      {/* Header */}
      <section className="bg-white border-b border-brand-border pt-32 pb-40 text-center">
        <div className="max-w-4xl mx-auto px-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-heading font-black text-brand-navy mb-8 tracking-tighter">WealthMathHQ — Video Series</h1>
            <p className="text-xl text-brand-muted font-medium mb-12">
              Watch our video series where we break down the financial myths most advisors won't talk about.
            </p>
            <a 
              href="https://youtube.com/@wealthmathhq" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button variant="secondary" className="h-16 px-12 text-lg">Subscribe to WealthMathHQ</Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Video List Placeholder */}
      <section className="py-24">
         <div className="max-w-4xl mx-auto px-3">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border-2 border-dashed border-brand-border rounded-[40px] p-20 text-center"
            >
               <div className="w-20 h-20 bg-brand-bg rounded-2xl flex items-center justify-center mx-auto mb-8 border border-brand-border">
                  <Play className="w-10 h-10 text-brand-primary/20" />
               </div>
               <h3 className="text-3xl font-heading font-black text-brand-navy mb-4 tracking-tight">First video coming soon.</h3>
               <p className="text-xl text-brand-muted font-medium">
                 We are currently producing high-quality content to help you navigate the Indian financial markets. Subscribe on YouTube to get notified.
               </p>
            </motion.div>
         </div>
      </section>
    </div>
  );
};

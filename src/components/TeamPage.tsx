import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronRight, 
  ArrowRight
} from 'lucide-react';
import Navbar from './Navbar';
import { Footer, Features } from './Sections';
import Testimonials from './Testimonials';
import FAQSection from './FAQSection';

interface TeamPageProps {
  onBack: () => void;
  onAuthClick: (mode?: 'signin' | 'signup') => void;
  onEnterpriseClick?: () => void;
  onContactClick?: () => void;
  onBlogClick?: () => void;
  onDialerClick?: () => void;
  onRatesClick?: () => void;
}

const countries = [
  {
    name: 'United States',
    region: 'North America',
    flag: 'https://images.unsplash.com/photo-1508433957232-3107f5fd5995?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'United Kingdom',
    region: 'Europe',
    flag: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Canada',
    region: 'North America',
    flag: 'https://images.unsplash.com/photo-1517935703635-2717079c21fe?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Germany',
    region: 'Europe',
    flag: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Japan',
    region: 'Asia',
    flag: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'France',
    region: 'Europe',
    flag: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Brazil',
    region: 'South America',
    flag: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Australia',
    region: 'Oceania',
    flag: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=800',
  },
];

export default function TeamPage({ 
  onBack, 
  onAuthClick, 
  onEnterpriseClick, 
  onContactClick,
  onBlogClick,
  onDialerClick,
  onRatesClick
}: TeamPageProps) {
  const [activeIndex, setActiveIndex] = React.useState(2);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % countries.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white  flex flex-col transition-colors duration-300">
      <Navbar 
        onAuthClick={onAuthClick} 
        onContactClick={onContactClick || (() => {})} 
        onBlogClick={onBlogClick}
        onDialerClick={onDialerClick}
        onRatesClick={onRatesClick}
        onLogoClick={onBack} 
      />
      
      <main className="flex-grow relative flex flex-col overflow-hidden">
        {/* Centered Header Area */}
        <div className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white  shadow-sm mb-8"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary-blue" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-text-dark ">Team Explore</span>
            <ChevronRight className="w-3 h-3 text-text-light " />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-text-dark  mb-6 max-w-4xl mx-auto leading-[1.1]"
          >
            Explore Team
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-text-light  mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            We've got an entire team dedicated to supporting you and your business 24/7.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col w-full px-4 sm:px-0 sm:w-auto sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <button 
              onClick={onEnterpriseClick}
              className="w-full sm:w-auto px-6 py-3.5 sm:px-10 sm:py-4 rounded-full bg-primary-blue text-white text-sm sm:text-base font-bold hover:bg-secondary-blue transition-colors shadow-xl shadow-primary-blue/20"
            >
              Create your team
            </button>
            <button 
              onClick={onContactClick}
              className="w-full sm:w-auto px-6 py-3.5 sm:px-10 sm:py-4 rounded-full bg-white  text-text-dark  border border-border-gray  text-sm sm:text-base font-bold hover:bg-soft-gray  transition-colors"
            >
              See enterprise plan
            </button>
          </motion.div>
        </div>

        {/* Interactive Flag Card Carousel */}
        <div className="relative z-10 w-full pb-16 md:pb-32 overflow-visible">
          <div className="flex items-end justify-center gap-4 md:gap-8 px-4 sm:px-8 overflow-x-auto pt-16 pb-12 w-full no-scrollbar snap-x snap-mandatory">
            {countries.map((country, index) => {
              const isActive = index === activeIndex;
              const isNeighbor = Math.abs(index - activeIndex) === 1;
              
              return (
                <motion.div
                  key={country.name}
                  onClick={() => setActiveIndex(index)}
                  initial={false}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    y: isActive ? -40 : 0,
                    opacity: isActive ? 1 : isNeighbor ? 0.7 : 0.4,
                    zIndex: isActive ? 30 : 20 - Math.abs(index - activeIndex),
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="relative flex-shrink-0 w-48 h-72 md:w-64 md:h-96 rounded-3xl overflow-hidden cursor-pointer shadow-2xl group snap-center"
                >
                  {/* Background Flag */}
                  <img 
                    src={country.flag} 
                    alt={country.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Glassmorphism Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/10 backdrop-blur-md">
                    <div className="flex flex-col items-start text-left">
                      <span className="text-white font-bold text-lg leading-tight mb-1">
                        {country.name}
                      </span>
                      <span className="text-white/70 text-xs font-medium uppercase tracking-wider">
                        {country.region} Region
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <Features />
        <Testimonials />
        <FAQSection onContactClick={onContactClick} />
      </main>

      <Footer 
        onRatesClick={onRatesClick}
        onDialerClick={onDialerClick}
        onBlogClick={onBlogClick}
        onContactClick={onContactClick}
      />
    </div>
  );
}

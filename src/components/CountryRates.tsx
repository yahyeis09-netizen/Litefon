import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Globe } from 'lucide-react';

const countries = [
  { name: 'United States', code: 'us', region: 'North America' },
  { name: 'United Kingdom', code: 'gb', region: 'Europe' },
  { name: 'Canada', code: 'ca', region: 'North America' },
  { name: 'Germany', code: 'de', region: 'Europe' },
  { name: 'France', code: 'fr', region: 'Europe' },
  { name: 'Japan', code: 'jp', region: 'Asia' },
  { name: 'Brazil', code: 'br', region: 'South America' },
  { name: 'India', code: 'in', region: 'Asia' },
  { name: 'China', code: 'cn', region: 'Asia' },
  { name: 'Australia', code: 'au', region: 'Oceania' },
  { name: 'Mexico', code: 'mx', region: 'North America' },
  { name: 'Italy', code: 'it', region: 'Europe' },
  { name: 'Spain', code: 'es', region: 'Europe' },
  { name: 'Netherlands', code: 'nl', region: 'Europe' },
  { name: 'Switzerland', code: 'ch', region: 'Europe' },
  { name: 'Singapore', code: 'sg', region: 'Asia' },
  { name: 'South Korea', code: 'kr', region: 'Asia' },
  { name: 'UAE', code: 'ae', region: 'Middle East' },
  { name: 'Turkey', code: 'tr', region: 'Europe/Asia' },
  { name: 'South Africa', code: 'za', region: 'Africa' },
];

interface CountryRatesProps {
  onRatesClick?: () => void;
}

export default function CountryRates({ onRatesClick }: CountryRatesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const CountryCard = ({ country }: { country: typeof countries[0], key?: string }) => (
    <motion.div
      className="relative flex-shrink-0 w-52 h-72 sm:w-64 sm:h-80 rounded-3xl overflow-hidden shadow-xl group"
    >
      {/* Background Flag */}
      <div className="absolute inset-0 bg-gray-100">
        <img 
          src={`https://flagcdn.com/w640/${country.code}.png`} 
          alt={country.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
      </div>
      
      {/* Glassmorphism Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-white/10 backdrop-blur-md border-t border-white/20">
        <div className="flex flex-col items-start text-left">
          <span className="text-white font-bold text-base sm:text-lg leading-tight mb-1">
            {country.name}
          </span>
          <span className="text-white/70 text-[9px] sm:text-[10px] font-medium uppercase tracking-wider">
            {country.region} Region
          </span>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section ref={containerRef} className="py-24 bg-white  transition-colors duration-300 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200  bg-white  mb-8"
          >
            <Globe className="w-3 h-3 text-primary-blue" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ">Popular Country</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[27px] md:text-[45px] font-bold text-black  mb-8 tracking-tight leading-[1.1]"
          >
            Popular Country
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400  text-lg md:text-xl max-w-2xl mx-auto font-light"
          >
            We've got an entire team dedicated to supporting you and your business 24/7.
          </motion.p>
        </div>

        {/* Marquee Slider Section */}
        <div className="relative">
          {/* Panoramic Fades */}
          <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-white  via-white/80  to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-white  via-white/80  to-transparent z-10 pointer-events-none" />

          {/* Scrolling Container */}
          <div className="flex gap-8 py-8 overflow-hidden">
            <motion.div 
              animate={{ x: [0, -2000] }}
              transition={{ 
                duration: 40, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="flex gap-8"
            >
              {[...countries, ...countries].map((country, idx) => (
                <CountryCard key={`${country.code}-${idx}`} country={country} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-24 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRatesClick}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-primary-blue text-white font-bold text-base transition-all shadow-xl shadow-primary-blue/20"
          >
            See our Rates
            <ArrowUpRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}

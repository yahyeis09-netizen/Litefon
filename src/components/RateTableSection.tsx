import React from 'react';
import { Globe2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface RateRow {
  country: string;
  flag: string;
  description: string;
  mobileRate: string;
  landlineRate: string;
}

const rateData: RateRow[] = [
  {
    country: "United Kingdom",
    flag: "🇬🇧",
    description: "Premium Tier-1 routing to all major networks.",
    mobileRate: "$0.012/min",
    landlineRate: "$0.004/min"
  },
  {
    country: "United States",
    flag: "🇺🇸",
    description: "Crystal clear connections to all 50 states.",
    mobileRate: "$0.008/min",
    landlineRate: "$0.002/min"
  },
  {
    country: "United Arab Emirates",
    flag: "🇦🇪",
    description: "Direct interconnects for lowest latency.",
    mobileRate: "$0.145/min",
    landlineRate: "$0.120/min"
  },
  {
    country: "Germany",
    flag: "🇩🇪",
    description: "High-availability routes for business calls.",
    mobileRate: "$0.015/min",
    landlineRate: "$0.005/min"
  }
];

interface RateTableSectionProps {
  onDialerClick?: () => void;
}

export default function RateTableSection({ onDialerClick }: RateTableSectionProps) {
  return (
    <section className="py-24 bg-white dark:bg-bg-dark transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6">
        {/* 1. Section Header Area (Center Aligned) */}
        <div className="flex flex-col items-center text-center mb-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-zinc-800 border border-border-gray dark:border-zinc-700 shadow-sm mb-8">
            <Globe2 className="w-3.5 h-3.5 text-primary-blue" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary-blue">
              Global Rates
            </span>
          </div>
          
          {/* Heading */}
          <h2 className="text-[27px] sm:text-[33px] md:text-[45px] tracking-tight mb-6">
            <span className="block font-light text-text-light dark:text-zinc-400">Get calling visualization</span>
            <span className="block font-bold text-text-dark dark:text-white">with precision data</span>
          </h2>
          
          <p className="text-text-light dark:text-zinc-400 max-w-lg mx-auto leading-relaxed">
            Track the growth and engagement of your global communications with detailed analytics. 
            Understand what works and supercharge your reach.
          </p>
        </div>

        {/* 2. Comparison Table / Grid Layout */}
        <div className="w-full overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0">
          <div className="min-w-[600px] md:min-w-0">
            {/* 3. Table Header Row */}
            <div className="grid grid-cols-[2fr_1fr_1fr] border-b border-black/10 dark:border-white/10">
              <div className="py-6 text-left">
                <span className="text-sm font-bold text-text-dark dark:text-white uppercase tracking-wider">Country Selection</span>
              </div>
              <div className="py-6 flex items-center justify-center">
                <span className="text-sm font-bold text-text-dark dark:text-white uppercase tracking-wider">Mobile</span>
              </div>
              <div className="py-6 flex items-center justify-center">
                <span className="text-sm font-bold text-text-dark dark:text-white uppercase tracking-wider">Land line</span>
              </div>
            </div>

            {/* 4. Table Data Rows (Repeating Structure) */}
            <div className="flex flex-col">
              {rateData.map((row, i) => (
                <div 
                  key={i} 
                  className="grid grid-cols-[2fr_1fr_1fr] border-b border-black/5 dark:border-white/5 hover:bg-soft-gray/30 dark:hover:bg-zinc-800/30 transition-colors group"
                >
                  {/* Column 1 (Feature Detail / Country Selection) */}
                  <div className="py-8 flex flex-col items-start text-left">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-2xl">{row.flag}</span>
                      <span className="text-lg font-medium text-text-dark dark:text-white group-hover:text-primary-blue transition-colors">
                        {row.country}
                      </span>
                    </div>
                    <span className="text-sm text-text-light dark:text-zinc-500 leading-relaxed">
                      {row.description}
                    </span>
                  </div>

                  {/* Column 2 (Mobile) */}
                  <div className="py-8 flex items-center justify-center">
                    <span className="text-base font-medium text-text-dark dark:text-zinc-300">
                      {row.mobileRate}
                    </span>
                  </div>

                  {/* Column 3 (Land line) */}
                  <div className="py-8 flex items-center justify-center">
                    <span className="text-base font-medium text-text-dark dark:text-zinc-300">
                      {row.landlineRate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Action */}
        <div className="mt-16 flex flex-col items-center">
          <button 
            onClick={onDialerClick}
            className="btn-primary-gradient px-10 py-4 text-base flex items-center gap-2 group"
          >
            Make a Call
          </button>
        </div>
      </div>
    </section>
  );
}

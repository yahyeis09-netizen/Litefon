import React from 'react';
import { Globe2 } from 'lucide-react';
import { cn, getFlagUrl } from '@/src/lib/utils';

interface RateRow {
  country: string;
  iso: string;
  description: string;
  mobileRate: string;
  landlineRate: string;
}

const rateData: RateRow[] = [
  {
    country: "United Kingdom",
    iso: "gb",
    description: "Premium Tier-1 routing to all major networks.",
    mobileRate: "$0.012/min",
    landlineRate: "$0.004/min"
  },
  {
    country: "United States",
    iso: "us",
    description: "Crystal clear connections to all 50 states.",
    mobileRate: "$0.008/min",
    landlineRate: "$0.002/min"
  },
  {
    country: "United Arab Emirates",
    iso: "ae",
    description: "Direct interconnects for lowest latency.",
    mobileRate: "$0.145/min",
    landlineRate: "$0.120/min"
  },
  {
    country: "Germany",
    iso: "de",
    description: "High-availability routes for business calls.",
    mobileRate: "$0.015/min",
    landlineRate: "$0.005/min"
  }
];

interface RateRowExtended extends RateRow {
    iso: string;
}

const extendedRateData = rateData as RateRowExtended[];

interface RateTableSectionProps {
  onDialerClick?: () => void;
}

export default function RateTableSection({ onDialerClick }: RateTableSectionProps) {
  return (
    <section className="py-24 bg-white  transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6">
        {/* 1. Section Header Area (Center Aligned) */}
        <div className="flex flex-col items-center text-center mb-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white  border border-border-gray  shadow-sm mb-8">
            <Globe2 className="w-3.5 h-3.5 text-primary-blue" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary-blue">
              Global Rates
            </span>
          </div>
          
          {/* Heading */}
          <h2 className="text-[27px] sm:text-[33px] md:text-[45px] tracking-tight mb-6">
            <span className="block font-light text-text-light ">Get calling visualization</span>
            <span className="block font-bold text-text-dark ">with precision data</span>
          </h2>
          
          <p className="text-text-light  max-w-lg mx-auto leading-relaxed">
            Track the growth and engagement of your global communications with detailed analytics. 
            Understand what works and supercharge your reach.
          </p>
        </div>

        <div className="w-full">
          {/* Table Header - Desktop Only */}
          <div className="hidden sm:grid sm:grid-cols-[2fr_1fr_1fr] border-b border-black/10 ">
            <div className="py-6 text-left">
              <span className="text-sm font-bold text-text-dark  uppercase tracking-wider">Country Selection</span>
            </div>
            <div className="py-6 flex items-center justify-center">
              <span className="text-sm font-bold text-text-dark  uppercase tracking-wider">Mobile</span>
            </div>
            <div className="py-6 flex items-center justify-center">
              <span className="text-sm font-bold text-text-dark  uppercase tracking-wider">Land line</span>
            </div>
          </div>

          {/* Data Rows */}
          <div className="flex flex-col gap-6 sm:gap-0">
            {rateData.map((row, i) => (
              <div 
                key={i} 
                className={cn(
                  "flex flex-col sm:grid sm:grid-cols-[2fr_1fr_1fr] border-b border-black/5  hover:bg-soft-gray/30  transition-colors group",
                  "p-6 sm:p-0 rounded-2xl sm:rounded-none border border-gray-100 sm:border-0 sm:border-b"
                )}
              >
                {/* Section 1: Country & Description */}
                <div className="sm:py-8 flex flex-col items-start text-left">
                  <div className="flex items-center gap-3 mb-1">
                    <img 
                      src={getFlagUrl(row.iso)}
                      alt={row.country}
                      className="w-8 h-auto rounded-sm shadow-sm"
                    />
                    <span className="text-lg font-medium text-text-dark  group-hover:text-primary-blue transition-colors">
                      {row.country}
                    </span>
                  </div>
                  <span className="text-sm text-text-light  leading-relaxed">
                    {row.description}
                  </span>
                </div>

                {/* Section 2: Mobile Rate (Badge on Mobile, Column on Desktop) */}
                <div className="py-4 sm:py-8 flex items-center justify-between sm:justify-center border-t border-gray-50 sm:border-0 mt-4 sm:mt-0 pt-4 sm:pt-0">
                  <span className="sm:hidden text-xs font-bold text-text-light uppercase tracking-widest">Mobile</span>
                  <span className="text-base font-bold sm:font-medium text-text-dark ">
                    {row.mobileRate}
                  </span>
                </div>

                {/* Section 3: Landline Rate (Badge on Mobile, Column on Desktop) */}
                <div className="py-4 sm:py-8 flex items-center justify-between sm:justify-center border-t border-gray-50 sm:border-0">
                  <span className="sm:hidden text-xs font-bold text-text-light uppercase tracking-widest">Landline</span>
                  <span className="text-base font-bold sm:font-medium text-text-dark ">
                    {row.landlineRate}
                  </span>
                </div>
              </div>
            ))}
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

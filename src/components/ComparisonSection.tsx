import React from 'react';
import { Check, X, BarChart3 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface ComparisonRow {
  feature: string;
  description: string;
  litefon: React.ReactNode;
  competitorA: React.ReactNode;
  competitorB: React.ReactNode;
}

const comparisonData: ComparisonRow[] = [
  {
    feature: "Call Quality",
    description: "HD Voice with global low-latency routing.",
    litefon: <Check className="w-5 h-5 text-emerald-500" />,
    competitorA: <span className="text-sm text-text-light text-center">Standard<br/>Audio</span>,
    competitorB: <Check className="w-5 h-5 text-emerald-500" />
  },
  {
    feature: "Setup Time",
    description: "Time required to start making your first call.",
    litefon: <span className="text-sm font-medium text-text-dark text-center">Under<br/>60 Seconds</span>,
    competitorA: <span className="text-sm text-text-light text-center">2-3 Business<br/>Days</span>,
    competitorB: <span className="text-sm text-text-light text-center">15-30<br/>Minutes</span>
  },
  {
    feature: "Global Coverage",
    description: "Ability to call any mobile or landline worldwide.",
    litefon: <Check className="w-5 h-5 text-emerald-500" />,
    competitorA: <Check className="w-5 h-5 text-emerald-500" />,
    competitorB: <X className="w-5 h-5 text-rose-500" />
  },
  {
    feature: "Hidden Fees",
    description: "Connection fees, maintenance, or minimums.",
    litefon: <X className="w-5 h-5 text-rose-500" />,
    competitorA: <Check className="w-5 h-5 text-emerald-500" />,
    competitorB: <Check className="w-5 h-5 text-emerald-500" />
  },
  {
    feature: "Browser Integration",
    description: "Direct dialer access without software installs.",
    litefon: <Check className="w-5 h-5 text-emerald-500" />,
    competitorA: <X className="w-5 h-5 text-rose-500" />,
    competitorB: <X className="w-5 h-5 text-rose-500" />
  }
];

export default function ComparisonSection() {
  return (
    <section className="py-24 bg-white dark:bg-bg-dark transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6">
        {/* 1. Section Header Area */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-gray dark:border-white/10 bg-white dark:bg-zinc-800 shadow-sm mb-6">
            <BarChart3 className="w-3.5 h-3.5 text-primary-blue" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-text-light dark:text-zinc-400">Comparison</span>
          </div>
        </div>

        {/* 2. Comparison Table / Grid Layout */}
        <div className="overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0">
          <div className="grid grid-cols-[280px_1fr_1fr_1fr] md:grid-cols-[2fr_1fr_1fr_1fr] min-w-[600px] md:min-w-0 w-full">
          {/* 3. Table Header Row */}
          <div className="py-6 border-b border-border-gray dark:border-white/10">
            <span className="font-bold text-text-dark dark:text-white">Features</span>
          </div>
          <div className="py-6 border-b border-border-gray dark:border-white/10 flex items-center justify-center">
            <span className="brand-litefon text-primary-blue">Litefon</span>
          </div>
          <div className="py-6 border-b border-border-gray dark:border-white/10 flex items-center justify-center">
            <span className="font-bold text-text-light dark:text-zinc-500">Google Voice</span>
          </div>
          <div className="py-6 border-b border-border-gray dark:border-white/10 flex items-center justify-center">
            <span className="font-bold text-text-light dark:text-zinc-500">Viber</span>
          </div>

          {/* 4. Table Data Rows */}
          {comparisonData.map((row, index) => (
            <React.Fragment key={index}>
              {/* Column 1: Feature Detail */}
              <div className="py-8 border-b border-gray-100 dark:border-white/5 flex flex-col items-start text-left">
                <span className="text-base font-semibold text-text-dark dark:text-white mb-1">{row.feature}</span>
                <span className="text-sm text-text-light dark:text-zinc-400 leading-relaxed">{row.description}</span>
              </div>
              
              {/* Columns 2, 3, & 4: Competitor Values */}
              <div className="py-8 border-b border-gray-100 dark:border-white/5 flex items-center justify-center bg-primary-blue/[0.02] dark:bg-primary-blue/[0.05]">
                <div className="flex flex-col items-center justify-center text-center dark:text-white">
                  {row.litefon}
                </div>
              </div>
              <div className="py-8 border-b border-gray-100 dark:border-white/5 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center text-center dark:text-zinc-400">
                  {row.competitorA}
                </div>
              </div>
              <div className="py-8 border-b border-gray-100 dark:border-white/5 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center text-center dark:text-zinc-400">
                  {row.competitorB}
                </div>
              </div>
            </React.Fragment>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}

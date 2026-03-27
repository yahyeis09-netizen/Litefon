import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Globe2, 
  Calculator, 
  ChevronRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { cn, getFlagUrl } from '@/src/lib/utils';
import Navbar from './Navbar';
import { Footer } from './Sections';
import FAQSection from './FAQSection';

interface Country {
  name: string;
  code: string;
  iso: string;
  rate: number;
}

const countries: Country[] = [
  { name: 'United States', code: '+1', iso: 'us', rate: 0.02 },
  { name: 'United Kingdom', code: '+44', iso: 'gb',  rate: 0.03 },
  { name: 'Canada', code: '+1', iso: 'ca', rate: 0.02 },
  { name: 'Germany', code: '+49', iso: 'de', rate: 0.04 },
  { name: 'France', code: '+33', iso: 'fr', rate: 0.04 },
  { name: 'Australia', code: '+61', iso: 'au', rate: 0.05 },
  { name: 'India', code: '+91', iso: 'in', rate: 0.01 },
  { name: 'China', code: '+86', iso: 'cn', rate: 0.02 },
  { name: 'Japan', code: '+81', iso: 'jp', rate: 0.06 },
  { name: 'Brazil', code: '+55', iso: 'br', rate: 0.08 },
  { name: 'Mexico', code: '+52', iso: 'mx', rate: 0.03 },
  { name: 'Italy', code: '+39', iso: 'it', rate: 0.04 },
  { name: 'Spain', code: '+34', iso: 'es', rate: 0.04 },
  { name: 'Russia', code: '+7', iso: 'ru', rate: 0.05 },
  { name: 'South Korea', code: '+82', iso: 'kr', rate: 0.04 },
];

export default function RatesPage({ onBack, onAuthClick }: { onBack: () => void; onAuthClick: () => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [calcCountry, setCalcCountry] = useState(countries[0]);
  const [calcMinutes, setCalcMinutes] = useState('10');

  const filteredCountries = countries.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.code.includes(searchQuery)
  );

  const calculatedCost = (parseFloat(calcMinutes) || 0) * calcCountry.rate;

  return (
    <div className="min-h-screen bg-soft-gray flex flex-col transition-colors duration-300">
      <Navbar 
        isLoggedIn={false} 
        onLogoClick={onBack} 
        onAuthClick={onAuthClick} 
        onRatesClick={() => {}} 
      />

      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Hero Section */}
          <div className="text-center mb-10 sm:mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl md:text-6xl font-bold text-text-dark mb-4 sm:mb-6 tracking-tight"
            >
              Transparent Global Rates
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-base sm:text-xl text-text-light max-w-2xl mx-auto px-2"
            >
              Connect with the world at the most competitive prices. No hidden fees, no surprises.
            </motion.p>
          </div>

          <div className="flex flex-col lg:grid lg:grid-cols-[1fr_380px] gap-8 lg:gap-12 items-start">
            {/* Left: Rates List */}
            <div className="space-y-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search country or area code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border-gray bg-white text-text-dark focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue outline-none transition-all shadow-sm"
                />
              </div>

              <div className="bg-white rounded-3xl border border-border-gray overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-soft-gray border-b border-border-gray">
                        <th className="px-8 py-4 text-xs font-bold text-text-light uppercase tracking-wider">Country</th>
                        <th className="px-8 py-4 text-xs font-bold text-text-light uppercase tracking-wider">Code</th>
                        <th className="px-8 py-4 text-xs font-bold text-text-light uppercase tracking-wider">Rate (per min)</th>
                        <th className="px-8 py-4 text-xs font-bold text-text-light uppercase tracking-wider text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-gray">
                      {filteredCountries.map((country) => (
                        <tr key={country.name} className="hover:bg-soft-gray transition-colors group">
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-3">
                              <img 
                                src={getFlagUrl(country.iso)}
                                alt={country.name}
                                className="w-8 h-auto rounded-sm shadow-sm"
                              />
                              <span className="font-semibold text-text-dark">{country.name}</span>
                            </div>
                          </td>
                          <td className="px-8 py-5 text-text-light font-mono">{country.code}</td>
                          <td className="px-8 py-5">
                            <span className="font-bold text-text-dark">${country.rate.toFixed(2)}</span>
                          </td>
                          <td className="px-8 py-5 text-right">
                            <button className="text-primary-blue font-bold hover:text-secondary-blue inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                              Call Now <ChevronRight className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right: Calculator & Features */}
            <div className="space-y-8">
              {/* Rate Calculator */}
              <div className="bg-white rounded-3xl border border-border-gray p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary-blue/5 flex items-center justify-center">
                    <Calculator className="w-6 h-6 text-primary-blue" />
                  </div>
                  <h2 className="text-[17px] font-bold text-text-dark">Rate Calculator</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-text-light uppercase tracking-wider mb-2">Select Country</label>
                    <select 
                      value={calcCountry.name}
                      onChange={(e) => setCalcCountry(countries.find(c => c.name === e.target.value) || countries[0])}
                      className="w-full px-4 py-3 rounded-xl border border-border-gray bg-white text-text-dark focus:ring-2 focus:ring-primary-blue/20 outline-none transition-all"
                    >
                      {countries.map(c => (
                        <option key={c.name} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-light uppercase tracking-wider mb-2">Minutes</label>
                    <input 
                      type="number" 
                      value={calcMinutes}
                      onChange={(e) => setCalcMinutes(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border-gray bg-white text-text-dark focus:ring-2 focus:ring-primary-blue/20 outline-none transition-all"
                      placeholder="Enter minutes"
                    />
                  </div>

                  <div className="pt-6 border-t border-dashed border-border-gray">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-text-light text-sm">Estimated Cost</span>
                      <span className="text-2xl font-bold text-primary-blue">${calculatedCost.toFixed(2)}</span>
                    </div>
                    <p className="text-[10px] text-text-light text-center italic">
                      *Rates are subject to change based on carrier updates.
                    </p>
                  </div>

                  <button 
                    onClick={onAuthClick}
                    className="w-full py-4 bg-primary-blue text-white rounded-2xl font-bold shadow-lg shadow-primary-blue/20 hover:bg-secondary-blue transition-all active:scale-[0.98]"
                  >
                    Get Started Now
                  </button>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="bg-text-dark rounded-3xl p-8 text-white space-y-6">
                <h3 className="text-lg font-bold">Why Litefon?</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Zap className="w-5 h-5 text-primary-blue shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">Instant Connection</p>
                      <p className="text-xs text-text-light">Crystal clear voice quality across 200+ countries.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <ShieldCheck className="w-5 h-5 text-primary-blue shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">Secure & Private</p>
                      <p className="text-xs text-text-light">End-to-end encryption for all your business calls.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Globe2 className="w-5 h-5 text-primary-blue shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">Global Reach</p>
                      <p className="text-xs text-text-light">Local numbers available in 50+ countries.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 sm:mt-32">
          <FAQSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}

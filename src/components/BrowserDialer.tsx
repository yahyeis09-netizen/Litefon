import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, History, Globe, DollarSign, Delete, X, ChevronDown, Trash2, Search } from 'lucide-react';
import { cn, getFlagUrl } from '@/src/lib/utils';

interface CallRecord {
  id: string;
  number: string;
  timestamp: Date;
  duration: string;
  type: 'incoming' | 'outgoing';
}

const COUNTRIES = [
  { code: 'US', name: 'United States', prefix: '+1' },
  { code: 'GB', name: 'United Kingdom', prefix: '+44' },
  { code: 'CA', name: 'Canada', prefix: '+1' },
  { code: 'AU', name: 'Australia', prefix: '+61' },
  { code: 'DE', name: 'Germany', prefix: '+49' },
  { code: 'FR', name: 'France', prefix: '+33' },
  { code: 'IN', name: 'India', prefix: '+91' },
  { code: 'JP', name: 'Japan', prefix: '+81' },
  { code: 'BR', name: 'Brazil', prefix: '+55' },
  { code: 'CN', name: 'China', prefix: '+86' },
  { code: 'IT', name: 'Italy', prefix: '+39' },
  { code: 'ES', name: 'Spain', prefix: '+34' },
  { code: 'MX', name: 'Mexico', prefix: '+52' },
  { code: 'RU', name: 'Russia', prefix: '+7' },
  { code: 'KR', name: 'South Korea', prefix: '+82' },
  { code: 'ZA', name: 'South Africa', prefix: '+27' },
  { code: 'NG', name: 'Nigeria', prefix: '+234' },
  { code: 'EG', name: 'Egypt', prefix: '+20' },
  { code: 'AE', name: 'United Arab Emirates', prefix: '+971' },
  { code: 'SG', name: 'Singapore', prefix: '+65' },
  { code: 'TR', name: 'Turkey', prefix: '+90' },
  { code: 'SA', name: 'Saudi Arabia', prefix: '+966' },
  { code: 'NL', name: 'Netherlands', prefix: '+31' },
  { code: 'CH', name: 'Switzerland', prefix: '+41' },
  { code: 'SE', name: 'Sweden', prefix: '+46' },
  { code: 'NO', name: 'Norway', prefix: '+47' },
  { code: 'PL', name: 'Poland', prefix: '+48' },
  { code: 'AR', name: 'Argentina', prefix: '+54' },
  { code: 'CO', name: 'Colombia', prefix: '+57' },
  { code: 'MY', name: 'Malaysia', prefix: '+60' },
  { code: 'ID', name: 'Indonesia', prefix: '+62' },
  { code: 'PH', name: 'Philippines', prefix: '+63' },
  { code: 'NZ', name: 'New Zealand', prefix: '+64' },
  { code: 'TH', name: 'Thailand', prefix: '+66' },
  { code: 'VN', name: 'Vietnam', prefix: '+84' },
  { code: 'PK', name: 'Pakistan', prefix: '+92' },
  { code: 'BD', name: 'Bangladesh', prefix: '+880' },
  { code: 'IE', name: 'Ireland', prefix: '+353' },
  { code: 'BE', name: 'Belgium', prefix: '+32' },
  { code: 'AT', name: 'Austria', prefix: '+43' },
];

export default function BrowserDialer() {
  const [number, setNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [showCountrySelect, setShowCountrySelect] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [balance, setBalance] = useState(25.00);
  const [history, setHistory] = useState<CallRecord[]>([
    { id: '1', number: '+1 212 555 0123', timestamp: new Date(), duration: '5:24', type: 'outgoing' },
    { id: '2', number: '+44 20 7946 0000', timestamp: new Date(Date.now() - 86400000), duration: '12:10', type: 'outgoing' },
  ]);
  const [showHistory, setShowHistory] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleDigit = (digit: string) => {
    if (number.length < 15) {
      setNumber(prev => prev + digit);
    }
  };

  const handleDelete = () => {
    setNumber(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    setNumber('');
  };

  const handleCall = () => {
    if (!number) return;
    if (balance < 0.50) {
      setError('Insufficient balance. Please top up.');
      return;
    }
    
    // Mock call logic
    const fullNumber = `${selectedCountry.prefix} ${number}`;
    const newRecord: CallRecord = {
      id: Math.random().toString(36).substr(2, 9),
      number: fullNumber,
      timestamp: new Date(),
      duration: '0:00',
      type: 'outgoing'
    };
    setHistory([newRecord, ...history]);
    setBalance(prev => prev - 0.50); // Deduct $0.50 per call
    console.log('Calling', fullNumber);
  };

  const handleTopUp = () => {
    setBalance(prev => prev + 10.00);
  };

  const filteredCountries = COUNTRIES.filter(c => 
    c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
    c.prefix.includes(countrySearch)
  );

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-[40px] overflow-hidden shadow-2xl border border-slate-100">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary-blue animate-pulse" />
          <span className="text-[10px] font-bold text-text-light uppercase tracking-[0.2em]">Browser Dialer</span>
        </div>
        <div className="flex items-center gap-3">
          <motion.div 
            key={balance}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm"
          >
            <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-sm font-bold text-text-dark">{balance.toFixed(2)}</span>
          </motion.div>
          <button 
            onClick={handleTopUp}
            className="text-[10px] font-extrabold uppercase tracking-widest bg-primary-blue text-white px-3 py-1.5 rounded-full shadow-lg shadow-primary-blue/20 hover:bg-primary-blue-hover transition-all"
          >
            Top Up
          </button>
        </div>
      </div>

      {/* Display */}
      <div className="px-8 py-6 text-center min-h-[140px] flex flex-col justify-end relative">
        <AnimatePresence mode="wait">
          {!showHistory ? (
            <motion.div
              key="dialer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col h-full justify-between"
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="relative">
                  <button 
                    onClick={() => setShowCountrySelect(!showCountrySelect)}
                    className="flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200 transition-all group"
                  >
                    <img 
                      src={getFlagUrl(selectedCountry.code)}
                      alt={selectedCountry.name}
                      className="w-4 h-auto rounded-sm shadow-sm"
                    />
                    <span className="text-xs font-bold text-text-dark">{selectedCountry.prefix}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-text-light" />
                  </button>
                  
                  <AnimatePresence>
                    {showCountrySelect && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full left-0 mt-3 w-72 bg-white border border-slate-200 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-50 overflow-hidden"
                      >
                        <div className="p-4 border-b border-slate-100">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light" />
                            <input
                              type="text"
                              placeholder="Search countries..."
                              value={countrySearch}
                              onChange={(e) => setCountrySearch(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-primary-blue transition-all"
                              autoFocus
                            />
                          </div>
                        </div>
                        <div className="max-h-64 overflow-y-auto custom-scrollbar py-2">
                          {filteredCountries.map(c => (
                            <button
                              key={c.code}
                              onClick={() => {
                                setSelectedCountry(c);
                                setShowCountrySelect(false);
                                setCountrySearch('');
                              }}
                              className="w-full flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition-colors text-left"
                            >
                              <img 
                                src={getFlagUrl(c.code)}
                                alt={c.name}
                                className="w-5 h-auto rounded-sm shadow-sm"
                              />
                              <div className="flex flex-col">
                                <span className="text-xs font-bold text-text-dark">{c.name}</span>
                                <span className="text-[10px] text-text-light uppercase tracking-tighter">{c.prefix}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-4xl sm:text-5xl font-extrabold tracking-[-0.04em] text-text-dark mb-4 h-14 overflow-hidden text-ellipsis whitespace-nowrap">
                  {number || <span className="text-slate-200 font-medium">0000 000 000</span>}
                </div>
                
                <div className="h-4">
                  <AnimatePresence>
                    {error ? (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="text-[10px] text-red-500 font-black uppercase tracking-widest"
                      >
                        {error}
                      </motion.div>
                    ) : (
                      <div className="text-[10px] text-text-light font-bold uppercase tracking-[0.1em] flex items-center gap-1.5">
                        <Globe className="w-3 h-3" />
                        <span>$0.02 Per Minute Connection</span>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="history"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="h-full flex flex-col"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-text-dark">Call History</span>
                <button onClick={() => setShowHistory(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X className="w-5 h-5 text-text-light" />
                </button>
              </div>
              <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                {history.length > 0 ? (
                  history.map(item => (
                    <div key={item.id} className="flex justify-between items-center p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="text-left">
                        <div className="text-sm font-bold text-text-dark">{item.number}</div>
                        <div className="text-[10px] text-text-light font-bold">{item.timestamp.toLocaleDateString()}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-black text-primary-blue">{item.duration}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-10 text-text-light text-xs font-medium">No recent calls found</div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dial Pad */}
      {!showHistory && (
        <div className="p-8 pt-2">
          <div className="grid grid-cols-3 gap-y-5 gap-x-8 mb-10 place-items-center">
            {[
              { n: '1', l: '' }, { n: '2', l: 'ABC' }, { n: '3', l: 'DEF' },
              { n: '4', l: 'GHI' }, { n: '5', l: 'JKL' }, { n: '6', l: 'MNO' },
              { n: '7', l: 'PQRS' }, { n: '8', l: 'TUV' }, { n: '9', l: 'WXYZ' },
              { n: '*', l: '' }, { n: '0', l: '+' }, { n: '#', l: '' }
            ].map((digit) => (
              <button
                key={digit.n}
                onClick={() => handleDigit(digit.n)}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex flex-col items-center justify-center transition-all hover:bg-slate-50 active:scale-90 border border-transparent hover:border-slate-100 group"
              >
                <span className="text-3xl sm:text-4xl font-bold text-text-dark group-hover:text-primary-blue transition-colors">
                  {digit.n}
                </span>
                {digit.l && (
                  <span className="text-[10px] font-bold text-slate-300 group-hover:text-primary-blue/40 uppercase tracking-tighter">
                    {digit.l}
                  </span>
                )}
              </button>
            ))}
          </div>
          
          <div className="flex items-center justify-between px-4">
            <button
              onClick={() => setShowHistory(true)}
              className="w-14 h-14 rounded-full flex items-center justify-center text-text-light hover:bg-slate-50 hover:text-text-dark transition-all border border-slate-100"
              title="History"
            >
              <History className="w-6 h-6" />
            </button>
            
            <button
              onClick={handleCall}
              disabled={!number}
              className={cn(
                "w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-xl group",
                number 
                  ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/30 scale-110 active:scale-95" 
                  : "bg-slate-100 text-slate-300 cursor-not-allowed border border-slate-200 shadow-none"
              )}
            >
              <Phone className="w-8 h-8 fill-current" />
            </button>

            <button
              onClick={handleDelete}
              onDoubleClick={handleClear}
              className="w-14 h-14 rounded-full flex items-center justify-center text-text-light hover:bg-red-50 hover:text-red-500 transition-all border border-slate-100 group"
              title="Delete (Double click to clear)"
            >
              <Delete className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="py-4 bg-slate-50/80 text-center border-t border-slate-100">
        <p className="text-[9px] font-black text-text-light uppercase tracking-[0.3em]">
          End-to-End Secure Connection
        </p>
      </div>
    </div>
  );
}

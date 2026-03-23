import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, History, Globe, DollarSign, Delete, X, ChevronDown, Trash2, Search } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface CallRecord {
  id: string;
  number: string;
  timestamp: Date;
  duration: string;
  type: 'incoming' | 'outgoing';
}

const COUNTRIES = [
  { code: 'US', name: 'United States', prefix: '+1', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', prefix: '+44', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', prefix: '+1', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', prefix: '+61', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', prefix: '+49', flag: '🇩🇪' },
  { code: 'FR', name: 'France', prefix: '+33', flag: '🇫🇷' },
  { code: 'IN', name: 'India', prefix: '+91', flag: '🇮🇳' },
  { code: 'JP', name: 'Japan', prefix: '+81', flag: '🇯🇵' },
  { code: 'BR', name: 'Brazil', prefix: '+55', flag: '🇧🇷' },
  { code: 'CN', name: 'China', prefix: '+86', flag: '🇨🇳' },
  { code: 'IT', name: 'Italy', prefix: '+39', flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', prefix: '+34', flag: '🇪🇸' },
  { code: 'MX', name: 'Mexico', prefix: '+52', flag: '🇲🇽' },
  { code: 'RU', name: 'Russia', prefix: '+7', flag: '🇷🇺' },
  { code: 'KR', name: 'South Korea', prefix: '+82', flag: '🇰🇷' },
  { code: 'ZA', name: 'South Africa', prefix: '+27', flag: '🇿🇦' },
  { code: 'NG', name: 'Nigeria', prefix: '+234', flag: '🇳🇬' },
  { code: 'EG', name: 'Egypt', prefix: '+20', flag: '🇪🇬' },
  { code: 'AE', name: 'United Arab Emirates', prefix: '+971', flag: '🇦🇪' },
  { code: 'SG', name: 'Singapore', prefix: '+65', flag: '🇸🇬' },
  { code: 'TR', name: 'Turkey', prefix: '+90', flag: '🇹🇷' },
  { code: 'SA', name: 'Saudi Arabia', prefix: '+966', flag: '🇸🇦' },
  { code: 'NL', name: 'Netherlands', prefix: '+31', flag: '🇳🇱' },
  { code: 'CH', name: 'Switzerland', prefix: '+41', flag: '🇨🇭' },
  { code: 'SE', name: 'Sweden', prefix: '+46', flag: '🇸🇪' },
  { code: 'NO', name: 'Norway', prefix: '+47', flag: '🇳🇴' },
  { code: 'PL', name: 'Poland', prefix: '+48', flag: '🇵🇱' },
  { code: 'AR', name: 'Argentina', prefix: '+54', flag: '🇦🇷' },
  { code: 'CO', name: 'Colombia', prefix: '+57', flag: '🇨🇴' },
  { code: 'MY', name: 'Malaysia', prefix: '+60', flag: '🇲🇾' },
  { code: 'ID', name: 'Indonesia', prefix: '+62', flag: '🇮🇩' },
  { code: 'PH', name: 'Philippines', prefix: '+63', flag: '🇵🇭' },
  { code: 'NZ', name: 'New Zealand', prefix: '+64', flag: '🇳🇿' },
  { code: 'TH', name: 'Thailand', prefix: '+66', flag: '🇹🇭' },
  { code: 'VN', name: 'Vietnam', prefix: '+84', flag: '🇻🇳' },
  { code: 'PK', name: 'Pakistan', prefix: '+92', flag: '🇵🇰' },
  { code: 'BD', name: 'Bangladesh', prefix: '+880', flag: '🇧🇩' },
  { code: 'IE', name: 'Ireland', prefix: '+353', flag: '🇮🇪' },
  { code: 'BE', name: 'Belgium', prefix: '+32', flag: '🇧🇪' },
  { code: 'AT', name: 'Austria', prefix: '+43', flag: '🇦🇹' },
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
    <div className="w-full max-w-md mx-auto glass rounded-3xl overflow-hidden shadow-2xl border border-white/5">
      {/* Header */}
      <div className="p-6 border-bottom border-white/10 flex justify-between items-center bg-white/5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-medium text-text-secondary uppercase tracking-wider">Live Browser Dialer</span>
        </div>
        <div className="flex items-center gap-3">
          <motion.div 
            key={balance}
            initial={{ scale: 1.2, color: '#BBFF00' }}
            animate={{ scale: 1, color: '#BBFF00' }}
            className="flex items-center gap-1 bg-black/40 px-3 py-1 rounded-full border border-primary/20 shadow-[0_0_10px_rgba(187,255,0,0.1)]"
          >
            <DollarSign className="w-3 h-3" />
            <span className="text-sm font-bold">{balance.toFixed(2)}</span>
          </motion.div>
          <button 
            onClick={handleTopUp}
            className="text-[10px] font-bold uppercase tracking-wider bg-white/5 hover:bg-white/10 px-2 py-1 rounded-md border border-white/10 transition-colors"
          >
            Top Up
          </button>
        </div>
      </div>

      {/* Display */}
      <div className="p-8 text-center min-h-[140px] flex flex-col justify-center relative">
        <AnimatePresence mode="wait">
          {!showHistory ? (
            <motion.div
              key="dialer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="relative">
                  <button 
                    onClick={() => setShowCountrySelect(!showCountrySelect)}
                    className="flex items-center gap-1 bg-white/5 hover:bg-white/10 px-2 py-1 rounded-lg border border-white/10 transition-colors"
                  >
                    <span className="text-lg">{selectedCountry.flag}</span>
                    <span className="text-xs font-bold">{selectedCountry.prefix}</span>
                    <ChevronDown className="w-3 h-3 opacity-50" />
                  </button>
                  
                  <AnimatePresence>
                    {showCountrySelect && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-[#1A1A1A] border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 overflow-hidden backdrop-blur-xl"
                      >
                        <div className="p-3 border-b border-white/10 bg-white/5">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-secondary" />
                            <input
                              type="text"
                              placeholder="Search country or code..."
                              value={countrySearch}
                              onChange={(e) => setCountrySearch(e.target.value)}
                              className="w-full bg-black/40 border border-white/10 rounded-xl pl-9 pr-8 py-2 text-xs focus:outline-none focus:border-primary/50 transition-all placeholder:text-text-secondary/50"
                              autoFocus
                            />
                            {countrySearch && (
                              <button 
                                onClick={() => setCountrySearch('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-white transition-colors"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="max-h-64 overflow-y-auto custom-scrollbar py-1">
                          {filteredCountries.length > 0 ? (
                            filteredCountries.map(c => (
                              <button
                                key={c.code}
                                onClick={() => {
                                  setSelectedCountry(c);
                                  setShowCountrySelect(false);
                                  setCountrySearch('');
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-primary/10 hover:text-primary transition-all text-left group"
                              >
                                <span className="text-xl group-hover:scale-110 transition-transform">{c.flag}</span>
                                <div className="flex flex-col">
                                  <span className="text-xs font-semibold">{c.name}</span>
                                  <span className="text-[10px] text-text-secondary group-hover:text-primary/70">{c.code}</span>
                                </div>
                                <span className="text-xs font-mono text-text-secondary ml-auto group-hover:text-primary">{c.prefix}</span>
                              </button>
                            ))
                          ) : (
                            <div className="px-4 py-8 text-xs text-text-secondary text-center italic flex flex-col items-center gap-2">
                              <Globe className="w-8 h-8 opacity-20" />
                              No countries found
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="h-4 w-[1px] bg-white/10" />
                <div className="text-[10px] font-bold text-primary uppercase tracking-wider">
                  $0.02 / min
                </div>
              </div>

              <div className="text-4xl font-bold tracking-tighter h-10 overflow-hidden text-ellipsis whitespace-nowrap">
                {number || <span className="text-white/10">(555) 000-0000</span>}
              </div>
              <div className="h-4">
                <AnimatePresence>
                  {error ? (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-[10px] text-red-400 font-bold uppercase tracking-wider"
                    >
                      {error}
                    </motion.div>
                  ) : (
                    <div className="text-xs text-text-secondary flex items-center justify-center gap-1">
                      <Globe className="w-3 h-3" />
                      <span>Validation: {number.length > 0 ? (number.length >= 10 ? 'Valid Format' : 'Too Short') : 'Enter Number'}</span>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="h-full"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-bold uppercase tracking-widest text-primary">Recent Calls</span>
                <button onClick={() => setShowHistory(false)} className="text-text-secondary hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {history.map(item => (
                  <div key={item.id} className="flex justify-between items-center p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="text-left">
                      <div className="text-sm font-medium">{item.number}</div>
                      <div className="text-[10px] text-text-secondary">{item.timestamp.toLocaleDateString()}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-mono">{item.duration}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dial Pad */}
      {!showHistory && (
        <div className="p-6 pt-0 grid grid-cols-3 gap-6 place-items-center">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((digit) => (
            <button
              key={digit}
              onClick={() => handleDigit(digit.toString())}
              className="w-16 h-16 rounded-full bg-white/5 hover:bg-white/10 active:bg-primary active:text-black transition-all flex flex-col items-center justify-center group"
            >
              <span className="text-2xl font-semibold">{digit}</span>
              {digit === 0 && <span className="text-[10px] text-text-secondary group-active:text-black/60">+</span>}
            </button>
          ))}
          
          <button
            onClick={() => setShowHistory(true)}
            className="w-16 h-16 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <History className="w-6 h-6 text-text-secondary" />
          </button>
          
          <button
            onClick={handleCall}
            disabled={!number}
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center transition-all",
              number ? "bg-primary text-black shadow-[0_0_20px_rgba(187,255,0,0.3)] hover:scale-105" : "bg-white/5 text-white/20 cursor-not-allowed"
            )}
          >
            <Phone className="w-6 h-6 fill-current" />
          </button>

          <div className="flex gap-2">
            <button
              onClick={handleDelete}
              className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              title="Delete"
            >
              <Delete className="w-5 h-5 text-text-secondary" />
            </button>
            <button
              onClick={handleClear}
              className="w-12 h-12 rounded-full bg-white/5 hover:bg-red-500/20 flex items-center justify-center transition-colors"
              title="Clear All"
            >
              <Trash2 className="w-5 h-5 text-red-400" />
            </button>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="p-4 bg-black/20 text-center border-t border-white/5">
        <p className="text-[10px] text-text-secondary uppercase tracking-[0.2em]">
          Encrypted VoIP Connection Secure
        </p>
      </div>
    </div>
  );
}

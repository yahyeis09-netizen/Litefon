import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Grid, 
  Users, 
  Clock, 
  CreditCard, 
  Hash, 
  Delete, 
  Phone, 
  Search, 
  ChevronDown,
  X,
  ArrowLeft,
  ArrowRight,
  Plus,
  Moon,
  Sun,
  LogOut,
  Menu,
  ShieldCheck,
  Calculator,
  Info,
  Calendar,
  Globe2,
  Wallet
} from 'lucide-react';
import { cn, getFlagUrl } from '@/src/lib/utils';
import FAQSection from '@/src/components/FAQSection';
import Testimonials from '@/src/components/Testimonials';
import { Footer } from '@/src/components/Sections';

// --- Types ---

interface Country {
  name: string;
  code: string;
  iso: string;
  rate: number;
}

const countries: Country[] = [
  { name: 'United States', code: '+1', iso: 'us', rate: 0.02 },
  { name: 'United Kingdom', code: '+44', iso: 'gb', rate: 0.03 },
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
  { name: 'Netherlands', code: '+31', iso: 'nl', rate: 0.03 },
  { name: 'Switzerland', code: '+41', iso: 'ch', rate: 0.05 },
  { name: 'Sweden', code: '+46', iso: 'se', rate: 0.04 },
  { name: 'Norway', code: '+47', iso: 'no', rate: 0.04 },
  { name: 'Denmark', code: '+45', iso: 'dk', rate: 0.04 },
  { name: 'Singapore', code: '+65', iso: 'sg', rate: 0.02 },
  { name: 'South Korea', code: '+82', iso: 'kr', rate: 0.03 },
];

// --- Sub-Views ---

const ActivityView = () => {
  const history = [
    {
      id: 1,
      number: "+43 444 44444444",
      date: "5/31/2025",
      time: "11:36 AM",
      from: { name: "Austria", iso: "at", number: "+43 1 2345678" },
      status: "Completed",
      duration: "5:24 min",
      cost: "$1.25",
      special: true
    },
    {
      id: 2,
      number: "+44 20 7946 0123",
      date: "5/30/2025",
      time: "09:15 AM",
      from: { name: "United Kingdom", iso: "gb" },
      status: "No answer",
      duration: "0:00 min",
      cost: "$0.00",
      special: false
    },
    {
      id: 3,
      number: "+1 (212) 555-0198",
      date: "5/29/2025",
      time: "10:45 PM",
      from: { name: "United States", iso: "us" },
      status: "Completed",
      duration: "12:10 min",
      cost: "$0.60",
      special: false
    },
    {
      id: 4,
      number: "+49 30 123456",
      date: "5/28/2025",
      time: "02:20 PM",
      from: { name: "Germany", iso: "de" },
      status: "Completed",
      duration: "3:45 min",
      cost: "$0.45",
      special: false
    },
    {
      id: 5,
      number: "+33 1 42 68 53 00",
      date: "5/27/2025",
      time: "08:10 AM",
      from: { name: "France", iso: "fr" },
      status: "No answer",
      duration: "0:00 min",
      cost: "$0.00",
      special: false
    },
    {
      id: 6,
      number: "+34 91 123 4567",
      date: "5/26/2025",
      time: "03:45 PM",
      from: { name: "Spain", iso: "es" },
      status: "Completed",
      duration: "8:20 min",
      cost: "$0.95",
      special: false
    },
    {
      id: 7,
      number: "+39 06 1234 5678",
      date: "5/25/2025",
      time: "11:20 AM",
      from: { name: "Italy", iso: "it" },
      status: "Completed",
      duration: "4:15 min",
      cost: "$0.50",
      special: false
    },
    {
      id: 8,
      number: "+81 3 1234 5678",
      date: "5/24/2025",
      time: "09:30 PM",
      from: { name: "Japan", iso: "jp" },
      status: "Completed",
      duration: "15:45 min",
      cost: "$1.80",
      special: false
    },
    {
      id: 9,
      number: "+61 2 9876 5432",
      date: "5/23/2025",
      time: "02:15 PM",
      from: { name: "Australia", iso: "au" },
      status: "Completed",
      duration: "6:12 min",
      cost: "$0.75",
      special: false
    },
    {
      id: 10,
      number: "+1 (416) 555-0123",
      date: "5/22/2025",
      time: "10:00 AM",
      from: { name: "Canada", iso: "ca" },
      status: "Completed",
      duration: "2:30 min",
      cost: "$0.30",
      special: false
    }
  ];

  return (
    <div className="flex-grow min-h-0 overflow-y-auto no-scrollbar">
      <div className="p-4 max-w-6xl mx-auto w-full py-8">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-2 text-text-dark">Call History</h1>
          <p className="text-text-light">Review your recent international calls and costs.</p>
        </div>

        <div className="space-y-4">
          {history.map((call) => (
            <div 
              key={call.id} 
              className={cn(
                "rounded-3xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 transition-all border",
                call.special 
                  ? "bg-white border-gray-200 shadow-sm"
                  : "bg-gray-50 border-gray-100"
              )}
            >
              {/* Left Column */}
              <div className="flex flex-col gap-4 flex-grow w-full md:w-auto">
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="text-xl font-bold text-text-dark">
                    {call.number}
                  </span>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-colors bg-gray-200 text-text-dark hover:bg-gray-300">
                    <Phone className="w-3 h-3" />
                    Call again
                  </button>
                </div>
                
                <div className="flex items-center gap-6 text-sm text-text-light flex-wrap">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary-blue" />
                    <span>{call.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary-blue" />
                    <span>{call.time}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <span className="text-text-light">From:</span>
                  <img 
                    src={getFlagUrl(call.from.iso)} 
                    alt={call.from.name}
                    className="w-5 h-auto rounded-sm shadow-sm"
                  />
                  <span className="font-semibold text-text-dark">
                    {call.from.name} {call.from.number && <span className="text-text-light font-normal ml-1">({call.from.number})</span>}
                  </span>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3 text-right w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                <span className={cn(
                  "px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest",
                  call.status === 'Completed' 
                    ? "bg-emerald-100 text-emerald-700" 
                    : "bg-yellow-100 text-yellow-700"
                )}>
                  {call.status}
                </span>
                <div className="space-y-1">
                  <p className="text-sm text-text-light">Duration: <span className="font-bold text-text-dark">{call.duration}</span></p>
                  <p className="text-sm text-text-light">Cost: <span className="font-bold text-lg text-primary-blue">{call.cost}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="-mx-6 mt-12">
          <FAQSection />
          <Footer />
        </div>
      </div>
    </div>
  );
};

const BillingView = ({ balance, onTopUp }: { balance: number; onTopUp: (amount: number) => void }) => {
  const packages = [
    { amount: 5, bonus: null, popular: false },
    { amount: 10, bonus: null, popular: false },
    { amount: 20, bonus: null, popular: true },
    { amount: 50, bonus: "5% BONUS", popular: false },
    { amount: 100, bonus: "10% BONUS", popular: false },
  ];
  const [selected, setSelected] = useState(20);

  return (
    <div className="flex-grow min-h-0 overflow-y-auto no-scrollbar">
      <div className="p-4 max-w-6xl mx-auto w-full py-8">
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 items-start">
          
          {/* Left Pane: Credit Package */}
          <div className="space-y-8">
            <div className="bg-white border-gray-200 rounded-3xl border p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                    <Calculator className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h1 className="text-2xl font-bold text-text-dark">Select Your Credit Package</h1>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-xs uppercase tracking-widest font-bold opacity-60 mb-1 text-text-light">Current Balance</p>
                  <p className="text-2xl font-bold text-primary-blue">${balance.toFixed(2)}</p>
                </div>
              </div>
              
              <p className="mb-8 text-text-light">
                Top up your credits to continue making international calls at our best rates.
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-6 text-text-dark">
                    Select Top-up Amount (USD)*
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                    {packages.map((pkg) => (
                      <button
                        key={pkg.amount}
                        onClick={() => setSelected(pkg.amount)}
                        className={cn(
                          "relative h-24 rounded-2xl border-2 transition-all flex flex-col items-center justify-center",
                          selected === pkg.amount
                            ? "bg-emerald-50 border-emerald-500 text-emerald-700"
                            : "bg-white border-gray-100 hover:border-gray-200 text-text-dark",
                          pkg.popular && "border-emerald-500 ring-1 ring-emerald-500/20"
                        )}
                      >
                        {pkg.popular && (
                          <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                            Most Popular
                          </span>
                        )}
                        {pkg.bonus && (
                          <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary-blue text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                            {pkg.bonus}
                          </span>
                        )}
                        <span className="text-2xl font-bold">${pkg.amount}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl border bg-gray-50 border-gray-100">
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      id="auto-topup-dialer"
                      className="w-5 h-5 rounded border-gray-300 text-primary-blue focus:ring-primary-blue"
                    />
                    <label htmlFor="auto-topup-dialer" className="text-sm font-bold text-text-dark">
                      Enable Auto Top-up
                    </label>
                    <span className="hidden md:inline-flex px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider">
                      AVOID INTERRUPTING IMPORTANT CALLS
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Pane: Payment Form */}
          <div className="bg-white border-gray-200 rounded-3xl border p-6 sm:p-8 shadow-lg">
            <div className="mb-8">
              <h2 className="text-[17px] font-bold mb-2 text-text-dark">Payment Detail</h2>
              <p className="text-sm text-text-light">Complete your purchase by filling your payment detail</p>
            </div>

            {/* Card Inputs */}
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-text-medium uppercase tracking-wider mb-2">Email address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 rounded-xl border outline-none transition-all bg-white border-gray-200 focus:border-primary-blue"
                  placeholder="hello@squareui.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-text-medium uppercase tracking-wider mb-2">Card number</label>
                <div className="relative">
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl border outline-none transition-all bg-white border-gray-200 focus:border-primary-blue"
                    placeholder="42 35 65 64 67"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-text-medium uppercase tracking-wider mb-2">Expiration Date</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl border outline-none transition-all bg-white border-gray-200 focus:border-primary-blue"
                    placeholder="MM / YY"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-medium uppercase tracking-wider mb-2 flex items-center gap-1">
                    Security Code <Info className="w-3 h-3" />
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl border outline-none transition-all bg-white border-gray-200 focus:border-primary-blue"
                    placeholder="CVC"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-text-medium uppercase tracking-wider mb-2">Cardholder Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border outline-none transition-all bg-white border-gray-200 focus:border-primary-blue"
                  placeholder="William Ashford"
                />
              </div>

              <div className="pt-4">
                <label className="block text-xs font-bold text-text-medium uppercase tracking-wider mb-4">Billing Address</label>
                <div className="space-y-3">
                  <select className="w-full px-4 py-3 rounded-xl border outline-none transition-all bg-white border-gray-200 focus:border-primary-blue">
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                  </select>
                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl border outline-none transition-all bg-white border-gray-200 focus:border-primary-blue"
                      placeholder="Zip code"
                    />
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl border outline-none transition-all bg-white border-gray-200 focus:border-primary-blue"
                      placeholder="City"
                    />
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="pt-8 border-t border-dashed space-y-3 border-gray-200">
                <div className="flex justify-between text-lg pt-2">
                  <span className="font-bold text-text-dark">Total</span>
                  <span className="font-bold text-primary-blue">${selected}.00</span>
                </div>
              </div>

              <button 
                onClick={() => onTopUp(selected)}
                className="w-full py-4 bg-primary-blue text-white rounded-2xl font-bold shadow-lg shadow-primary-blue/20 hover:bg-secondary-blue transition-all active:scale-[0.98]"
              >
                Pay ${selected}.00
              </button>

              <div className="flex items-center justify-center gap-2 text-text-light">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs">Payments are secured and encrypted</span>
              </div>
            </div>
          </div>

        </div>
        <div className="-mx-6 mt-12">
          <FAQSection />
          <Footer />
        </div>
      </div>
    </div>
  );
};

const BuyNumberView = () => {
  const numbers = [
    { number: '+1 (234) 995-958', country: 'United States', code: 'US', isPrimary: true },
    { number: '+1 (234) 995-959', country: 'United States', code: 'US', isPrimary: false },
    { number: '+1 (234) 995-960', country: 'United States', code: 'US', isPrimary: false },
    { number: '+1 (416) 555-0987', country: 'Canada', code: 'CA', isPrimary: false },
    { number: '+1 (604) 555-0111', country: 'Canada', code: 'CA', isPrimary: false },
    { number: '+1 (514) 555-0222', country: 'Canada', code: 'CA', isPrimary: false },
    { number: '+1 (780) 555-0333', country: 'Canada', code: 'CA', isPrimary: false },
    { number: '+1 (902) 555-0444', country: 'Canada', code: 'CA', isPrimary: false },
    { number: '+1 (204) 555-0555', country: 'Canada', code: 'CA', isPrimary: false },
    { number: '+1 (306) 555-0666', country: 'Canada', code: 'CA', isPrimary: false },
    { number: '+1 (250) 555-0777', country: 'Canada', code: 'CA', isPrimary: false },
    { number: '+1 (819) 555-0888', country: 'Canada', code: 'CA', isPrimary: false },
    { number: '+1 (705) 555-0999', country: 'Canada', code: 'CA', isPrimary: false },
    { number: '+1 (403) 555-0123', country: 'Canada', code: 'CA', isPrimary: false },
    { number: '+1 (506) 555-0456', country: 'Canada', code: 'CA', isPrimary: false },
    { number: '+1 (709) 555-0789', country: 'Canada', code: 'CA', isPrimary: false },
    { number: '+1 (867) 555-0000', country: 'Canada', code: 'CA', isPrimary: false },
    { number: '+1 (212) 555-0198', country: 'United States', code: 'US', isPrimary: false },
    { number: '+44 20 7946 0123', country: 'United Kingdom', code: 'GB', isPrimary: false },
    { number: '+44 161 123 4567', country: 'United Kingdom', code: 'GB', isPrimary: false },
    { number: '+49 30 123456', country: 'Germany', code: 'DE', isPrimary: false },
    { number: '+33 1 42 68 53 00', country: 'France', code: 'FR', isPrimary: false },
    { number: '+34 91 123 4567', country: 'Spain', code: 'ES', isPrimary: false },
    { number: '+39 06 1234 5678', country: 'Italy', code: 'IT', isPrimary: false },
    { number: '+81 3 1234 5678', country: 'Japan', code: 'JP', isPrimary: false },
    { number: '+61 2 9876 5432', country: 'Australia', code: 'AU', isPrimary: false },
  ];

  return (
    <div className="flex-grow flex flex-col min-h-0 overflow-y-auto no-scrollbar">
      <div className="p-4 max-w-6xl mx-auto w-full py-8 flex-grow flex flex-col">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div>
            <h2 className="text-[27px] font-bold mb-2 text-text-dark">Buy a Number</h2>
            <p className="text-text-light">Get a virtual number for your business communications.</p>
          </div>
          <div className="px-6 py-3 rounded-2xl border flex items-center gap-4 cursor-pointer hover:border-primary-blue transition-all group w-full md:w-auto bg-white border-border-gray shadow-sm">
            <div className="flex items-center gap-3">
              <img 
                src={getFlagUrl('us')} 
                alt="US" 
                className="w-5 h-auto rounded-sm grayscale group-hover:grayscale-0 transition-all" 
              />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-text-light">Primary No</p>
                <div className="flex items-center gap-2">
                  <p className="font-mono font-bold text-text-dark">+1 234 995 958</p>
                  <ChevronDown className="w-3.5 h-3.5 text-text-light group-hover:text-primary-blue transition-colors" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search area code or city"
            className={cn(
              "w-full pl-12 pr-4 py-4 rounded-2xl border-none focus:ring-2 focus:ring-primary-blue/20 transition-all shadow-sm bg-soft-gray text-text-dark"
            )}
          />
        </div>

        <div className="space-y-6 mb-20">
          {numbers.map((item, idx) => (
            <div 
              key={idx} 
              className={cn(
                "rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 transition-all border w-full group hover:shadow-md bg-white border-gray-200"
              )}
            >
              {/* Left Section */}
              <div className="flex flex-col gap-3 w-full sm:w-auto">
                <div className="flex items-center gap-4 flex-wrap">
                  {item.isPrimary && (
                    <div className="w-8 h-8 rounded-full bg-primary-blue/10 flex items-center justify-center">
                      <Plus className="w-4 h-4 text-primary-blue" />
                    </div>
                  )}
                  <span className="text-2xl font-bold tracking-tight text-text-dark">
                    {item.number}
                  </span>
                  {item.isPrimary && (
                    <img 
                      src={getFlagUrl(item.code)} 
                      alt={item.country}
                      className="w-6 h-auto rounded-sm shadow-sm"
                    />
                  )}
                </div>
                
                <div className="flex items-center gap-6 text-sm text-gray-500 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Globe2 className="w-4 h-4 text-primary-blue" />
                    <span>Virtual Number</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary-blue" />
                    <span>Instant Activation</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">From:</span>
                  <span className="font-bold text-text-dark">
                    {item.code} {item.country}
                  </span>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 text-right w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0">
                <span className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-green-100 text-blue-700">
                  BUY
                </span>
                <div className="space-y-1">
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">Monthly Cost</p>
                  <div className="flex items-center justify-end gap-1">
                    <span className="text-sm text-gray-500">Cost:</span>
                    <span className="font-bold text-2xl text-primary-blue">
                      $1.98
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Integrated Sections */}
        <div className="-mx-6 border-t border-border-gray mt-12">
          <FAQSection />
          <div className="bg-white">
            <Testimonials />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};


// --- Main Dialer App ---

interface DialerAppProps {
  onBack: () => void;
}

export default function DialerApp({ onBack }: DialerAppProps) {
  const [activeTab, setActiveTab] = useState<'dialpad' | 'rates' | 'buy' | 'billing' | 'history'>('dialpad');
  const [balance, setBalance] = useState(0.00);
  const [dialedNumber, setDialedNumber] = useState('');
  const [showCreditReminder, setShowCreditReminder] = useState(true);
  const [showWelcomeText, setShowWelcomeText] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [minutes, setMinutes] = useState(10);
  const [isCountryMenuOpen, setIsCountryMenuOpen] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showPrimaryNoMenu, setShowPrimaryNoMenu] = useState(false);
  const [creditMessage, setCreditMessage] = useState<string | null>(null);

  // Handle Primary No Click
  const handlePrimaryNoClick = () => {
    setDialedNumber('+1 234 995 958');
  };

  const callInterval = useRef<NodeJS.Timeout | null>(null);

  // Handle call logic
  useEffect(() => {
    if (isCalling) {
      callInterval.current = setInterval(() => {
        setCallDuration(prev => {
          const next = prev + 1;
          // Every 60 seconds, deduct rate
          if (next % 60 === 0) {
            setBalance(b => Math.max(0, b - selectedCountry.rate));
          }
          return next;
        });
      }, 1000);
    } else {
      if (callInterval.current) clearInterval(callInterval.current);
      setCallDuration(0);
    }
    return () => {
      if (callInterval.current) clearInterval(callInterval.current);
    };
  }, [isCalling, selectedCountry.rate]);

  const handleKeyPress = (num: string) => {
    if (dialedNumber.length < 15) {
      setDialedNumber(prev => prev + num);
    }
  };

  const handleBackspace = () => {
    setDialedNumber(prev => prev.slice(0, -1));
  };

  const toggleCall = () => {
    if (balance <= 0) {
      setCreditMessage("Insufficient funds. Please add credit.");
      setTimeout(() => setCreditMessage(null), 3000);
      return;
    }
    if (dialedNumber.length > 0) {
      setIsCalling(!isCalling);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredCountries = countries.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.code.includes(searchQuery)
  );

  const navLinks = [
    { name: 'dialpad', id: 'dialpad' },
    { name: 'rates', id: 'rates' },
    { name: 'Buy Number', id: 'buy' },
    { name: 'billing', id: 'billing' },
    { name: 'history', id: 'history' },
  ];

  return (
    <div className={cn(
      "fixed inset-0 z-[100] flex flex-col font-sans transition-colors duration-300",
      "bg-bg-main text-text-dark"
    )}>
      {/* Landing Page Style Navbar */}
      <nav className={cn(
        "w-full border-b px-6 py-4 transition-colors",
          "bg-white/80 border-border-gray",
          "backdrop-blur-lg sticky top-0 z-50"
        )}>
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-blue rounded-full flex items-center justify-center">
                <Phone className="text-white w-4 h-4 fill-current" />
              </div>
              <span className="brand-litefon text-text-dark">
                Litefon
              </span>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center md:gap-3 lg:gap-6">
              {navLinks.map((link) => (
                <button 
                  key={link.id} 
                  onClick={() => setActiveTab(link.id as any)}
                  className={cn(
                    "px-4 py-2 rounded-2xl transition-all flex items-center gap-2",
                    activeTab === link.id 
                      ? "bg-primary-blue/10 text-primary-blue" 
                      : "text-text-light hover:text-text-dark hover:bg-soft-gray"
                  )}
                >
                  <span className="text-sm font-medium capitalize">{link.name}</span>
                </button>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              <button 
                onClick={onBack}
                className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 border rounded-full transition-all border-border-gray bg-white text-text-medium hover:text-text-dark"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>

            {/* Mobile Toggle */}
            <button 
              className="md:hidden text-text-dark"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={cn(
                  "md:hidden overflow-y-auto max-h-[80vh] mt-4 no-scrollbar bg-white border-t border-border-gray"
                )}
              >
                <div className="flex flex-col py-6 gap-6">
                  {navLinks.map((link) => (
                    <button 
                      key={link.id} 
                      onClick={() => {
                        setActiveTab(link.id as any);
                        setIsMobileMenuOpen(false);
                      }}
                      className={cn(
                        "flex items-center gap-2 text-lg font-medium text-left p-2 rounded-xl transition-all",
                        activeTab === link.id 
                          ? "text-primary-blue font-bold bg-primary-blue/5" 
                          : "text-text-light"
                      )}
                    >
                      <span className="capitalize">{link.name}</span>
                    </button>
                  ))}
                  <button 
                    onClick={onBack}
                    className="flex items-center justify-center gap-2 text-lg font-semibold py-4 border rounded-2xl transition-all border-border-gray bg-white text-text-dark"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      <div className={cn(
        "flex-grow flex flex-col overflow-hidden relative w-full",
        "bg-bg-main"
      )}>
        {/* Balance Header (Compact) - Only show on Dialpad */}
        {activeTab === 'dialpad' && (
          <div className={cn(
            "px-4 sm:px-6 py-3 flex items-center justify-between border transition-colors max-w-[92%] sm:max-w-md mx-auto w-full relative mt-4 rounded-2xl shadow-sm gap-2",
            "bg-white border-border-gray"
          )}>
            {/* Left: Country Selector */}
            <button 
              onClick={() => setIsCountryMenuOpen(true)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 border rounded-full text-[11px] font-bold hover:border-primary-blue transition-all z-10",
                "bg-soft-gray border-border-gray text-text-dark"
              )}
            >
              <img 
                src={getFlagUrl(selectedCountry.iso)}
                alt={selectedCountry.name}
                className="w-4 h-auto rounded-sm shadow-sm"
              />
              <span>{selectedCountry.code}</span>
              <ChevronDown className="w-3 h-3 text-text-light" />
            </button>

            {/* Center: Vertical Stack (Name + Rate) */}
            <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
              <span className="text-xs font-medium text-text-dark">
                {selectedCountry.name}
              </span>
              <span className="text-[10px] font-normal text-text-light">
                ${selectedCountry.rate.toFixed(2)}/min
              </span>
            </div>
            
            {/* Right: Balance */}
            <div className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 border rounded-full transition-all z-10",
                "border-border-gray bg-white text-text-medium"
            )}>
              <Wallet className="w-3.5 h-3.5 text-primary-blue" />
              <span className="text-[11px] font-bold">${balance.toFixed(2)}</span>
            </div>
          </div>
        )}



        <div className="flex-grow flex flex-col overflow-hidden relative">
          <AnimatePresence mode="wait">
            {activeTab === 'dialpad' && (
              <motion.div 
                key="dialpad" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="flex-grow flex flex-col p-2 sm:p-4 pt-2 max-w-[447px] mx-auto w-full overflow-y-auto no-scrollbar"
              >
                {showCreditReminder && balance <= 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-2 relative shadow-sm mx-2 sm:mx-0 shrink-0"
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-primary-blue rounded-full p-1.5 shrink-0 mt-0.5">
                        <Info className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-[13px] font-bold text-text-dark mb-1">Add Credit to Call</h4>
                        <p className="text-[11px] leading-snug text-text-light mb-3">You need to add credit to your balance to make international calls.</p>
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => {
                              setShowCreditReminder(false);
                              setShowWelcomeText(false);
                              setCreditMessage("You can top up credits anytime from the Billing tab.");
                              setTimeout(() => setCreditMessage(null), 4000);
                            }}
                            className="text-[11px] font-bold bg-primary-blue text-white px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-secondary-blue transition-colors shadow-sm shadow-primary-blue/20"
                          >
                            Next <ArrowRight className="w-3 h-3" />
                          </button>
                          <button 
                            onClick={() => {
                              setShowCreditReminder(false);
                              setShowWelcomeText(false);
                            }}
                            className="text-[11px] font-bold text-text-light hover:text-text-dark transition-colors"
                          >
                            Skip
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Number Display */}
                <div className="flex flex-col items-center justify-end min-h-[90px] mb-4 md:mb-4 mt-2 px-4 text-center shrink-0">
                  <div className="w-full text-center min-h-[60px] flex items-center justify-center">
                    <span className={cn(
                      "font-bold tracking-tight break-all transition-all",
                      dialedNumber ? "text-text-dark" : "text-text-light/50",
                      dialedNumber.length > 10 ? "text-[28px] sm:text-[32px]" : "text-[32px] sm:text-[41px]"
                    )}>
                      {dialedNumber || (
                        showWelcomeText ? <span className="text-[20px] sm:text-[24px] font-medium leading-tight block">Welcome!<br/><span className="text-[14px] sm:text-[18px]">Enter a number to call</span></span> : <span className="text-[20px] sm:text-[24px] block">&nbsp;</span>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-center mt-2 mb-2 relative">
                    <button 
                      onClick={() => setShowPrimaryNoMenu(!showPrimaryNoMenu)}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1 rounded-full border shadow-sm cursor-pointer transition-colors active:scale-95",
                        "bg-black/5 border-black/10 hover:bg-black/10"
                      )}
                    >
                      <div className="relative flex items-center justify-center w-2 h-2">
                        <div className="absolute inset-0 rounded-full animate-ping bg-primary-blue/40" />
                        <div className="relative w-1.5 h-1.5 rounded-full shadow-sm bg-primary-blue" />
                      </div>
                      <span className="text-[10px] sm:text-xs font-semibold tracking-wide uppercase text-text-dark/80">
                        Primary No
                      </span>
                      <ChevronDown className={cn("w-3 h-3 text-text-light transition-transform", showPrimaryNoMenu && "rotate-180")} />
                    </button>

                    <AnimatePresence>
                      {showPrimaryNoMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-48 bg-white border border-border-gray rounded-2xl shadow-xl overflow-hidden z-[60]"
                        >
                          <div className="p-3 border-b border-border-gray bg-soft-gray/30">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-text-light mb-1">Actual Number</p>
                            <p className="text-sm font-mono font-bold text-text-dark">+1 234 995 958</p>
                          </div>
                          <button 
                            onClick={() => {
                              if (balance <= 0) {
                                setCreditMessage("Insufficient funds. Please add credit.");
                                setTimeout(() => setCreditMessage(null), 3000);
                              } else {
                                setActiveTab('buy');
                              }
                              setShowPrimaryNoMenu(false);
                            }}
                            className="w-full text-left p-3 hover:bg-soft-gray transition-colors flex items-center gap-2"
                          >
                            <Plus className="w-4 h-4 text-primary-blue" />
                            <span className="text-sm font-semibold text-text-dark">Add Caller ID</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Numeric Keypad Grid */}
                <div className="grid grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-3 sm:gap-y-4 max-w-[280px] sm:max-w-[300px] mx-auto mb-2 sm:mb-4">
                  {[
                    { n: '1', l: ' ' }, { n: '2', l: 'ABC' }, { n: '3', l: 'DEF' },
                    { n: '4', l: 'GHI' }, { n: '5', l: 'JKL' }, { n: '6', l: 'MNO' },
                    { n: '7', l: 'PQRS' }, { n: '8', l: 'TUV' }, { n: '9', l: 'WXYZ' },
                    { n: '*', l: ' ' }, { n: '0', l: '+' }, { n: '#', l: ' ' }
                  ].map((key) => (
                    <button
                      key={key.n}
                      onClick={() => handleKeyPress(key.n)}
                      className={cn(
                        "w-[60px] h-[60px] sm:w-[63px] sm:h-[63px] md:w-[54px] md:h-[54px] rounded-full flex flex-col items-center justify-center active:scale-95 transition-all mx-auto shadow-sm",
                        "bg-white border border-border-gray hover:bg-soft-gray"
                      )}
                    >
                      <span className="text-[20px] sm:text-[23px] md:text-[20px] font-bold leading-none text-text-dark">{key.n}</span>
                      <span className="text-[8px] font-bold text-text-light uppercase tracking-tighter mt-0.5">{key.l}</span>
                    </button>
                  ))}
                </div>

                {/* Bottom Action Row */}
                <div className="flex items-center justify-center px-12 relative mt-2 pb-6">
                  <button 
                    onClick={toggleCall}
                    className={cn(
                      "w-[63px] h-[63px] rounded-full flex items-center justify-center shadow-xl transition-all active:scale-90 z-10",
                      isCalling ? "bg-red-500 shadow-red-500/30" : "bg-[#22C55E] shadow-emerald-500/30"
                    )}
                  >
                    <Phone className={cn("w-[27px] h-[27px] text-white fill-current", isCalling && "rotate-[135deg]")} />
                  </button>

                  <button 
                    onClick={handleBackspace}
                    className={cn(
                      "absolute right-12 w-12 h-12 flex items-center justify-center transition-colors",
                      "text-text-light hover:text-text-dark"
                    )}
                  >
                    <Delete className="w-6 h-6" />
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'rates' && (
              <motion.div key="rates" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-grow min-h-0 overflow-y-auto no-scrollbar">
                <div className="p-4 max-w-6xl mx-auto w-full py-8">
                  <div className="mb-12">
                    <h2 className="text-[27px] font-bold mb-2 text-text-dark">International Rates</h2>
                    <p className="text-text-light">Check our competitive rates for calling any country in the world.</p>
                  </div>

                  <div className="grid md:grid-cols-[1fr_320px] gap-12 mb-20">
                    <div className="space-y-6">
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light w-5 h-5" />
                        <input 
                          type="text" 
                          placeholder="Search country or area code"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className={cn(
                            "w-full pl-12 pr-4 py-4 rounded-2xl border-none focus:ring-2 focus:ring-primary-blue/20 transition-all shadow-sm",
                            "bg-soft-gray text-text-dark"
                          )}
                        />
                      </div>

                      <div className="space-y-4">
                        {filteredCountries.map((c, idx) => (
                          <div 
                            key={idx}
                            className={cn(
                              "rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 transition-all border group hover:shadow-md",
                              "bg-white border-gray-200"
                            )}
                          >
                            <div className="flex flex-col gap-3">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-100 flex items-center justify-center bg-gray-50 p-1">
                                  <img 
                                    src={getFlagUrl(c.iso)}
                                    alt={c.name}
                                    className="w-full h-auto object-cover"
                                  />
                                </div>
                                <div>
                                  <h3 className="text-xl font-bold text-text-dark">{c.name}</h3>
                                  <p className="text-sm text-text-light">{c.code}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-text-light">
                                <div className="flex items-center gap-1.5">
                                  <ShieldCheck className="w-4 h-4 text-primary-blue" />
                                  <span>Premium Quality</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Globe2 className="w-4 h-4 text-primary-blue" />
                                  <span>Global Network</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0">
                              <div className="text-right">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-text-light mb-1">Starting From</p>
                                <div className="flex items-baseline gap-1">
                                  <span className="text-2xl font-bold text-primary-blue">${c.rate.toFixed(2)}</span>
                                  <span className="text-sm text-text-light">/min</span>
                                </div>
                              </div>
                              <button 
                                onClick={() => setSelectedCountry(c)}
                                className={cn(
                                  "px-6 py-2 rounded-lg font-bold transition-all",
                                  "bg-gray-100 text-text-dark hover:bg-gray-200"
                                )}
                              >
                                Calculate
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-8 sticky top-8">
                      <div className="p-8 rounded-3xl border shadow-lg bg-white border-gray-200">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 rounded-xl bg-primary-blue/10 flex items-center justify-center">
                            <Calculator className="w-6 h-6 text-primary-blue" />
                          </div>
                          <h3 className="text-xl font-bold text-text-dark">Rate Calculator</h3>
                        </div>
                        <div className="space-y-6">
                          <div>
                            <label className="block text-xs font-bold text-text-light uppercase tracking-wider mb-2">Selected Country</label>
                            <div className="flex items-center gap-3 p-3 border rounded-xl bg-gray-50 border-gray-100">
                              <img 
                                src={getFlagUrl(selectedCountry.iso)}
                                alt={selectedCountry.name}
                                className="w-6 h-auto rounded-sm shadow-sm"
                              />
                              <span className="font-semibold text-text-dark">{selectedCountry.name}</span>
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-text-light uppercase tracking-wider mb-2">Minutes</label>
                            <input 
                              type="number" 
                              value={minutes}
                              onChange={(e) => setMinutes(Number(e.target.value))}
                              className="w-full px-4 py-3 rounded-xl border outline-none transition-all bg-white border-gray-200 focus:border-primary-blue"
                            />
                          </div>
                          <div className="pt-6 border-t border-dashed border-gray-100">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-text-light text-sm">Estimated Cost</span>
                              <span className="text-3xl font-bold text-primary-blue">
                                ${(minutes * selectedCountry.rate).toFixed(2)}
                              </span>
                            </div>
                          </div>
                          <button className="w-full py-4 bg-primary-blue text-white rounded-2xl font-bold shadow-lg shadow-primary-blue/20 hover:bg-secondary-blue transition-all active:scale-[0.98]">
                            Add Credits
                          </button>
                        </div>
                      </div>

                      <div className="p-8 rounded-3xl border bg-soft-gray border-gray-200">
                        <h4 className="font-bold mb-4 text-text-dark">Need Help?</h4>
                        <p className="text-sm text-text-light mb-6">Our support team is available 24/7 to help you with any questions about our global rates.</p>
                        <button className="text-primary-blue font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                          Contact Support <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  </div>
              </motion.div>
            )}

            {activeTab === 'buy' && (
              <motion.div 
                key="buy" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                className="flex-grow flex flex-col min-h-0"
              >
                <BuyNumberView />
              </motion.div>
            )}

            {activeTab === 'billing' && (
              <motion.div 
                key="billing" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                className="flex-grow flex flex-col min-h-0"
              >
                <BillingView 
                  balance={balance} 
                  onTopUp={(amt) => setBalance(prev => prev + amt)} 
                />
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div 
                key="history" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                className="flex-grow flex flex-col min-h-0"
              >
                <ActivityView />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Calling Overlay */}
        <AnimatePresence>
          {isCalling && (
            <motion.div 
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={cn(
                "absolute inset-0 z-[70] flex flex-col items-center justify-center p-12 text-center",
                "bg-white"
              )}
            >
              <div className="w-40 h-40 bg-emerald-500/10 rounded-full flex items-center justify-center mb-10 relative">
                <motion.div 
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.2, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 bg-emerald-500/20 rounded-full"
                />
                <Phone className="w-16 h-16 text-emerald-500 fill-current" />
              </div>
              
              <h3 className="text-4xl font-bold mb-3 tracking-tight text-text-dark">{dialedNumber}</h3>
              <p className="text-text-light mb-10 uppercase tracking-[0.2em] text-[10px] font-black">Calling {selectedCountry.name}...</p>
              
              <div className="text-5xl font-mono font-bold text-primary-blue mb-16 tabular-nums">
                {formatDuration(callDuration)}
              </div>

              <button 
                onClick={() => setIsCalling(false)}
                className="w-24 h-24 rounded-full bg-red-500 flex items-center justify-center shadow-2xl shadow-red-500/30 active:scale-90 transition-all"
              >
                <X className="w-10 h-10 text-white" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Country Selector Modal */}
        <AnimatePresence>
          {isCountryMenuOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-end"
              onClick={() => setIsCountryMenuOpen(false)}
            >
              <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                className={cn(
                  "w-full rounded-t-[2.5rem] p-6 max-h-[80%] overflow-hidden flex flex-col",
                  "bg-white"
                )}
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-text-dark">Select Country</h3>
                  <button onClick={() => setIsCountryMenuOpen(false)} className="p-2 rounded-full bg-soft-gray">
                    <X className="w-5 h-5 text-text-dark" />
                  </button>
                </div>

                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Search country or code"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-none focus:ring-2 focus:ring-primary-blue/20 transition-all bg-soft-gray text-text-dark"
                  />
                </div>

                <div className="flex-grow overflow-y-auto space-y-2">
                  {filteredCountries.map(country => (
                    <button
                      key={country.name}
                      onClick={() => {
                        setSelectedCountry(country);
                        setDialedNumber(country.code);
                        setIsCountryMenuOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between p-4 rounded-2xl transition-colors",
                        "hover:bg-soft-gray"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <img 
                          src={getFlagUrl(country.iso)}
                          alt={country.name}
                          className="w-6 h-auto rounded-sm shadow-sm"
                        />
                        <div className="text-left">
                          <p className="font-bold text-text-dark">{country.name}</p>
                          <p className="text-xs text-text-light">{country.code}</p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-primary-blue">${country.rate.toFixed(2)}/min</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Credit Message Toast */}
        <AnimatePresence>
          {creditMessage && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="absolute bottom-24 left-1/2 -translate-x-1/2 z-[80] bg-red-500 text-white px-6 py-3 rounded-full shadow-2xl font-bold flex items-center gap-2"
            >
              <Info className="w-5 h-5" />
              {creditMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation Bar removed as requested */}
    </div>
  );
}

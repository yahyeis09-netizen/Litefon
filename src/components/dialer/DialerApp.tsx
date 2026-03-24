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
import { cn } from '@/src/lib/utils';
import FAQSection from '@/src/components/FAQSection';
import Testimonials from '@/src/components/Testimonials';
import { Footer } from '@/src/components/Sections';

// --- Types ---

interface Country {
  name: string;
  code: string;
  flag: string;
  rate: number;
}

const countries: Country[] = [
  { name: 'United States', code: '+1', flag: '🇺🇸', rate: 0.02 },
  { name: 'United Kingdom', code: '+44', flag: '🇬🇧', rate: 0.03 },
  { name: 'Canada', code: '+1', flag: '🇨🇦', rate: 0.02 },
  { name: 'Germany', code: '+49', flag: '🇩🇪', rate: 0.04 },
  { name: 'France', code: '+33', flag: '🇫🇷', rate: 0.04 },
  { name: 'Australia', code: '+61', flag: '🇦🇺', rate: 0.05 },
  { name: 'India', code: '+91', flag: '🇮🇳', rate: 0.01 },
  { name: 'China', code: '+86', flag: '🇨🇳', rate: 0.02 },
  { name: 'Japan', code: '+81', flag: '🇯🇵', rate: 0.06 },
  { name: 'Brazil', code: '+55', flag: '🇧🇷', rate: 0.08 },
  { name: 'Mexico', code: '+52', flag: '🇲🇽', rate: 0.03 },
  { name: 'Italy', code: '+39', flag: '🇮🇹', rate: 0.04 },
  { name: 'Spain', code: '+34', flag: '🇪🇸', rate: 0.04 },
  { name: 'Netherlands', code: '+31', flag: '🇳🇱', rate: 0.03 },
  { name: 'Switzerland', code: '+41', flag: '🇨🇭', rate: 0.05 },
  { name: 'Sweden', code: '+46', flag: '🇸🇪', rate: 0.04 },
  { name: 'Norway', code: '+47', flag: '🇳🇴', rate: 0.04 },
  { name: 'Denmark', code: '+45', flag: '🇩🇰', rate: 0.04 },
  { name: 'Singapore', code: '+65', flag: '🇸🇬', rate: 0.02 },
  { name: 'South Korea', code: '+82', flag: '🇰🇷', rate: 0.03 },
];

// --- Sub-Views ---

const HomeView = ({ isDark }: { isDark?: boolean }) => (
  <div className="flex-grow flex flex-col items-center justify-center p-8 text-center">
    <div className={cn("w-20 h-20 rounded-full flex items-center justify-center mb-6", isDark ? "bg-primary-blue/20" : "bg-primary-blue/10")}>
      <Home className="w-10 h-10 text-primary-blue" />
    </div>
    <h2 className={cn("text-2xl font-bold mb-2", isDark ? "text-white" : "text-text-dark")}>Welcome Back</h2>
    <p className={isDark ? "text-slate-400" : "text-text-light"}>Your global communication hub is ready.</p>
  </div>
);

const ContactsView = ({ isDark }: { isDark?: boolean }) => (
  <div className="flex-grow p-6 overflow-y-auto">
    <h2 className={cn("text-2xl font-bold mb-6", isDark ? "text-white" : "text-text-dark")}>Contacts</h2>
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className={cn("flex items-center gap-4 p-3 rounded-2xl transition-colors cursor-pointer", isDark ? "hover:bg-slate-800" : "hover:bg-soft-gray")}>
          <div className={cn("w-12 h-12 rounded-full flex items-center justify-center font-bold", isDark ? "bg-slate-700 text-slate-300" : "bg-border-gray text-text-medium")}>
            {String.fromCharCode(64 + i)}
          </div>
          <div>
            <p className={cn("font-bold", isDark ? "text-white" : "text-text-dark")}>Contact {i}</p>
            <p className="text-sm text-text-light">+1 555-010{i}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ActivityView = ({ isDark }: { isDark?: boolean }) => {
  const history = [
    {
      id: 1,
      number: "+43 444 44444444",
      date: "5/31/2025",
      time: "11:36 AM",
      from: { name: "Austria", flag: "🇦🇹", number: "+43 1 2345678" },
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
      from: { name: "United Kingdom", flag: "🇬🇧" },
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
      from: { name: "United States", flag: "🇺🇸" },
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
      from: { name: "Germany", flag: "🇩🇪" },
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
      from: { name: "France", flag: "🇫🇷" },
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
      from: { name: "Spain", flag: "🇪🇸" },
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
      from: { name: "Italy", flag: "🇮🇹" },
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
      from: { name: "Japan", flag: "🇯🇵" },
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
      from: { name: "Australia", flag: "🇦🇺" },
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
      from: { name: "Canada", flag: "🇨🇦" },
      status: "Completed",
      duration: "2:30 min",
      cost: "$0.30",
      special: false
    }
  ];

  return (
    <div className="flex-grow min-h-0 overflow-y-auto custom-scrollbar">
      <div className="p-6 max-w-7xl mx-auto w-full py-12">
        <div className="mb-12">
          <h1 className={cn("text-3xl font-bold mb-2", isDark ? "text-white" : "text-text-dark")}>Call History</h1>
          <p className="text-text-light">Review your recent international calls and costs.</p>
        </div>

        <div className="space-y-4">
          {history.map((call) => (
            <div 
              key={call.id} 
              className={cn(
                "rounded-3xl p-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 transition-all border",
                call.special 
                  ? (isDark ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200 shadow-sm")
                  : (isDark ? "bg-slate-900/50 border-slate-800" : "bg-gray-50 border-gray-100")
              )}
            >
              {/* Left Column */}
              <div className="flex flex-col gap-4 flex-grow w-full lg:w-auto">
                <div className="flex items-center gap-4 flex-wrap">
                  <span className={cn("text-xl font-bold", isDark ? "text-white" : "text-text-dark")}>
                    {call.number}
                  </span>
                  <button className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-colors",
                    isDark ? "bg-slate-700 text-slate-300 hover:bg-slate-600" : "bg-gray-200 text-text-dark hover:bg-gray-300"
                  )}>
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
                  <span className="text-xl leading-none">{call.from.flag}</span>
                  <span className={cn("font-semibold", isDark ? "text-slate-300" : "text-text-dark")}>
                    {call.from.name} {call.from.number && <span className="text-text-light font-normal ml-1">({call.from.number})</span>}
                  </span>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3 text-right w-full lg:w-auto border-t lg:border-t-0 pt-4 lg:pt-0">
                <span className={cn(
                  "px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest",
                  call.status === 'Completed' 
                    ? "bg-emerald-100 text-emerald-700" 
                    : "bg-yellow-100 text-yellow-700"
                )}>
                  {call.status}
                </span>
                <div className="space-y-1">
                  <p className="text-sm text-text-light">Duration: <span className={cn("font-bold", isDark ? "text-slate-300" : "text-text-dark")}>{call.duration}</span></p>
                  <p className="text-sm text-text-light">Cost: <span className={cn("font-bold text-lg", isDark ? "text-primary-blue" : "text-primary-blue")}>{call.cost}</span></p>
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

const BillingView = ({ isDark, balance, onTopUp }: { isDark?: boolean; balance: number; onTopUp: (amount: number) => void }) => {
  const packages = [
    { amount: 5, bonus: null, popular: false },
    { amount: 10, bonus: null, popular: false },
    { amount: 20, bonus: null, popular: true },
    { amount: 50, bonus: "5% BONUS", popular: false },
    { amount: 100, bonus: "10% BONUS", popular: false },
  ];
  const [selected, setSelected] = useState(20);

  return (
    <div className="flex-grow min-h-0 overflow-y-auto custom-scrollbar">
      <div className="p-6 max-w-7xl mx-auto w-full py-12">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-start">
          
          {/* Left Pane: Credit Package */}
          <div className="space-y-8">
            <div className={cn(
              "rounded-3xl border p-6 sm:p-8 shadow-sm",
              isDark ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"
            )}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                    <Calculator className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h1 className={cn("text-2xl font-bold", isDark ? "text-white" : "text-text-dark")}>Select Your Credit Package</h1>
                </div>
                <div className="text-left sm:text-right">
                  <p className={cn("text-xs uppercase tracking-widest font-bold opacity-60 mb-1", isDark ? "text-slate-400" : "text-text-light")}>Current Balance</p>
                  <p className="text-2xl font-bold text-primary-blue">${balance.toFixed(2)}</p>
                </div>
              </div>
              
              <p className={cn("mb-8", isDark ? "text-slate-400" : "text-text-light")}>
                Top up your credits to continue making international calls at our best rates.
              </p>

              <div className="space-y-6">
                <div>
                  <label className={cn("block text-sm font-bold mb-6", isDark ? "text-slate-300" : "text-text-dark")}>
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
                            : isDark 
                              ? "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600" 
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

                <div className={cn(
                  "flex items-center justify-between p-4 rounded-2xl border",
                  isDark ? "bg-slate-900/50 border-slate-800" : "bg-gray-50 border-gray-100"
                )}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      id="auto-topup-dialer"
                      className="w-5 h-5 rounded border-gray-300 text-primary-blue focus:ring-primary-blue"
                    />
                    <label htmlFor="auto-topup-dialer" className={cn("text-sm font-bold", isDark ? "text-slate-300" : "text-text-dark")}>
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
          <div className={cn(
            "rounded-3xl border p-6 sm:p-8 shadow-lg",
            isDark ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"
          )}>
            <div className="mb-8">
              <h2 className={cn("text-xl font-bold mb-2", isDark ? "text-white" : "text-text-dark")}>Payment Detail</h2>
              <p className="text-sm text-text-light">Complete your purchase by filling your payment detail</p>
            </div>

            {/* Card Inputs */}
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-text-medium uppercase tracking-wider mb-2">Email address</label>
                <input 
                  type="email" 
                  className={cn(
                    "w-full px-4 py-3 rounded-xl border outline-none transition-all",
                    isDark ? "bg-slate-900 border-slate-700 focus:border-primary-blue text-white" : "bg-white border-gray-200 focus:border-primary-blue"
                  )}
                  placeholder="hello@squareui.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-text-medium uppercase tracking-wider mb-2">Card number</label>
                <div className="relative">
                  <input 
                    type="text" 
                    className={cn(
                      "w-full px-4 py-3 rounded-xl border outline-none transition-all",
                      isDark ? "bg-slate-900 border-slate-700 focus:border-primary-blue text-white" : "bg-white border-gray-200 focus:border-primary-blue"
                    )}
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
                    className={cn(
                      "w-full px-4 py-3 rounded-xl border outline-none transition-all",
                      isDark ? "bg-slate-900 border-slate-700 focus:border-primary-blue text-white" : "bg-white border-gray-200 focus:border-primary-blue"
                    )}
                    placeholder="MM / YY"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-medium uppercase tracking-wider mb-2 flex items-center gap-1">
                    Security Code <Info className="w-3 h-3" />
                  </label>
                  <input 
                    type="text" 
                    className={cn(
                      "w-full px-4 py-3 rounded-xl border outline-none transition-all",
                      isDark ? "bg-slate-900 border-slate-700 focus:border-primary-blue text-white" : "bg-white border-gray-200 focus:border-primary-blue"
                    )}
                    placeholder="CVC"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-text-medium uppercase tracking-wider mb-2">Cardholder Name</label>
                <input 
                  type="text" 
                  className={cn(
                    "w-full px-4 py-3 rounded-xl border outline-none transition-all",
                    isDark ? "bg-slate-900 border-slate-700 focus:border-primary-blue text-white" : "bg-white border-gray-200 focus:border-primary-blue"
                  )}
                  placeholder="William Ashford"
                />
              </div>

              <div className="pt-4">
                <label className="block text-xs font-bold text-text-medium uppercase tracking-wider mb-4">Billing Address</label>
                <div className="space-y-3">
                  <select className={cn(
                    "w-full px-4 py-3 rounded-xl border outline-none transition-all",
                    isDark ? "bg-slate-900 border-slate-700 focus:border-primary-blue text-white" : "bg-white border-gray-200 focus:border-primary-blue"
                  )}>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                  </select>
                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border outline-none transition-all",
                        isDark ? "bg-slate-900 border-slate-700 focus:border-primary-blue text-white" : "bg-white border-gray-200 focus:border-primary-blue"
                      )}
                      placeholder="Zip code"
                    />
                    <input 
                      type="text" 
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border outline-none transition-all",
                        isDark ? "bg-slate-900 border-slate-700 focus:border-primary-blue text-white" : "bg-white border-gray-200 focus:border-primary-blue"
                      )}
                      placeholder="City"
                    />
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className={cn("pt-8 border-t border-dashed space-y-3", isDark ? "border-slate-700" : "border-gray-200")}>
                <div className="flex justify-between text-lg pt-2">
                  <span className={cn("font-bold", isDark ? "text-white" : "text-text-dark")}>Total</span>
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

const BuyNumberView = ({ isDark }: { isDark?: boolean }) => {
  const numbers = [
    { number: '+1 (234) 995-958', country: 'United States', code: 'US', flag: '🇺🇸', isPrimary: true },
    { number: '+1 (234) 995-959', country: 'United States', code: 'US', flag: '🇺🇸', isPrimary: false },
    { number: '+1 (234) 995-960', country: 'United States', code: 'US', flag: '🇺🇸', isPrimary: false },
    { number: '+1 (416) 555-0987', country: 'Canada', code: 'CA', flag: '🇨🇦', isPrimary: false },
    { number: '+1 (604) 555-0111', country: 'Canada', code: 'CA', flag: '🇨🇦', isPrimary: false },
    { number: '+1 (514) 555-0222', country: 'Canada', code: 'CA', flag: '🇨🇦', isPrimary: false },
    { number: '+1 (780) 555-0333', country: 'Canada', code: 'CA', flag: '🇨🇦', isPrimary: false },
    { number: '+1 (902) 555-0444', country: 'Canada', code: 'CA', flag: '🇨🇦', isPrimary: false },
    { number: '+1 (204) 555-0555', country: 'Canada', code: 'CA', flag: '🇨🇦', isPrimary: false },
    { number: '+1 (306) 555-0666', country: 'Canada', code: 'CA', flag: '🇨🇦', isPrimary: false },
    { number: '+1 (250) 555-0777', country: 'Canada', code: 'CA', flag: '🇨🇦', isPrimary: false },
    { number: '+1 (819) 555-0888', country: 'Canada', code: 'CA', flag: '🇨🇦', isPrimary: false },
    { number: '+1 (705) 555-0999', country: 'Canada', code: 'CA', flag: '🇨🇦', isPrimary: false },
    { number: '+1 (403) 555-0123', country: 'Canada', code: 'CA', flag: '🇨🇦', isPrimary: false },
    { number: '+1 (506) 555-0456', country: 'Canada', code: 'CA', flag: '🇨🇦', isPrimary: false },
    { number: '+1 (709) 555-0789', country: 'Canada', code: 'CA', flag: '🇨🇦', isPrimary: false },
    { number: '+1 (867) 555-0000', country: 'Canada', code: 'CA', flag: '🇨🇦', isPrimary: false },
    { number: '+1 (212) 555-0198', country: 'United States', code: 'US', flag: '🇺🇸', isPrimary: false },
    { number: '+44 20 7946 0123', country: 'United Kingdom', code: 'GB', flag: '🇬🇧', isPrimary: false },
    { number: '+44 161 123 4567', country: 'United Kingdom', code: 'GB', flag: '🇬🇧', isPrimary: false },
    { number: '+49 30 123456', country: 'Germany', code: 'DE', flag: '🇩🇪', isPrimary: false },
    { number: '+33 1 42 68 53 00', country: 'France', code: 'FR', flag: '🇫🇷', isPrimary: false },
    { number: '+34 91 123 4567', country: 'Spain', code: 'ES', flag: '🇪🇸', isPrimary: false },
    { number: '+39 06 1234 5678', country: 'Italy', code: 'IT', flag: '🇮🇹', isPrimary: false },
    { number: '+81 3 1234 5678', country: 'Japan', code: 'JP', flag: '🇯🇵', isPrimary: false },
    { number: '+61 2 9876 5432', country: 'Australia', code: 'AU', flag: '🇦🇺', isPrimary: false },
  ];

  return (
    <div className="flex-grow flex flex-col min-h-0 overflow-y-auto custom-scrollbar">
      <div className="p-6 max-w-7xl mx-auto w-full py-12 flex-grow flex flex-col">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div>
            <h2 className={cn("text-3xl font-bold mb-2", isDark ? "text-white" : "text-text-dark")}>Buy a Number</h2>
            <p className="text-text-light">Get a virtual number for your business communications.</p>
          </div>
          <div className={cn("px-6 py-3 rounded-2xl border flex items-center gap-4 cursor-pointer hover:border-primary-blue transition-all group w-full md:w-auto", isDark ? "bg-slate-800 border-slate-700" : "bg-white border-border-gray shadow-sm")}>
            <div className="flex items-center gap-3">
              <span className="text-xl grayscale group-hover:grayscale-0 transition-all">🇺🇸</span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-text-light">Primary No</p>
                <div className="flex items-center gap-2">
                  <p className={cn("font-mono font-bold", isDark ? "text-white" : "text-text-dark")}>+1 234 995 958</p>
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
              "w-full pl-12 pr-4 py-4 rounded-2xl border-none focus:ring-2 focus:ring-primary-blue/20 transition-all shadow-sm",
              isDark ? "bg-slate-800 text-white" : "bg-soft-gray text-text-dark"
            )}
          />
        </div>

        <div className="space-y-6 mb-20">
          {numbers.map((item, idx) => (
            <div 
              key={idx} 
              className={cn(
                "rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 transition-all border w-full group hover:shadow-md",
                isDark ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"
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
                  <span className={cn("text-2xl font-bold tracking-tight", isDark ? "text-white" : "text-text-dark")}>
                    {item.number}
                  </span>
                  {item.isPrimary && <span className="text-2xl">{item.flag}</span>}
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
                  <span className={cn("font-bold", isDark ? "text-slate-300" : "text-text-dark")}>
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
  const [balance, setBalance] = useState(25.00);
  const [dialedNumber, setDialedNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [minutes, setMinutes] = useState(10);
  const [isCountryMenuOpen, setIsCountryMenuOpen] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') || localStorage.getItem('theme') === 'dark';
    }
    return false;
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sync dark mode with document class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Listen for external theme changes (e.g. from Navbar)
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark');
          setIsDarkMode(isDark);
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

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
      isDarkMode ? "bg-slate-900 text-white" : "bg-white text-text-dark"
    )}>
      {/* Landing Page Style Navbar */}
      <nav className={cn(
        "w-full border-b px-6 py-4 transition-colors",
          isDarkMode ? "bg-slate-900/80 border-slate-800" : "bg-white/80 border-border-gray",
          "backdrop-blur-lg sticky top-0 z-50"
        )}>
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-blue rounded-full flex items-center justify-center">
                <Phone className="text-white w-4 h-4 fill-current" />
              </div>
              <span className={cn("brand-litefon text-text-dark", isDarkMode ? "text-white" : "text-text-dark")}>
                Litefon
              </span>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <button 
                  key={link.id} 
                  onClick={() => setActiveTab(link.id as any)}
                  className={cn(
                    "px-4 py-2 rounded-2xl transition-all flex items-center gap-2",
                    activeTab === link.id 
                      ? "bg-primary-blue/10 text-primary-blue" 
                      : isDarkMode ? "text-slate-400 hover:text-white hover:bg-slate-800" : "text-text-light hover:text-text-dark hover:bg-soft-gray"
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
                className={cn(
                  "flex items-center gap-2 text-sm font-semibold px-5 py-2.5 border rounded-full transition-all",
                  isDarkMode 
                    ? "border-slate-700 bg-slate-800 text-white hover:bg-slate-700" 
                    : "border-border-gray bg-white text-text-medium hover:text-text-dark"
                )}
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>

            {/* Mobile Toggle */}
            <button 
              className={cn("md:hidden", isDarkMode ? "text-white" : "text-text-dark")}
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
                  "md:hidden overflow-y-auto max-h-[80vh] mt-4 custom-scrollbar",
                  isDarkMode ? "bg-slate-900 border-t border-slate-800" : "bg-white border-t border-border-gray"
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
                          : isDarkMode ? "text-slate-400" : "text-text-light"
                      )}
                    >
                      <span className="capitalize">{link.name}</span>
                    </button>
                  ))}
                  <button 
                    onClick={onBack}
                    className={cn(
                      "flex items-center justify-center gap-2 text-lg font-semibold py-4 border rounded-2xl transition-all",
                      isDarkMode 
                        ? "border-slate-700 bg-slate-800 text-white" 
                        : "border-border-gray bg-white text-text-dark"
                    )}
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
        isDarkMode ? "bg-slate-900" : "bg-white"
      )}>
        {/* Balance Header (Compact) - Only show on Dialpad */}
        {activeTab === 'dialpad' && (
          <div className={cn(
            "px-6 py-6 flex items-center justify-between border-b transition-colors max-w-md mx-auto w-full relative",
            isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-border-gray"
          )}>
            {/* Left: Country Selector */}
            <button 
              onClick={() => setIsCountryMenuOpen(true)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 border rounded-full text-xs font-bold hover:border-primary-blue transition-all z-10",
                isDarkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-soft-gray border-border-gray text-text-dark"
              )}
            >
              <span>{selectedCountry.flag}</span>
              <span>{selectedCountry.code}</span>
              <ChevronDown className="w-3 h-3 text-text-light" />
            </button>

            {/* Center: Vertical Stack (Name + Rate) */}
            <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
              <span className={cn("text-xs font-medium", isDarkMode ? "text-white" : "text-text-dark")}>
                {selectedCountry.name}
              </span>
              <span className={cn("text-[10px] font-normal", isDarkMode ? "text-slate-400" : "text-text-light")}>
                ${selectedCountry.rate.toFixed(2)}/min
              </span>
            </div>
            
            {/* Right: Balance */}
            <div className={cn(
              "flex items-center gap-2 px-4 py-2 border rounded-full transition-all z-10",
              isDarkMode 
                ? "border-slate-700 bg-slate-800 text-white" 
                : "border-border-gray bg-white text-text-medium"
            )}>
              <Wallet className="w-4 h-4 text-primary-blue" />
              <span className="text-xs font-bold">${balance.toFixed(2)}</span>
            </div>
          </div>
        )}

        <div className="flex-grow flex flex-col overflow-hidden relative">
          <AnimatePresence mode="wait">
            {activeTab === 'history' && (
              <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-grow flex flex-col min-h-0">
                <ActivityView isDark={isDarkMode} />
              </motion.div>
            )}
            {activeTab === 'billing' && (
              <motion.div key="billing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-grow flex flex-col min-h-0">
                <BillingView 
                  isDark={isDarkMode} 
                  balance={balance} 
                  onTopUp={(amt) => setBalance(prev => prev + amt)} 
                />
              </motion.div>
            )}
            {activeTab === 'buy' && <motion.div key="buy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-grow flex flex-col min-h-0"><BuyNumberView isDark={isDarkMode} /></motion.div>}
            
            {activeTab === 'dialpad' && (
              <motion.div 
                key="dialpad" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="flex-grow flex flex-col p-6 pt-2 max-w-md mx-auto w-full overflow-y-auto custom-scrollbar"
              >
                {/* Number Display */}
                <div className="flex flex-col items-center mb-4 mt-6">
                  <div className="w-full text-center">
                    <span className={cn(
                      "text-[42px] font-bold tracking-tight break-all",
                      isDarkMode ? "text-white" : "text-text-dark",
                      dialedNumber.length > 10 ? "text-2xl" : "text-[42px]"
                    )}>
                      {dialedNumber || ' '}
                    </span>
                  </div>
                </div>

                {/* Numeric Keypad Grid */}
                <div className="grid grid-cols-3 gap-x-8 gap-y-4 max-w-[300px] mx-auto mb-4">
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
                        "w-16 h-16 rounded-full flex flex-col items-center justify-center active:scale-95 transition-all mx-auto",
                        isDarkMode ? "bg-slate-800 hover:bg-slate-700" : "bg-soft-gray hover:bg-border-gray"
                      )}
                    >
                      <span className={cn("text-2xl font-bold leading-none", isDarkMode ? "text-white" : "text-text-dark")}>{key.n}</span>
                      <span className="text-[8px] font-bold text-text-light uppercase tracking-tighter mt-0.5">{key.l}</span>
                    </button>
                  ))}
                </div>

                {/* Bottom Action Row */}
                <div className="flex items-center justify-center px-12 relative mt-2 pb-6">
                  <button 
                    onClick={toggleCall}
                    className={cn(
                      "w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-all active:scale-90 z-10",
                      isCalling ? "bg-red-500 shadow-red-500/30" : "bg-[#22C55E] shadow-emerald-500/30"
                    )}
                  >
                    <Phone className={cn("w-7 h-7 text-white fill-current", isCalling && "rotate-[135deg]")} />
                  </button>

                  <button 
                    onClick={handleBackspace}
                    className={cn(
                      "absolute right-12 w-12 h-12 flex items-center justify-center transition-colors",
                      isDarkMode ? "text-slate-500 hover:text-white" : "text-text-light hover:text-text-dark"
                    )}
                  >
                    <Delete className="w-6 h-6" />
                  </button>
                </div>
              </motion.div>
            )}
            
            {/* Rates View */}
            {activeTab === 'rates' && (
              <motion.div key="rates" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-grow min-h-0 overflow-y-auto custom-scrollbar">
                <div className="p-6 max-w-7xl mx-auto w-full py-12">
                  <div className="mb-12">
                    <h2 className={cn("text-3xl font-bold mb-2", isDarkMode ? "text-white" : "text-text-dark")}>International Rates</h2>
                    <p className="text-text-light">Check our competitive rates for calling any country in the world.</p>
                  </div>

                  <div className="grid lg:grid-cols-[1fr_380px] gap-12 mb-20">
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
                            isDarkMode ? "bg-slate-800 text-white" : "bg-soft-gray text-text-dark"
                          )}
                        />
                      </div>

                      <div className="space-y-4">
                        {filteredCountries.map((c, idx) => (
                          <div 
                            key={idx}
                            className={cn(
                              "rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 transition-all border group hover:shadow-md",
                              isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"
                            )}
                          >
                            <div className="flex flex-col gap-3">
                              <div className="flex items-center gap-4">
                                <div className={cn("w-12 h-12 rounded-full flex items-center justify-center text-2xl", isDarkMode ? "bg-slate-700" : "bg-gray-100")}>
                                  {c.flag}
                                </div>
                                <div>
                                  <h3 className={cn("text-xl font-bold", isDarkMode ? "text-white" : "text-text-dark")}>{c.name}</h3>
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
                                  isDarkMode ? "bg-slate-700 text-white hover:bg-slate-600" : "bg-gray-100 text-text-dark hover:bg-gray-200"
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
                      <div className={cn("p-8 rounded-3xl border shadow-lg", isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200")}>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 rounded-xl bg-primary-blue/10 flex items-center justify-center">
                            <Calculator className="w-6 h-6 text-primary-blue" />
                          </div>
                          <h3 className={cn("text-xl font-bold", isDarkMode ? "text-white" : "text-text-dark")}>Rate Calculator</h3>
                        </div>
                        <div className="space-y-6">
                          <div>
                            <label className="block text-xs font-bold text-text-light uppercase tracking-wider mb-2">Selected Country</label>
                            <div className={cn("flex items-center gap-3 p-3 border rounded-xl", isDarkMode ? "bg-slate-900 border-slate-700" : "bg-gray-50 border-gray-100")}>
                              <span className="text-2xl">{selectedCountry.flag}</span>
                              <span className={cn("font-semibold", isDarkMode ? "text-white" : "text-text-dark")}>{selectedCountry.name}</span>
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-text-light uppercase tracking-wider mb-2">Minutes</label>
                            <input 
                              type="number" 
                              value={minutes}
                              onChange={(e) => setMinutes(Number(e.target.value))}
                              className={cn("w-full px-4 py-3 rounded-xl border outline-none transition-all", isDarkMode ? "bg-slate-900 border-slate-700 text-white focus:border-primary-blue" : "bg-white border-gray-200 focus:border-primary-blue")}
                            />
                          </div>
                          <div className={cn("pt-6 border-t border-dashed", isDarkMode ? "border-slate-700" : "border-gray-100")}>
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

                      <div className={cn("p-8 rounded-3xl border", isDarkMode ? "bg-slate-800 border-slate-700" : "bg-soft-gray border-gray-200")}>
                        <h4 className={cn("font-bold mb-4", isDarkMode ? "text-white" : "text-text-dark")}>Need Help?</h4>
                        <p className="text-sm text-text-light mb-6">Our support team is available 24/7 to help you with any questions about our global rates.</p>
                        <button className="text-primary-blue font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                          Contact Support <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="-mx-6 pt-12">
                    <FAQSection />
                    <Footer />
                  </div>
                </div>
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
                isDarkMode ? "bg-slate-900" : "bg-white"
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
              
              <h3 className={cn("text-4xl font-bold mb-3 tracking-tight", isDarkMode ? "text-white" : "text-text-dark")}>{dialedNumber}</h3>
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
                  isDarkMode ? "bg-slate-900" : "bg-white"
                )}
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className={cn("text-xl font-bold", isDarkMode ? "text-white" : "text-text-dark")}>Select Country</h3>
                  <button onClick={() => setIsCountryMenuOpen(false)} className={cn("p-2 rounded-full", isDarkMode ? "bg-slate-800" : "bg-soft-gray")}>
                    <X className={cn("w-5 h-5", isDarkMode ? "text-white" : "text-text-dark")} />
                  </button>
                </div>

                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Search country or code"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className={cn(
                      "w-full pl-12 pr-4 py-4 rounded-2xl border-none focus:ring-2 focus:ring-primary-blue/20 transition-all",
                      isDarkMode ? "bg-slate-800 text-white" : "bg-soft-gray text-text-dark"
                    )}
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
                        isDarkMode ? "hover:bg-slate-800" : "hover:bg-soft-gray"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">{country.flag}</span>
                        <div className="text-left">
                          <p className={cn("font-bold", isDarkMode ? "text-white" : "text-text-dark")}>{country.name}</p>
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
      </div>

      {/* Bottom Navigation Bar removed as requested */}
    </div>
  );
}

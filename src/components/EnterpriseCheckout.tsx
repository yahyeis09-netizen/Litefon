import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  CreditCard, 
  Wallet, 
  CheckCircle2, 
  Info, 
  ShieldCheck, 
  ArrowRight,
  Calculator,
  Phone
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

import Navbar from './Navbar';

interface EnterpriseCheckoutProps {
  onBack: () => void;
  onDialerClick?: () => void;
}

const packages = [
  { amount: 100, bonus: null, popular: false },
  { amount: 300, bonus: null, popular: true },
  { amount: 500, bonus: '5% bonus', popular: false, color: 'bg-blue-500' },
  { amount: 1000, bonus: '10% bonus', popular: false, color: 'bg-amber-500' },
];

export default function EnterpriseCheckout({ onBack, onDialerClick }: EnterpriseCheckoutProps) {
  const [selectedAmount, setSelectedAmount] = useState(300);
  const [customAmount, setCustomAmount] = useState('300');
  const [autoTopUp, setAutoTopUp] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col">
      {/* Header / Navigation */}
      <Navbar 
        isLoggedIn={true} 
        onLogoClick={onBack} 
        onAuthClick={onBack}
        onDialerClick={onDialerClick}
      />

      <main className="flex-grow max-w-6xl mx-auto w-full px-6 pt-24 pb-12">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-start">
          
          {/* Left Pane: Enterprise Credit Package */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-emerald-600" />
                </div>
                <h1 className="text-2xl font-bold text-text-dark">Select Your Enterprise Credit Package</h1>
              </div>
              
              <p className="text-text-light mb-8">
                Enterprise credits provide your organization with discounted rates for international calling.{' '}
                <a href="#" className="text-text-dark font-bold hover:underline inline-flex items-center gap-1">
                  View enterprise rate calculator <ArrowRight className="w-4 h-4" />
                </a>
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-text-dark mb-4">
                    Select Credit Package (USD)*
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {packages.map((pkg) => (
                      <button
                        key={pkg.amount}
                        onClick={() => setSelectedAmount(pkg.amount)}
                        className={cn(
                          "relative h-20 rounded-2xl border-2 transition-all flex flex-col items-center justify-center",
                          selectedAmount === pkg.amount
                            ? "bg-emerald-50 border-emerald-500 text-emerald-700"
                            : "bg-white border-gray-100 hover:border-gray-200 text-text-dark"
                        )}
                      >
                        {pkg.popular && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full whitespace-nowrap">
                            Most Popular
                          </div>
                        )}
                        {pkg.bonus && (
                          <div className={cn(
                            "absolute -top-3 left-1/2 -translate-x-1/2 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full whitespace-nowrap",
                            pkg.color
                          )}>
                            {pkg.bonus}
                          </div>
                        )}
                        <span className="text-xl font-bold">${pkg.amount}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-text-dark mb-2">
                    Or enter custom amount (minimum $100)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light font-medium">$</span>
                    <input 
                      type="text"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full pl-8 pr-4 py-4 rounded-2xl border border-gray-200 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none transition-all font-medium"
                      placeholder="300"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      id="auto-topup"
                      checked={autoTopUp}
                      onChange={(e) => setAutoTopUp(e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300 text-primary-blue focus:ring-primary-blue"
                    />
                    <label htmlFor="auto-topup" className="text-sm font-bold text-text-dark">
                      Enable Auto Top-up
                    </label>
                    <span className="hidden md:inline-flex px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider">
                      Avoid interrupting important calls
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-3 text-text-medium">
                  <Phone className="w-5 h-5 text-primary-blue" />
                  <p className="text-sm">
                    Up to <span className="font-bold text-text-dark">1,000</span> minutes of international calling time
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <a href="#" className="text-sm text-text-light hover:text-text-dark transition-colors inline-flex items-center gap-1">
                Need a custom enterprise plan? <span className="font-bold">Contact our sales team →</span>
              </a>
            </div>
          </div>

          {/* Right Pane: Payment Form */}
          <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-lg">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-text-dark mb-2">Payment Detail</h2>
              <p className="text-sm text-text-light">Complete your purchase by filling your payment detail</p>
            </div>

            {/* Card Inputs */}
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-text-medium uppercase tracking-wider mb-2">Email address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-blue outline-none transition-all"
                  placeholder="hello@squareui.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-text-medium uppercase tracking-wider mb-2">Card number</label>
                <div className="relative">
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-blue outline-none transition-all"
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
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-blue outline-none transition-all"
                    placeholder="MM / YY"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-medium uppercase tracking-wider mb-2 flex items-center gap-1">
                    Security Code <Info className="w-3 h-3" />
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-blue outline-none transition-all"
                    placeholder="CVC"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-text-medium uppercase tracking-wider mb-2">Cardholder Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-blue outline-none transition-all"
                  placeholder="William Ashford"
                />
              </div>

              <div className="pt-4">
                <label className="block text-xs font-bold text-text-medium uppercase tracking-wider mb-4">Billing Address</label>
                <div className="space-y-3">
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-blue outline-none transition-all bg-white">
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                  </select>
                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-blue outline-none transition-all"
                      placeholder="Zip code"
                    />
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-blue outline-none transition-all"
                      placeholder="City"
                    />
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="pt-8 border-t border-dashed border-gray-200 space-y-3">
                <div className="flex justify-between text-lg pt-2">
                  <span className="font-bold text-text-dark">Total</span>
                  <span className="font-bold text-primary-blue">${selectedAmount}.00</span>
                </div>
              </div>

              <button className="w-full py-4 bg-primary-blue text-white rounded-2xl font-bold shadow-lg shadow-primary-blue/20 hover:bg-secondary-blue transition-all active:scale-[0.98]">
                Pay ${selectedAmount}.00
              </button>

              <div className="flex items-center justify-center gap-2 text-text-light">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs">Payments are secured and encrypted</span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

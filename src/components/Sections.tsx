import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Globe, 
  Zap, 
  Shield, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Plus, 
  Minus,
  Star,
  MessageSquare,
  Users,
  BarChart3,
  Smartphone,
  Search,
  Check,
  Diamond,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import BrowserDialer from './BrowserDialer';

// --- Hero Section ---
interface HeroProps {
  onDialerClick?: () => void;
  onRatesClick?: () => void;
  onContactClick?: () => void;
}

export function Hero({ onDialerClick, onRatesClick, onContactClick }: HeroProps) {
  return (
    <section className="relative pt-[100px] pb-24 overflow-hidden bg-[radial-gradient(circle_at_center,#f8faff_0%,#ffffff_100%)]">
      {/* Soft Background Glow - Large circle with high blur and 10% opacity */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-tr from-blue-500/10 via-purple-400/10 to-blue-500/10 blur-[200px] rounded-full pointer-events-none z-0" />
      
      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        {/* Badge Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center p-1 rounded-full bg-[#F1F0FB] backdrop-blur-sm border border-black/[0.05] mb-8 shadow-sm"
        >
          <span className="text-[9px] font-bold text-text-dark bg-white px-2.5 py-0.5 rounded-full shadow-sm">New</span>
          <span className="text-[9px] font-semibold text-text-medium px-3">payless . call more</span>
        </motion.div>
 
        {/* H1 Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[34px] sm:text-[46px] md:text-[58px] font-bold tracking-[-0.04em] text-[#000000] mb-5 max-w-[800px] mx-auto leading-[1.1] md:leading-[1.05] font-display"
        >
          Cheap International Calls
          <br className="hidden md:block" />
          <span className="inline-flex items-center flex-wrap justify-center gap-x-3 mt-2 md:mt-3">
            <span className="text-[#64748B]">Right in</span>
            <span className="relative inline-flex items-center gap-1.5 p-2 border border-dashed border-[#E2E8F0] bg-transparent rounded-[10px] text-[#64748B] lowercase tracking-[-0.02em] font-bold">
              {/* Corner Handles */}
              <div className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-white border border-[#E2E8F0] rounded-full" />
              <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-white border border-[#E2E8F0] rounded-full" />
              <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-white border border-[#E2E8F0] rounded-full" />
              <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-white border border-[#E2E8F0] rounded-full" />
              
              <Zap className="w-3.5 h-3.5 text-[#64748B] fill-current" />
              your browser
            </span>
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[12px] md:text-[14px] text-[#64748B] mb-[32px] max-w-[500px] mx-auto leading-[1.6] px-4 md:px-0"
        >
          Call any number worldwide directly from your browser. No apps, no contracts, just simple pay-as-you-go calling. <span className="font-bold text-[#000000]">0.02/min.</span>
        </motion.p>
 
        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-[14px] mb-10"
        >
          <button 
            onClick={onDialerClick}
            className="bg-[#3B63F6] hover:bg-[#2D4ED3] text-white px-6 py-4 sm:py-3 text-[13px] sm:text-sm font-bold rounded-full flex items-center gap-2 group shadow-xl shadow-[#3B63F6]/20 transition-all w-full md:w-auto justify-center"
          >
            Start calling now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-white" />
          </button>
          <button 
            onClick={onRatesClick}
            className="bg-white hover:bg-gray-50 text-text-dark px-6 py-3 text-[12px] font-bold rounded-full border border-border-gray transition-all w-full md:w-auto justify-center"
          >
            See Rates
          </button>
        </motion.div>

        {/* Bottom Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-[10px] text-[#64748B] font-medium"
        >
          Pay once, Use forever
        </motion.p>
      </div>
    </section>
  );
}

// --- How It Works Section ---
export function HowItWorks() {
  const steps = [
    {
      title: "Create Account",
      desc: "Sign up in seconds with just your email address.",
      icon: Users
    },
    {
      title: "Add Credit",
      desc: "Top up your balance using any major payment method.",
      icon: Zap
    },
    {
      title: "Start Calling",
      desc: "Enter any number and start talking instantly.",
      icon: Phone
    }
  ];

  return (
    <section id="foundations" className="py-20 bg-white ">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-20">
          {/* Centered Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border-gray  bg-white  shadow-sm mb-8">
            <Zap className="w-3.5 h-3.5 text-primary-blue fill-current" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-text-dark ">
              How it works
            </span>
          </div>
          <h2 className="text-[27px] sm:text-[33px] md:text-[45px] font-bold text-text-dark  mb-4">Simple Setup</h2>
          <p className="text-text-light  max-w-2xl mx-auto">Get started with Litefon in three simple steps. No contracts or complex setups.</p>
        </div>

        <div className="relative flex flex-col md:flex-row justify-between items-start gap-12">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-px border-t border-dashed border-border-gray  z-0" />
          
          {steps.map((step, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center text-center md:w-1/3">
              <div className="w-24 h-24 bg-soft-gray  rounded-full flex items-center justify-center border border-border-gray  mb-6 group hover:border-primary-blue transition-colors">
                <step.icon className="w-10 h-10 text-text-dark  group-hover:text-primary-blue transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-text-dark  mb-3">{step.title}</h3>
              <p className="text-text-light  leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Features Section ---
export function Features() {
  const features = [
    {
      title: "Global Coverage",
      desc: "Call over 200 countries with competitive rates and high-quality connections.",
      icon: Globe
    },
    {
      title: "Virtual Numbers",
      desc: "Get local numbers in 50+ countries to receive calls directly in your browser.",
      icon: Smartphone
    },
    {
      title: "Secure & Private",
      desc: "Your calls are encrypted and your data is never shared with third parties.",
      icon: Shield
    },
    {
      title: "Real-time Billing",
      desc: "See exactly how much each call costs as you talk with no hidden fees.",
      icon: BarChart3
    },
    {
      title: "HD Audio Quality",
      desc: "Experience crystal clear voice calls with our optimized global network infrastructure.",
      icon: Zap
    },
    {
      title: "24/7 Support",
      desc: "Our dedicated support team is available around the clock to help you with any issues.",
      icon: Clock
    }
  ];

  return (
    <section id="features" className="py-24 bg-white  relative">
      {/* Framing Lines */}
      <div className="absolute inset-y-0 left-6 md:left-12 lg:left-24 w-px border-l border-dashed border-gray-200  hidden lg:block" />
      <div className="absolute inset-y-0 right-6 md:right-12 lg:right-24 w-px border-r border-dashed border-gray-200  hidden lg:block" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Header Area */}
        <div className="flex flex-col items-center text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border-gray  bg-white  shadow-sm mb-8">
            <Shield className="w-3.5 h-3.5 text-primary-blue" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-text-dark ">Benefits</span>
          </div>
          
          <h2 className="text-[27px] sm:text-[33px] md:text-[45px] tracking-tight mb-6">
            <span className="block font-light text-text-light ">Your current workflow is</span>
            <span className="block font-bold text-text-dark ">Slowing you down!</span>
          </h2>
          
          <p className="text-text-light  text-lg">
            Here is why you need a better communication system
          </p>
        </div>

        {/* Content Grid */}
        <div className="relative">
          {/* Internal Dividing Lines */}
          {/* Vertical Center Line */}
          <div className="absolute top-0 bottom-0 left-1/2 w-px border-l border-dashed border-gray-200  hidden md:block" />
          
          {/* Horizontal Lines */}
          <div className="absolute top-1/3 left-0 right-0 h-px border-t border-dashed border-gray-200  hidden md:block" />
          <div className="absolute top-2/3 left-0 right-0 h-px border-t border-dashed border-gray-200  hidden md:block" />

          {/* Intersection Nodes */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border border-gray-200  bg-white  z-10 hidden md:block" />
          <div className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border border-gray-200  bg-white  z-10 hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-2">
            {features.map((feature, i) => (
              <div 
                key={i} 
                className={cn(
                  "p-12 md:p-16 flex items-start gap-6",
                  // Mobile borders
                  i !== features.length - 1 ? "border-b border-dashed border-gray-200  md:border-0" : ""
                )}
              >
                <div className="flex-shrink-0 mt-1">
                  <feature.icon className="w-6 h-6 text-primary-blue" />
                </div>
                <div className="flex flex-col items-start text-left">
                  <h3 className="text-xl font-bold text-text-dark ">{feature.title}</h3>
                  <p className="text-text-light  leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Built for Business Section ---
export function BuiltForBusiness({ onGetStarted }: { onGetStarted?: () => void }) {
  return (
    <section className="py-24 bg-white  overflow-hidden relative font-sans">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-blue/10 border border-primary-blue/20 text-primary-blue font-bold text-[10px] uppercase tracking-widest mb-6"
            >
              Explore Enterprise
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[27px] sm:text-[33px] md:text-[45px] font-bold text-text-dark  mb-6 leading-tight tracking-tight"
            >
              Master your team's budget with effortless credit allocation.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-base sm:text-lg text-text-light  mb-10 leading-relaxed max-w-xl"
            >
              Whether you're a startup or an established enterprise, Litefon provides the tools your team needs to stay connected globally. Manage users, track usage, and control costs from a single dashboard.
            </motion.p>
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-12">
              {[
                "Global Coverage",
                "Real-time Billing",
                "HD Audio Quality",
                "24/7 Support"
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-blue/10 flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary-blue" />
                  </div>
                  <span className="text-sm font-medium text-text-dark ">{item}</span>
                </motion.div>
              ))}
            </div>

            <button 
              onClick={onGetStarted}
              className="bg-primary-blue text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl shadow-primary-blue/20 hover:bg-secondary-blue transition-all"
            >
              Get Started
            </button>
          </div>

          <div className="relative flex items-center justify-center min-h-[400px]">
            {/* Decorative elements */}
            <div className="absolute w-80 h-80 bg-primary-blue/5 rounded-full blur-3xl" />
            <div className="absolute w-80 h-80 bg-primary-blue/10 rounded-full blur-3xl" />
            
            {/* Floating Dashboard Animation */}
            <div className="relative w-full max-w-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white  rounded-2xl shadow-2xl border border-slate-100  p-6 relative z-10"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-blue/10 flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-primary-blue" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-black ">Usage Analytics</h4>
                      <p className="text-[10px] text-slate-500">Real-time tracking</p>
                    </div>
                  </div>
                  <div className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-500 text-[10px] font-bold">
                    +12.5%
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { label: "Active Users", value: "24", color: "bg-primary-blue" },
                    { label: "Total Minutes", value: "1,240", color: "bg-indigo-500" },
                    { label: "Cost Savings", value: "$420.50", color: "bg-emerald-500" }
                  ].map((stat, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-[10px] font-medium">
                        <span className="text-slate-500">{stat.label}</span>
                        <span className="text-black  font-bold">{stat.value}</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100  rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: "70%" }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + i * 0.2, duration: 1 }}
                          className={`h-full ${stat.color} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-6 bg-white  rounded-xl shadow-xl p-4 border border-slate-100  z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-black ">Payment Success</p>
                    <p className="text-[8px] text-slate-500">Credit added instantly</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -left-6 bg-white  rounded-xl shadow-xl p-4 border border-slate-100  z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-blue/20 flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary-blue" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-black ">Team Active</p>
                    <p className="text-[8px] text-slate-500">12 members online</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- CTA Section ---
// Removed as per request

// --- Footer ---
export function Footer({ 
  onRatesClick, 
  onDialerClick, 
  onBlogClick, 
  onContactClick 
}: { 
  onRatesClick?: () => void;
  onDialerClick?: () => void;
  onBlogClick?: () => void;
  onContactClick?: () => void;
}) {
  return (
    <footer className="bg-white pt-16 sm:pt-20 pb-12 border-t border-border-gray w-full mt-auto transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-12 mb-16 sm:mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary-blue rounded-full flex items-center justify-center">
                <Phone className="text-white w-4 h-4 fill-current" />
              </div>
              <span className="brand-litefon text-text-dark ">Litefon</span>
            </div>
            <p className="text-text-light  max-w-xs leading-relaxed mb-8">
              The modern way to make international calls. Simple, affordable, and right in your browser.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-text-dark  mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-text-light ">
              <li><button onClick={onRatesClick} className="hover:text-primary-blue transition-colors">Rates</button></li>
              <li><button onClick={onDialerClick} className="hover:text-primary-blue transition-colors">Dialer</button></li>
              <li><button onClick={onRatesClick} className="hover:text-primary-blue transition-colors">Billing</button></li>
              <li><button onClick={onDialerClick} className="hover:text-primary-blue transition-colors">History</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-text-dark  mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-text-light ">
              <li><button onClick={onContactClick} className="hover:text-primary-blue transition-colors">About Us</button></li>
              <li><button onClick={onBlogClick} className="hover:text-primary-blue transition-colors">Blog</button></li>
              <li><button onClick={onContactClick} className="hover:text-primary-blue transition-colors">Careers</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-text-dark  mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-text-light ">
              <li><button onClick={onContactClick} className="hover:text-primary-blue transition-colors">Privacy Policy</button></li>
              <li><button onClick={onContactClick} className="hover:text-primary-blue transition-colors">Terms of Service</button></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 sm:pt-10 border-t border-border-gray flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 text-center">
          <p className="text-xs text-text-light">© 2026 Litefon Technologies Inc. All rights reserved.</p>
          <div className="flex gap-6 sm:gap-8 text-xs text-text-light">
            <a href="#" className="hover:text-primary-blue transition-colors">Twitter</a>
            <a href="#" className="hover:text-primary-blue transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-primary-blue transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

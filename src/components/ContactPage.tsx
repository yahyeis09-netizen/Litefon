import React from 'react';
import { 
  ArrowUpRight, 
  User, 
  Mail, 
  Building2, 
  Phone, 
  DollarSign, 
  MessageSquare, 
  ChevronDown, 
  Send,
  ArrowLeft
} from 'lucide-react';
import Navbar from './Navbar';
import { Footer } from './Sections';

interface ContactPageProps {
  onBack: () => void;
  onAuthClick: (mode?: 'signin' | 'signup') => void;
}

export default function ContactPage({ onBack, onAuthClick }: ContactPageProps) {
  return (
    <div className="min-h-screen bg-bg-light dark:bg-slate-950 flex flex-col transition-colors duration-300">
      <Navbar onAuthClick={onAuthClick} onContactClick={() => {}} isContactPage={true} onLogoClick={onBack} />
      
      <main className="flex-grow flex items-center justify-center py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-[40%_60%] gap-16 lg:gap-24 items-center">
          
          {/* Left Column (Information Stack) */}
          <div className="flex flex-col gap-8">
            <h1 className="text-5xl md:text-7xl font-bold text-text-dark dark:text-white tracking-tight leading-tight">
              Let's collaborate
            </h1>
            <p className="text-text-light dark:text-slate-400 text-xl leading-relaxed max-w-md">
              Reach out and let's explore how we can bring your ideas to life. 
              Whether you're ready to begin or just have questions.
            </p>
          </div>

          {/* Right Column (Form Layout) */}
          <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[3rem] border border-border-gray/50 dark:border-slate-800 shadow-xl shadow-black/[0.02]">
            <div className="flex flex-col gap-6">
              <div className="relative">
                <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light/50 dark:text-slate-600" />
                <input 
                  type="text" 
                  placeholder="Name" 
                  className="w-full pl-14 pr-6 py-4 rounded-full border border-border-gray dark:border-slate-800 bg-white dark:bg-slate-950 text-text-dark dark:text-white focus:outline-none focus:border-primary-blue transition-colors"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light/50 dark:text-slate-600" />
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full pl-14 pr-6 py-4 rounded-full border border-border-gray dark:border-slate-800 bg-white dark:bg-slate-950 text-text-dark dark:text-white focus:outline-none focus:border-primary-blue transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <Building2 className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light/50 dark:text-slate-600" />
                  <input 
                    type="text" 
                    placeholder="Company name" 
                    className="w-full pl-14 pr-6 py-4 rounded-full border border-border-gray dark:border-slate-800 bg-white dark:bg-slate-950 text-text-dark dark:text-white focus:outline-none focus:border-primary-blue transition-colors"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light/50 dark:text-slate-600" />
                  <input 
                    type="tel" 
                    placeholder="Phone" 
                    className="w-full pl-14 pr-6 py-4 rounded-full border border-border-gray dark:border-slate-800 bg-white dark:bg-slate-950 text-text-dark dark:text-white focus:outline-none focus:border-primary-blue transition-colors"
                  />
                </div>
              </div>

              <div className="relative">
                <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light/50 dark:text-slate-600" />
                <select 
                  defaultValue=""
                  className="w-full pl-14 pr-12 py-4 rounded-full border border-border-gray dark:border-slate-800 bg-white dark:bg-slate-950 focus:outline-none focus:border-primary-blue transition-colors appearance-none text-text-light dark:text-slate-400"
                >
                  <option value="" disabled>Select a budget...</option>
                  <option value="small">$5k - $10k</option>
                  <option value="medium">$10k - $25k</option>
                  <option value="large">$25k+</option>
                </select>
                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light/50 dark:text-slate-600 pointer-events-none" />
              </div>

              <div className="relative">
                <MessageSquare className="absolute left-6 top-6 w-5 h-5 text-text-light/50 dark:text-slate-600" />
                <textarea 
                  placeholder="What can we help you with?" 
                  rows={6}
                  className="w-full pl-14 pr-6 py-6 rounded-3xl border border-border-gray dark:border-slate-800 bg-white dark:bg-slate-950 text-text-dark dark:text-white focus:outline-none focus:border-primary-blue transition-colors resize-none"
                />
              </div>

              <button className="w-full btn-primary-gradient py-5 flex items-center justify-center gap-3 shadow-xl shadow-primary-blue/20">
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

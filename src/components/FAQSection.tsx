import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, Plus, Minus, MessageCircle, ArrowRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface FAQItemProps {
  key?: React.Key;
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
  return (
    <div className="border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden transition-all duration-300">
      <button
        onClick={onClick}
        className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
      >
        <span className="text-lg font-medium text-text-dark dark:text-white">{question}</span>
        <div className={cn(
          "w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300",
          isOpen ? "rotate-180 bg-primary-blue text-white" : "bg-soft-gray dark:bg-zinc-800 text-text-light dark:text-zinc-400"
        )}>
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-8 pb-6 text-text-light dark:text-zinc-400 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface FAQSectionProps {
  onContactClick?: () => void;
}

export default function FAQSection({ onContactClick }: FAQSectionProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const tabs = ["General", "Features", "Security"];
  
  const faqs = [
    {
      q: "How does the Litefon VoIP app work?",
      a: "Litefon uses Voice over IP (VoIP) technology to route your calls over the internet. This allows you to make high-quality international calls directly from your browser or app without needing a traditional phone line or SIM card."
    },
    {
      q: "Is there a limit to how many numbers I can own?",
      a: "There is no hard limit. Whether you need one number for personal privacy or a hundred for your global sales team, our platform scales with your requirements."
    },
    {
      q: "Can I receive SMS on my virtual number?",
      a: "Yes, most of our virtual numbers support both incoming and outgoing SMS. You can manage your messages through our web interface or mobile app, keeping your personal number private."
    },
    {
      q: "What are 'talking areas' and how is coverage determined?",
      a: "Talking areas refer to our optimized network zones that ensure crystal-clear voice quality. We partner with tier-1 carriers globally to provide 99.9% coverage across all major continents."
    },
    {
      q: "How do I buy an international phone number?",
      a: "You can purchase virtual numbers from over 100 countries directly through our dashboard. Simply select the country, choose your preferred area code, and your new number is ready for use instantly."
    },
    {
      q: "What is WebRTC and how does it benefit me?",
      a: "WebRTC (Web Real-Time Communication) is a technology that allows high-quality audio and video communication directly through your web browser. For you, this means no software to install, lower latency, and crystal-clear voice quality on every call."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-white dark:bg-bg-dark transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-6">
        {/* 1. Header Area */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 shadow-sm mb-6">
            <HelpCircle className="w-3.5 h-3.5 text-primary-blue" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-text-medium dark:text-zinc-400">Support</span>
          </div>
          
          <h2 className="text-[27px] sm:text-[33px] md:text-[45px] tracking-tight mb-6">
            <span className="block font-light text-text-light dark:text-zinc-400">Got Questions?</span>
            <span className="block font-bold text-text-dark dark:text-white">Global Connectivity Explained</span>
          </h2>
          
          <p className="text-text-light dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
            Everything you need to know about virtual SIMs, international numbers, and our global talking areas.
          </p>
        </div>

        {/* 2. Segmented Control / Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 bg-soft-gray dark:bg-zinc-800 rounded-full border border-black/5 dark:border-white/5">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={cn(
                  "px-6 py-2 text-sm font-medium rounded-full transition-all duration-200",
                  activeTab === i 
                    ? "bg-white dark:bg-zinc-700 text-text-dark dark:text-white shadow-sm" 
                    : "text-text-light dark:text-zinc-400 hover:text-text-medium dark:hover:text-zinc-200"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Accordion List */}
        <div className="flex flex-col gap-4 mb-20">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              question={faq.q}
              answer={faq.a}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        {/* 4. Call-to-Action (CTA) Footer Card */}
        <div className="bg-soft-gray dark:bg-zinc-800 rounded-[32px] p-8 md:p-12 border border-black/5 dark:border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col text-center md:text-left">
              <h3 className="text-2xl font-bold text-text-dark dark:text-white mb-2">Still have questions?</h3>
              <p className="text-text-light dark:text-zinc-400">We're here to help you get started with your global communication.</p>
            </div>
            
            <button 
              onClick={onContactClick}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-blue text-white rounded-full font-bold shadow-lg shadow-primary-blue/20 hover:bg-secondary-blue transition-all group whitespace-nowrap"
            >
              <MessageCircle className="w-5 h-5" />
              Contact Support
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

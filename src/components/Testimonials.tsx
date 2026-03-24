import React from 'react';
import { Quote, Star } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface Testimonial {
  id: number;
  content: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    content: "Litefon was a total savior for our business. We were paying a fortune to other carriers for international calls. Now we pay way less and the quality is even better.",
    author: "David Keith",
    role: "Digital Nomad",
    avatar: "https://i.pravatar.cc/150?u=david",
    rating: 5
  },
  {
    id: 2,
    content: "I used to dread my monthly phone bill from my previous carrier. Switching to Litefon was the best decision—I'm saving hundreds every month.",
    author: "Brian Moore",
    role: "Startup Founder",
    avatar: "https://i.pravatar.cc/150?u=brian",
    rating: 5
  },
  {
    id: 3,
    content: "The cost savings are incredible. Other carriers charge ridiculous roaming fees, but with Litefon, I just use my browser and pay a fraction of the price.",
    author: "Darryl Shepard",
    role: "Sales Director",
    avatar: "https://i.pravatar.cc/150?u=darryl",
    rating: 5
  },
  {
    id: 4,
    content: "It's a savior in terms of everything. Money, setup time, and reliability. I've recommended it to all my colleagues who need to call abroad.",
    author: "Scott Robert",
    role: "Security Consultant",
    avatar: "https://i.pravatar.cc/150?u=scott",
    rating: 5
  },
  {
    id: 5,
    content: "We were using a traditional PBX system that was costing us thousands. Litefon's virtual numbers are a game-changer for our budget.",
    author: "Nicole Thomas",
    role: "Operations Manager",
    avatar: "https://i.pravatar.cc/150?u=nicole",
    rating: 5
  },
  {
    id: 6,
    content: "Pay less, call more. That's exactly what Litefon delivered. It's much better than any other carrier I've used in the past decade.",
    author: "Yusuf Ahmed",
    role: "Tech Entrepreneur",
    avatar: "https://i.pravatar.cc/150?u=yusuf",
    rating: 5
  }
];

interface TestimonialsProps {
  onShowMoreClick?: () => void;
}

export default function Testimonials({ onShowMoreClick }: TestimonialsProps) {
  return (
    <section className="relative w-full py-20 bg-[#F9FAFB] dark:bg-slate-950 overflow-hidden">
      {/* Decorative vertical dashed lines */}
      <div className="absolute left-[5%] top-0 bottom-0 w-px border-l border-dashed border-gray-200 dark:border-slate-800 hidden xl:block" />
      <div className="absolute right-[5%] top-0 bottom-0 w-px border-l border-dashed border-gray-200 dark:border-slate-800 hidden xl:block" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Header Area */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm mb-6">
            <Quote className="w-3 h-3 text-primary-blue" />
            <span className="text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase tracking-wider">Testimonials</span>
          </div>
          
          <h2 className="text-[27px] sm:text-[33px] md:text-[45px] font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            Have questions, <span className="font-medium text-gray-400 dark:text-slate-500">We got answers.</span>
          </h2>
          
          <p className="max-w-xl text-lg text-gray-500 dark:text-slate-400 leading-relaxed">
            Join thousands of travelers and businesses who stay connected without borders using our virtual numbers.
            We've built a platform that delivers premium quality and reliability for your global communication needs.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="relative">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="break-inside-avoid bg-white dark:bg-slate-900 rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-gray-50 dark:border-slate-800 flex flex-col items-start text-left transition-transform hover:scale-[1.02] duration-300"
              >
                <Quote className="w-6 h-6 text-gray-200 dark:text-slate-800 mb-6" />
                
                <p className="text-gray-600 dark:text-slate-300 leading-relaxed mb-8 text-[15px]">
                  "{testimonial.content}"
                </p>

                <div className="w-full flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.author}
                      className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{testimonial.author}</span>
                      <span className="text-xs text-gray-400 dark:text-slate-500">{testimonial.role}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-0.5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#FBBF24] text-[#FBBF24]" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Fading Overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#F9FAFB] dark:from-slate-950 to-transparent pointer-events-none" />
        </div>

        {/* Footer CTA */}
        <div className="flex justify-center mt-8 relative z-10">
          <button 
            onClick={onShowMoreClick}
            className="px-8 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-full text-sm font-bold text-gray-700 dark:text-slate-300 shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-slate-700 transition-all"
          >
            Show More Reviews
          </button>
        </div>
      </div>
    </section>
  );
}

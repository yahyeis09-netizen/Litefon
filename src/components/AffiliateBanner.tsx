import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Zap, Phone } from 'lucide-react';

const avatars = [
  "https://i.pravatar.cc/150?u=1",
  "https://i.pravatar.cc/150?u=2",
  "https://i.pravatar.cc/150?u=3",
  "https://i.pravatar.cc/150?u=4",
  "https://i.pravatar.cc/150?u=5",
];

interface AffiliateBannerProps {
  onAffiliateClick?: () => void;
}

export default function AffiliateBanner({ onAffiliateClick }: AffiliateBannerProps) {
  return (
    <section className="py-16 sm:py-24 bg-gray-50/50 px-4 sm:px-6">
      <div className="max-w-[1054px] mx-auto">
        <div className="bg-white  rounded-[3rem] shadow-xl shadow-gray-200/50  overflow-hidden border border-gray-100  min-h-[302px] flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center w-full">
            
            {/* Left Column: Text Content */}
            <div className="p-6 sm:p-8 lg:pl-16 lg:pr-8 py-8 sm:py-10">
              <span className="text-text-light text-sm font-medium mb-2 block tracking-wide">Become an Affiliate</span>
              <h2 className="text-[22px] sm:text-[27px] lg:text-[33px] font-bold text-text-dark mb-3 tracking-tight">
                Join our Affiliate Program
              </h2>
              <p className="text-text-medium text-sm sm:text-base mb-6 leading-relaxed max-w-md">
                Earn up to <span className="font-bold text-text-dark">$200</span> with our generous <span className="font-bold text-text-dark">40%</span> commission for every sale you drive with your referral link.
              </p>
              <button 
                onClick={onAffiliateClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-blue text-white rounded-full font-bold text-sm hover:bg-secondary-blue transition-all shadow-lg shadow-primary-blue/20 group"
              >
                Become an affiliate
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            {/* Right Column: Orbit Graphic */}
            <div className="relative h-[302px] bg-soft-gray/30  flex items-center justify-center overflow-hidden">
              {/* Concentric Rings */}
              <div className="absolute w-[80px] h-[80px] rounded-full border border-dashed border-border-gray " />
              <div className="absolute w-[160px] h-[160px] rounded-full border border-dashed border-border-gray " />
              <div className="absolute w-[240px] h-[240px] rounded-full border border-dashed border-border-gray " />
              <div className="absolute w-[320px] h-[320px] rounded-full border border-dashed border-border-gray " />

              {/* Central Logo Icon */}
              <div className="relative z-10 w-12 h-12 bg-primary-blue rounded-full flex items-center justify-center shadow-xl shadow-primary-blue/20">
                <Phone className="w-6 h-6 text-white fill-current" />
              </div>

              {/* Revolving Avatars */}
              {avatars.map((avatar, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 25 + i * 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    width: 160 + i * 40,
                    height: 160 + i * 40,
                  }}
                >
                  <div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-white  shadow-lg overflow-hidden bg-white "
                    style={{ transform: `rotate(-${(360 / avatars.length) * i}deg)` }}
                  >
                    <img 
                      src={avatar} 
                      alt="User" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

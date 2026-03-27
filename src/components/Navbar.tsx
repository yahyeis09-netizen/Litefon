import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, ArrowRight, Sun, Moon, User, LogOut, Settings } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface NavbarProps {
  onAuthClick?: (mode: 'signin' | 'signup') => void;
  onContactClick?: () => void;
  onBlogClick?: () => void;
  onDialerClick?: () => void;
  onRatesClick?: () => void;
  onTeamClick?: () => void;
  onLogoClick?: () => void;
  isContactPage?: boolean;
  isLoggedIn?: boolean;
}

export default function Navbar({ 
  onAuthClick, 
  onContactClick, 
  onBlogClick, 
  onDialerClick, 
  onRatesClick,
  onTeamClick,
  onLogoClick, 
  isContactPage,
  isLoggedIn 
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    if (!isUserMenuOpen) return;
    
    const handleClickOutside = () => setIsUserMenuOpen(false);
    window.addEventListener('click', handleClickOutside);
    
    return () => window.removeEventListener('click', handleClickOutside);
  }, [isUserMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Rates', href: '#rates' },
    { name: 'Buy number', href: '#buy-number' },
    { name: 'Blog', href: '#blog' },
    { name: 'Teams', href: '#teams' },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-6 py-3 border-b border-black/[0.05] ",
        isScrolled ? "bg-white/80  backdrop-blur-lg py-2" : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo - Left */}
        <button 
          onClick={onLogoClick || (() => window.scrollTo({ top: 0, behavior: 'smooth' }))} 
          className="flex items-center gap-2 group relative"
        >
          <div className="w-8 h-8 md:w-10 md:h-10 bg-primary-blue rounded-lg md:rounded-xl flex items-center justify-center shadow-lg shadow-primary-blue/30 group-hover:scale-110 transition-transform duration-500 overflow-hidden relative">
            <Phone className="text-white w-3.5 h-3.5 md:w-5 md:h-5 fill-current relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col items-start translate-y-[1px]">
            <span className="text-base md:text-xl font-bold tracking-tight text-[#000000] transition-colors leading-none">
              Litefon
            </span>
          </div>
        </button>

        {/* Desktop Links - Centered */}
        <div className="hidden md:flex items-center md:gap-3 lg:gap-8">
              {navLinks.map((link) => (
                <button 
                  key={link.name} 
                  onClick={
                    link.name === 'Home' ? (onLogoClick || (() => window.scrollTo({ top: 0, behavior: 'smooth' }))) :
                    link.name === 'Teams' ? onTeamClick : 
                    link.name === 'Blog' ? onBlogClick : 
                    link.name === 'Rates' ? onRatesClick :
                    link.name === 'Buy number' ? onRatesClick :
                    undefined
                  }
              className={cn(
                "text-xs lg:text-sm font-medium transition-colors whitespace-nowrap",
                link.name === 'Contact' && isContactPage 
                  ? "text-[#3B63F6] font-bold" 
                  : "text-[#475569] hover:text-[#000000]  "
              )}
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center md:gap-2 lg:gap-3 relative">
          {isLoggedIn ? (
            <div className="relative">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsUserMenuOpen(!isUserMenuOpen);
                }}
                className={cn(
                  "w-10 h-10 rounded-full bg-gray-100  flex items-center justify-center border transition-all duration-200",
                  isUserMenuOpen 
                    ? "border-primary-blue shadow-lg shadow-primary-blue/10 scale-105" 
                    : "border-gray-200  hover:bg-gray-200 "
                )}
                title="User Menu"
              >
                <User className="w-5 h-5 text-gray-600 " />
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-0 mt-3 w-56 bg-white  rounded-2xl shadow-xl border border-gray-100  overflow-hidden z-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-2">
                      <div className="px-4 py-3 border-b border-gray-50  mb-1">
                        <p className="text-xs font-medium text-gray-400  uppercase tracking-wider">Account</p>
                        <p className="text-sm font-bold text-gray-900  truncate mt-0.5">User Settings</p>
                      </div>
                      
                      <button 
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600  hover:bg-gray-50  rounded-xl transition-colors group"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                        Settings
                      </button>

                      <div className="h-px bg-gray-50  my-1 mx-2" />

                      <button 
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onAuthClick?.('signin');
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600  hover:bg-red-50  rounded-xl transition-colors font-semibold"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button 
              onClick={() => onAuthClick?.('signin')}
              className="text-[12px] lg:text-sm font-semibold text-[#000000]  hover:bg-gray-50  transition-colors px-3 lg:px-6 py-2 lg:py-2.5 border border-[#E2E8F0]  rounded-full bg-white  whitespace-nowrap"
            >
              Sign In
            </button>
          )}
          <button 
            onClick={onDialerClick}
            className="bg-[#3B63F6] hover:bg-[#2D4ED3] text-white flex items-center gap-1.5 lg:gap-2 text-[12px] lg:text-sm font-bold px-3 lg:px-6 py-2 lg:py-2.5 rounded-full transition-all shadow-md shadow-[#3B63F6]/10 whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5 md:w-4 md:h-4" />
            Make call now
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button 
            className="text-text-dark"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white  border-b border-border-gray  overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <button 
                  key={link.name} 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (link.name === 'Home') {
                      (onLogoClick || (() => window.scrollTo({ top: 0, behavior: 'smooth' })))();
                    } else if (link.name === 'Teams') {
                      onTeamClick?.();
                    } else if (link.name === 'Blog') {
                      onBlogClick?.();
                    } else if (link.name === 'Rates' || link.name === 'Buy number') {
                      onRatesClick?.();
                    }
                  }}
                  className={cn(
                    "text-lg font-medium text-left",
                    link.name === 'Contact' && isContactPage 
                      ? "text-primary-blue font-bold" 
                      : "text-text-light "
                  )}
                >
                  {link.name}
                </button>
              ))}
              <hr className="border-border-gray " />
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onAuthClick?.('signin');
                }}
                className="text-left text-lg font-semibold text-text-dark  flex items-center gap-2"
              >
                {isLoggedIn ? (
                  <>
                    <User className="w-5 h-5" />
                    Sign Out
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onDialerClick?.();
                }}
                className="w-full py-4 bg-[#3B63F6] hover:bg-[#2D4ED3] text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-3 shadow-xl shadow-[#3B63F6]/25 transition-all active:scale-95"
              >
                <Phone className="w-4 h-4 fill-current" />
                Make a Call Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

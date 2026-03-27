import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, ArrowLeft, Star, Quote, Loader2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { supabase } from '../supabaseClient';

interface AuthPageProps {
  onBack: () => void;
  initialMode?: 'signin' | 'signup';
}

export default function AuthPage({ onBack, initialMode = 'signin' }: AuthPageProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const toggleMode = () => {
    setMode(prev => prev === 'signin' ? 'signup' : 'signin');
    setError(null);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'signup') {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            },
          },
        });
        if (signUpError) throw signUpError;
        // If email confirmation is enabled, data.user might be present but session null
        // For this project, we'll assume redirect to home on success
        onBack();
      } else {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
        onBack();
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message || 'An error occurred during Google login');
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white  transition-colors duration-300">
      {/* Left Column: Form */}
      <div className="relative w-full lg:w-1/2 flex flex-col p-8 md:p-12 bg-white ">
        {/* Logo & Back Button */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={onBack}>
            <div className="w-9 h-9 bg-primary-blue rounded-xl flex items-center justify-center shadow-lg shadow-primary-blue/20 group-hover:scale-110 transition-transform duration-300">
              <Phone className="text-white w-4 h-4 fill-current" />
            </div>
            <span className="brand-litefon text-text-dark  transition-colors">
              Litefon
            </span>
          </div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium text-text-light  hover:text-text-dark  transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </button>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          <motion.div
            key={mode}
            initial={{ opacity: 0, x: mode === 'signin' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-text-dark  mb-2">
              {mode === 'signin' ? 'Welcome back' : 'Get Started Now'}
            </h1>
            <p className="text-text-light  mb-8">
              {mode === 'signin' 
                ? 'Welcome back! Please enter your details.' 
                : 'Enter your credentials to access your account'}
            </p>

            {/* Social Logins */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button 
                onClick={handleGoogleLogin}
                className="flex-1 flex items-center justify-center gap-3 px-4 py-2.5 border border-border-gray  rounded-full text-sm font-medium text-text-dark  hover:bg-soft-gray  transition-colors bg-white "
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                Log in with Google
              </button>
              <button className="flex-1 flex items-center justify-center gap-3 px-4 py-2.5 border border-border-gray  rounded-full text-sm font-medium text-text-dark  hover:bg-soft-gray  transition-colors bg-white ">
                <img src="https://www.apple.com/favicon.ico" alt="Apple" className="w-4 h-4" />
                Log in with Apple
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center mb-8">
              <div className="flex-grow border-t border-border-gray "></div>
              <span className="flex-shrink mx-4 text-xs text-text-light  uppercase tracking-widest">or</span>
              <div className="flex-grow border-t border-border-gray "></div>
            </div>

            {/* Form Fields */}
            <form className="space-y-5" onSubmit={handleAuth}>
              {mode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-text-dark  mb-1.5">Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-border-gray  bg-white  text-text-dark  focus:outline-none focus:border-primary-blue transition-colors"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-text-dark  mb-1.5">Email address</label>
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border-gray  bg-white  text-text-dark  focus:outline-none focus:border-primary-blue transition-colors"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-text-dark ">Password</label>
                  <a href="#" className="text-xs font-semibold text-primary-blue hover:underline">Forgot password?</a>
                </div>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border-gray  bg-white  text-text-dark  focus:outline-none focus:border-primary-blue transition-colors"
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50  border border-red-100 ">
                  <p className="text-xs text-red-600  font-medium">
                    {error}
                  </p>
                </div>
              )}

              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="remember" 
                  className="w-4 h-4 rounded border-border-gray  text-primary-blue focus:ring-primary-blue bg-white "
                />
                <label htmlFor="remember" className="text-sm text-text-light ">
                  {mode === 'signin' ? 'Remember for 30 days' : 'I agree to the Terms & Privacy'}
                </label>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full btn-primary-gradient py-4 text-base font-bold shadow-lg shadow-primary-blue/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                {mode === 'signin' ? 'Log in' : 'Create account'}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-text-light ">
              {mode === 'signin' ? "Don't have an account?" : "Already have an account?"}{' '}
              <button 
                onClick={toggleMode}
                className="font-bold text-primary-blue hover:underline"
              >
                {mode === 'signin' ? 'Sign up for free' : 'Sign in'}
              </button>
            </p>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-8 text-center lg:text-left">
          <p className="text-xs text-text-light/50 ">© 2026 Litefon, All rights Reserved</p>
        </div>
      </div>

      {/* Right Column: Testimonial Grid */}
      <div className="hidden lg:flex w-1/2 bg-[#F9FAFB]  relative overflow-hidden p-12 border-l border-border-gray ">
        {/* Decorative Gradient Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/20   pointer-events-none z-10" />
        
        <div className="grid grid-cols-2 gap-6 w-full relative z-0">
          {/* Column 1 */}
          <div className="flex flex-col gap-6 pt-12">
            {[
              {
                name: "David Keith",
                role: "Product Designer",
                quote: "Saved me so much time on a SaaS dashboard project. The components are clean, responsive, and easy to customize.",
                avatar: "https://picsum.photos/seed/david/100/100"
              },
              {
                name: "Scott Robert",
                role: "Ui/UX Designer",
                quote: "I used to waste so much time fiddling with base components. Now, I just drop in a few blocks, tweak colors, and ship. It even made me enjoy working on admin panels again.",
                avatar: "https://picsum.photos/seed/scott/100/100"
              },
              {
                name: "Jonas Meyer",
                role: "Product Lead",
                quote: "I wasn't sure if I really needed a design system, but this one is by far one of the best. The quality and attention to detail are remarkable.",
                avatar: "https://picsum.photos/seed/jonas/100/100"
              }
            ].map((t, i) => (
              <TestimonialCard 
                key={i} 
                name={t.name} 
                role={t.role} 
                quote={t.quote} 
                avatar={t.avatar} 
              />
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-6">
            {[
              {
                name: "Brian Moore",
                role: "Freelance Designer",
                quote: "Saved me days on a client project. Clean, fast, easy to tweak.",
                avatar: "https://picsum.photos/seed/brian/100/100"
              },
              {
                name: "Nicole Thomas",
                role: "Sr Product Designer",
                quote: "Litefon has been a lifesaver for our team. Before, our communication was a mess and everyone was using different apps. Now we're all on the same page.",
                avatar: "https://picsum.photos/seed/nicole/100/100"
              },
              {
                name: "Yusuf Ahmed",
                role: "Ui/UX Designer",
                quote: "This system is a must-have for any business! It has dramatically improved our efficiency and allowed us to focus on growth rather than repetitive tasks.",
                avatar: "https://picsum.photos/seed/yusuf/100/100"
              }
            ].map((t, i) => (
              <TestimonialCard 
                key={i} 
                name={t.name} 
                role={t.role} 
                quote={t.quote} 
                avatar={t.avatar} 
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

const TestimonialCard: React.FC<{ name: string, role: string, quote: string, avatar: string }> = ({ name, role, quote, avatar }) => {
  return (
    <div className="bg-white  p-6 rounded-[2rem] shadow-sm border border-black/[0.03]  flex flex-col gap-4">
      <Quote className="w-6 h-6 text-text-light/20 " />
      <p className="text-sm text-text-medium  leading-relaxed">
        "{quote}"
      </p>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-3">
          <img 
            src={avatar} 
            alt={name} 
            className="w-8 h-8 rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-text-dark ">{name}</span>
            <span className="text-[10px] text-text-light ">{role}</span>
          </div>
        </div>
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      </div>
    </div>
  );
}

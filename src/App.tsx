import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AuthPage from './components/AuthPage';
import { supabase } from './supabaseClient';
import { 
  Hero, 
  HowItWorks, 
  Features, 
  BuiltForBusiness, 
  Footer 
} from './components/Sections';
import Testimonials from './components/Testimonials';
import FAQSection from './components/FAQSection';
import ComparisonSection from './components/ComparisonSection';
import RateTableSection from './components/RateTableSection';
import CountryRates from './components/CountryRates';
import AffiliateBanner from './components/AffiliateBanner';
import ContactPage from './components/ContactPage';
import TeamPage from './components/TeamPage';
import BlogPage from './components/BlogPage';
import DialerApp from './components/dialer/DialerApp';
import EnterpriseCheckout from './components/EnterpriseCheckout';
import Dashboard from './components/Dashboard';

import RatesPage from './components/RatesPage';

export default function App() {
  const [view, setView] = useState<'landing' | 'auth' | 'contact' | 'team' | 'blog' | 'dialer' | 'enterprise' | 'rates' | 'dashboard'>('landing');
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const isLoggedIn = !!session;

  const handleAuth = (mode: 'signin' | 'signup' = 'signin') => {
    if (isLoggedIn) {
      supabase.auth.signOut();
      return;
    }
    setAuthMode(mode);
    setView('auth');
    window.scrollTo(0, 0);
  };

  const handleContact = () => {
    setView('contact');
    window.scrollTo(0, 0);
  };

  const handleBlog = () => {
    setView('blog');
    window.scrollTo(0, 0);
  };

  const handleDialer = () => {
    setView('dialer');
    window.scrollTo(0, 0);
  };

  const handleEnterprise = () => {
    setView('dashboard');
    window.scrollTo(0, 0);
  };

  const handleRates = () => {
    setView('rates');
    window.scrollTo(0, 0);
  };

  const handleTeam = () => {
    setView('team');
    window.scrollTo(0, 0);
  };

  const handleAffiliate = () => alert('Affiliate program details coming soon!');
  const handleShowMoreReviews = () => alert('More reviews loading...');

  if (view === 'auth') {
    return <AuthPage onBack={() => setView('landing')} initialMode={authMode} />;
  }

  if (view === 'contact') {
    return <ContactPage onBack={() => setView('landing')} onAuthClick={handleAuth} />;
  }

  if (view === 'team') {
    return (
      <TeamPage 
        onBack={() => setView('landing')} 
        onAuthClick={handleAuth} 
        onEnterpriseClick={handleEnterprise} 
        onContactClick={handleContact}
        onBlogClick={handleBlog}
        onDialerClick={handleDialer}
        onRatesClick={handleRates}
      />
    );
  }

  if (view === 'blog') {
    return (
      <BlogPage 
        onBack={() => setView('landing')} 
        onAuthClick={handleAuth} 
        onContactClick={handleContact}
        onBlogClick={handleBlog}
        onDialerClick={handleDialer}
        onRatesClick={handleRates}
      />
    );
  }

  if (view === 'dialer') {
    return <DialerApp onBack={() => setView('landing')} />;
  }



  if (view === 'enterprise') {
    return <EnterpriseCheckout onBack={() => setView('team')} onDialerClick={handleDialer} />;
  }

  if (view === 'rates') {
    return <RatesPage onBack={() => setView('landing')} onAuthClick={handleAuth} />;
  }

  if (view === 'dashboard') {
    return <Dashboard onBack={() => setView('landing')} onSupportClick={handleContact} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg-main font-sans selection:bg-primary-blue/20 selection:text-primary-blue transition-colors duration-300">
      <Navbar 
        onAuthClick={handleAuth} 
        onContactClick={handleContact} 
        onBlogClick={handleBlog} 
        onDialerClick={() => setView('dialer')} 
        onRatesClick={handleRates}
        onTeamClick={handleTeam}
        isLoggedIn={isLoggedIn}
      />
      <main className="flex-grow">
        <Hero 
          onDialerClick={() => setView('dialer')} 
          onRatesClick={handleRates}
          onContactClick={handleContact}
        />
        <HowItWorks />
        <Features />
        <ComparisonSection />
        <RateTableSection onDialerClick={() => setView('dialer')} />
        <CountryRates onRatesClick={handleRates} />
        <BuiltForBusiness onGetStarted={() => setView('team')} />
        <Testimonials onShowMoreClick={handleShowMoreReviews} />
        <FAQSection onContactClick={handleContact} />
        <AffiliateBanner onAffiliateClick={handleAffiliate} />
      </main>
      <Footer 
        onRatesClick={handleRates}
        onDialerClick={() => setView('dialer')}
        onBlogClick={handleBlog}
        onContactClick={handleContact}
      />
    </div>
  );
}

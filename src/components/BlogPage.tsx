import React from 'react';
import { motion } from 'motion/react';
import { 
  Twitter, 
  Linkedin, 
  Facebook, 
  Link as LinkIcon,
  ChevronLeft
} from 'lucide-react';
import Navbar from './Navbar';
import { Footer } from './Sections';

interface BlogPageProps {
  onBack: () => void;
  onAuthClick: (mode?: 'signin' | 'signup') => void;
  onContactClick?: () => void;
  onBlogClick?: () => void;
  onDialerClick?: () => void;
  onRatesClick?: () => void;
}

export default function BlogPage({ 
  onBack, 
  onAuthClick,
  onContactClick,
  onBlogClick,
  onDialerClick,
  onRatesClick
}: BlogPageProps) {
  return (
    <div className="min-h-screen bg-white  flex flex-col transition-colors duration-300">
      <Navbar 
        onAuthClick={onAuthClick} 
        onContactClick={onContactClick || (() => {})} 
        onBlogClick={onBlogClick}
        onDialerClick={onDialerClick}
        onRatesClick={onRatesClick}
        onLogoClick={onBack} 
      />
      
      <main className="flex-grow pt-24 pb-16 px-6">
        {/* Article Header Area */}
        <header className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-3 py-1 rounded-full bg-primary-blue/5 border border-primary-blue/10 text-primary-blue text-[10px] font-bold uppercase tracking-widest mb-6"
          >
            Comparison Guide
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-text-dark  mb-8 leading-[1.15] max-w-3xl mx-auto"
          >
            The Ultimate Guide to International Calling Alternatives: Why Browser-Based is the Future
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-4 text-sm text-text-light "
          >
            <div className="flex items-center gap-2">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=48&h=48&q=80" 
                alt="Author" 
                className="w-8 h-8 rounded-full border border-border-gray "
              />
              <span className="font-medium text-text-dark ">Alex Thompson</span>
            </div>
            <span>•</span>
            <span>March 16, 2026</span>
            <span>•</span>
            <span>8 min read</span>
          </motion.div>
        </header>

        <div className="max-w-6xl mx-auto relative">
          {/* Sticky Share Sidebar */}
          <aside className="hidden lg:flex flex-col gap-4 absolute left-0 top-0 sticky top-40 h-fit -translate-x-24">
            {[Twitter, Linkedin, Facebook, LinkIcon].map((Icon, i) => (
              <button 
                key={i}
                className="w-10 h-10 rounded-full border border-border-gray  flex items-center justify-center text-text-light  hover:text-primary-blue hover:border-primary-blue transition-all bg-white  shadow-sm"
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </aside>

          {/* Main Reading Container */}
          <article className="max-w-[740px] mx-auto">
            <div className="prose prose-lg prose-slate  max-w-none">
              <p className="text-xl text-text-light  leading-relaxed mb-8">
                If you’re tired of managing heavy applications, recurring subscriptions, and restrictive hardware just to make an international call, the landscape of VoIP has evolved. Today, both individuals and global teams are looking for frictionless ways to connect across borders.
              </p>

              <p className="text-lg text-text-light  leading-relaxed mb-8">
                Leading the pack for modern simplicity is <strong>Litefon</strong>, a powerful browser-based replacement for traditional desktop calling apps. With Litefon, there are no apps to install and no downloads to manage. You simply log in, top up your balance, and dial landlines or mobiles in over 180 countries directly from your web browser. Offering non-expiring credits, custom caller ID, and rates starting at just $0.02 per minute, it is the ideal pay-as-you-go solution for travelers, expats, and support teams.
              </p>

              <p className="text-lg text-text-light  leading-relaxed mb-12">
                But how does Litefon stack up against the rest of the market? Let’s dive into the top alternatives and see how they compare.
              </p>

              <h2 className="text-[27px] font-bold text-text-dark  mt-16 mb-6">The App-Dependent Consumer Tools: Toolani, Viber Out, & Yolla</h2>
              <p className="text-lg text-text-light  leading-relaxed mb-8">
                Many popular solutions in the market are built strictly around mobile applications. <strong>Toolani</strong>, for example, offers a solid prepaid credit model (€5, €10, €25) without forced subscriptions, making it a decent choice for individual users. However, unlike Litefon's browser-native approach, Toolani strictly requires you to download their iOS or Android app and offers no features for teams.
              </p>
              <p className="text-lg text-text-light  leading-relaxed mb-8">
                Similarly, <strong>Viber Out</strong> and <strong>Yolla</strong> allow you to call real phone numbers worldwide. While Viber Out is great for existing Viber users, it forces you into their specific app ecosystem, can suffer from mixed call quality on weak mobile data, and occasionally carries higher connection fees. Yolla provides a simple consumer experience for expats, but again, it traps you in a mobile app and lacks the business flexibility and ultra-low $0.02/min starting rates of Litefon.
              </p>

              <h2 className="text-[27px] font-bold text-text-dark  mt-16 mb-6">The Heavyweight Ecosystems: Google Voice & Zoom Phone</h2>
              <p className="text-lg text-text-light  leading-relaxed mb-8">
                If your business is deeply entrenched in a specific software ecosystem, you might look toward the giants. <strong>Google Voice</strong> offers low-cost international calls and deep Workspace integration, but it comes with strict geographic limitations (primarily US-focused) and requires a US phone number just to set up.
              </p>
              <p className="text-lg text-text-light  leading-relaxed mb-12">
                <strong>Zoom Phone</strong> transforms your video meeting app into a full cloud PBX with HD voice and analytics. However, for an individual traveler, expat, or lean startup looking for a simple pay-per-minute model, Zoom Phone's enterprise-level SaaS pricing and complex admin setup make it massive overkill compared to Litefon's instant, frictionless browser model.
              </p>

              <h2 className="text-[27px] font-bold text-text-dark  mt-16 mb-6">The Migrant & Calling Card Apps: Rebtel, Talk360, & KeepCalling</h2>
              <p className="text-lg text-text-light  leading-relaxed mb-8">
                There is a dedicated market of apps built specifically for calling family abroad in regions like Africa, Latin America, and Asia. <strong>Rebtel</strong> shines with local access numbers that allow calls even without internet data. <strong>Talk360</strong> offers a straightforward "install and call" UI for non-technical users, while <strong>KeepCalling</strong> acts as a virtual calling card with destination-specific plans.
              </p>
              <p className="text-lg text-text-light  leading-relaxed mb-12">
                The catch? All three are strictly consumer-focused app experiences. They lack the sleek, device-agnostic browser calling that Litefon provides, offer no team collaboration features, and often have confusing pricing structures across different countries.
              </p>

              <h2 className="text-[27px] font-bold text-text-dark  mt-16 mb-6">Budget and Legacy Options: TextNow & Localphone</h2>
              <p className="text-lg text-text-light  leading-relaxed mb-8">
                For the hyper-budget-conscious, <strong>TextNow</strong> offers ad-supported free domestic calls in the US and Canada, with paid international add-ons. However, the presence of ads, limited global coverage, and heavy US-centric focus make it less appealing for true global communicators.
              </p>
              <p className="text-lg text-text-light  leading-relaxed mb-12">
                <strong>Localphone</strong> takes a much older approach, utilizing local access numbers to bridge international calls. While their pricing is highly transparent, the user interface feels incredibly dated. The setup can be complex, lacking the modern, seamless browser experience you get by simply logging into Litefon.
              </p>

              <h2 className="text-[27px] font-bold text-text-dark  mt-16 mb-6">The Traditional Telco Route: Lebara</h2>
              <p className="text-lg text-text-light  leading-relaxed mb-12">
                Finally, some services stick to the traditional telecom model. <strong>Lebara</strong> requires you to purchase a physical SIM or eSIM plan that includes domestic data alongside international minutes. While this is a great solution for long-term immigrants settling in a specific European country, you are entirely tied to that operator. It completely lacks the global, hardware-free flexibility of logging into Litefon from any laptop or device in the world.
              </p>

              <h2 className="text-[27px] font-bold text-text-dark  mt-16 mb-6">The Verdict</h2>
              <p className="text-lg text-text-light  leading-relaxed mb-12">
                While there is a tool for every specific niche—from heavy enterprise PBX systems to ad-supported US phone numbers—the future of flexible communication is in the browser. By eliminating the need for downloads, apps, and subscriptions, <strong>Litefon</strong> remains the most accessible, high-quality, and cost-effective solution for both individuals and teams who just want to log in and make the call.
              </p>

              {/* Bottom Call-to-Action Card */}
              <div className="mt-24 p-12 rounded-[2.5rem] bg-soft-gray  border border-border-gray  text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-blue/5 rounded-full translate-x-1/2 -translate-y-1/2" />
                
                <h3 className="text-3xl font-bold text-text-dark  mb-4 relative z-10">Ready to switch?</h3>
                <p className="text-lg text-text-light  mb-10 max-w-md mx-auto relative z-10">
                  Join thousands of users who have simplified their international calling with Litefon. Start your first call in under 60 seconds.
                </p>
                <button 
                  onClick={() => onAuthClick('signup')}
                  className="px-10 py-4 rounded-full bg-primary-blue text-white font-bold text-lg hover:bg-secondary-blue transition-all shadow-xl shadow-primary-blue/20 relative z-10"
                >
                  Get Started for Free
                </button>
              </div>
            </div>
          </article>
        </div>
      </main>

      <Footer 
        onRatesClick={onRatesClick}
        onDialerClick={onDialerClick}
        onBlogClick={onBlogClick}
        onContactClick={onContactClick}
      />
    </div>
  );
}

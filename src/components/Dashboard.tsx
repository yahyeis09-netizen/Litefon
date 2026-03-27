import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Home,
  Phone,
  Users, 
  Clock, 
  CreditCard, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Search, 
  Plus, 
  Wallet, 
  ChevronDown, 
  MoreHorizontal, 
  Trash2, 
  Edit2,
  CheckCircle2,
  FileText,
  History,
  Camera,
  Save,
  User,
  Building2,
  Info,
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

// --- Types ---

interface Employee {
  id: string;
  name: string;
  email: string;
  avatar: string;
  creditSpent: string;
  overallCalls: number;
  role: string;
  department: string;
}

const initialEmployees: Employee[] = [
  { id: '1024', name: 'John Miller', email: 'j.miller@company.com', avatar: 'https://i.pravatar.cc/150?u=john', creditSpent: '$124.50', overallCalls: 45, role: 'Product Designer', department: 'Marketing' },
  { id: '1025', name: 'Anna Kowalski', email: 'anna.kowalski@corp.io', avatar: 'https://i.pravatar.cc/150?u=anna', creditSpent: '$89.20', overallCalls: 32, role: 'HR Manager', department: 'HR' },
  { id: '2682', name: 'David Chen', email: 'dchen@dev.company.com', avatar: 'https://i.pravatar.cc/150?u=david', creditSpent: '$210.00', overallCalls: 78, role: 'Frontend Developer', department: 'Engineering' },
  { id: '2193', name: 'Maria Lopez', email: 'maria-lopez@marketing.co', avatar: 'https://i.pravatar.cc/150?u=maria', creditSpent: '$45.00', overallCalls: 12, role: 'Content Manager', department: 'Marketing' },
  { id: '2683', name: 'Alex Turner', email: 'alex_turner@backend.company.com', avatar: 'https://i.pravatar.cc/150?u=alex', creditSpent: '$156.75', overallCalls: 54, role: 'Backend Developer', department: 'Engineering' },
  { id: '2122', name: 'Sophie Martin', email: 'sophie.m@designhub.io', avatar: 'https://i.pravatar.cc/150?u=sophie', creditSpent: '$67.30', overallCalls: 28, role: 'UI/UX Designer', department: 'Design' },
  { id: '1735', name: 'Daniel Novak', email: 'd.novak@finance.company.com', avatar: 'https://i.pravatar.cc/150?u=daniel', creditSpent: '$34.50', overallCalls: 15, role: 'Financial Analyst', department: 'Finance' },
  { id: '1439', name: 'Emily Brown', email: 'emily.brown+sm@company.com', avatar: 'https://i.pravatar.cc/150?u=emily', creditSpent: '$92.10', overallCalls: 41, role: 'SMM Specialist', department: 'Marketing' },
];

// --- Sub-Components ---

const BillingView = ({ balance, onTopUp }: { balance: number; onTopUp: (amount: number) => void }) => {
  const packages = [
    { amount: 100, bonus: null, popular: false },
    { amount: 300, bonus: null, popular: true },
    { amount: 500, bonus: null, popular: false },
    { amount: 1000, bonus: null, popular: true },
  ];
  const [selected, setSelected] = useState(300);

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 items-start">
        {/* Left Pane: Credit Package */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-900">Select Credit Package</h3>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">Current Balance</p>
              <p className="text-2xl font-bold text-[#3B82F6]">${balance.toFixed(2)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            {packages.map((pkg) => (
              <button
                key={pkg.amount}
                onClick={() => setSelected(pkg.amount)}
                className={cn(
                  "relative h-24 rounded-2xl border-2 transition-all flex flex-col items-center justify-center",
                  selected === pkg.amount
                    ? "bg-[#3B82F6]/5 border-[#3B82F6] text-[#3B82F6]"
                    : "bg-white border-slate-100 hover:border-slate-200 text-slate-600"
                )}
              >
                {pkg.popular && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                    Most Popular
                  </span>
                )}
                {pkg.bonus && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#3B82F6] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                    {pkg.bonus}
                  </span>
                )}
                <span className="text-2xl font-bold">${pkg.amount}</span>
              </button>
            ))}
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center gap-3">
            <input type="checkbox" id="auto-topup" className="w-4 h-4 rounded border-slate-300 text-[#3B82F6] focus:ring-[#3B82F6]" />
            <label htmlFor="auto-topup" className="text-sm font-medium text-slate-700">Enable Auto Top-up</label>
          </div>
        </div>

        {/* Right Pane: Payment Detail */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="mb-8">
            <h2 className="text-[17px] font-bold text-slate-900 mb-2">Payment Detail</h2>
            <p className="text-sm text-slate-500">Complete your purchase by filling your payment detail</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email address</label>
              <input 
                type="email" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#3B82F6] outline-none transition-all"
                placeholder="hello@squareui.com"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Card number</label>
              <div className="relative">
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#3B82F6] outline-none transition-all"
                  placeholder="42 35 65 64 67"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Expiration Date</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#3B82F6] outline-none transition-all"
                  placeholder="MM / YY"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                  Security Code <Info className="w-3 h-3" />
                </label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#3B82F6] outline-none transition-all"
                  placeholder="CVC"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Cardholder Name</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#3B82F6] outline-none transition-all"
                placeholder="William Ashford"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Billing Address</label>
              <div className="space-y-3">
                <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#3B82F6] outline-none transition-all">
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                </select>
                <div className="grid grid-cols-2 gap-3">
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#3B82F6] outline-none transition-all"
                    placeholder="Zip code"
                  />
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#3B82F6] outline-none transition-all"
                    placeholder="City"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-dashed border-slate-200">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-slate-900">Total</span>
                <span className="text-2xl font-bold text-[#3B82F6]">${selected}.00</span>
              </div>
              <button 
                onClick={() => onTopUp(selected)}
                className="w-full py-4 bg-[#3B82F6] text-white rounded-xl font-bold hover:bg-[#2563EB] transition-all shadow-lg shadow-[#3B82F6]/20"
              >
                Pay ${selected}.00
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-slate-400">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs">Payments are secured and encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingsView = () => {
  const [companyPhoto, setCompanyPhoto] = useState('https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=300');
  const [userPhoto, setUserPhoto] = useState('https://i.pravatar.cc/150?u=johndoe');

  return (
    <div className="max-w-4xl space-y-8">
      {/* Company Profile */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <Building2 className="w-6 h-6 text-[#3B82F6]" />
          <h3 className="text-xl font-bold text-slate-900">Company Profile</h3>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <img 
                src={companyPhoto} 
                alt="Company Logo" 
                className="w-32 h-32 rounded-[24px] object-cover border-4 border-slate-50"
                referrerPolicy="no-referrer"
              />
              <button className="absolute inset-0 bg-black/40 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <Camera className="w-6 h-6" />
              </button>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Company Logo</p>
          </div>

          <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Company Name</label>
              <input type="text" defaultValue="Litefon Inc." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#3B82F6] outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tax ID</label>
              <input type="text" defaultValue="TX-99283-001" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#3B82F6] outline-none transition-all" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Business Address</label>
              <input type="text" defaultValue="123 Innovation Way, San Francisco, CA 94103" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#3B82F6] outline-none transition-all" />
            </div>
          </div>
        </div>
      </div>

      {/* My Account */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <User className="w-6 h-6 text-[#3B82F6]" />
          <h3 className="text-xl font-bold text-slate-900">My Account</h3>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <img 
                src={userPhoto} 
                alt="User Avatar" 
                className="w-32 h-32 rounded-full object-cover border-4 border-slate-50"
                referrerPolicy="no-referrer"
              />
              <button className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <Camera className="w-6 h-6" />
              </button>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Profile Photo</p>
          </div>

          <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
              <input type="text" defaultValue="John Doe" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#3B82F6] outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
              <input type="email" defaultValue="john@litefon.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#3B82F6] outline-none transition-all" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">New Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#3B82F6] outline-none transition-all" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-8 py-4 bg-[#3B82F6] text-white rounded-xl font-bold hover:bg-[#2563EB] transition-all shadow-lg shadow-[#3B82F6]/20">
          <Save className="w-5 h-5" />
          Save Changes
        </button>
      </div>
    </div>
  );
};

// --- Main Dashboard Component ---

export default function Dashboard({ onBack, onSupportClick }: { onBack: () => void; onSupportClick?: () => void }) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'team' | 'history' | 'invoices' | 'billing' | 'settings'>('team');
  const [balance, setBalance] = useState(150.00);
  const [isBalanceMenuOpen, setIsBalanceMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isAddTeamMenuOpen, setIsAddTeamMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const lines = text.split('\n');
        const newEmployees: Employee[] = [];
        
        // Basic CSV parsing (skipping header)
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (line) {
            const [name, email, role, department] = line.split(',');
            if (name && email) {
              newEmployees.push({
                id: Math.random().toString(36).substr(2, 9),
                name: name.trim(),
                email: email.trim(),
                avatar: `https://i.pravatar.cc/150?u=${email.trim()}`,
                creditSpent: '$0.00',
                overallCalls: 0,
                role: (role || 'Employee').trim(),
                department: (department || 'General').trim()
              });
            }
          }
        }
        
        if (newEmployees.length > 0) {
          setEmployees(prev => [...prev, ...newEmployees]);
          alert(`Successfully imported ${newEmployees.length} employees.`);
        } else {
          alert('No valid employee data found in CSV. Format should be: name,email,role,department');
        }
      };
      reader.readAsText(file);
    }
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTopUp = (amount: number) => {
    setBalance(prev => prev + amount);
    setActiveTab('team');
  };

  const NavItem = ({ icon: Icon, label, active, onClick }: any) => (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200",
        active 
          ? "bg-[#3B82F6]/10 text-[#3B82F6]" 
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      )}
    >
      <Icon className={cn("w-4 h-4", active ? "text-[#3B82F6]" : "text-slate-400")} />
      <span className="text-sm font-medium whitespace-nowrap">{label}</span>
    </button>
  );

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-bg-main font-sans overflow-hidden">
      {/* Horizontal Navigation Bar */}
      <header className="h-16 md:h-20 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between shrink-0 z-50">
        <div className="flex items-center gap-4 md:gap-8">
          <div className="flex items-center gap-2 mr-2 md:mr-4">
            <div className="w-8 h-8 bg-[#3B82F6] rounded-lg flex items-center justify-center">
              <Phone className="text-white w-4 h-4 fill-current" />
            </div>
            <span className="text-lg md:text-xl font-bold text-slate-900 lowercase">litefon</span>
          </div>
        </div>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden xl:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          <NavItem icon={Home} label="Home" onClick={onBack} />
          <NavItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
          />
          <NavItem 
            icon={Users} 
            label="Employee" 
            active={activeTab === 'team'} 
            onClick={() => setActiveTab('team')} 
          />
          <NavItem 
            icon={History} 
            label="History" 
            active={activeTab === 'history'} 
            onClick={() => setActiveTab('history')} 
          />
          <NavItem 
            icon={FileText} 
            label="Invoices" 
            active={activeTab === 'invoices'} 
            onClick={() => setActiveTab('invoices')} 
          />
          <NavItem 
            icon={CreditCard} 
            label="Billing" 
            active={activeTab === 'billing'} 
            onClick={() => setActiveTab('billing')} 
          />
        </nav>

        <div className="flex items-center gap-2 md:gap-6">
          <div className="relative">
            <button 
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-2 md:gap-3 p-1 md:p-2 rounded-xl transition-all hover:bg-slate-50"
            >
              <img 
                src="https://i.pravatar.cc/150?u=johndoe" 
                alt="User" 
                className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover border border-slate-100"
                referrerPolicy="no-referrer"
              />
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-900 leading-tight">John Doe</p>
                <p className="text-[10px] text-slate-500 leading-tight">john@litefon.com</p>
              </div>
              <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform", isProfileMenuOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
              {isProfileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl border border-slate-200 shadow-xl z-50 overflow-hidden"
                >
                  <button 
                    onClick={() => {
                      setActiveTab('settings');
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-3"
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    Settings
                  </button>
                  <div className="h-px bg-slate-100" />
                  <button 
                    onClick={onBack}
                    className="w-full px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-3"
                  >
                    <LogOut className="w-4 h-4" />
                    Log out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Nav Toggle */}
          <button 
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="xl:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            <MoreHorizontal className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileNavOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-white border-b border-slate-200 overflow-hidden z-40"
          >
            <div className="p-4 grid grid-cols-2 gap-2">
              <NavItem icon={Home} label="Home" onClick={() => { onBack(); setIsMobileNavOpen(false); }} />
              <NavItem 
                icon={LayoutDashboard} 
                label="Dashboard" 
                active={activeTab === 'dashboard'} 
                onClick={() => { setActiveTab('dashboard'); setIsMobileNavOpen(false); }} 
              />
              <NavItem 
                icon={Users} 
                label="Employee" 
                active={activeTab === 'team'} 
                onClick={() => { setActiveTab('team'); setIsMobileNavOpen(false); }} 
              />
              <NavItem 
                icon={History} 
                label="History" 
                active={activeTab === 'history'} 
                onClick={() => { setActiveTab('history'); setIsMobileNavOpen(false); }} 
              />
              <NavItem 
                icon={FileText} 
                label="Invoices" 
                active={activeTab === 'invoices'} 
                onClick={() => { setActiveTab('invoices'); setIsMobileNavOpen(false); }} 
              />
              <NavItem 
                icon={CreditCard} 
                label="Billing" 
                active={activeTab === 'billing'} 
                onClick={() => { setActiveTab('billing'); setIsMobileNavOpen(false); }} 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow flex flex-col min-w-0 overflow-hidden">
        {/* Content Area */}
        <div className="flex-grow p-4 md:p-8 overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === 'team' && (
              <motion.div
                key="team"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Employee</h1>
                    <p className="text-xs md:text-sm text-slate-500">Manage your team members and roles.</p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                    {/* Balance Widget */}
                    <div className="relative w-full sm:w-auto">
                      <button 
                        onClick={() => setIsBalanceMenuOpen(!isBalanceMenuOpen)}
                        className={cn(
                          "flex items-center justify-between sm:justify-center gap-3 w-full sm:w-auto px-4 py-2.5 rounded-xl border transition-all",
                          balance === 0 
                            ? "bg-red-50 border-red-200 text-red-600" 
                            : "bg-blue-50 border-blue-200 text-blue-600"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Wallet className="w-5 h-5" />
                          <span className="font-bold">${balance.toFixed(2)}</span>
                        </div>
                        <ChevronDown className={cn("w-4 h-4 transition-transform", isBalanceMenuOpen && "rotate-180")} />
                      </button>
                      
                      <AnimatePresence>
                        {isBalanceMenuOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute sm:right-0 mt-2 w-full sm:w-48 bg-white rounded-xl border border-slate-200 shadow-xl z-50 overflow-hidden"
                          >
                            <button 
                              onClick={() => {
                                setActiveTab('billing');
                                setIsBalanceMenuOpen(false);
                              }}
                              className="w-full px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                            >
                              <Plus className="w-4 h-4" />
                              Add Credit
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <button 
                      onClick={() => setIsAddTeamMenuOpen(!isAddTeamMenuOpen)}
                      className="relative flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 bg-[#3B82F6] text-white rounded-xl font-bold hover:bg-[#2563EB] transition-all shadow-lg shadow-[#3B82F6]/20"
                    >
                      <Plus className="w-5 h-5" />
                      Add team
                      
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileUpload} 
                        accept=".csv" 
                        className="hidden" 
                      />

                      <AnimatePresence>
                        {isAddTeamMenuOpen && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="absolute top-full sm:right-0 mt-2 w-full sm:w-48 bg-white rounded-xl border border-slate-200 shadow-xl z-50 overflow-hidden"
                          >
                            <button 
                              onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); setIsAddTeamMenuOpen(false); }}
                              className="w-full px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                            >
                              <FileText className="w-4 h-4 text-slate-400" />
                              Upload CSV
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                    <div className="relative w-full sm:w-auto">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                         type="text" 
                         placeholder="Search..." 
                         value={searchQuery}
                         onChange={(e) => setSearchQuery(e.target.value)}
                         className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#3B82F6] transition-all w-full md:w-64"
                       />
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-4 py-2 text-sm font-bold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Export
                      </button>
                      <button className="px-4 py-2 text-sm font-bold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        Filters
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100">
                          <th className="p-4 w-12 text-center">
                            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#3B82F6]" />
                          </th>
                          <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Name</th>
                          <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Credit Spent</th>
                          <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Overall Calls</th>
                          <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Department</th>
                          <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Role</th>
                          <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredEmployees.map((emp) => (
                          <tr key={emp.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors h-[64px]">
                            <td className="p-4 text-center">
                              <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#3B82F6]" />
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <img src={emp.avatar} alt={emp.name} className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                                <div>
                                  <p className="text-sm font-bold text-slate-900">{emp.name}</p>
                                  <p className="text-xs text-slate-400">{emp.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 text-sm font-medium text-slate-600">{emp.creditSpent}</td>
                            <td className="p-4 text-sm font-medium text-slate-600">{emp.overallCalls}</td>
                            <td className="p-4">
                              <span className={cn(
                                "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                                emp.department === 'Marketing' ? "bg-pink-100 text-pink-700" :
                                emp.department === 'Engineering' ? "bg-blue-100 text-blue-700" :
                                emp.department === 'HR' ? "bg-cyan-100 text-cyan-700" :
                                emp.department === 'Design' ? "bg-indigo-100 text-indigo-700" :
                                "bg-emerald-100 text-emerald-700"
                              )}>
                                {emp.department}
                              </span>
                            </td>
                            <td className="p-4 text-sm text-slate-500">{emp.role}</td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-slate-400 hover:text-[#3B82F6] transition-colors">
                                  <Edit2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>


                </div>
              </motion.div>
            )}

            {activeTab === 'billing' && (
              <motion.div
                key="billing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">Billing</h1>
                  <p className="text-slate-500">Manage your subscription, payment methods, and top up your credits.</p>
                </div>
                <BillingView balance={balance} onTopUp={handleTopUp} />
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">Settings</h1>
                  <p className="text-slate-500">Configure your company profile and personal account settings.</p>
                </div>
                <SettingsView />
              </motion.div>
            )}

            {['dashboard', 'history', 'invoices'].includes(activeTab) && (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center justify-center h-full text-center py-20"
              >
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                  <LayoutDashboard className="w-10 h-10 text-slate-300" />
                </div>
                <h2 className="text-[21px] font-bold text-slate-900 mb-2 capitalize">{activeTab} View</h2>
                <p className="text-slate-500 max-w-md">This section is currently under development. Check back soon for more features!</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

import React, { useState } from 'react';
import {
  Compass,
  BookOpen,
  Code2,
  Bot,
  FileCheck2,
  FileText,
  LayoutDashboard,
  User,
  Sun,
  Moon,
  Search,
  Menu,
  X,
  Flame,
  Bell,
  Sparkles,
  ChevronRight,
  GraduationCap,
  Target,
  ShoppingBag,
  Cpu,
  Building2
} from 'lucide-react';
import { ViewMode, ThemeMode, UserProfile } from '../types';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  user: UserProfile;
  onOpenAuth: (mode: 'login' | 'register') => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  cartCount?: number;
  onOpenCart?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  theme,
  onToggleTheme,
  user,
  onOpenAuth,
  isLoggedIn,
  onLogout,
  cartCount = 0,
  onOpenCart,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const navItems: Array<{ id: ViewMode; label: string; icon: React.ReactNode; badge?: string }> = [
    { id: 'courses', label: 'Curriculum & Labs', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'placement', label: 'Chipmaker Prep', icon: <Building2 className="w-4 h-4" /> },
    { id: 'coding', label: 'Hardware IDE', icon: <Code2 className="w-4 h-4" /> },
    { id: 'ai-mentor', label: 'Circuit AI', icon: <Bot className="w-4 h-4" />, badge: 'AI' },
    { id: 'store', label: 'Lab Gear', icon: <ShoppingBag className="w-4 h-4" />, badge: 'Store' },
    { id: 'resume', label: 'ECE Resume', icon: <FileText className="w-4 h-4" /> },
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  ];

  const handleNavClick = (view: ViewMode) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div
              className="flex items-center gap-2.5 cursor-pointer group"
              onClick={() => handleNavClick('home')}
            >
              <div className="w-8 h-8 bg-gradient-to-tr from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform text-white">
                <Cpu className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-500 bg-clip-text text-transparent dark:from-indigo-400 dark:to-emerald-400">
                  SkillSphere
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-black tracking-wider uppercase bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 rounded border border-indigo-200 dark:border-indigo-800">
                  ECE
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-500 dark:text-slate-400">
              {navItems.map((item) => {
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative flex items-center gap-1.5 transition-colors py-1 ${
                      isActive
                        ? 'text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600 dark:border-indigo-400'
                        : 'hover:text-indigo-600 dark:hover:text-indigo-400'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-[9px] font-extrabold tracking-wide uppercase bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Controls */}
            <div className="flex items-center gap-2">
              
              {/* Search Trigger */}
              <button
                onClick={() => setShowSearchModal(true)}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Search courses, prep & topics"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Theme Switcher */}
              <button
                onClick={onToggleTheme}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
              >
                {theme === 'light' ? <Moon className="w-4 h-4 text-indigo-600" /> : <Sun className="w-4 h-4 text-amber-400" />}
              </button>

              {/* Shopping Cart Drawer Trigger */}
              <button
                id="navbar-cart-btn"
                onClick={onOpenCart}
                className="relative p-2 rounded-xl text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="View Gear Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-[10px] font-extrabold flex items-center justify-center shadow-xs animate-scale-in">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User Streak & Level Badge (If logged in) */}
              {isLoggedIn && (
                <div
                  onClick={() => handleNavClick('profile')}
                  className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold cursor-pointer hover:bg-amber-500/20 transition-colors"
                  title={`${user.streakDays} Day Continuous Learning Streak!`}
                >
                  <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-bounce" />
                  <span>{user.streakDays}d</span>
                </div>
              )}

              {/* User Avatar / Auth Buttons */}
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="relative flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition-colors"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
                  </button>

                  {/* Dropdown Menu */}
                  {showUserDropdown && (
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50">
                      <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                        <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{user.name}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          setShowUserDropdown(false);
                          handleNavClick('dashboard');
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5" />
                        Dashboard
                      </button>
                      <button
                        onClick={() => {
                          setShowUserDropdown(false);
                          handleNavClick('profile');
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                      >
                        <User className="w-3.5 h-3.5" />
                        Profile & Settings
                      </button>
                      <button
                        onClick={() => {
                          setShowUserDropdown(false);
                          handleNavClick('store');
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Campus Store & Perks</span>
                      </button>
                      <div className="border-t border-slate-100 dark:border-slate-800 my-1"></div>
                      <button
                        onClick={() => {
                          setShowUserDropdown(false);
                          onLogout();
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2 font-medium"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenAuth('login')}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => onOpenAuth('register')}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-500 hover:opacity-90 shadow-sm shadow-indigo-500/20 transition-all"
                  >
                    Get Started
                  </button>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold ${
                  currentView === item.id
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Global Quick Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
              <Search className="w-5 h-5 text-indigo-500" />
              <input
                type="text"
                placeholder="Search courses, TCS NQT, aptitude formulas, DSA topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-transparent text-sm text-slate-900 dark:text-slate-100 focus:outline-none placeholder-slate-400"
              />
              <button
                onClick={() => setShowSearchModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Links in Search */}
            <div className="pt-3 space-y-2">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">Quick Navigation</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setShowSearchModal(false);
                    onNavigate('placement');
                  }}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-left hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors group"
                >
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600">
                    Aptitude & Placement Practice
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Quantitative, Verbal, Logical</p>
                </button>

                <button
                  onClick={() => {
                    setShowSearchModal(false);
                    onNavigate('coding');
                  }}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-left hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors group"
                >
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600">
                    Coding Playground
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">DSA & Language Editor</p>
                </button>

                <button
                  onClick={() => {
                    setShowSearchModal(false);
                    onNavigate('ai-mentor');
                  }}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-left hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors group"
                >
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600">
                    SphereAI Mentor
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Ask doubts & study plan</p>
                </button>

                <button
                  onClick={() => {
                    setShowSearchModal(false);
                    onNavigate('resume');
                  }}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-left hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors group"
                >
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600">
                    Resume ATS Auditor
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Score & keyword optimization</p>
                </button>

                <button
                  onClick={() => {
                    setShowSearchModal(false);
                    onNavigate('store');
                  }}
                  className="p-2.5 rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50/40 dark:bg-indigo-950/40 text-left hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors group col-span-2"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-indigo-700 dark:text-indigo-300 group-hover:text-indigo-600 flex items-center gap-1.5">
                      <ShoppingBag className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Lumixora × SkillSphere Campus Store</span>
                    </p>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                      20% Student OFF
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Ergonomic desk lights, hardware kits, hoodies & mechanical accessories
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

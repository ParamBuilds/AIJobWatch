import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Search, Moon, Sun, Menu, X, Globe, Sparkles, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  onOpenSearch,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<'en' | 'hi' | 'te'>('en');
  const location = useLocation();

  // Scroll detection for shrinking / shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setLanguageMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Jobs', to: '/#all-jobs' },
    { label: 'Sectors', to: '/#sectors' },
    { label: 'Compare', to: '/compare' },
    { label: 'Quiz', to: '/quiz' },
    { label: 'Timeline', to: '/timeline' },
    { label: 'Dispatches', to: '/blog' },
    { label: 'Methodology', to: '/methodology' },
  ];

  const languages = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  ] as const;

  return (
    <>
      {/* Skip to Content for Screen Readers & Keyboard Users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-4 z-50 px-4 py-2 bg-teal-700 text-white font-medium text-xs rounded-md shadow-lg outline-none ring-2 ring-white"
      >
        Skip to main content
      </a>

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'h-14 bg-[#FAF8F4]/90 dark:bg-[#0C111C]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-xs'
            : 'h-16 bg-[#FAF8F4] dark:bg-[#0C111C] border-b border-slate-200/40 dark:border-slate-800/40'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-4">
          {/* Brand Identity / Masthead */}
          <Link
            to="/"
            className="flex items-center gap-2 group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded px-1"
          >
            <div className="flex items-baseline">
              <span className="font-serif-heading text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 group-hover:text-teal-800 dark:group-hover:text-teal-300 transition-colors">
                AIJobWatch
              </span>
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-teal-700 dark:text-teal-400 ml-1.5 px-1.5 py-0.5 rounded bg-teal-50 dark:bg-teal-950/60 border border-teal-200/60 dark:border-teal-800/60">
                India
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-6 text-xs text-slate-600 dark:text-slate-300">
            {navLinks.map((link) => {
              const isHash = link.to.startsWith('/#');
              if (isHash) {
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="hover:text-slate-950 dark:hover:text-slate-50 transition-colors py-1 relative font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-teal-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
                  >
                    {link.label}
                  </Link>
                );
              }
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `transition-colors py-1 relative font-medium ${
                      isActive
                        ? 'text-slate-950 dark:text-slate-50 after:scale-x-100 after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-teal-600'
                        : 'hover:text-slate-950 dark:hover:text-slate-50 after:scale-x-0 hover:after:scale-x-100 after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-teal-600 after:transition-transform after:origin-left'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Controls: Command Palette Search, Language, Theme, Mobile Menu */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Search Trigger with Ctrl+K badge */}
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Search jobs (Cmd+K)"
              className="inline-flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
              title="Search jobs (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Search jobs...</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-mono px-1 py-0.2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                aria-expanded={languageMenuOpen}
                aria-label="Change language"
                className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                title="Switch Language"
              >
                <Globe className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {languageMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-1.5 w-36 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl py-1 z-50 text-xs"
                  >
                    <div className="px-3 py-1 text-[10px] uppercase font-mono text-slate-400">
                      Language
                    </div>
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        type="button"
                        onClick={() => {
                          setCurrentLang(l.code);
                          setLanguageMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                          currentLang === l.code ? 'text-teal-700 dark:text-teal-400 font-semibold' : 'text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span>{l.native}</span>
                        {currentLang === l.code && <span className="text-[10px] text-teal-600 font-mono">✓</span>}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dark Mode Animated Icon Swap */}
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
              title={darkMode ? 'Light mode' : 'Dark mode'}
            >
              <AnimatePresence mode="wait" initial={false}>
                {darkMode ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-4 h-4 text-amber-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-4 h-4 text-slate-600" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Animated Slide-In Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-[#FAF8F4] dark:bg-[#0C111C] px-4 py-4 overflow-hidden"
            >
              <nav className="flex flex-col space-y-1 text-sm text-slate-700 dark:text-slate-200">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 px-3 hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-md font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="pt-3 mt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <span>Select Language:</span>
                <div className="flex items-center gap-2">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setCurrentLang(l.code);
                        setMobileMenuOpen(false);
                      }}
                      className={`px-2 py-1 rounded ${
                        currentLang === l.code
                          ? 'bg-teal-700 text-white font-medium'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {l.native}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

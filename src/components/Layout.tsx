import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollProgress } from './animations/ScrollProgress';
import { PageTransition } from './animations/PageTransition';
import { BackToTop } from './BackToTop';
import { CookieConsent } from './CookieConsent';
import { CommandPalette } from './CommandPalette';

interface LayoutProps {
  children: React.ReactNode;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  darkMode,
  setDarkMode,
}) => {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const location = useLocation();

  // Keyboard shortcut listener for Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close command palette on route changes
  useEffect(() => {
    setCommandPaletteOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F4] dark:bg-[#0C111C] text-[#171717] dark:text-[#F3F4F6] transition-colors duration-200">
      {/* Reading Progress Indicator */}
      <ScrollProgress />

      {/* Main Sticky Navigation */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenSearch={() => setCommandPaletteOpen(true)}
      />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 focus:outline-none">
        <PageTransition key={location.pathname}>
          {children}
        </PageTransition>
      </main>

      {/* Footer */}
      <Footer />

      {/* Utilities */}
      <BackToTop />
      <CookieConsent />

      {/* Command Palette (Cmd+K / Ctrl+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </div>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { Layout } from './components/Layout';

import { HomePage } from './pages/HomePage';
import { JobPage } from './pages/JobPage';
import { SectorPage } from './pages/SectorPage';
import { ComparePage } from './pages/ComparePage';
import { TimelinePage } from './pages/TimelinePage';
import { QuizPage } from './pages/QuizPage';
import { DashboardPage } from './pages/DashboardPage';
import { CareerTransitionPage } from './pages/CareerTransitionPage';
import { SalaryRiskCalculatorPage } from './pages/SalaryRiskCalculatorPage';
import { BlogListPage } from './pages/BlogListPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { MethodologyPage } from './pages/MethodologyPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { DisclaimerPage } from './pages/DisclaimerPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { LanguageProvider } from './context/LanguageContext';

// Helper component to scroll to top on route change
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('aijobwatch_theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('aijobwatch_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('aijobwatch_theme', 'light');
    }
  }, [darkMode]);

  return (
    <HelmetProvider>
      <LanguageProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/roadmap" element={<CareerTransitionPage />} />
              <Route path="/career-transition" element={<CareerTransitionPage />} />
              <Route path="/salary-calculator" element={<SalaryRiskCalculatorPage />} />
              <Route path="/calculator" element={<SalaryRiskCalculatorPage />} />
              <Route path="/jobs/:slug" element={<JobPage />} />
              <Route path="/sectors/:slug" element={<SectorPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/compare/:compareSlug" element={<ComparePage />} />
              <Route path="/timeline" element={<TimelinePage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/blog" element={<BlogListPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/methodology" element={<MethodologyPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/disclaimer" element={<DisclaimerPage />} />
              {/* Fallback 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </LanguageProvider>
    </HelmetProvider>
  );
}

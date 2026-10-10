import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(true);
  const [advertisingAllowed, setAdvertisingAllowed] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem('aijobwatch_cookie_consent');
    if (!consent) {
      // Small timeout for smooth appearance
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(
      'aijobwatch_cookie_consent',
      JSON.stringify({ essential: true, analytics: true, advertising: true, timestamp: Date.now() })
    );
    setVisible(false);
  };

  const handleDeclineNonEssential = () => {
    localStorage.setItem(
      'aijobwatch_cookie_consent',
      JSON.stringify({ essential: true, analytics: false, advertising: false, timestamp: Date.now() })
    );
    setVisible(false);
  };

  const handleSaveCustom = () => {
    localStorage.setItem(
      'aijobwatch_cookie_consent',
      JSON.stringify({ essential: true, analytics: analyticsAllowed, advertising: advertisingAllowed, timestamp: Date.now() })
    );
    setVisible(false);
    setShowPreferences(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie and Privacy Consent"
      className="cookie-banner fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl p-4 text-xs text-slate-600 dark:text-slate-300 no-print"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-semibold font-serif-heading text-sm">
          <Cookie className="w-4 h-4 text-amber-600" />
          <span>Privacy & Cookie Preferences</span>
        </div>
        <button
          onClick={handleDeclineNonEssential}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
          aria-label="Dismiss"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {!showPreferences ? (
        <>
          <p className="mt-2 text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
            We use essential cookies to maintain your preferences (such as dark mode) and optional cookies for analytics and advertising (Google AdSense) to keep this public research free and accessible.{' '}
            <Link to="/privacy" className="underline hover:text-slate-900 dark:hover:text-slate-100">
              Read our Privacy Policy
            </Link>
            .
          </p>

          <div className="mt-3.5 flex items-center flex-wrap gap-2">
            <button
              type="button"
              onClick={handleAcceptAll}
              className="px-3 py-1.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium rounded hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
            >
              Accept All
            </button>
            <button
              type="button"
              onClick={handleDeclineNonEssential}
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Essential Only
            </button>
            <button
              type="button"
              onClick={() => setShowPreferences(true)}
              className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 underline ml-auto"
            >
              Customize
            </button>
          </div>
        </>
      ) : (
        <div className="mt-3 space-y-2.5">
          <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="font-medium text-slate-800 dark:text-slate-200">Strictly Necessary</span>
              <p className="text-[10px] text-slate-400">Required for site security and theme storage</p>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Always Active</span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="font-medium text-slate-800 dark:text-slate-200">Advertising & AdSense</span>
              <p className="text-[10px] text-slate-400">Personalized and contextual ad delivery</p>
            </div>
            <input
              type="checkbox"
              checked={advertisingAllowed}
              onChange={(e) => setAdvertisingAllowed(e.target.checked)}
              className="rounded border-slate-300 text-slate-900 focus:ring-0"
            />
          </div>

          <div className="flex items-center justify-between py-1">
            <div>
              <span className="font-medium text-slate-800 dark:text-slate-200">Usage Analytics</span>
              <p className="text-[10px] text-slate-400">Aggregated site metrics to improve estimates</p>
            </div>
            <input
              type="checkbox"
              checked={analyticsAllowed}
              onChange={(e) => setAnalyticsAllowed(e.target.checked)}
              className="rounded border-slate-300 text-slate-900 focus:ring-0"
            />
          </div>

          <div className="pt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={handleSaveCustom}
              className="px-3 py-1.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium rounded text-xs"
            >
              Save Preferences
            </button>
            <button
              type="button"
              onClick={() => setShowPreferences(false)}
              className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:underline"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

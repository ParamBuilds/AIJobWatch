import React, { useEffect, useState } from 'react';
import { Globe, X, Check, Languages } from 'lucide-react';
import { useLanguage, LanguageCode } from '../context/LanguageContext';

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

export const GoogleTranslateWidget: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [showRegionalBar, setShowRegionalBar] = useState(false);
  const [activeLangName, setActiveLangName] = useState<string>('English');

  const triggerRegionalTranslate = (langCode: string, langName: string) => {
    setActiveLangName(langName);
    setLanguage(langCode as LanguageCode);

    // Set Google Translate cookie
    const target = langCode === 'en' ? '' : `/en/${langCode}`;
    const host = window.location.hostname;
    if (langCode === 'en') {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${host};`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${host};`;
      document.cookie = 'googtrans=/en/en; path=/;';
    } else {
      document.cookie = `googtrans=${target}; path=/;`;
      document.cookie = `googtrans=${target}; path=/; domain=${host};`;
      document.cookie = `googtrans=${target}; path=/; domain=.${host};`;
    }

    // Trigger select dropdown if rendered by Google
    const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
    }
  };

  return (
    <>
      {/* Floating Indian Regional Languages Switcher Trigger */}
      <div className="fixed bottom-6 left-6 z-40 no-print">
        {showRegionalBar ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-3 max-w-xs text-xs animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 mb-2">
              <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-100 text-[11px]">
                <Languages className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span>भाषा चुनें / Select Language</span>
              </div>
              <button
                type="button"
                onClick={() => setShowRegionalBar(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
                aria-label="Close translation menu"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-1.5 font-sans">
              {[
                { code: 'en', label: 'English', native: 'English' },
                { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
                { code: 'te', label: 'Telugu', native: 'తెలుగు' },
                { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
                { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
                { code: 'mr', label: 'Marathi', native: 'मराठी' },
                { code: 'bn', label: 'Bengali', native: 'বাংলা' },
                { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
              ].map((lang) => {
                const isCurrent = language === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      triggerRegionalTranslate(lang.code, lang.native);
                      setShowRegionalBar(false);
                    }}
                    className={`text-left px-2 py-1.5 rounded-lg text-[11px] transition-colors flex items-center justify-between ${
                      isCurrent
                        ? 'bg-teal-50 dark:bg-teal-950/50 text-teal-800 dark:text-teal-300 font-bold border border-teal-200 dark:border-teal-800'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>{lang.native}</span>
                    {isCurrent && <Check className="w-3 h-3 text-teal-600" />}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowRegionalBar(true)}
            aria-label="Translate page into Indian languages"
            title="Translate page into Hindi, Telugu, Tamil, Marathi..."
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 shadow-md hover:shadow-lg hover:border-teal-600 dark:hover:border-teal-500 transition-all text-xs font-semibold group"
          >
            <Globe className="w-4 h-4 text-teal-600 dark:text-teal-400 group-hover:rotate-45 transition-transform" />
            <span className="hidden sm:inline font-mono text-[11px]">
              {language === 'hi' ? 'हिन्दी' : language === 'te' ? 'తెలుగు' : 'Translate'}
            </span>
            <span className="text-[10px] uppercase font-mono px-1 py-0.2 rounded bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300">
              IN
            </span>
          </button>
        )}
      </div>
    </>
  );
};

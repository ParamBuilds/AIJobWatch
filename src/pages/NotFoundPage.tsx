import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Home, Search, ArrowRight, ShieldAlert } from 'lucide-react';
import { SEOHelmet } from '../components/SEOHelmet';
import { AbstractCardAccent } from '../components/abstract/AbstractCardAccent';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6">
      <SEOHelmet
        title="404 – Coordinate Void | AIJobWatch India"
        description="The requested occupation or page coordinate does not exist in our index. Return to the AIJobWatch labor intelligence directory."
        canonicalPath="/404"
      />

      <div className="relative max-w-xl w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-12 shadow-xl overflow-hidden text-center">
        <AbstractCardAccent code="ERR // 404-COORDINATE-VOID" />

        {/* Abstract Vector Geometry Background */}
        <div className="absolute inset-0 pointer-events-none opacity-5 dark:opacity-10 overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 400 400">
            <circle cx="200" cy="200" r="160" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" />
            <circle cx="200" cy="200" r="110" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="200" cy="200" r="60" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
            <line x1="200" y1="20" x2="200" y2="380" stroke="currentColor" strokeWidth="1" />
            <line x1="20" y1="200" x2="380" y2="200" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        {/* Animated Badge & Glyph */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-teal-50 dark:bg-teal-950/70 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-300 mb-6 mx-auto"
        >
          <Compass className="w-10 h-10 animate-spin-slow" />
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-rose-500"></span>
          </span>
        </motion.div>

        <div className="text-xs font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
          [ SYSTEM ERROR // LATITUDE UNKNOWN ]
        </div>

        <h1 className="text-4xl sm:text-5xl font-serif-heading font-bold text-slate-900 dark:text-slate-50 mb-4">
          404: Coordinate Not Found
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-8 leading-relaxed">
          The occupation record, research essay, or sector quadrant you navigated to does not exist or has been shifted in our taxonomy.
        </p>

        {/* Quick Route Navigations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto text-left text-xs font-mono">
          <Link
            to="/"
            className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:bg-teal-50 dark:hover:bg-teal-950/50 hover:border-teal-300 dark:hover:border-teal-700 transition-colors group"
          >
            <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 group-hover:text-teal-900 dark:group-hover:text-teal-200">
              <Home className="w-4 h-4 text-teal-700 dark:text-teal-400" />
              <span className="font-semibold">Home Directory</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <Link
            to="/quiz"
            className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:bg-teal-50 dark:hover:bg-teal-950/50 hover:border-teal-300 dark:hover:border-teal-700 transition-colors group"
          >
            <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 group-hover:text-teal-900 dark:group-hover:text-teal-200">
              <Compass className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span className="font-semibold">Career Check Quiz</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <Link
            to="/compare"
            className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:bg-teal-50 dark:hover:bg-teal-950/50 hover:border-teal-300 dark:hover:border-teal-700 transition-colors group"
          >
            <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 group-hover:text-teal-900 dark:group-hover:text-teal-200">
              <ShieldAlert className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="font-semibold">Compare 2 Jobs</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <Link
            to="/timeline"
            className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:bg-teal-50 dark:hover:bg-teal-950/50 hover:border-teal-300 dark:hover:border-teal-700 transition-colors group"
          >
            <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 group-hover:text-teal-900 dark:group-hover:text-teal-200">
              <Search className="w-4 h-4 text-teal-700 dark:text-teal-400" />
              <span className="font-semibold">Timeline (2012–35)</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

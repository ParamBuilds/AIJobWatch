import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Mail, ArrowUpRight, Compass, Heart } from 'lucide-react';
import { AbstractFooterPoster } from './abstract/AbstractFooterPoster';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-[#F4F1EA] dark:bg-[#070B12] text-slate-600 dark:text-slate-400 text-xs transition-colors no-print">
      {/* Full-Bleed Abstract Cartography Poster Banner */}
      <AbstractFooterPoster />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        {/* Newsletter / Get Updates Block (links to email, no backend) */}
        <div className="mb-12 p-6 sm:p-8 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-[10px] font-mono uppercase tracking-widest text-teal-700 dark:text-teal-400 font-semibold">
              Public Research Dispatch
            </span>
            <h3 className="text-lg sm:text-xl font-serif-heading font-bold text-slate-900 dark:text-slate-100 mt-1">
              Receive quarterly India AI labor market updates
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              We send concise, non-alarmist summaries whenever frontier models cross new task automation thresholds in India. No spam, no marketing trackers.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <a
              href="mailto:updates@aijobwatch.in?subject=Subscribe%20to%20AIJobWatch%20Quarterly%20Dispatch"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-teal-800 dark:bg-teal-700 text-white hover:bg-teal-900 dark:hover:bg-teal-600 text-xs font-semibold shadow-xs transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Get Quarterly Email Updates</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>
        </div>

        {/* 4-Column Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-slate-200 dark:border-slate-800/80">
          {/* Col 1: Masthead Identity */}
          <div className="space-y-3">
            <div className="flex items-baseline">
              <span className="font-serif-heading text-lg font-bold text-slate-900 dark:text-slate-100">
                AIJobWatch
              </span>
              <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-teal-700 dark:text-teal-400 ml-1.5 px-1 py-0.2 rounded bg-teal-50 dark:bg-teal-950/60 border border-teal-200/60 dark:border-teal-800/60">
                India
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              An independent labor intelligence initiative evaluating task automation and occupational adaptation across India&apos;s formal and informal workforce.
            </p>
            <div className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
              Dataset Revision: <span className="font-medium text-slate-700 dark:text-slate-300">October 2026</span>
            </div>
          </div>

          {/* Col 2: Core Tools & Directory */}
          <div className="space-y-2">
            <div className="font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider text-[11px] font-mono">
              Intelligence Tools
            </div>
            <ul className="space-y-1.5 list-none p-0 m-0">
              <li><Link to="/dashboard" className="text-teal-700 dark:text-teal-400 font-semibold hover:text-slate-950 dark:hover:text-slate-50 transition-colors">★ 3D National Dashboard</Link></li>
              <li><Link to="/roadmap" className="text-emerald-700 dark:text-emerald-400 font-semibold hover:text-slate-950 dark:hover:text-slate-50 transition-colors">★ Career Transition Roadmap</Link></li>
              <li><Link to="/salary-calculator" className="text-amber-700 dark:text-amber-400 font-semibold hover:text-slate-950 dark:hover:text-slate-50 transition-colors">★ Salary & Risk Calculator</Link></li>
              <li><Link to="/#all-jobs" className="hover:text-slate-950 dark:hover:text-slate-50 transition-colors">40 Indian Careers Index</Link></li>
              <li><Link to="/#sectors" className="hover:text-slate-950 dark:hover:text-slate-50 transition-colors">11 Economic Sectors</Link></li>
              <li><Link to="/compare" className="hover:text-slate-950 dark:hover:text-slate-50 transition-colors">Side-by-Side Job Comparison</Link></li>
              <li><Link to="/quiz" className="hover:text-slate-950 dark:hover:text-slate-50 transition-colors">Career Check AI Quiz</Link></li>
              <li><Link to="/timeline" className="hover:text-slate-950 dark:hover:text-slate-50 transition-colors">India 2023–2035 Timeline</Link></li>
            </ul>
          </div>

          {/* Col 3: Research & Transparency */}
          <div className="space-y-2">
            <div className="font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider text-[11px] font-mono">
              Research & Trust
            </div>
            <ul className="space-y-1.5 list-none p-0 m-0">
              <li><Link to="/methodology" className="hover:text-slate-950 dark:hover:text-slate-50 transition-colors">Scoring Methodology & Sources</Link></li>
              <li><Link to="/blog" className="hover:text-slate-950 dark:hover:text-slate-50 transition-colors">Labor Dispatches & Essays</Link></li>
              <li><Link to="/about" className="hover:text-slate-950 dark:hover:text-slate-50 transition-colors">About the Project</Link></li>
              <li><Link to="/disclaimer" className="hover:text-slate-950 dark:hover:text-slate-50 transition-colors">Epistemic Disclaimer</Link></li>
              <li><Link to="/privacy" className="hover:text-slate-950 dark:hover:text-slate-50 transition-colors">Privacy & DPDP Compliance</Link></li>
              <li><Link to="/terms" className="hover:text-slate-950 dark:hover:text-slate-50 transition-colors">Terms of Use</Link></li>
            </ul>
          </div>

          {/* Col 4: Academic Citations & Contact */}
          <div className="space-y-2">
            <div className="font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider text-[11px] font-mono">
              Peer Review & Inquiries
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Have localized wage data or peer-reviewed citations for our task matrix?
            </p>
            <div className="pt-1">
              <a
                href="mailto:research@aijobwatch.in?subject=AIJobWatch%20Data%20Citation%20Feedback"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 dark:text-teal-400 hover:underline"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>research@aijobwatch.in</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Epistemic Disclaimer Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 dark:text-slate-500 border-b border-slate-200 dark:border-slate-800/80 pb-5">
          <div className="flex items-center gap-1.5 text-center md:text-left">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>
              All scores and timelines are research-based task exposure estimates, not guarantees or employment termination prophecies.
            </span>
          </div>
          <div className="text-center md:text-right shrink-0">
            &copy; {new Date().getFullYear()} AIJobWatch India. Published under Creative Commons for public educational use.
          </div>
        </div>

        {/* Creator Attribution / Made with love in India */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-1.5 font-medium">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 inline animate-pulse" aria-label="love" />
            <span>in India, by</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100 hover:text-teal-700 dark:hover:text-teal-300 transition-colors">
              Pramudit Tiwari
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
            <a
              href="mailto:connecttopramudit@gmail.com"
              className="hover:text-teal-700 dark:hover:text-teal-300 transition-colors flex items-center gap-1"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>connecttopramudit@gmail.com</span>
            </a>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-teal-700 dark:text-teal-400 font-semibold bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded border border-teal-200/50 dark:border-teal-800/50">
              India Labor Watch
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

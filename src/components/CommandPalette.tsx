import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, CornerDownLeft, Command, Layers, ArrowLeftRight, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import jobsData from '../data/jobs.json';
import sectorsData from '../data/sectors.json';
import { Job, Sector } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();

  const jobs = jobsData as Job[];
  const sectors = sectorsData as Sector[];

  // Filter jobs and sectors
  const filteredJobs = query.trim()
    ? jobs.filter((job) => {
        const q = query.toLowerCase();
        return (
          job.title.toLowerCase().includes(q) ||
          job.sectorName.toLowerCase().includes(q) ||
          job.tasks.some((t) => t.name.toLowerCase().includes(q))
        );
      }).slice(0, 7)
    : [];

  const quickNav = [
    { title: 'Compare Any Two Careers', path: '/compare', icon: ArrowLeftRight, tag: 'Tool' },
    { title: 'India 2023–2035 Timeline', path: '/timeline', icon: Layers, tag: 'Timeline' },
    { title: 'Scoring Methodology & Sources', path: '/methodology', icon: HelpCircle, tag: 'Research' },
  ];

  const totalResultsCount = query.trim() ? filteredJobs.length : quickNav.length;

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (path: string) => {
    onClose();
    navigate(path);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % totalResultsCount);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + totalResultsCount) % totalResultsCount);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (query.trim() && filteredJobs[selectedIndex]) {
        handleSelect(`/jobs/${filteredJobs[selectedIndex].slug}`);
      } else if (!query.trim() && quickNav[selectedIndex]) {
        handleSelect(quickNav[selectedIndex].path);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Command search palette"
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -12 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="relative flex items-center px-4 border-b border-slate-100 dark:border-slate-800">
              <Search className="w-5 h-5 text-teal-700 dark:text-teal-400 shrink-0 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search careers, skills, or automatable tasks..."
                className="w-full py-4 text-sm bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mr-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-400">
                ESC
              </kbd>
            </div>

            {/* Content Results */}
            <div className="max-h-96 overflow-y-auto p-2">
              {query.trim().length === 0 ? (
                <div>
                  <div className="px-3 py-1.5 text-[10px] uppercase font-mono text-slate-400 font-semibold">
                    Quick Navigation
                  </div>
                  <ul ref={listRef} className="space-y-1 list-none p-0 m-0">
                    {quickNav.map((item, idx) => {
                      const Icon = item.icon;
                      const isSelected = idx === selectedIndex;
                      return (
                        <li
                          key={item.path}
                          onClick={() => handleSelect(item.path)}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          className={`px-3 py-2.5 rounded-lg cursor-pointer flex items-center justify-between text-xs transition-colors ${
                            isSelected
                              ? 'bg-teal-50 dark:bg-teal-950/50 text-teal-900 dark:text-teal-200'
                              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className="w-4 h-4 text-slate-400" />
                            <span className="font-medium">{item.title}</span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-400">{item.tag}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : filteredJobs.length > 0 ? (
                <div>
                  <div className="px-3 py-1.5 text-[10px] uppercase font-mono text-slate-400 font-semibold">
                    Matching Careers ({filteredJobs.length})
                  </div>
                  <ul ref={listRef} className="space-y-1 list-none p-0 m-0">
                    {filteredJobs.map((job, idx) => {
                      const isSelected = idx === selectedIndex;
                      const scoreColor =
                        job.score >= 80 ? 'text-rose-600' :
                        job.score >= 60 ? 'text-orange-600' :
                        job.score >= 40 ? 'text-amber-600' : 'text-teal-600';

                      return (
                        <li
                          key={job.slug}
                          onClick={() => handleSelect(`/jobs/${job.slug}`)}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          className={`px-3 py-2.5 rounded-lg cursor-pointer flex items-center justify-between transition-colors ${
                            isSelected
                              ? 'bg-teal-50 dark:bg-teal-950/50 text-teal-950 dark:text-teal-100'
                              : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                          }`}
                        >
                          <div>
                            <div className="font-semibold text-xs text-slate-900 dark:text-slate-100">
                              {job.title}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
                              <span>{job.sectorName}</span>
                              <span aria-hidden="true">·</span>
                              <span>{job.timeline}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <span className={`font-serif-heading font-bold text-sm ${scoreColor}`}>
                                {job.score}/100
                              </span>
                              <span className="text-[10px] uppercase font-mono text-slate-400 block">
                                {job.label}
                              </span>
                            </div>
                            <CornerDownLeft className="w-3.5 h-3.5 text-slate-400 opacity-60" />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : (
                <div className="p-8 text-center text-xs text-slate-500 dark:text-slate-400">
                  No careers found matching &ldquo;{query}&rdquo;. Try searching by sector or task keywords.
                </div>
              )}
            </div>

            {/* Footer with Keyboard Hints */}
            <div className="px-4 py-2.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Open</span>
              </div>
              <span>AIJobWatch 2026 Index</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

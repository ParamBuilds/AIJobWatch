import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, X, ArrowRight, CornerDownLeft, Command, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import jobsData from '../../data/jobs.json';
import { Job } from '../../types';

export const HeroSearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const jobs = jobsData as Job[];

  const rotatingPlaceholders = [
    'Will AI replace a software engineer in India?',
    'Will AI replace a customer support agent?',
    'Will AI replace a high school teacher?',
    'Will AI replace a chartered accountant?',
    'Will AI replace a commercial bank clerk?',
    'Will AI replace a digital content writer?',
    'Will AI replace a radiologist or surgeon?',
    'Will AI replace a legal associate or litigator?',
  ];

  // Rotate placeholder every 3.5s when user is not typing
  useEffect(() => {
    if (query.trim()) return;
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % rotatingPlaceholders.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [query, rotatingPlaceholders.length]);

  // Fuzzy filter
  const filteredJobs = query.trim()
    ? jobs.filter((job) => {
        const q = query.toLowerCase();
        return (
          job.title.toLowerCase().includes(q) ||
          job.sectorName.toLowerCase().includes(q) ||
          job.tasks.some((t) => t.name.toLowerCase().includes(q))
        );
      }).slice(0, 6)
    : [];

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectJob = (slug: string) => {
    setIsOpen(false);
    setQuery('');
    navigate(`/jobs/${slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || filteredJobs.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredJobs.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredJobs.length) % filteredJobs.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredJobs[selectedIndex]) {
        handleSelectJob(filteredJobs[selectedIndex].slug);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto z-20">
      {/* Animated glow aura behind input */}
      <motion.div
        animate={{
          opacity: isFocused ? 0.35 : 0.08,
          scale: isFocused ? 1.02 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-teal-500 via-amber-500 to-teal-600 blur-md pointer-events-none"
      />

      <div
        className={`relative flex items-center bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border ${
          isFocused
            ? 'border-teal-600 dark:border-teal-400 ring-2 ring-teal-600/20 dark:ring-teal-400/20 shadow-lg'
            : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 shadow-sm'
        } rounded-xl transition-all duration-200`}
      >
        <div className="pl-4 pr-2 text-slate-400 dark:text-slate-500">
          <Search className={`w-5 h-5 transition-colors duration-200 ${isFocused ? 'text-teal-700 dark:text-teal-400' : 'text-slate-400'}`} />
        </div>

        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => {
              setIsFocused(true);
              if (query.trim()) setIsOpen(true);
            }}
            onBlur={() => {
              if (!query.trim()) setIsFocused(false);
            }}
            onKeyDown={handleKeyDown}
            aria-label="Search your job"
            className="w-full bg-transparent py-4 text-sm sm:text-base text-slate-900 dark:text-slate-100 placeholder:text-transparent focus:outline-none"
          />

          {/* Rotating placeholder animation */}
          {!query && (
            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none text-slate-400 dark:text-slate-500 text-sm sm:text-base select-none">
              <AnimatePresence mode="wait">
                <motion.span
                  key={placeholderIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="truncate max-w-[280px] sm:max-w-none"
                >
                  {rotatingPlaceholders[placeholderIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 pr-3">
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              aria-label="Clear search query"
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <div className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100/80 dark:bg-slate-800/80 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 select-none">
            <kbd className="font-sans font-semibold">⌘</kbd>
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Autocomplete Dropdown with Smooth Reveal */}
      <AnimatePresence>
        {isOpen && query.trim().length > 0 && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden z-30 max-h-80 overflow-y-auto"
          >
            {filteredJobs.length > 0 ? (
              <ul className="divide-y divide-slate-100 dark:divide-slate-800 list-none m-0 p-0 text-left">
                {filteredJobs.map((job, idx) => {
                  const isSelected = idx === selectedIndex;
                  const scoreColor =
                    job.score >= 80 ? 'text-rose-600 dark:text-rose-400' :
                    job.score >= 60 ? 'text-orange-600 dark:text-orange-400' :
                    job.score >= 40 ? 'text-amber-600 dark:text-amber-400' : 'text-teal-600 dark:text-teal-400';

                  return (
                    <li
                      key={job.slug}
                      onClick={() => handleSelectJob(job.slug)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`px-4 py-3 cursor-pointer flex items-center justify-between transition-colors relative ${
                        isSelected
                          ? 'bg-teal-50/70 dark:bg-teal-950/40 text-slate-900 dark:text-slate-100'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <div className="z-10">
                        <div className="font-semibold text-sm">
                          {job.title}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-2">
                          <span>{job.sectorName}</span>
                          <span aria-hidden="true">·</span>
                          <span>Timeline: {job.timeline}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 z-10">
                        <div className="text-right">
                          <span className={`font-serif-heading font-bold text-base ${scoreColor}`}>
                            {job.score}/100
                          </span>
                          <div className="text-[10px] uppercase font-mono text-slate-400">
                            {job.label}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="p-5 text-center text-xs text-slate-500 dark:text-slate-400">
                No matching career found for &ldquo;{query}&rdquo;. Browse our{' '}
                <a
                  href="#all-jobs"
                  onClick={() => setIsOpen(false)}
                  className="text-teal-700 dark:text-teal-400 underline font-medium"
                >
                  full 40-job directory
                </a>
                .
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

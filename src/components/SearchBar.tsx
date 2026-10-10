import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import jobsData from '../data/jobs.json';
import { Job } from '../types';

interface SearchBarProps {
  placeholder?: string;
  size?: 'normal' | 'large';
  autoFocus?: boolean;
  onSelect?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search by job title (e.g., Software QA, Bank Clerk, Content Writer)...',
  size = 'large',
  autoFocus = false,
  onSelect,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const jobs = jobsData as Job[];

  // Simple and effective fuzzy match
  const filteredJobs = query.trim()
    ? jobs.filter((job) => {
        const q = query.toLowerCase();
        const titleMatch = job.title.toLowerCase().includes(q);
        const sectorMatch = job.sectorName.toLowerCase().includes(q);
        const taskMatch = job.tasks.some(t => t.name.toLowerCase().includes(q));
        const summaryMatch = job.summary.toLowerCase().includes(q);
        return titleMatch || sectorMatch || taskMatch || summaryMatch;
      }).slice(0, 8)
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
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectJob = (slug: string) => {
    setIsOpen(false);
    setQuery('');
    if (onSelect) onSelect();
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
    <div className="relative w-full max-w-2xl mx-auto">
      <div
        className={`relative flex items-center bg-white dark:bg-slate-900 border ${
          isOpen ? 'border-slate-800 dark:border-slate-300 ring-1 ring-slate-800 dark:ring-slate-300' : 'border-slate-300 dark:border-slate-700'
        } transition-shadow shadow-sm rounded-lg`}
      >
        <div className="pl-4 pr-2 text-slate-400">
          <Search className={size === 'large' ? 'w-5 h-5' : 'w-4 h-4'} />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          autoFocus={autoFocus}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (query.trim()) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label="Search jobs"
          className={`w-full bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none ${
            size === 'large' ? 'py-4 text-base' : 'py-2.5 text-sm'
          }`}
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            className="p-2 mr-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && query.trim().length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 left-0 right-0 mt-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl overflow-hidden max-h-96 overflow-y-auto"
        >
          {filteredJobs.length > 0 ? (
            <ul className="divide-y divide-slate-100 dark:divide-slate-800/80 list-none m-0 p-0">
              {filteredJobs.map((job, idx) => {
                const isSelected = idx === selectedIndex;
                const scoreColor =
                  job.score >= 80 ? 'text-rose-600' :
                  job.score >= 60 ? 'text-orange-600' :
                  job.score >= 40 ? 'text-amber-600' : 'text-teal-600';

                return (
                  <li
                    key={job.slug}
                    onClick={() => handleSelectJob(job.slug)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`px-4 py-3 cursor-pointer flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'bg-slate-50 dark:bg-slate-800/60'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <div>
                      <div className="font-medium text-sm text-slate-900 dark:text-slate-100">
                        {job.title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-2">
                        <span>{job.sectorName}</span>
                        <span aria-hidden="true">·</span>
                        <span>{job.timeline}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className={`text-sm font-semibold font-serif-heading ${scoreColor}`}>
                          {job.score}/100
                        </div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">
                          {job.label}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="p-4 text-center text-sm text-slate-500 dark:text-slate-400">
              No matching job found for &ldquo;{query}&rdquo;. Check our full{' '}
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  navigate('/#all-jobs');
                }}
                className="text-slate-900 dark:text-slate-100 underline font-medium"
              >
                sectors directory
              </button>
              .
            </div>
          )}
        </div>
      )}
    </div>
  );
};

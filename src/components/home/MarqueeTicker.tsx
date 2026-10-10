import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ShieldCheck } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import jobsData from '../../data/jobs.json';
import { Job } from '../../types';

export const MarqueeTicker: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const jobs = jobsData as Job[];

  // Top at risk & Safest
  const highRisk = [...jobs].sort((a, b) => b.score - a.score).slice(0, 5);
  const safest = [...jobs].sort((a, b) => a.score - b.score).slice(0, 5);

  const tickerItems = [
    ...highRisk.map((j) => ({ ...j, type: 'risk' as const })),
    ...safest.map((j) => ({ ...j, type: 'safe' as const })),
  ];

  // Duplicate to allow seamless CSS infinite scroll
  const doubledItems = [...tickerItems, ...tickerItems];

  if (shouldReduceMotion) {
    return (
      <div className="border-y border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 py-3 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-4 px-4 max-w-6xl mx-auto text-xs">
          <span className="font-mono uppercase font-bold text-[10px] text-slate-400 shrink-0">
            Index Highlights:
          </span>
          {tickerItems.slice(0, 6).map((item, idx) => (
            <Link
              key={idx}
              to={`/jobs/${item.slug}`}
              className="inline-flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-400"
            >
              <span className="font-medium text-slate-900 dark:text-slate-100">{item.title}</span>
              <span className="font-mono font-bold">{item.score}/100</span>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="border-y border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 py-3 overflow-hidden select-none group">
      <div className="flex items-center">
        {/* Ticker Lead Tag */}
        <div className="pl-4 pr-3 shrink-0 flex items-center gap-1.5 z-10 text-[10px] uppercase font-mono font-bold tracking-wider text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 py-0.5">
          <span>Live Ticker</span>
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
        </div>

        {/* Scrolling Track */}
        <div className="flex w-full overflow-hidden mask-fade-edges">
          <div className="flex items-center gap-4 animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap">
            {doubledItems.map((item, idx) => {
              const isHigh = item.type === 'risk';
              const scoreBadge = isHigh
                ? 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border-rose-200/80 dark:border-rose-900/60'
                : 'text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 border-teal-200/80 dark:border-teal-900/60';

              return (
                <Link
                  key={idx}
                  to={`/jobs/${item.slug}`}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 hover:border-slate-400 dark:hover:border-slate-500 text-xs transition-colors shrink-0"
                >
                  {isHigh ? (
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  ) : (
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                  )}

                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    {item.title}
                  </span>

                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border font-semibold ${scoreBadge}`}>
                    {item.score}/100
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

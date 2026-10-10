import React from 'react';
import { Info } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DisclaimerBannerProps {
  className?: string;
  compact?: boolean;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({
  className = '',
  compact = false,
}) => {
  if (compact) {
    return (
      <div
        className={`flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded p-2.5 ${className}`}
      >
        <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
        <p>
          <strong>Research Note:</strong> All scores and timelines are research-based estimates, not guarantees or fatalistic predictions. Indian adoption rates vary significantly by state, capital intensity, and local regulation.{' '}
          <Link to="/methodology" className="underline hover:text-slate-800 dark:hover:text-slate-200">
            Read methodology
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div
      role="note"
      className={`border-l-2 border-slate-400 dark:border-slate-600 bg-slate-50/70 dark:bg-slate-900/60 p-4 rounded-r text-xs text-slate-600 dark:text-slate-400 ${className}`}
    >
      <div className="flex items-center gap-1.5 font-medium text-slate-800 dark:text-slate-200 mb-1">
        <Info className="w-4 h-4 text-slate-500" />
        <span>Important Estimation Notice</span>
      </div>
      <p className="leading-relaxed">
        AIJobWatch calculations evaluate the proportion of automatable component tasks against historical tech diffusion curves in India. Scores reflect <em>exposure to task modification</em>, not immediate unemployment. No model can predict the future with certainty. We encourage workers to view these findings as an early roadmap for continuous upskilling. Learn more on our{' '}
        <Link to="/methodology" className="underline hover:text-slate-900 dark:hover:text-slate-100 font-medium">
          methodology page
        </Link>{' '}
        or consult our full{' '}
        <Link to="/disclaimer" className="underline hover:text-slate-900 dark:hover:text-slate-100 font-medium">
          legal disclaimer
        </Link>
        .
      </p>
    </div>
  );
};

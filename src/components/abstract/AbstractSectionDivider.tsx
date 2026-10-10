import React from 'react';

interface AbstractSectionDividerProps {
  label?: string;
  code?: string;
  className?: string;
}

export const AbstractSectionDivider: React.FC<AbstractSectionDividerProps> = ({
  label,
  code = 'SEC-COORD',
  className = '',
}) => {
  return (
    <div className={`relative py-6 max-w-6xl mx-auto px-4 sm:px-6 select-none ${className}`} aria-hidden="true">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-600">
          <span className="text-teal-700 dark:text-teal-400 font-bold">+</span>
          <span>{code}</span>
        </div>

        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800 relative">
          <div className="absolute left-1/2 -top-1 w-2 h-2 rounded-full border border-teal-600 dark:border-teal-400 bg-[#FAF8F4] dark:bg-[#0C111C]" />
        </div>

        {label && (
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-500 font-semibold">
            {label}
          </div>
        )}

        <div className="text-[9px] font-mono text-slate-400 dark:text-slate-600">
          +
        </div>
      </div>
    </div>
  );
};

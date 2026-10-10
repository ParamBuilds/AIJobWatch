import React from 'react';

interface AbstractCardAccentProps {
  id?: string;
  code?: string;
  className?: string;
  variant?: 'corners' | 'stamp' | 'coordinates';
}

export const AbstractCardAccent: React.FC<AbstractCardAccentProps> = ({
  code,
  className = '',
  variant = 'corners',
}) => {
  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden="true">
      {variant === 'corners' && (
        <>
          <span className="absolute top-1.5 left-2 font-mono text-[8px] text-slate-300 dark:text-slate-700 leading-none">
            ┌
          </span>
          <span className="absolute top-1.5 right-2 font-mono text-[8px] text-slate-300 dark:text-slate-700 leading-none">
            ┐
          </span>
          <span className="absolute bottom-1.5 left-2 font-mono text-[8px] text-slate-300 dark:text-slate-700 leading-none">
            └
          </span>
          <span className="absolute bottom-1.5 right-2 font-mono text-[8px] text-slate-300 dark:text-slate-700 leading-none">
            ┘
          </span>
        </>
      )}

      {code && (
        <span className="absolute bottom-2 right-2.5 font-mono text-[8px] text-slate-400/80 dark:text-slate-600 uppercase tracking-widest">
          {code}
        </span>
      )}
    </div>
  );
};

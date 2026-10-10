import React from 'react';

interface AdSlotProps {
  position: 'header' | 'in-content' | 'sidebar';
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ position, className = '' }) => {
  // Height and dimensions depending on position
  const slotStyles = {
    header: 'min-h-[90px] max-w-4xl mx-auto my-4',
    'in-content': 'min-h-[160px] my-8 max-w-3xl mx-auto',
    sidebar: 'min-h-[250px] w-full my-4',
  }[position];

  return (
    <aside
      aria-label="Advertisement"
      className={`ad-slot border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 rounded p-3 flex flex-col items-center justify-center text-center text-xs text-slate-400 dark:text-slate-500 ${slotStyles} ${className} no-print`}
    >
      <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 mb-1">
        Advertisement
      </span>
      <span className="text-[11px] text-slate-400 dark:text-slate-500 max-w-xs">
        {/* Placeholder for Google AdSense <ins class="adsbygoogle" ...></ins> */}
        Reserved ad placement · Inactive until AdSense is configured
      </span>
    </aside>
  );
};

import React, { useState, useEffect } from 'react';
import { AlignLeft } from 'lucide-react';

export interface TOCItem {
  id: string;
  title: string;
  level?: 2 | 3;
}

interface TableOfContentsProps {
  items: TOCItem[];
  className?: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  items,
  className = '',
}) => {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-10% 0px -75% 0px',
        threshold: 0.1,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveId(id);
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Table of Contents"
      className={`sticky top-20 bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-4 shadow-2xs backdrop-blur-xs no-print text-xs ${className}`}
    >
      <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase font-bold tracking-widest text-teal-800 dark:text-teal-400 mb-3">
        <AlignLeft className="w-3.5 h-3.5" />
        <span>Contents</span>
      </div>

      <ul className="space-y-1.5 list-none p-0 m-0">
        {items.map((item) => {
          const isActive = activeId === item.id;

          return (
            <li
              key={item.id}
              className={`${item.level === 3 ? 'pl-3' : 'pl-0'}`}
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className={`block py-1 px-2 rounded-md transition-all text-xs ${
                  isActive
                    ? 'font-bold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 border-l-2 border-teal-600'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                }`}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

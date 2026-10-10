import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const schemaItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://aijobwatch.in/',
    },
    ...items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 2,
      name: item.label,
      item: item.path ? `https://aijobwatch.in${item.path}` : undefined,
    })),
  ];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: schemaItems,
  };

  return (
    <nav aria-label="Breadcrumb" className="my-3 text-xs text-slate-500 dark:text-slate-400 no-print">
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>

      <ol className="flex items-center flex-wrap gap-1.5 list-none p-0 m-0">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </li>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="inline-flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3 text-slate-400 dark:text-slate-600" />
              {item.path && !isLast ? (
                <Link
                  to={item.path}
                  className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-slate-800 dark:text-slate-200 font-medium">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

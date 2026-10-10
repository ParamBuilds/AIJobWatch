import React from 'react';
import { Mail, MessageSquare, ShieldCheck } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHelmet } from '../components/SEOHelmet';

export const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 max-w-2xl mx-auto">
      <SEOHelmet
        title="Contact Research Team – AIJobWatch India"
        description="Get in touch with the AIJobWatch research editors with dataset corrections, Indian labor citations, or press inquiries."
        canonicalPath="/contact"
      />

      <Breadcrumbs items={[{ label: 'Contact' }]} />

      <article className="my-8">
        <header className="pb-6 border-b border-slate-200 dark:border-slate-800">
          <h1 className="text-3xl font-serif-heading font-bold text-slate-900 dark:text-slate-50">
            Contact the Research Team
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            AIJobWatch is an independent public research index. We do not operate user accounts, databases, or marketing newsletters.
          </p>
        </header>

        <div className="my-8 space-y-6 text-sm text-slate-700 dark:text-slate-300">
          <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-semibold font-serif-heading text-lg">
              <Mail className="w-5 h-5 text-amber-700 dark:text-amber-500" />
              <span>Direct Editorial Email</span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              For peer review feedback, dataset corrections, salary band revisions from Indian tier-2/3 cities, or media inquiries:
            </p>

            <div className="pt-2">
              <a
                href="mailto:research@aijobwatch.in?subject=AIJobWatch%20Inquiry%20from%20Website"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium text-xs rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Email research@aijobwatch.in</span>
              </a>
            </div>

            <p className="text-[11px] text-slate-400 dark:text-slate-500">
              Expected reply time: 24–48 hours for academic citations and data verification requests.
            </p>
          </div>

          <div className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
            <strong className="block text-slate-800 dark:text-slate-200 font-medium">
              Data Privacy Notice
            </strong>
            <p className="text-slate-500 dark:text-slate-400">
              When contacting us via email, your email address will only be used to answer your direct inquiry. We never sell, share, or store contact records for marketing purposes.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};

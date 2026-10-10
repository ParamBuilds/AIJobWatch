import React from 'react';
import { ShieldAlert, BookOpen, Scale, AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHelmet } from '../components/SEOHelmet';

export const DisclaimerPage: React.FC = () => {
  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 max-w-3xl mx-auto">
      <SEOHelmet
        title="Estimation Disclaimer & Methodological Limits – AIJobWatch India"
        description="Comprehensive legal and methodological disclaimer regarding AI exposure scores, timeline forecasts, and economic models on AIJobWatch India."
        canonicalPath="/disclaimer"
      />

      <Breadcrumbs items={[{ label: 'Disclaimer' }]} />

      <article className="my-8">
        <header className="pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-mono text-xs uppercase mb-2">
            <ShieldAlert className="w-4 h-4" />
            <span>Important Legal Notice</span>
          </div>
          <h1 className="text-3xl font-serif-heading font-bold text-slate-900 dark:text-slate-50">
            Estimation Disclaimer
          </h1>
          <p className="mt-2 text-xs text-slate-500 font-mono">
            Mandatory Reading for All Readers & Researchers
          </p>
        </header>

        <div className="space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed my-8">
          <div className="p-5 bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-600 rounded-r text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
            <strong className="block text-sm font-semibold mb-1">
              Core Epistemic Commitment:
            </strong>
            AIJobWatch calculations represent <strong>probabilistic estimates of task-level vulnerability</strong>, not definite forecasts of individual employment termination or future certainty. Technological evolution is non-linear and continually influenced by geopolitical, legislative, cultural, and macroeconomic forces.
          </div>

          <section className="space-y-2">
            <h2 className="text-lg font-serif-heading font-semibold text-slate-900 dark:text-slate-100">
              1. Estimates Are Not Certain Predictions
            </h2>
            <p>
              No mathematical model or research paper can predict the future with 100% accuracy. Our scores assess current technical automatability of work tasks against historical rates of Indian capital diffusion. Many jobs labeled &ldquo;Very High Risk&rdquo; may evolve into supervisory roles or experience increased headcount demand due to Jevons Paradox (e.g., lower unit costs spurring higher total market demand).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-serif-heading font-semibold text-slate-900 dark:text-slate-100">
              2. India-Specific Variations
            </h2>
            <p>
              India is an exceptionally heterogeneous economic landscape. A software firm in Whitefield, Bengaluru may automate junior developer workflows three years before an enterprise in a Tier-3 town changes its practices. Factors including electricity reliability, local language nuance, bandwidth infrastructure, and labor abundance alter real-world adoption timelines substantially.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-serif-heading font-semibold text-slate-900 dark:text-slate-100">
              3. Not Professional Employment Advice
            </h2>
            <p>
              The materials on this website are compiled for public education and strategic career contemplation. You should not resign from your position, abandon educational degrees, or make major life investments solely on the basis of any score or timeline published here. Always consult qualified domain mentors and industry specialists.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-serif-heading font-semibold text-slate-900 dark:text-slate-100">
              4. Ongoing Revisions
            </h2>
            <p>
              As new frontier models are released and domestic policies (such as India&apos;s National AI Mission regulations) are implemented, our data team periodically updates scores, task statuses, and timeline intervals.
            </p>
          </section>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
            <Link
              to="/methodology"
              className="inline-flex items-center gap-1.5 font-medium underline text-xs"
            >
              <span>Review our full research methodology and equations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

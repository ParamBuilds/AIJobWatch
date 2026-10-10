import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHelmet } from '../components/SEOHelmet';

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 max-w-3xl mx-auto">
      <SEOHelmet
        title="Terms of Use – AIJobWatch India"
        description="Terms and conditions governing the informational and educational use of AIJobWatch India."
        canonicalPath="/terms"
      />

      <Breadcrumbs items={[{ label: 'Terms of Use' }]} />

      <article className="my-8">
        <header className="pb-6 border-b border-slate-200 dark:border-slate-800">
          <h1 className="text-3xl font-serif-heading font-bold text-slate-900 dark:text-slate-50">
            Terms of Use
          </h1>
          <p className="mt-2 text-xs text-slate-500 font-mono">
            Effective Date: October 2026
          </p>
        </header>

        <div className="space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed my-8">
          <section className="space-y-2">
            <h2 className="text-lg font-serif-heading font-semibold text-slate-900 dark:text-slate-100">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using AIJobWatch India (&ldquo;the Website&rdquo;), you agree to be bound by these Terms of Use. If you disagree with any part of these terms, your sole remedy is to cease using the Website.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-serif-heading font-semibold text-slate-900 dark:text-slate-100">
              2. Purely Educational & Informational Purpose
            </h2>
            <p>
              All materials, scores, task evaluations, timelines, and career notes provided on the Website are solely for research, general educational interest, and career exploration.
            </p>
            <p className="font-semibold text-slate-900 dark:text-slate-100">
              They do NOT constitute certified career coaching, employment warranties, legal counsel, or financial advice.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-serif-heading font-semibold text-slate-900 dark:text-slate-100">
              3. Intellectual Property & Citation
            </h2>
            <p>
              The synthesis, composite scoring algorithms, task classification taxonomy, and written analyses published on the Website are the intellectual property of AIJobWatch India. You are welcome to cite our statistics and link to our job profiles for non-commercial educational, journalistic, and policy research purposes with clear attribution.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-serif-heading font-semibold text-slate-900 dark:text-slate-100">
              4. Limitation of Liability
            </h2>
            <p>
              In no event shall AIJobWatch India, its authors, or contributors be held liable for any career decision, employment resignation, educational enrollment, or financial action taken in reliance on data presented on this website.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
};

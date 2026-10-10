import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHelmet } from '../components/SEOHelmet';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 max-w-3xl mx-auto">
      <SEOHelmet
        title="Privacy Policy – AIJobWatch India"
        description="Privacy policy and data governance practices of AIJobWatch India in compliance with the Digital Personal Data Protection (DPDP) Act and international standards."
        canonicalPath="/privacy"
      />

      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      <article className="my-8">
        <header className="pb-6 border-b border-slate-200 dark:border-slate-800">
          <h1 className="text-3xl font-serif-heading font-bold text-slate-900 dark:text-slate-50">
            Privacy Policy
          </h1>
          <p className="mt-2 text-xs text-slate-500 font-mono">
            Last Updated: October 2026 · Compliant with India DPDP Act 2023 & GDPR Standards
          </p>
        </header>

        <div className="space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed my-8">
          <section className="space-y-2">
            <h2 className="text-lg font-serif-heading font-semibold text-slate-900 dark:text-slate-100">
              1. No User Accounts & No Personal Identification
            </h2>
            <p>
              AIJobWatch India is an open static research publication. We do not operate user accounts, logins, passwords, contact forms, or transactional databases. You can freely browse all job evaluations, sector profiles, and methodology documents without registering or revealing any personal data.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-serif-heading font-semibold text-slate-900 dark:text-slate-100">
              2. Cookies & Local Storage
            </h2>
            <p>
              We use client-side <code>localStorage</code> strictly to store your interface preferences:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Dark Mode Setting:</strong> Saves your light/dark theme preference locally on your device.</li>
              <li><strong>Cookie Consent:</strong> Saves your decision regarding non-essential cookies.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-serif-heading font-semibold text-slate-900 dark:text-slate-100">
              3. Advertising & Third-Party Cookies (Google AdSense)
            </h2>
            <p>
              To maintain this public educational research free for all visitors, we may display third-party advertisements via Google AdSense. Google and its advertising partners may use cookies (such as the DoubleClick cookie) to serve relevant contextual or personalized ads based on your visit to this and other websites on the internet.
            </p>
            <p>
              You can opt out of personalized advertising by visiting Google&apos;s <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="underline">Ads Settings</a> or via our in-app cookie consent manager.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-serif-heading font-semibold text-slate-900 dark:text-slate-100">
              4. External Links & Affiliate Programs
            </h2>
            <p>
              Our job profiles contain links to external learning platforms (such as SWAYAM, Coursera, NPTEL). Some educational links may include affiliate tags that provide modest commissions to support our hosting costs. External sites are governed by their own independent privacy policies.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-serif-heading font-semibold text-slate-900 dark:text-slate-100">
              5. Contacting Us
            </h2>
            <p>
              If you have questions about our privacy policies, you may reach our editorial desk at <a href="mailto:privacy@aijobwatch.in" className="underline">privacy@aijobwatch.in</a>.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
};

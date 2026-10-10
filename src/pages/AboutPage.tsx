import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Compass, HeartHandshake, Mail, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHelmet } from '../components/SEOHelmet';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 max-w-3xl mx-auto">
      <SEOHelmet
        title="About AIJobWatch India – Mission, Principles & Ethics"
        description="Learn why we built AIJobWatch India: to provide independent, research-backed transparency on AI job exposure without corporate hype or panic."
        canonicalPath="/about"
      />

      <Breadcrumbs items={[{ label: 'About Us' }]} />

      <article className="my-8">
        <header className="pb-6 border-b border-slate-200 dark:border-slate-800">
          <h1 className="text-3xl sm:text-4xl font-serif-heading font-bold text-slate-900 dark:text-slate-50">
            About AIJobWatch India
          </h1>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            An open research project dedicated to helping India&apos;s working population navigate the generative AI era with clarity, dignity, and practical foresight.
          </p>
        </header>

        <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed my-8">
          <h2 className="text-xl font-serif-heading font-bold text-slate-900 dark:text-slate-100">
            Why We Built This
          </h2>
          <p>
            Public discussion around artificial intelligence in India swings violently between two extremes: breathless corporate marketing claiming total revolution overnight, and apocalyptic doomerism predicting mass destitution for millions of Indian graduates.
          </p>
          <p>
            Neither narrative helps a 23-year-old customer care associate in Gurugram, an aspiring junior coder in Hyderabad, or a high school science teacher in Pune wondering what skills to develop over the next five years.
          </p>
          <p>
            AIJobWatch was founded to cut through the noise. We break down careers into granular daily tasks, weigh the realistic speed of capital adoption in India, and provide actionable, honest advice on which human skills remain irreplaceable.
          </p>

          <h2 className="text-xl font-serif-heading font-bold text-slate-900 dark:text-slate-100 pt-4">
            Our Guiding Principles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
              <strong className="block text-slate-900 dark:text-slate-100 font-semibold mb-1">
                1. No Fear-Mongering
              </strong>
              We reject sensationalized headlines. Automation changes task composition; it rarely eliminates an entire sector overnight.
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
              <strong className="block text-slate-900 dark:text-slate-100 font-semibold mb-1">
                2. India-First Grounding
              </strong>
              Western labor models assume expensive labor and uniform physical infrastructure. India has unique socio-economic realities: Kirana stores, informal credit, UPI scale, and distinct regional languages.
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
              <strong className="block text-slate-900 dark:text-slate-100 font-semibold mb-1">
                3. Practical Agency
              </strong>
              Every job evaluation includes concrete upskilling pathways, tool recommendations, and safer adjacent careers.
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
              <strong className="block text-slate-900 dark:text-slate-100 font-semibold mb-1">
                4. Radical Honesty
              </strong>
              We explicitly label our scores as estimates and display confidence intervals on every page.
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <Link to="/methodology" className="inline-flex items-center gap-1 font-medium underline">
              <span>Read Our Full Scoring Methodology</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link to="/contact" className="inline-flex items-center gap-1 font-medium underline">
              <span>Contact the Research Team</span>
              <Mail className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

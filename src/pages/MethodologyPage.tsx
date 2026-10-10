import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, BookOpen, Layers, Scale, AlertTriangle, ExternalLink } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHelmet } from '../components/SEOHelmet';
import { AdSlot } from '../components/AdSlot';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import { AbstractCardAccent } from '../components/abstract/AbstractCardAccent';

export const MethodologyPage: React.FC = () => {
  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 max-w-4xl mx-auto">
      <SEOHelmet
        title="Scoring Methodology & Research Framework – AIJobWatch India"
        description="Transparent breakdown of our AI exposure estimation formula, India-specific adoption weighting, data sources, and strict epistemic disclaimers."
        canonicalPath="/methodology"
      />

      <Breadcrumbs items={[{ label: 'Methodology & Sources' }]} />

      <article className="my-8">
        <header className="pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-full mb-3">
            <span>Research Whitepaper</span>
            <span aria-hidden="true">·</span>
            <span>Version 2.4 (India Edition)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif-heading font-bold text-slate-900 dark:text-slate-50">
            Estimation Methodology & Sources
          </h1>

          <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            AIJobWatch was created to provide Indian workers, students, and employers with a clear, sober alternative to apocalyptic tech headlines. Below is how we derive our AI Exposure Scores, timeline windows, and task evaluations.
          </p>
        </header>

        {/* Primary Epistemic Warning */}
        <div className="my-8">
          <DisclaimerBanner />
        </div>

        {/* Section 1: The Core Formula */}
        <section className="my-10 space-y-4">
          <h2 className="text-2xl font-serif-heading font-bold text-slate-900 dark:text-slate-100">
            1. The Composite Scoring Equation
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Rather than treating professions as monolithic blocks, we adopt the <strong>Task-Based Model of Labor Economics</strong> pioneered by Acemoglu & Autor (2011). Every occupation is decomposed into observable discrete tasks.
          </p>

          <div className="relative overflow-hidden p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-200 overflow-x-auto shadow-2xs">
            <AbstractCardAccent code="FORMULA // ALGO-SPEC-01" />
            <div className="text-[9px] uppercase tracking-widest text-slate-400 mb-2">
              EQUATION SPEC: TASK DISPLACEMENT TENSOR
            </div>
            <div className="text-teal-700 dark:text-teal-400 font-semibold mb-2">
              Composite AI Exposure Index (0 – 100) =
            </div>
            <div className="pl-4 border-l-2 border-slate-300 dark:border-slate-700 space-y-1">
              <div>(Share of Automatable Tasks × 0.50)</div>
              <div>+ (India Capital & Tech Diffusion Velocity × 0.25)</div>
              <div>+ (Regulatory, Legal & Trust Vulnerability × 0.25)</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-xs">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200/80 dark:border-slate-800">
              <strong className="block text-slate-900 dark:text-slate-100 font-semibold mb-1">
                A. Automatable Task Share (50%)
              </strong>
              Calculated by scoring each component task as <em>Now</em> (1.0), <em>5 Years</em> (0.5), or <em>Unlikely</em> (0.0), weighted by hours spent per typical workweek.
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200/80 dark:border-slate-800">
              <strong className="block text-slate-900 dark:text-slate-100 font-semibold mb-1">
                B. India Adoption Velocity (25%)
              </strong>
              Considers wage-to-capital substitution economics. In sectors with low unit labor costs (e.g. manual factory assembly or agriculture), robotic substitution takes substantially longer than high-wage software sectors.
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200/80 dark:border-slate-800">
              <strong className="block text-slate-900 dark:text-slate-100 font-semibold mb-1">
                C. Institutional & Trust Buffers (25%)
              </strong>
              Legal liability constraints (e.g., Bar Council, Medical Council, Reserve Bank guidelines requiring human sign-off) and informal community trust (e.g. Kirana khata books).
            </div>
          </div>
        </section>

        {/* Section 2: Exposure Labels */}
        <section className="my-10 space-y-4">
          <h2 className="text-2xl font-serif-heading font-bold text-slate-900 dark:text-slate-100">
            2. Exposure Score Tiers
          </h2>

          <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-medium">
                  <th className="py-2.5 px-4">Score Band</th>
                  <th className="py-2.5 px-4">Risk Label</th>
                  <th className="py-2.5 px-4">Operational Meaning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                <tr>
                  <td className="py-3 px-4 font-mono font-bold text-rose-600">80 – 100</td>
                  <td className="py-3 px-4 font-semibold text-rose-700 dark:text-rose-400">Very High</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                    Over 70% of day-to-day workflow can be fulfilled by software models. Entry-level hiring volume is contracting immediately.
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono font-bold text-orange-600">60 – 79</td>
                  <td className="py-3 px-4 font-semibold text-orange-700 dark:text-orange-400">High</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                    Core routine tasks are automated; the role requires immediate upskilling into architecture, escalation oversight, or product strategy.
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono font-bold text-amber-600">40 – 59</td>
                  <td className="py-3 px-4 font-semibold text-amber-700 dark:text-amber-400">Moderate</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                    AI acts as a major productivity multiplier. Some junior tasks diminish, but total demand remains steady for skilled practitioners.
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono font-bold text-teal-600">0 – 39</td>
                  <td className="py-3 px-4 font-semibold text-teal-700 dark:text-teal-400">Low</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                    Insulated by tactile motor dexterity, unpredictable physical environments, legal liability, or biological human empathy.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Data Sources */}
        <section className="my-10 space-y-4">
          <h2 className="text-2xl font-serif-heading font-bold text-slate-900 dark:text-slate-100">
            3. Research Citations & Data Inputs
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Our estimates draw upon publicly published academic studies, multilateral labor reports, and official Indian labor statistics:
          </p>

          <ul className="space-y-3 list-none p-0 text-xs text-slate-700 dark:text-slate-300">
            <li className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded flex items-start gap-3">
              <BookOpen className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <strong>NASSCOM Strategic Review & FutureSkills Prime Reports (2024–2026)</strong>
                <p className="text-slate-500 mt-0.5">Benchmarking workforce restructuring across Indian IT-BPM, GCC centers, and fresher recruitment benches.</p>
              </div>
            </li>

            <li className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded flex items-start gap-3">
              <BookOpen className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <strong>Periodic Labour Force Survey (PLFS) – Ministry of Statistics & Programme Implementation (MoSPI)</strong>
                <p className="text-slate-500 mt-0.5">National Occupational Classification (NCO-2015) employment shares, formal vs informal ratios, and wage brackets across Indian states.</p>
              </div>
            </li>

            <li className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded flex items-start gap-3">
              <BookOpen className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <strong>International Labour Organization (ILO) Working Papers on Generative AI & Jobs</strong>
                <p className="text-slate-500 mt-0.5">Task-level occupational exposure taxonomies differentiating task replacement from task augmentation in developing economies.</p>
              </div>
            </li>

            <li className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded flex items-start gap-3">
              <BookOpen className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <strong>Stanford Human-Centered Artificial Intelligence (HAI) AI Index Report</strong>
                <p className="text-slate-500 mt-0.5">Global capability benchmarks in computer vision, language reasoning, and robotic manipulation.</p>
              </div>
            </li>

            <li className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded flex items-start gap-3">
              <BookOpen className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <strong>NITI Aayog National Strategy for Artificial Intelligence (#AIforAll)</strong>
                <p className="text-slate-500 mt-0.5">Sectoral roadmap for agriculture, healthcare, education, smart mobility, and urbanization in India.</p>
              </div>
            </li>
          </ul>
        </section>

        {/* Section 4: What Scores Are NOT */}
        <section className="my-10 p-6 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 rounded-xl space-y-3">
          <h2 className="text-lg font-serif-heading font-bold text-amber-900 dark:text-amber-300 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            What Our Estimates Are NOT
          </h2>
          <ul className="space-y-1.5 list-disc pl-5 text-xs text-amber-900/80 dark:text-amber-200/80 leading-relaxed">
            <li><strong>Not a guarantee of layoffs:</strong> An exposure score of 80% means 80% of daily tasks are exposed to automation, not that 80% of workers will be terminated. Many jobs expand as software reduces costs.</li>
            <li><strong>Not universal across all Indian cities:</strong> An enterprise in Bengaluru adopts AI faster than an MSME workshop in Meerut. Local adoption lag is real and substantial.</li>
            <li><strong>Not permanent:</strong> Model weights and scores are reviewed quarterly as frontier models and regulatory frameworks evolve.</li>
          </ul>
        </section>

        <AdSlot position="in-content" />
      </article>
    </div>
  );
};

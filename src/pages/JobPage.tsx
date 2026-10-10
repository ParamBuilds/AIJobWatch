import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Printer, 
  ArrowLeftRight, 
  Clock, 
  ShieldCheck, 
  AlertCircle, 
  Wrench, 
  Compass, 
  IndianRupee,
  ChevronRight,
  TrendingDown,
  TrendingUp,
  Activity,
  Calculator
} from 'lucide-react';
import { CircularScore } from '../components/CircularScore';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ShareButtons } from '../components/ShareButtons';
import { AffiliateBox } from '../components/AffiliateBox';
import { AdSlot } from '../components/AdSlot';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import { SEOHelmet } from '../components/SEOHelmet';
import { AnimatedTaskBreakdown } from '../components/job/AnimatedTaskBreakdown';
import { FAQAccordion } from '../components/job/FAQAccordion';
import { Reveal } from '../components/animations/Reveal';
import { AbstractCardAccent } from '../components/abstract/AbstractCardAccent';
import { AbstractMetricGlyph } from '../components/abstract/AbstractMetricGlyph';
import jobsData from '../data/jobs.json';
import { Job } from '../types';

export const JobPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const jobs = jobsData as Job[];
  const job = jobs.find((j) => j.slug === slug);

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-serif-heading font-bold text-slate-900 dark:text-slate-100">
          Career Profile Not Found
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          The requested career profile does not exist in our index.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-5 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg text-xs font-semibold"
        >
          Return to All Careers
        </Link>
      </div>
    );
  }

  // Related jobs in same sector
  const relatedJobs = jobs
    .filter((j) => j.slug !== job.slug && (j.sector === job.sector || j.score > job.score - 15))
    .slice(0, 3);

  // FAQ Schema for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: job.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  const handlePrint = () => {
    window.print();
  };

  const trendIcon =
    job.hiringTrend === 'Declining' ? TrendingDown :
    job.hiringTrend === 'Growing' ? TrendingUp : Activity;
  const TrendIcon = trendIcon;

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 max-w-5xl mx-auto print-page">
      <SEOHelmet
        title={`Will AI Take ${job.title} Jobs in India? Timeline & Exposure Score`}
        description={`Research-based AI exposure score for ${job.title} in India (${job.score}/100, ${job.label}). Estimated timeline: ${job.timeline}. Detailed task breakdown and future-proofing skills.`}
        canonicalPath={`/jobs/${job.slug}`}
        schemaData={faqSchema}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Sectors', path: '/#sectors' },
          { label: job.sectorName, path: `/sectors/${job.sector}` },
          { label: job.title },
        ]}
      />

      {/* Header Ad Slot (Reserved) */}
      <AdSlot position="header" />

      {/* Main Job Profile Dossier */}
      <article className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs my-6 overflow-hidden">
        <AbstractCardAccent code={`DOSSIER // IN-${job.slug.toUpperCase()}`} />

        <div className="text-[9px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-2">
          <span>SPEC: OCCUPATIONAL-RISK-PROJECTION</span>
          <span>COORDINATES: IN-INDEX // REF-2026</span>
        </div>

        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b border-slate-100 dark:border-slate-800">
            {/* Left Column: Job Info & Summary */}
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2 font-mono">
                <Link
                  to={`/sectors/${job.sector}`}
                  className="hover:text-teal-800 dark:hover:text-teal-300 font-semibold uppercase text-teal-700 dark:text-teal-400"
                >
                  {job.sectorName}
                </Link>
                <span aria-hidden="true">·</span>
                <span>Updated {job.lastUpdated}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-serif-heading font-bold text-slate-900 dark:text-slate-50 tracking-tight">
                {job.title}
              </h1>

              <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {job.summary}
              </p>

              {/* Quick Metrics Bar */}
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Impact Window</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono text-sm">{job.timeline}</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Confidence Level</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{job.confidence}</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 col-span-2 sm:col-span-1">
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">India Salary Band</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono">{job.salaryRangeINR}</span>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="mt-6 flex items-center gap-3 flex-wrap no-print">
                <Link
                  to={`/compare?job1=${job.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 transition-colors"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
                  <span>Compare Career</span>
                </Link>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Dossier</span>
                </button>

                <ShareButtons title={job.title} />
              </div>
            </div>

            {/* Right Column: Animated AI Exposure Gauge */}
            <div className="lg:w-72 flex flex-col items-center justify-center p-6 bg-slate-50/80 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-800 shrink-0 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-3">
                <AbstractMetricGlyph score={job.score} label={job.label} size={22} />
                <span className="text-[10px] uppercase tracking-wider font-mono font-bold text-slate-500 dark:text-slate-400">
                  Exposure Metric
                </span>
              </div>
              <CircularScore
                score={job.score}
                label={job.label}
                confidence={job.confidence}
                timeline={job.timeline}
                size="lg"
              />
              <div className="text-[10px] text-slate-400 dark:text-slate-500 text-center mt-3 leading-tight max-w-xs font-mono">
                Decomposition: {job.tasks.filter(t => t.status === 'now').length} Now • {job.tasks.filter(t => t.status === '5years').length} 5-Yr • {job.tasks.filter(t => t.status === 'unlikely').length} Unlikely
              </div>
            </div>
          </div>
        </Reveal>

        {/* Section 1: Animated Task Breakdown */}
        <section className="mt-10">
          <div className="mb-4">
            <h2 className="text-xl font-serif-heading font-bold text-slate-900 dark:text-slate-100">
              Component Task Breakdown
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Occupations do not vanish monolithically; discrete tasks are automated sequentially.
            </p>
          </div>

          <AnimatedTaskBreakdown tasks={job.tasks} />
        </section>

        {/* Section 2: Two Columns (What AI Will Do vs What Humans Will Still Do) */}
        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 print-break-inside-avoid">
          {/* Column 1: AI */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-5 bg-rose-50/20 dark:bg-rose-950/10">
            <h3 className="font-serif-heading font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              What AI is doing / will do
            </h3>
            <ul className="mt-3 space-y-2 list-none p-0 text-xs text-slate-600 dark:text-slate-300">
              {job.aiWillDo.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-500 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Humans */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-5 bg-teal-50/20 dark:bg-teal-950/10">
            <h3 className="font-serif-heading font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500" />
              What humans will still do
            </h3>
            <ul className="mt-3 space-y-2 list-none p-0 text-xs text-slate-600 dark:text-slate-300">
              {job.humansWillDo.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 3: India Context Note */}
        <section className="mt-10 border-l-3 border-teal-700 dark:border-teal-500 pl-4 py-1 print-break-inside-avoid">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-teal-800 dark:text-teal-400 uppercase tracking-wider font-mono">
            <IndianRupee className="w-3.5 h-3.5" />
            <span>India Context & Market Realities</span>
          </div>
          <p className="mt-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {job.indiaNote}
          </p>
        </section>

        {/* Section 4: Future-Proofing Strategy */}
        <section className="mt-10 print-break-inside-avoid">
          <h2 className="text-xl font-serif-heading font-bold text-slate-900 dark:text-slate-100 mb-4">
            How to Future-Proof This Career
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Skills */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-slate-100 mb-2">
                <Compass className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                <span>Skills to Learn</span>
              </div>
              <ul className="space-y-1.5 list-none p-0 text-xs text-slate-600 dark:text-slate-300">
                {job.skillsToLearn.map((skill, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-teal-600">•</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-slate-100 mb-2">
                <Wrench className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                <span>Tools to Master</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {job.toolsToLearn.map((tool, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono px-2 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Safer Careers */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-slate-100 mb-2">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>Related Safer Careers</span>
              </div>
              <div className="space-y-2 mt-2">
                {job.saferCareers.map((safer, idx) => (
                  <Link
                    key={idx}
                    to={`/jobs/${safer.slug}`}
                    className="block text-xs font-medium text-slate-800 dark:text-slate-200 hover:text-teal-700 dark:hover:text-teal-400 underline"
                  >
                    {safer.title} →
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Career Action Cockpit */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8 no-print">
          <Link
            to="/roadmap"
            className="p-5 rounded-xl bg-gradient-to-br from-teal-900 to-slate-900 text-white border border-teal-700/60 shadow-sm hover:border-teal-400 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-teal-300 font-bold uppercase tracking-wider">
                  24-Week Career Bridge
                </span>
                <Compass className="w-5 h-5 text-teal-400 group-hover:rotate-45 transition-transform" />
              </div>
              <h4 className="text-base font-bold font-serif-heading text-white group-hover:text-teal-200 transition-colors mb-1">
                Simulate Career Roadmap from {job.title}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                See your skill transferability score, IIT/NPTEL certification plan, and projected salary increases across Indian tech hubs.
              </p>
            </div>
            <span className="text-xs font-mono font-semibold text-teal-300 flex items-center gap-1">
              Launch Roadmap Simulator →
            </span>
          </Link>

          <Link
            to="/salary-calculator"
            className="p-5 rounded-xl bg-gradient-to-br from-amber-950 to-slate-900 text-white border border-amber-800/60 shadow-sm hover:border-amber-400 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-amber-300 font-bold uppercase tracking-wider">
                  CTC & Wealth Impact
                </span>
                <Calculator className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              </div>
              <h4 className="text-base font-bold font-serif-heading text-white group-hover:text-amber-200 transition-colors mb-1">
                Calculate Financial Disruption Risk
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                Project your 5-year Indian CTC trajectory, emergency savings runway deficit, and upskilling ROI in Lakhs.
              </p>
            </div>
            <span className="text-xs font-mono font-semibold text-amber-300 flex items-center gap-1">
              Run Salary Risk Model →
            </span>
          </Link>
        </div>

        {/* Affiliate Box Component */}
        <AffiliateBox
          jobTitle={job.title}
          skills={job.skillsToLearn}
        />

        {/* In-Content Reserved Ad Slot */}
        <AdSlot position="in-content" />

        {/* FAQ Accordion Section (Animated) */}
        <FAQAccordion faqs={job.faqs} jobTitle={job.title} />

        {/* Related Jobs Section */}
        <section className="mt-12 border-t border-slate-200 dark:border-slate-800 pt-8 no-print">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-4">
            Related Careers in {job.sectorName}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {relatedJobs.map((rj) => (
              <Link
                key={rj.slug}
                to={`/jobs/${rj.slug}`}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
              >
                <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                  {rj.title}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center justify-between font-mono">
                  <span>Score: {rj.score}/100</span>
                  <span>{rj.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Epistemic Disclaimer */}
        <div className="mt-10">
          <DisclaimerBanner />
        </div>
      </article>
    </div>
  );
};

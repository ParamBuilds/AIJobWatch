import React, { useState, useEffect } from 'react';
import { useSearchParams, useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeftRight, Check, X, ShieldAlert, ArrowRight, Compass, Sparkles, TrendingUp, TrendingDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CircularScore } from '../components/CircularScore';
import { RadarChart } from '../components/charts/RadarChart';
import { SEOHelmet } from '../components/SEOHelmet';
import { AdSlot } from '../components/AdSlot';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import { Reveal } from '../components/animations/Reveal';
import { AbstractCardAccent } from '../components/abstract/AbstractCardAccent';
import { AbstractMetricGlyph } from '../components/abstract/AbstractMetricGlyph';
import jobsData from '../data/jobs.json';
import { Job } from '../types';

export const ComparePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { compareSlug } = useParams<{ compareSlug?: string }>();
  const navigate = useNavigate();
  const jobs = jobsData as Job[];

  // Popular pre-configured career pairings
  const popularComparisons = [
    {
      title: 'Junior Dev vs Full-Stack Engineer',
      slugA: 'junior-frontend-developer',
      slugB: 'full-stack-developer',
    },
    {
      title: 'BPO Agent vs Data Analyst',
      slugA: 'customer-support-executive',
      slugB: 'data-analyst',
    },
    {
      title: 'Bank Clerk vs Wealth Advisor',
      slugA: 'bank-clerk',
      slugB: 'wealth-advisor',
    },
    {
      title: 'High School Teacher vs Chartered Accountant',
      slugA: 'high-school-teacher',
      slugB: 'chartered-accountant',
    },
    {
      title: 'Content Writer vs Investigative Journalist',
      slugA: 'content-writer',
      slugB: 'investigative-journalist',
    },
  ];

  // Resolve initial slugs from either path param (/compare/slugA-vs-slugB) or query params (?a=...&b=...)
  const resolveInitialSlugs = (): [string, string] => {
    if (compareSlug && compareSlug.includes('-vs-')) {
      const parts = compareSlug.split('-vs-');
      const foundA = jobs.find((j) => j.slug === parts[0] || j.slug.includes(parts[0]));
      const foundB = jobs.find((j) => j.slug === parts[1] || j.slug.includes(parts[1]));
      if (foundA && foundB) {
        return [foundA.slug, foundB.slug];
      }
    }

    const qA = searchParams.get('a') || searchParams.get('job1');
    const qB = searchParams.get('b') || searchParams.get('job2');

    const validA = jobs.find((j) => j.slug === qA)?.slug || jobs[0].slug;
    const validB = jobs.find((j) => j.slug === qB)?.slug || jobs[21].slug; // Full-stack developer default
    return [validA, validB];
  };

  const [initialA, initialB] = resolveInitialSlugs();
  const [job1Slug, setJob1Slug] = useState<string>(initialA);
  const [job2Slug, setJob2Slug] = useState<string>(initialB);

  // Sync state if URL param changes
  useEffect(() => {
    const [newA, newB] = resolveInitialSlugs();
    setJob1Slug(newA);
    setJob2Slug(newB);
  }, [compareSlug, searchParams]);

  const job1 = jobs.find((j) => j.slug === job1Slug) || jobs[0];
  const job2 = jobs.find((j) => j.slug === job2Slug) || jobs[1];

  const handleSwap = () => {
    const temp = job1Slug;
    setJob1Slug(job2Slug);
    setJob2Slug(temp);
    navigate(`/compare?a=${job2Slug}&b=${temp}`);
  };

  const handleSelectJob1 = (slug: string) => {
    setJob1Slug(slug);
    navigate(`/compare?a=${slug}&b=${job2Slug}`);
  };

  const handleSelectJob2 = (slug: string) => {
    setJob2Slug(slug);
    navigate(`/compare?a=${job1Slug}&b=${slug}`);
  };

  // Generate unique editorial comparison intro
  const getComparisonIntro = (a: Job, b: Job) => {
    const diff = Math.abs(a.score - b.score);
    if (diff > 35) {
      const safer = a.score < b.score ? a : b;
      const exposed = a.score > b.score ? a : b;
      return `This comparison highlights a sharp contrast in technological exposure. ${exposed.title} faces substantial automation pressure (Score: ${exposed.score}/100) due to routine digital tasks, while ${safer.title} remains well-protected (Score: ${safer.score}/100) by non-routine human factors such as physical dexterity, empathy, and statutory liability.`;
    }
    return `Both ${a.title} (Score: ${a.score}/100) and ${b.title} (Score: ${b.score}/100) occupy similar tiers in the automation spectrum. However, they differ in specific task substitution paths, regulatory protections, and Indian wage-to-capital adoption timelines.`;
  };

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 max-w-5xl mx-auto">
      <SEOHelmet
        title={`Compare ${job1.title} vs ${job2.title} – AI Exposure & Timelines`}
        description={`Side-by-side comparison of AI exposure scores, timelines, automatable tasks, radar metrics, and salary ranges between ${job1.title} and ${job2.title} in India.`}
        canonicalPath={`/compare?a=${job1.slug}&b=${job2.slug}`}
      />

      <Breadcrumbs items={[{ label: 'Career Comparison' }]} />

      <Reveal>
        <div className="text-center max-w-2xl mx-auto my-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-teal-800 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Multi-Dimensional Evaluation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif-heading font-bold text-slate-900 dark:text-slate-50">
            {job1.title} <span className="italic font-normal text-slate-400">vs</span> {job2.title}
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {getComparisonIntro(job1, job2)}
          </p>
        </div>
      </Reveal>

      {/* Popular Comparison Pills */}
      <div className="my-6 flex items-center justify-center gap-2 flex-wrap text-xs">
        <span className="font-mono text-slate-400 text-[11px] uppercase">Popular Pairs:</span>
        {popularComparisons.map((pair, idx) => (
          <Link
            key={idx}
            to={`/compare?a=${pair.slugA}&b=${pair.slugB}`}
            className={`px-2.5 py-1 rounded-full border transition-colors ${
              (job1Slug === pair.slugA && job2Slug === pair.slugB) || (job1Slug === pair.slugB && job2Slug === pair.slugA)
                ? 'bg-teal-800 text-white border-teal-800 font-semibold'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-400'
            }`}
          >
            {pair.title}
          </Link>
        ))}
      </div>

      {/* Selectors Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xs my-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-5/12">
            <label htmlFor="select-job-1" className="block text-xs font-mono font-semibold text-teal-800 dark:text-teal-400 mb-1">
              Primary Career
            </label>
            <select
              id="select-job-1"
              value={job1Slug}
              onChange={(e) => handleSelectJob1(e.target.value)}
              className="w-full text-xs sm:text-sm border border-slate-300 dark:border-slate-700 rounded-xl p-3 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-600"
            >
              {jobs.map((j) => (
                <option key={j.slug} value={j.slug}>
                  {j.title} ({j.score}/100)
                </option>
              ))}
            </select>
          </div>

          <motion.button
            type="button"
            onClick={handleSwap}
            whileHover={{ scale: 1.1 }}
            whileTap={{ rotate: 180, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            aria-label="Swap careers"
            className="p-3 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 shadow-xs shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
            title="Swap careers"
          >
            <ArrowLeftRight className="w-4 h-4 text-teal-700 dark:text-teal-400" />
          </motion.button>

          <div className="w-full sm:w-5/12">
            <label htmlFor="select-job-2" className="block text-xs font-mono font-semibold text-amber-800 dark:text-amber-400 mb-1">
              Comparison Career
            </label>
            <select
              id="select-job-2"
              value={job2Slug}
              onChange={(e) => handleSelectJob2(e.target.value)}
              className="w-full text-xs sm:text-sm border border-slate-300 dark:border-slate-700 rounded-xl p-3 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-600"
            >
              {jobs.map((j) => (
                <option key={j.slug} value={j.slug}>
                  {j.title} ({j.score}/100)
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Multi-Dimensional Radar Chart Comparison */}
      <div className="relative overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xs my-6 text-center">
        <AbstractCardAccent code="REF // 6-AXIS-RADAR" />
        <span className="text-[10px] uppercase font-mono tracking-widest text-teal-800 dark:text-teal-400 font-bold block mb-1">
          Multi-Axis Capability Mapping
        </span>
        <h2 className="text-xl font-serif-heading font-bold text-slate-900 dark:text-slate-100 mb-2">
          Automation Vulnerability vs. Human Moat Radar
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-lg mx-auto mb-6">
          Comparing Routine Cognitive, Data Processing, Human Empathy, Physical Dexterity, Regulatory Moat, and Strategic Judgment.
        </p>

        <RadarChart job1={job1} job2={job2} size={330} />
      </div>

      {/* Side-by-Side Detailed Metric Comparison Table */}
      <div className="relative overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-xs my-6">
        <AbstractCardAccent code="ID // COMPARATIVE-TENSOR" />
        <div className="grid grid-cols-2 divide-x divide-slate-200 dark:divide-slate-800">
          {/* Header & Gauge 1 */}
          <div className="p-6 text-center bg-slate-50/50 dark:bg-slate-800/30">
            <div className="text-xs text-teal-800 dark:text-teal-400 font-mono uppercase font-semibold mb-1">
              {job1.sectorName}
            </div>
            <h3 className="text-xl font-serif-heading font-bold text-slate-900 dark:text-slate-100">
              <Link to={`/jobs/${job1.slug}`} className="hover:underline">
                {job1.title}
              </Link>
            </h3>
            <div className="my-4">
              <CircularScore score={job1.score} label={job1.label} size="md" />
            </div>
            <Link
              to={`/jobs/${job1.slug}`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-teal-800 dark:text-teal-400 hover:underline"
            >
              Read full dossier <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Header & Gauge 2 */}
          <div className="p-6 text-center bg-slate-50/50 dark:bg-slate-800/30">
            <div className="text-xs text-amber-800 dark:text-amber-400 font-mono uppercase font-semibold mb-1">
              {job2.sectorName}
            </div>
            <h3 className="text-xl font-serif-heading font-bold text-slate-900 dark:text-slate-100">
              <Link to={`/jobs/${job2.slug}`} className="hover:underline">
                {job2.title}
              </Link>
            </h3>
            <div className="my-4">
              <CircularScore score={job2.score} label={job2.label} size="md" />
            </div>
            <Link
              to={`/jobs/${job2.slug}`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 dark:text-amber-400 hover:underline"
            >
              Read full dossier <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Comparison Attributes */}
        <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
          {/* Timeline */}
          <div className="grid grid-cols-2 divide-x divide-slate-200 dark:divide-slate-800 p-4">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Estimated Impact Window</span>
              <strong className="text-sm font-semibold font-mono text-slate-800 dark:text-slate-200">{job1.timeline}</strong>
            </div>
            <div className="pl-4">
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Estimated Impact Window</span>
              <strong className="text-sm font-semibold font-mono text-slate-800 dark:text-slate-200">{job2.timeline}</strong>
            </div>
          </div>

          {/* Confidence */}
          <div className="grid grid-cols-2 divide-x divide-slate-200 dark:divide-slate-800 p-4">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Estimation Confidence</span>
              <span className="text-slate-700 dark:text-slate-300 font-medium">{job1.confidence}</span>
            </div>
            <div className="pl-4">
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Estimation Confidence</span>
              <span className="text-slate-700 dark:text-slate-300 font-medium">{job2.confidence}</span>
            </div>
          </div>

          {/* Salary in INR */}
          <div className="grid grid-cols-2 divide-x divide-slate-200 dark:divide-slate-800 p-4">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Indian Salary Scale</span>
              <strong className="font-mono text-slate-800 dark:text-slate-200">{job1.salaryRangeINR}</strong>
            </div>
            <div className="pl-4">
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Indian Salary Scale</span>
              <strong className="font-mono text-slate-800 dark:text-slate-200">{job2.salaryRangeINR}</strong>
            </div>
          </div>

          {/* Hiring Trend */}
          <div className="grid grid-cols-2 divide-x divide-slate-200 dark:divide-slate-800 p-4">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Hiring Trajectory</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{job1.hiringTrend} Demand</span>
            </div>
            <div className="pl-4">
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Hiring Trajectory</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{job2.hiringTrend} Demand</span>
            </div>
          </div>

          {/* Automatable tasks */}
          <div className="grid grid-cols-2 divide-x divide-slate-200 dark:divide-slate-800 p-4">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-mono mb-1.5">What AI Automates First</span>
              <ul className="space-y-1 list-none p-0 text-slate-600 dark:text-slate-300">
                {job1.aiWillDo.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="pl-4">
              <span className="text-slate-400 block text-[10px] uppercase font-mono mb-1.5">What AI Automates First</span>
              <ul className="space-y-1 list-none p-0 text-slate-600 dark:text-slate-300">
                {job2.aiWillDo.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Skills to Learn */}
          <div className="grid grid-cols-2 divide-x divide-slate-200 dark:divide-slate-800 p-4">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-mono mb-1.5">Future-Proof Upskilling</span>
              <ul className="space-y-1 list-none p-0 text-slate-600 dark:text-slate-300">
                {job1.skillsToLearn.map((s, idx) => (
                  <li key={idx}>✓ {s}</li>
                ))}
              </ul>
            </div>
            <div className="pl-4">
              <span className="text-slate-400 block text-[10px] uppercase font-mono mb-1.5">Future-Proof Upskilling</span>
              <ul className="space-y-1 list-none p-0 text-slate-600 dark:text-slate-300">
                {job2.skillsToLearn.map((s, idx) => (
                  <li key={idx}>✓ {s}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <AdSlot position="in-content" />

      <div className="mt-8">
        <DisclaimerBanner />
      </div>
    </div>
  );
};

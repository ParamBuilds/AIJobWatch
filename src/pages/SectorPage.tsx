import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldCheck, 
  AlertTriangle, 
  Sparkles, 
  Layers, 
  ChevronRight,
  TrendingUp,
  Activity
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHelmet } from '../components/SEOHelmet';
import { AdSlot } from '../components/AdSlot';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import { RiskVsTimeChart } from '../components/charts/RiskVsTimeChart';
import { Reveal } from '../components/animations/Reveal';
import { AbstractCardAccent } from '../components/abstract/AbstractCardAccent';
import { AbstractMetricGlyph } from '../components/abstract/AbstractMetricGlyph';
import sectorsData from '../data/sectors.json';
import jobsData from '../data/jobs.json';
import { Sector, Job } from '../types';

export const SectorPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const sectors = sectorsData as Sector[];
  const jobs = jobsData as Job[];

  const sector = sectors.find((s) => s.slug === slug);

  if (!sector) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-serif-heading font-bold text-slate-900 dark:text-slate-100">
          Economic Sector Not Found
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          The requested sector could not be located in our dataset.
        </p>
        <Link to="/#sectors" className="mt-6 inline-block px-5 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg text-xs font-semibold">
          Explore All 11 Sectors
        </Link>
      </div>
    );
  }

  // Jobs in this sector, sorted by risk descending
  const sectorJobs = jobs
    .filter((j) => j.sector === sector.slug)
    .sort((a, b) => b.score - a.score);

  const riskColor =
    sector.overallRisk === 'Very High' ? 'text-rose-700 dark:text-rose-400' :
    sector.overallRisk === 'High' ? 'text-orange-700 dark:text-orange-400' :
    sector.overallRisk === 'Moderate' ? 'text-amber-700 dark:text-amber-400' : 'text-teal-700 dark:text-teal-400';

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 max-w-5xl mx-auto">
      <SEOHelmet
        title={`AI Exposure in India's ${sector.name} Sector – Risk, Jobs & Timeline`}
        description={`Comprehensive analysis of how AI affects ${sector.name} in India. Overall risk: ${sector.overallRisk}. Key jobs at risk, resilient niches, and emerging roles.`}
        canonicalPath={`/sectors/${sector.slug}`}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Sectors', path: '/#sectors' },
          { label: sector.name },
        ]}
      />

      <AdSlot position="header" />

      {/* Main Sector Dossier */}
      <article className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs my-6 overflow-hidden">
        <AbstractCardAccent code={`SEC-DOSSIER // ${sector.slug.toUpperCase()}`} />

        <div className="text-[9px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-2">
          <span>MACRO DOMAIN: {sector.slug.toUpperCase()}</span>
          <span>DISPERSION VECTOR: IN-SECTOR-METRIC</span>
        </div>

        <Reveal>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-teal-800 dark:text-teal-400 uppercase tracking-widest font-bold mb-1">
                <span>Sector Intelligence</span>
                <span aria-hidden="true">·</span>
                <span>India Focus</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif-heading font-bold text-slate-900 dark:text-slate-50">
                {sector.name}
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                {sector.summary}
              </p>
            </div>

            <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 shrink-0 text-center sm:text-right relative">
              <div className="flex items-center justify-center sm:justify-end gap-2 mb-1">
                <AbstractMetricGlyph score={sector.avgScore} label={sector.overallRisk} size={22} />
                <span className="text-[10px] uppercase font-mono text-slate-400 font-semibold">
                  Overall Sector Exposure
                </span>
              </div>
              <span className={`text-2xl sm:text-3xl font-serif-heading font-bold ${riskColor}`}>
                {sector.overallRisk}
              </span>
              <div className="text-xs text-slate-600 dark:text-slate-300 mt-1 font-mono">
                Average Exposure: <strong>{sector.avgScore}/100</strong>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Impact Horizon: <strong>{sector.timeline}</strong>
              </div>
              <div className="text-[11px] text-teal-700 dark:text-teal-400 font-mono mt-1 font-semibold">
                {sector.employmentShareIndia}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Animated Risk vs Time Curve Chart */}
        <RiskVsTimeChart sector={sector} />

        {/* Ranked Jobs in This Sector */}
        <section className="mt-10">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-xl font-serif-heading font-bold text-slate-900 dark:text-slate-100">
                Analyzed Careers in {sector.name} (Ranked by Risk)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Sorted by AI Exposure Score. Click any profile for task-level breakdowns.
              </p>
            </div>
          </div>

          <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-2xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-medium">
                  <th className="py-3 px-4">Career Title</th>
                  <th className="py-3 px-4">Exposure Score</th>
                  <th className="py-3 px-4">Risk Tier</th>
                  <th className="py-3 px-4">Est. Timeline</th>
                  <th className="py-3 px-4">INR Salary Band</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {sectorJobs.map((j) => {
                  const scoreColor =
                    j.score >= 80 ? 'text-rose-600 dark:text-rose-400' :
                    j.score >= 60 ? 'text-orange-600 dark:text-orange-400' :
                    j.score >= 40 ? 'text-amber-600 dark:text-amber-400' : 'text-teal-600 dark:text-teal-400';

                  return (
                    <tr key={j.slug} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-slate-100">
                        <Link to={`/jobs/${j.slug}`} className="hover:underline hover:text-teal-800 dark:hover:text-teal-300">
                          {j.title}
                        </Link>
                      </td>
                      <td className={`py-3.5 px-4 font-serif-heading font-bold text-sm ${scoreColor}`}>
                        {j.score}/100
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 font-medium">
                        {j.label}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 font-mono">
                        {j.timeline}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                        {j.salaryRangeINR}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          to={`/jobs/${j.slug}`}
                          className="inline-flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-teal-800 dark:hover:text-teal-300 font-semibold"
                        >
                          <span>Dossier</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Net New Roles AI Creates in This Sector */}
        <section className="mt-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 dark:text-teal-400 uppercase tracking-wider font-mono mb-2">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>Net Job Creation</span>
          </div>
          <h2 className="text-xl font-serif-heading font-bold text-slate-900 dark:text-slate-100">
            Emerging Roles AI Will Create in {sector.name}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">
            AI does not solely automate labor; it triggers an influx of specialized oversight and validation positions.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sector.emergingRoles.map((role, idx) => (
              <div
                key={idx}
                className="p-4 bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200/60 dark:border-teal-900/60 rounded-xl text-xs"
              >
                <strong className="block text-slate-900 dark:text-slate-100 text-sm font-semibold mb-1">
                  {role}
                </strong>
                <span className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Focusing on model governance, prompt oversight, and domain-specific escalation routing.
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Drivers of Risk & Resilient Niches */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/40 dark:bg-slate-800/20">
            <h3 className="font-serif-heading font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              Primary Risk Drivers in India
            </h3>
            <ul className="mt-3 space-y-2 list-none p-0 text-xs text-slate-600 dark:text-slate-400">
              {sector.riskDrivers.map((rd, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-500">•</span>
                  <span>{rd}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/40 dark:bg-slate-800/20">
            <h3 className="font-serif-heading font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              Most Resilient Niches & Moats
            </h3>
            <ul className="mt-3 space-y-2 list-none p-0 text-xs text-slate-600 dark:text-slate-400">
              {sector.resilientAreas.map((ra, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">✓</span>
                  <span>{ra}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <AdSlot position="in-content" />

        <div className="mt-8">
          <DisclaimerBanner />
        </div>
      </article>
    </div>
  );
};

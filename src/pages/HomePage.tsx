import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ShieldCheck, 
  AlertTriangle, 
  ChevronRight,
  BookOpen,
  Mail,
  Sparkles,
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { HeroDriftingChips } from '../components/home/HeroDriftingChips';
import { AnimatedHeadline } from '../components/home/AnimatedHeadline';
import { HeroSearchBar } from '../components/home/HeroSearchBar';
import { MarqueeTicker } from '../components/home/MarqueeTicker';
import { StatsStrip } from '../components/home/StatsStrip';
import { SectorHeatmap } from '../components/home/SectorHeatmap';
import { Reveal } from '../components/animations/Reveal';
import { StaggerList, StaggerItem } from '../components/animations/StaggerList';
import { AdSlot } from '../components/AdSlot';
import { SEOHelmet } from '../components/SEOHelmet';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import { AbstractBannerPoster } from '../components/abstract/AbstractBannerPoster';
import { AbstractSectionDivider } from '../components/abstract/AbstractSectionDivider';
import { AbstractCardAccent } from '../components/abstract/AbstractCardAccent';
import { AbstractMetricGlyph } from '../components/abstract/AbstractMetricGlyph';
import jobsData from '../data/jobs.json';
import sectorsData from '../data/sectors.json';
import blogData from '../data/blog.json';
import { Job, Sector, BlogPost } from '../types';

export const HomePage: React.FC = () => {
  const [selectedSectorFilter, setSelectedSectorFilter] = useState<string>('all');
  const jobs = jobsData as Job[];
  const sectors = sectorsData as Sector[];
  const blogPosts = blogData as BlogPost[];

  // Top 6 Most At Risk (highest scores)
  const mostAtRisk = [...jobs].sort((a, b) => b.score - a.score).slice(0, 6);

  // Top 6 Safest (lowest scores)
  const safestJobs = [...jobs].sort((a, b) => a.score - b.score).slice(0, 6);

  // Filtered jobs directory
  const filteredJobs = selectedSectorFilter === 'all'
    ? jobs
    : jobs.filter((j) => j.sector === selectedSectorFilter);

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AIJobWatch India',
    url: 'https://aijobwatch.in',
    description: 'Research-grounded AI exposure index estimating task automatability and transition timelines for 40 Indian careers.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://aijobwatch.in/?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <div className="min-h-screen">
      <SEOHelmet
        title="AIJobWatch India – Will AI Take Your Job, and When? (40 Indian Careers Analyzed)"
        description="Honest, research-based AI exposure scores, estimated impact timelines, and practical future-proofing advice for 40 jobs across India."
        canonicalPath="/"
        schemaData={websiteSchema}
      />

      {/* 1. ANIMATED HERO SECTION */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 overflow-hidden bg-hero-mesh hero-grain border-b border-slate-200/60 dark:border-slate-800/60">
        {/* Floating background chips drifting slowly */}
        <HeroDriftingChips />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Subtle Lead Tag */}
          <Reveal delay={0}>
            <div className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-mono font-semibold text-teal-800 dark:text-teal-300 bg-white/70 dark:bg-slate-800/80 border border-teal-200/80 dark:border-teal-700/60 rounded-full mb-6 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
              <span>India AI Exposure Index 2026</span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
              <span>40 Careers Evaluated</span>
            </div>
          </Reveal>

          {/* Animated Headline with Word-by-Word Reveal */}
          <div className="my-4">
            <AnimatedHeadline />
          </div>

          {/* Editorial Subtitle */}
          <Reveal delay={0.25}>
            <p className="mt-4 text-sm sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Clear, research-grounded estimates of how automation affects Indian careers. Find your exposure score, automatable tasks, and high-leverage skills to stay indispensable.
            </p>
          </Reveal>

          {/* Animated Search Box with Rotating Placeholder */}
          <Reveal delay={0.35} className="mt-8 max-w-2xl mx-auto">
            <HeroSearchBar />

            {/* Popular quick-jump career links */}
            <div className="mt-3 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2 flex-wrap">
              <span className="font-medium text-slate-600 dark:text-slate-300">Quick explore:</span>
              <Link to="/jobs/customer-support-executive" className="underline hover:text-teal-800 dark:hover:text-teal-300">BPO Executive</Link>
              <span aria-hidden="true">·</span>
              <Link to="/jobs/junior-frontend-developer" className="underline hover:text-teal-800 dark:hover:text-teal-300">Junior Dev</Link>
              <span aria-hidden="true">·</span>
              <Link to="/jobs/bank-clerk" className="underline hover:text-teal-800 dark:hover:text-teal-300">Bank Clerk</Link>
              <span aria-hidden="true">·</span>
              <Link to="/jobs/staff-nurse" className="underline hover:text-teal-800 dark:hover:text-teal-300">Staff Nurse</Link>
              <span aria-hidden="true">·</span>
              <Link to="/jobs/content-writer" className="underline hover:text-teal-800 dark:hover:text-teal-300">Content Writer</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. INFINITE MARQUEE TICKER (Below Hero) */}
      <MarqueeTicker />

      {/* Header Ad Slot (Reserved) */}
      <AdSlot position="header" />

      {/* 3. COUNT-UP STATISTICS STRIP */}
      <StatsStrip />

      <AbstractSectionDivider code="SEC-01 // RISK DYNAMICS" label="Top Dispersion Quadrants" />

      {/* 4. SPLIT SHOWCASE: MOST AT RISK VS SAFEST CAREERS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 my-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Most At Risk Card */}
          <Reveal>
            <div className="relative h-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl p-6 shadow-xs flex flex-col justify-between overflow-hidden">
              <AbstractCardAccent code="ID // AT-RISK" />
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                    <h2 className="text-xl font-serif-heading font-bold text-slate-900 dark:text-slate-100">
                      Most at Risk of Task Automation
                    </h2>
                  </div>
                  <span className="text-[10px] font-mono uppercase font-bold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded">
                    Top 6 Exposed
                  </span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 my-3">
                  Roles characterized by repetitive digital manipulation, rule-based triage, and standardized text or code.
                </p>

                <StaggerList staggerDelay={0.06} className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {mostAtRisk.map((job) => (
                    <StaggerItem key={job.slug}>
                      <Link
                        to={`/jobs/${job.slug}`}
                        className="py-3 flex items-center justify-between group hover:bg-slate-50 dark:hover:bg-slate-800/40 -mx-2 px-2 rounded-lg transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <AbstractMetricGlyph score={job.score} label={job.label} size={28} />
                          <div>
                            <div className="font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-rose-700 dark:group-hover:text-rose-400 transition-colors">
                              {job.title}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
                              <span>{job.sectorName}</span>
                              <span aria-hidden="true">·</span>
                              <span>Timeline: {job.timeline}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <span className="font-serif-heading font-bold text-base text-rose-600 dark:text-rose-400">
                              {job.score}/100
                            </span>
                            <div className="text-[10px] text-slate-400 uppercase font-mono">
                              {job.label}
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </Link>
                    </StaggerItem>
                  ))}
                </StaggerList>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-right">
                <a href="#all-jobs" className="text-slate-700 dark:text-slate-300 hover:text-rose-700 underline font-medium">
                  View all high-exposure roles →
                </a>
              </div>
            </div>
          </Reveal>

          {/* Safest Careers Card */}
          <Reveal delay={0.15}>
            <div className="relative h-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl p-6 shadow-xs flex flex-col justify-between overflow-hidden">
              <AbstractCardAccent code="ID // RESILIENT" />
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    <h2 className="text-xl font-serif-heading font-bold text-slate-900 dark:text-slate-100">
                      Safest & Most Resilient Careers
                    </h2>
                  </div>
                  <span className="text-[10px] font-mono uppercase font-bold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded">
                    Top 6 Protected
                  </span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 my-3">
                  Careers protected by tactile motor dexterity, human bedside empathy, statutory legal liability, and community trust.
                </p>

                <StaggerList staggerDelay={0.06} className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {safestJobs.map((job) => (
                    <StaggerItem key={job.slug}>
                      <Link
                        to={`/jobs/${job.slug}`}
                        className="py-3 flex items-center justify-between group hover:bg-slate-50 dark:hover:bg-slate-800/40 -mx-2 px-2 rounded-lg transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <AbstractMetricGlyph score={job.score} label={job.label} size={28} />
                          <div>
                            <div className="font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                              {job.title}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
                              <span>{job.sectorName}</span>
                              <span aria-hidden="true">·</span>
                              <span>Timeline: {job.timeline}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <span className="font-serif-heading font-bold text-base text-teal-600 dark:text-teal-400">
                              {job.score}/100
                            </span>
                            <div className="text-[10px] text-slate-400 uppercase font-mono">
                              {job.label}
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </Link>
                    </StaggerItem>
                  ))}
                </StaggerList>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-right">
                <a href="#all-jobs" className="text-slate-700 dark:text-slate-300 hover:text-teal-700 underline font-medium">
                  View all resilient roles →
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <AbstractSectionDivider code="SEC-02 // SECTOR DYNAMICS" label="11 Economic Clusters" />

      {/* 5. SECTOR HEATMAP GRID */}
      <SectorHeatmap />

      {/* 5.5 FEATURED ABSTRACT BANNER POSTER */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 my-16">
        <Reveal>
          <AbstractBannerPoster />
        </Reveal>
      </div>

      <AbstractSectionDivider code="SEC-03 // OCCUPATIONAL REGISTRY" label="Full 40-Job Indian Task Directory" />

      {/* 6. COMPLETE 40-JOB DIRECTORY WITH INTERACTIVE FILTER */}
      <section id="all-jobs" className="max-w-6xl mx-auto px-4 sm:px-6 my-16">
        <Reveal>
          <div className="border-t border-slate-200 dark:border-slate-800 pt-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-serif-heading font-bold text-slate-900 dark:text-slate-50">
                  Complete Indian Careers Directory ({jobs.length} Profiles)
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Filter by sector to review task breakdowns, Indian salary scales, and future-proof skills.
                </p>
              </div>

              {/* Interactive Sector Tabs with Spring Animation */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-mono">
                  {[
                    { slug: 'all', label: 'All (40)' },
                    { slug: 'it-software', label: 'IT' },
                    { slug: 'bpo-customer-support', label: 'BPO' },
                    { slug: 'banking-finance', label: 'BFSI' },
                    { slug: 'healthcare', label: 'Health' },
                  ].map((tab) => (
                    <button
                      key={tab.slug}
                      onClick={() => setSelectedSectorFilter(tab.slug)}
                      className={`relative px-2.5 py-1 rounded-md transition-colors ${
                        selectedSectorFilter === tab.slug
                          ? 'text-teal-900 dark:text-teal-200 font-semibold'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      {selectedSectorFilter === tab.slug && (
                        <motion.div
                          layoutId="dirFilterActive"
                          className="absolute inset-0 bg-white dark:bg-slate-900 rounded-md shadow-xs"
                          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* More Sectors Dropdown */}
                <select
                  id="sector-filter-dropdown"
                  value={selectedSectorFilter}
                  onChange={(e) => setSelectedSectorFilter(e.target.value)}
                  aria-label="More Sectors"
                  className="text-xs border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-600 font-mono"
                >
                  <option value="all">More Sectors...</option>
                  {sectors.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="relative border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-xs">
              <AbstractCardAccent code="REF // IN-JOBS-40" />
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-medium">
                      <th className="py-3 px-4">Career Title</th>
                      <th className="py-3 px-4">Sector</th>
                      <th className="py-3 px-4">AI Score</th>
                      <th className="py-3 px-4">Exposure Tier</th>
                      <th className="py-3 px-4">Est. Timeline</th>
                      <th className="py-3 px-4">INR Salary Range</th>
                      <th className="py-3 px-4 text-right">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                    {filteredJobs.map((job) => {
                      const scoreColor =
                        job.score >= 80 ? 'text-rose-600 dark:text-rose-400' :
                        job.score >= 60 ? 'text-orange-600 dark:text-orange-400' :
                        job.score >= 40 ? 'text-amber-600 dark:text-amber-400' : 'text-teal-600 dark:text-teal-400';

                      return (
                        <tr
                          key={job.slug}
                          className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                        >
                          <td className="py-3 px-4 font-semibold text-slate-900 dark:text-slate-100">
                            <div className="flex items-center gap-2">
                              <AbstractMetricGlyph score={job.score} label={job.label} size={22} />
                              <Link to={`/jobs/${job.slug}`} className="hover:underline hover:text-teal-800 dark:hover:text-teal-300">
                                {job.title}
                              </Link>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                            <Link to={`/sectors/${job.sector}`} className="hover:underline">
                              {job.sectorName}
                            </Link>
                          </td>
                          <td className={`py-3 px-4 font-serif-heading font-bold text-sm ${scoreColor}`}>
                            {job.score}/100
                          </td>
                          <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                            {job.label}
                          </td>
                          <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                            {job.timeline}
                          </td>
                          <td className="py-3 px-4 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                            {job.salaryRangeINR}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Link
                              to={`/jobs/${job.slug}`}
                              className="inline-flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-teal-800 dark:hover:text-teal-300 font-medium"
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
            </div>
          </div>
        </Reveal>
      </section>

      {/* In-Content Ad Slot */}
      <AdSlot position="in-content" />

      {/* 7. METHODOLOGY TEASER SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 my-16">
        <Reveal>
          <div className="border border-slate-200 dark:border-slate-800 bg-[#F4F1EA] dark:bg-slate-900/70 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs text-teal-800 dark:text-teal-400 uppercase tracking-widest font-mono font-bold">
              <Compass className="w-4 h-4" />
              <span>Scientific Framework</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-slate-900 dark:text-slate-50 mt-2">
              How we estimate AI exposure scores
            </h2>

            <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              We reject sensationalized headlines. Our model decomposes each profession into specific work activities, adjusted for Indian labor prices and regulatory buffers:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700/80 shadow-2xs">
                <strong className="block text-slate-900 dark:text-slate-100 font-semibold mb-1">
                  1. Task Automatability (50%)
                </strong>
                Hours spent on routine cognitive vs physical tasks solvable by modern multimodal models.
              </div>

              <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700/80 shadow-2xs">
                <strong className="block text-slate-900 dark:text-slate-100 font-semibold mb-1">
                  2. India Adoption Velocity (25%)
                </strong>
                Substituted capital costs versus local wage parity and hardware deployment economics.
              </div>

              <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700/80 shadow-2xs">
                <strong className="block text-slate-900 dark:text-slate-100 font-semibold mb-1">
                  3. Trust & Legal Moats (25%)
                </strong>
                Statutory accountability (e.g. Bar Council, RBI, Medical Council) and informal community trust.
              </div>
            </div>

            <div className="flex items-center gap-4 flex-wrap pt-2">
              <Link
                to="/methodology"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium text-xs rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
              >
                <span>Read Full Methodology & Sources</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                to="/compare"
                className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 underline font-medium"
              >
                Compare any two careers side-by-side
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 8. LATEST RESEARCH DISPATCHES (From Blog) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 my-16">
        <Reveal>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-teal-800 dark:text-teal-400 font-bold mb-1">
                Labor Intelligence
              </div>
              <h2 className="text-2xl font-serif-heading font-bold text-slate-900 dark:text-slate-50">
                Latest Research Dispatches
              </h2>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-teal-800 dark:hover:text-teal-400"
            >
              <span>All essays</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.slice(0, 2).map((post) => (
              <article
                key={post.slug}
                className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-400 dark:hover:border-slate-600 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2 font-mono">
                    <span>{post.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-lg font-serif-heading font-bold text-slate-900 dark:text-slate-100 hover:text-teal-800 dark:hover:text-teal-300">
                    <Link to={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">By {post.author}</span>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 font-semibold text-teal-800 dark:text-teal-400 hover:underline"
                  >
                    <span>Read essay</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Prominent Disclaimer Banner */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 my-10">
        <DisclaimerBanner />
      </div>
    </div>
  );
};

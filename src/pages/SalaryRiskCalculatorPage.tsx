import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  ShieldAlert, 
  ShieldCheck, 
  IndianRupee, 
  Calendar, 
  MapPin, 
  Briefcase, 
  Sparkles, 
  Download, 
  Copy, 
  Check, 
  Clock, 
  Percent, 
  PiggyBank, 
  ArrowRight,
  Info
} from 'lucide-react';
import { motion } from 'framer-motion';
import jobsData from '../data/jobs.json';
import { Job } from '../types';
import { SEOHelmet } from '../components/SEOHelmet';

export const SalaryRiskCalculatorPage: React.FC = () => {
  const jobs = jobsData as Job[];

  // User input states
  const [selectedSlug, setSelectedSlug] = useState<string>('junior-frontend-developer');
  const [annualCTC, setAnnualCTC] = useState<number>(6.5); // ₹ LPA
  const [experienceYears, setExperienceYears] = useState<number>(3);
  const [cityTier, setCityTier] = useState<'tier1' | 'tier2' | 'tier3'>('tier1');
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(35000); // INR / month
  const [currentBufferMonths, setCurrentBufferMonths] = useState<number>(4); // months of savings
  const [copied, setCopied] = useState<boolean>(false);

  // Selected job entity
  const currentJob = useMemo(() => {
    return jobs.find((j) => j.slug === selectedSlug) || jobs[0];
  }, [jobs, selectedSlug]);

  // Derived financial & risk metrics
  const monthlyInHand = useMemo(() => {
    // Approximate in-hand post-tax & PF for Indian salary brackets
    const grossMonthly = (annualCTC * 100000) / 12;
    if (annualCTC <= 7.0) return Math.round(grossMonthly * 0.94); // New Tax Regime zero/low tax
    if (annualCTC <= 15.0) return Math.round(grossMonthly * 0.88);
    return Math.round(grossMonthly * 0.78);
  }, [annualCTC]);

  // AI Vulnerability Index (0 to 100)
  const vulnerabilityScore = currentJob.score;

  // AI Vulnerability Horizon in Years
  const horizonYears = useMemo(() => {
    if (vulnerabilityScore >= 85) return '1.0 – 2.0 Years (Immediate Disruption)';
    if (vulnerabilityScore >= 70) return '2.0 – 3.5 Years (High Exposure)';
    if (vulnerabilityScore >= 50) return '3.5 – 5.0 Years (Gradual Transformation)';
    return '5.0+ Years (Resilient & Augmented)';
  }, [vulnerabilityScore]);

  // Recommended emergency runway based on automation risk
  const recommendedBufferMonths = useMemo(() => {
    if (vulnerabilityScore >= 80) return 12; // 12 months recommended
    if (vulnerabilityScore >= 60) return 9;
    if (vulnerabilityScore >= 40) return 6;
    return 6;
  }, [vulnerabilityScore]);

  const bufferGap = recommendedBufferMonths - currentBufferMonths;

  // 5-Year Financial Trajectory Simulation:
  // Scenario A (Status Quo in automating role): ~2-3% nominal growth, possible wage compression
  // Scenario B (Upskilled & AI-Augmented): ~14-18% growth through transitions & leverage
  const projection = useMemo(() => {
    const years = [1, 2, 3, 4, 5];
    let cumA = 0;
    let cumB = 0;
    const details = [];

    let currentSalaryA = annualCTC;
    let currentSalaryB = annualCTC;

    // Disruption discount on status quo growth
    const growthRateA = vulnerabilityScore > 75 ? 0.02 : vulnerabilityScore > 50 ? 0.04 : 0.07;
    const growthRateB = 0.16; // Standard post-upskilling AI-augmented growth rate

    for (const yr of years) {
      currentSalaryA = currentSalaryA * (1 + growthRateA);
      // In year 2, transition kick adds boost
      if (yr === 2) {
        currentSalaryB = currentSalaryB * (1 + growthRateB + 0.25);
      } else {
        currentSalaryB = currentSalaryB * (1 + growthRateB);
      }

      cumA += currentSalaryA;
      cumB += currentSalaryB;

      details.push({
        year: `Year ${yr}`,
        salaryA: parseFloat(currentSalaryA.toFixed(2)),
        salaryB: parseFloat(currentSalaryB.toFixed(2)),
        diff: parseFloat((currentSalaryB - currentSalaryA).toFixed(2))
      });
    }

    const totalDeltaLakhs = parseFloat((cumB - cumA).toFixed(1));

    return {
      details,
      finalSalaryA: parseFloat(currentSalaryA.toFixed(1)),
      finalSalaryB: parseFloat(currentSalaryB.toFixed(1)),
      totalDeltaLakhs,
    };
  }, [annualCTC, vulnerabilityScore]);

  // Monthly suggested upskilling budget (approx 5% of monthly salary)
  const suggestedUpskillingBudget = Math.round((monthlyInHand * 0.05) / 100) * 100;

  const copySummary = () => {
    const text = `AIJobWatch India — Career Financial Vulnerability Report
Role: ${currentJob.title} (${currentJob.sectorName})
Current CTC: ₹${annualCTC} LPA (Approx ₹${monthlyInHand.toLocaleString('en-IN')}/month in-hand)
AI Exposure Risk: ${vulnerabilityScore}/100 (${currentJob.label})
Estimated Disruption Horizon: ${horizonYears}

Financial Projection (5 Years):
- Status Quo (Routine): Projected Year 5 CTC = ₹${projection.finalSalaryA} LPA
- AI-Augmented Transition: Projected Year 5 CTC = ₹${projection.finalSalaryB} LPA
- Cumulative 5-Year Upskilling Surplus: ₹${projection.totalDeltaLakhs} Lakhs

Emergency Runway:
- Current: ${currentBufferMonths} months | Recommended: ${recommendedBufferMonths} months

Generated via AIJobWatch India (https://aijobwatch.in/salary-calculator)`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] dark:bg-[#0C111C] text-[#171717] dark:text-[#F3F4F6] pb-20 transition-colors duration-200">
      <SEOHelmet
        title="India AI Salary & Automation Financial Impact Calculator | AIJobWatch"
        description="Calculate the financial risk of AI automation on your Indian salary. Simulate 5-year CTC projections, emergency savings runway requirements, and upskilling ROI in Lakhs."
        canonicalPath="/salary-calculator"
      />

      {/* Header Banner */}
      <section className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm pt-8 pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-teal-700 dark:text-teal-400 mb-3">
            <span className="px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-950/60 border border-teal-200/60 dark:border-teal-800/60 font-semibold uppercase tracking-wider">
              Financial Risk & CTC Engine
            </span>
            <span>•</span>
            <span>5-Year Cumulative Delta</span>
            <span>•</span>
            <span>Emergency Runway Analysis</span>
          </div>

          <h1 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-4">
            India AI Salary & Automation Impact Calculator
          </h1>
          <p className="max-w-3xl text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Quantify how artificial intelligence automation affects your Indian compensation, job longevity, and wealth accumulation over the next 5 years. Adjust sliders below to model your financial resilience and upskilling return on investment.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls & Inputs (Left 5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="font-serif-heading text-lg font-bold text-slate-900 dark:text-slate-100 mb-5 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                Your Professional Profile
              </h2>

              <div className="space-y-5">
                {/* 1. Career Role */}
                <div>
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                    Current Occupation (40 Indian Roles)
                  </label>
                  <select
                    value={selectedSlug}
                    onChange={(e) => setSelectedSlug(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-medium focus:ring-2 focus:ring-teal-600 focus:outline-none"
                  >
                    {jobs.map((job) => (
                      <option key={job.slug} value={job.slug}>
                        {job.title} ({job.score}% Risk)
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Current Annual CTC Slider */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Annual CTC (Cost to Company)
                    </label>
                    <span className="text-sm font-bold font-mono text-teal-700 dark:text-teal-300">
                      ₹{annualCTC.toFixed(1)} Lakhs / year
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="50"
                    step="0.5"
                    value={annualCTC}
                    onChange={(e) => setAnnualCTC(parseFloat(e.target.value))}
                    className="w-full accent-teal-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1">
                    <span>₹2 LPA</span>
                    <span>Approx ₹{monthlyInHand.toLocaleString('en-IN')}/mo in-hand</span>
                    <span>₹50 LPA</span>
                  </div>
                </div>

                {/* 3. Metro Tier */}
                <div>
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                    Location Tier
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'tier1', label: 'Tier 1 Metro', desc: 'BLR / MUM / NCR / HYD' },
                      { id: 'tier2', label: 'Tier 2 City', desc: 'PUN / KOCHI / JAI / CHD' },
                      { id: 'tier3', label: 'Tier 3 / Remote', desc: 'Towns & Remote WFH' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setCityTier(t.id as any)}
                        className={`p-2 rounded-lg text-left border transition-all ${
                          cityTier === t.id
                            ? 'border-teal-600 bg-teal-50 dark:bg-teal-950/60 text-slate-900 dark:text-slate-100 font-bold'
                            : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <span className="text-xs block">{t.label}</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5 line-clamp-1">{t.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Experience Years Slider */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Industry Experience
                    </label>
                    <span className="text-sm font-bold font-mono text-slate-800 dark:text-slate-200">
                      {experienceYears} Years
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="1"
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(parseInt(e.target.value))}
                    className="w-full accent-teal-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1">
                    <span>Fresher (0)</span>
                    <span>Mid-Career (7-10y)</span>
                    <span>Senior (20y)</span>
                  </div>
                </div>

                {/* 5. Monthly Living Expenses */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Monthly Expenses (Rent, EMI, Food)
                    </label>
                    <span className="text-sm font-bold font-mono text-slate-800 dark:text-slate-200">
                      ₹{monthlyExpenses.toLocaleString('en-IN')}/mo
                    </span>
                  </div>
                  <input
                    type="range"
                    min="15000"
                    max="200000"
                    step="5000"
                    value={monthlyExpenses}
                    onChange={(e) => setMonthlyExpenses(parseInt(e.target.value))}
                    className="w-full accent-teal-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1">
                    <span>₹15,000</span>
                    <span>₹1,00,000</span>
                    <span>₹2,00,000</span>
                  </div>
                </div>

                {/* 6. Current Emergency Buffer Months */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Liquid Savings Runway
                    </label>
                    <span className="text-sm font-bold font-mono text-slate-800 dark:text-slate-200">
                      {currentBufferMonths} Months
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="18"
                    step="1"
                    value={currentBufferMonths}
                    onChange={(e) => setCurrentBufferMonths(parseInt(e.target.value))}
                    className="w-full accent-teal-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1">
                    <span>0 mo (At Risk)</span>
                    <span>6 mo (Standard)</span>
                    <span>18 mo (Fortress)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Link to Detailed Job Breakdown */}
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block">Read task-by-task audit</span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{currentJob.title}</span>
              </div>
              <Link
                to={`/jobs/${currentJob.slug}`}
                className="text-xs font-semibold text-teal-700 dark:text-teal-400 hover:underline flex items-center gap-1"
              >
                Inspect Tasks →
              </Link>
            </div>
          </div>

          {/* Results & Projections Cockpit (Right 7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Risk & Horizon Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200/80 dark:border-slate-800/80">
                <div>
                  <span className="text-xs font-mono uppercase font-bold text-slate-500 dark:text-slate-400 block mb-1">
                    AI Automation Vulnerability Diagnostic
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif-heading text-slate-900 dark:text-slate-100">
                    {currentJob.title}
                  </h3>
                </div>

                {/* Score Pill */}
                <div className={`px-4 py-2 rounded-xl text-center border shrink-0 ${
                  vulnerabilityScore >= 75
                    ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300'
                    : vulnerabilityScore >= 45
                    ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-900 text-amber-700 dark:text-amber-300'
                    : 'bg-teal-50 dark:bg-teal-950/60 border-teal-200 dark:border-teal-900 text-teal-700 dark:text-teal-300'
                }`}>
                  <span className="text-[10px] font-mono uppercase block font-semibold">Exposure Score</span>
                  <span className="text-2xl font-bold font-mono">{vulnerabilityScore}/100</span>
                  <span className="text-[11px] font-medium block">({currentJob.label} Risk)</span>
                </div>
              </div>

              {/* Disruption Horizon Banner */}
              <div className="mt-4 p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 flex items-start gap-3">
                <Clock className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono uppercase font-bold text-slate-600 dark:text-slate-300 block">
                    Estimated Disruption Horizon: <strong className="text-slate-900 dark:text-white">{horizonYears}</strong>
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                    {currentJob.indiaNote}
                  </p>
                </div>
              </div>
            </div>

            {/* 5-Year Financial Trajectory & Cumulative Delta */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-xl p-6 border border-slate-800 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold block mb-1">
                    5-Year CTC Simulation
                  </span>
                  <h4 className="text-xl font-bold font-serif-heading text-white">
                    Status Quo vs. AI-Augmented Transition
                  </h4>
                </div>

                <div className="text-right sm:shrink-0 bg-teal-950/80 border border-teal-700/80 p-3 rounded-lg">
                  <span className="text-[10px] font-mono uppercase text-teal-300 block">5-Year Upskilling Surplus</span>
                  <span className="text-2xl font-bold font-mono text-emerald-400">+₹{projection.totalDeltaLakhs} Lakhs</span>
                </div>
              </div>

              {/* Table / Graph comparison */}
              <div className="mt-5 space-y-3">
                {projection.details.map((row) => (
                  <div key={row.year} className="p-3 rounded-lg bg-slate-800/70 border border-slate-700/70">
                    <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                      <span className="font-bold text-slate-300">{row.year}</span>
                      <span className="text-emerald-400 font-semibold">+₹{row.diff} Lakhs gap</span>
                    </div>

                    {/* Comparative Bars */}
                    <div className="space-y-1.5 text-xs">
                      <div>
                        <div className="flex justify-between text-[11px] text-slate-400 mb-0.5">
                          <span>Status Quo Routine CTC:</span>
                          <span className="font-mono text-slate-300">₹{row.salaryA} LPA</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-700 overflow-hidden">
                          <div 
                            className="h-full bg-slate-400 rounded-full" 
                            style={{ width: `${Math.min(100, (row.salaryA / (row.salaryB * 1.2)) * 100)}%` }} 
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] text-teal-300 mb-0.5">
                          <span className="font-semibold">AI-Augmented Role CTC:</span>
                          <span className="font-mono text-emerald-400 font-bold">₹{row.salaryB} LPA</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-700 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full" 
                            style={{ width: `${Math.min(100, (row.salaryB / (row.salaryB * 1.2)) * 100)}%` }} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
                <span>By Year 5: Routine CTC ~₹{projection.finalSalaryA} LPA vs. Upskilled CTC ~₹{projection.finalSalaryB} LPA</span>
                <button
                  type="button"
                  onClick={copySummary}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-teal-800 hover:bg-teal-700 text-white font-medium transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5 text-teal-300" />}
                  {copied ? 'Copied Summary' : 'Copy Report'}
                </button>
              </div>
            </div>

            {/* Emergency Runway & Upskilling Budget Recommendations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Emergency Buffer Health */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
                <span className="text-xs font-mono uppercase font-bold text-slate-500 dark:text-slate-400 block mb-2 flex items-center gap-1.5">
                  <PiggyBank className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  Runway Buffer Health
                </span>
                
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Current vs Recommended:</span>
                  <span className="font-mono text-sm font-bold">
                    {currentBufferMonths} / {recommendedBufferMonths} mo
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mb-3">
                  <div
                    className={`h-full rounded-full ${
                      currentBufferMonths >= recommendedBufferMonths
                        ? 'bg-emerald-500'
                        : currentBufferMonths >= recommendedBufferMonths / 2
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${Math.min(100, (currentBufferMonths / recommendedBufferMonths) * 100)}%` }}
                  />
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {bufferGap > 0 ? (
                    <span className="text-amber-700 dark:text-amber-400">
                      ⚠️ Deficit of {bufferGap} months (₹{(bufferGap * monthlyExpenses).toLocaleString('en-IN')}). Aim to expand liquidity before job market volatility increases.
                    </span>
                  ) : (
                    <span className="text-emerald-700 dark:text-emerald-400">
                      ✓ Solid financial cushion. Your emergency runway gives you freedom to study & transition comfortably.
                    </span>
                  )}
                </p>
              </div>

              {/* Monthly Upskilling Allocation */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
                <span className="text-xs font-mono uppercase font-bold text-slate-500 dark:text-slate-400 block mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  Upskilling Budget Rule
                </span>

                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Recommended Allocation:</span>
                  <span className="font-mono text-base font-bold text-teal-700 dark:text-teal-300">
                    ₹{suggestedUpskillingBudget.toLocaleString('en-IN')}/mo
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                  Allocating 5% of your in-hand salary enables you to afford:
                </p>

                <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                  <li>• LLM API & cloud subscriptions ($20/mo)</li>
                  <li>• NPTEL / SWAYAM / Coursera exam vouchers</li>
                  <li>• Industry hackathons & tech meetup travel</li>
                </ul>
              </div>
            </div>

            {/* Next Steps CTA */}
            <div className="p-5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h5 className="text-sm font-bold text-teal-900 dark:text-teal-100 mb-1">
                  Ready to construct your upskilling curriculum?
                </h5>
                <p className="text-xs text-teal-700 dark:text-teal-300">
                  Open the 24-week interactive roadmap with verified Indian certifications and tools.
                </p>
              </div>
              <Link
                to="/roadmap"
                className="px-4 py-2.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shrink-0 transition-colors shadow-xs"
              >
                Open 24-Week Roadmap →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Check, 
  Copy, 
  Share2, 
  ShieldCheck, 
  AlertTriangle, 
  Compass, 
  Award,
  Sparkles
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHelmet } from '../components/SEOHelmet';
import { AdSlot } from '../components/AdSlot';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import { AbstractCardAccent } from '../components/abstract/AbstractCardAccent';
import quizData from '../data/quiz.json';

interface Question {
  id: number;
  category: string;
  question: string;
  explanation: string;
  options: {
    label: string;
    points: number;
    note: string;
  }[];
}

export const QuizPage: React.FC = () => {
  const questions = quizData as Question[];
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  const totalQuestions = questions.length;
  const isCompleted = currentStep >= totalQuestions;

  // Handle option select
  const handleSelectOption = (points: number) => {
    const updated = [...answers];
    updated[currentStep] = points;
    setAnswers(updated);

    if (currentStep < totalQuestions - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(totalQuestions); // Show results
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setAnswers([]);
    setCurrentStep(0);
  };

  // Compute final score (0 - 100)
  const totalScore = answers.reduce((acc, curr) => acc + curr, 0);
  // Normalize raw points (max ~130) into 0-100 scale
  const normalizedExposureScore = Math.min(100, Math.max(10, Math.round((totalScore / 130) * 100)));
  const readinessScore = 100 - normalizedExposureScore;

  // Determine tier
  const getTierDetails = (score: number) => {
    if (score >= 75) {
      return {
        label: 'Very High Exposure (Urgent Upskilling Needed)',
        color: 'text-rose-600 dark:text-rose-400',
        badge: 'bg-rose-50 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-900',
        summary: 'Your daily workload consists predominantly of routine digital tasks and standardized data processing with low physical, biological, or statutory defense buffers.',
        skills: [
          'Workflow Automation & Prompt Orchestration (Make, Zapier, Python)',
          'High-Friction Customer Escalation & Empathy Management',
          'Data Architecture & Relational System Modeling'
        ],
        careers: [
          { title: 'Data Analyst & BI Developer', slug: 'data-analyst' },
          { title: 'Full-Stack Software Engineer', slug: 'full-stack-developer' },
          { title: 'Cybersecurity Analyst', slug: 'cybersecurity-analyst' }
        ]
      };
    }
    if (score >= 50) {
      return {
        label: 'Moderate Exposure (Transitioning Role)',
        color: 'text-orange-600 dark:text-orange-400',
        badge: 'bg-orange-50 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300 border-orange-200 dark:border-orange-900',
        summary: 'A significant portion of your routine cognitive activities will be accelerated or replaced by AI co-pilots, but strategic judgment and stakeholder coordination protect your core role.',
        skills: [
          'Enterprise Domain Acumen & Business Unit Economics',
          'Systemic Risk Auditing & AI Red Teaming',
          'Complex B2B Negotiation & Strategic Advisory'
        ],
        careers: [
          { title: 'Chartered Accountant / Financial Consultant', slug: 'chartered-accountant' },
          { title: 'Cloud Solutions Architect', slug: 'cloud-architect' },
          { title: 'Corporate L&D Trainer', slug: 'corporate-trainer' }
        ]
      };
    }
    return {
      label: 'Low Exposure (Strong Human Moat)',
      color: 'text-teal-600 dark:text-teal-400',
      badge: 'bg-teal-50 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300 border-teal-200 dark:border-teal-900',
      summary: 'Your career is fortified by unstructured physical dexterity, biological human empathy, personal statutory liability under Indian law, or primary field intelligence.',
      skills: [
        'Advanced Diagnostic Metrology & Sensor Calibration',
        'Specialized Clinical / Legal Regulatory Frameworks',
        'Cross-Cultural Community Leadership & Field Advocacy'
      ],
      careers: [
        { title: 'Registered Staff Nurse (ICU & Ward)', slug: 'staff-nurse' },
        { title: 'High Court & Courtroom Litigator', slug: 'courtroom-litigator' },
        { title: 'Physiotherapist & Rehabilitation Specialist', slug: 'physiotherapist' }
      ]
    };
  };

  const tier = getTierDetails(normalizedExposureScore);

  const shareableText = `My Personal Career AI Exposure Score on AIJobWatch India is ${normalizedExposureScore}/100 (${tier.label}). Take the 2-minute Career Check quiz here: https://aijobwatch.in/quiz`;

  const handleCopySummary = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareableText);
      }
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2500);
    } catch {
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2500);
    }
  };

  const progressPercent = Math.round(((currentStep + 1) / totalQuestions) * 100);

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 max-w-3xl mx-auto">
      <SEOHelmet
        title="Career Check Quiz: What Is Your Personal AI Exposure Score? – AIJobWatch India"
        description="Take our free 8-question browser-based Career Check quiz to calculate your task automation exposure, AI readiness index, and high-leverage skills."
        canonicalPath="/quiz"
      />

      <Breadcrumbs items={[{ label: 'Career Check Quiz' }]} />

      {!isCompleted ? (
        <article className="my-6">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-teal-800 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Diagnostic · Zero Data Stored</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif-heading font-bold text-slate-900 dark:text-slate-50">
              Career Check: Your AI Exposure Audit
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
              Answer 8 questions about your day-to-day workflow. We compute your automation exposure fully in your browser with zero data tracking.
            </p>
          </div>

          {/* Progress Bar & Counter */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-2">
              <span>Question {currentStep + 1} of {totalQuestions}</span>
              <span className="font-semibold text-teal-700 dark:text-teal-400">{progressPercent}% Completed</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <motion.div
                className="bg-teal-600 h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question Card with Animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs overflow-hidden"
            >
              <AbstractCardAccent code={`QUIZ-STAGE // 0${currentStep + 1}-OF-08`} />
              <div className="text-[10px] uppercase font-mono font-bold tracking-widest text-teal-800 dark:text-teal-400 mb-2">
                Category: {questions[currentStep].category}
              </div>

              <h2 className="text-xl sm:text-2xl font-serif-heading font-bold text-slate-900 dark:text-slate-50 leading-snug">
                {questions[currentStep].question}
              </h2>

              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
                {questions[currentStep].explanation}
              </p>

              {/* Options */}
              <div className="mt-6 space-y-3">
                {questions[currentStep].options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    type="button"
                    onClick={() => handleSelectOption(opt.points)}
                    className="w-full text-left p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-teal-50/60 dark:hover:bg-teal-950/40 hover:border-teal-300 dark:hover:border-teal-700 transition-all text-xs sm:text-sm text-slate-800 dark:text-slate-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                  >
                    <div className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-teal-900 dark:group-hover:text-teal-200">
                      {opt.label}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      {opt.note}
                    </div>
                  </button>
                ))}
              </div>

              {/* Back button */}
              {currentStep > 0 && (
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous Question</span>
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </article>
      ) : (
        /* Results Section */
        <motion.article
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="relative my-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs overflow-hidden"
        >
          <AbstractCardAccent code="ASSESSMENT // SUMMARY-REPORT" />
          <div className="text-center pb-6 border-b border-slate-100 dark:border-slate-800">
            <span className="text-[10px] uppercase font-mono tracking-widest text-teal-800 dark:text-teal-400 font-bold block mb-1">
              Diagnostic Assessment Complete
            </span>
            <h1 className="text-3xl font-serif-heading font-bold text-slate-900 dark:text-slate-50">
              Your Personal AI Exposure Audit
            </h1>

            {/* Score Ring */}
            <div className="my-6 flex flex-col items-center">
              <div className="relative w-36 h-36 rounded-full border-8 border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center bg-slate-50/50 dark:bg-slate-800/30">
                <span className={`font-serif-heading text-4xl font-bold ${tier.color}`}>
                  {normalizedExposureScore}
                </span>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider -mt-1">
                  / 100 Exposure
                </span>
              </div>

              <div className="mt-3">
                <span className={`text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${tier.badge}`}>
                  {tier.label}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
              {tier.summary}
            </p>
          </div>

          {/* Strategic Action Plan: 3 Skills & 3 Careers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            {/* Top 3 Skills to Learn */}
            <div className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-slate-100 mb-3">
                <Compass className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                <span>3 High-Leverage Skills to Acquire</span>
              </div>
              <ul className="space-y-2 list-none p-0 text-xs text-slate-600 dark:text-slate-300">
                {tier.skills.map((skill, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-teal-600 font-bold">✓</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Top 3 Safer Career Pathways */}
            <div className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-slate-100 mb-3">
                <ShieldCheck className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                <span>3 Adjacent Resilient Careers</span>
              </div>
              <div className="space-y-2">
                {tier.careers.map((career, idx) => (
                  <Link
                    key={idx}
                    to={`/jobs/${career.slug}`}
                    className="block text-xs font-semibold text-teal-800 dark:text-teal-400 hover:underline"
                  >
                    {career.title} →
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Share & Actions Toolbar */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Diagnostic</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopySummary}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 transition-colors shadow-2xs"
              >
                {copiedSummary ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSummary ? 'Copied Summary!' : 'Copy Summary'}</span>
              </button>

              <Link
                to="/"
                className="px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                Explore All 40 Profiles
              </Link>
            </div>
          </div>
        </motion.article>
      )}

      <AdSlot position="in-content" />

      <div className="mt-8">
        <DisclaimerBanner />
      </div>
    </div>
  );
};

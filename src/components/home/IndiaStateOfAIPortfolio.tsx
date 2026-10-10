import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  MapPin, 
  GraduationCap, 
  HelpCircle, 
  ChevronDown, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle, 
  Award, 
  Compass, 
  Briefcase,
  Layers,
  Sparkles,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface CityInsight {
  city: string;
  state: string;
  dominantSectors: string[];
  displacementRisk: 'High' | 'Moderate' | 'Resilient';
  riskScore: number;
  aiOpportunityHubs: string;
  salaryTrajectory: string;
  actionAdvice: string;
}

const CITY_INSIGHTS: CityInsight[] = [
  {
    city: 'Bengaluru',
    state: 'Karnataka',
    dominantSectors: ['Software Engineering', 'FinTech', 'AI Research', 'Startups'],
    displacementRisk: 'Moderate',
    riskScore: 58,
    aiOpportunityHubs: 'Whitefield, Outer Ring Road (ORR), Electronic City, Koramangala',
    salaryTrajectory: '+18% to +35% for AI/Agent Engineers; -12% for routine code maintenance',
    actionAdvice: 'Transition from boilerplate frontend/backend into Agentic Architectures, LangGraph, and specialized DSPy pipelines.',
  },
  {
    city: 'Hyderabad',
    state: 'Telangana',
    dominantSectors: ['GCCs (Global Capability Centers)', 'Pharma Tech', 'Cloud DevOps', 'BPO'],
    displacementRisk: 'Moderate',
    riskScore: 62,
    aiOpportunityHubs: 'HITEC City, Financial District, Gachibowli, Madhapur',
    salaryTrajectory: '+25% for GCC Center of Excellence leads; -15% for manual QA and Level-1 ticket routing',
    actionAdvice: 'Master Enterprise AI Compliance, Data Governance, and Multi-Cloud LLM deployment frameworks.',
  },
  {
    city: 'Pune',
    state: 'Maharashtra',
    dominantSectors: ['Automotive Embedded Tech', 'Enterprise IT Services', 'Manufacturing IoT'],
    displacementRisk: 'Resilient',
    riskScore: 48,
    aiOpportunityHubs: 'Hinjawadi Infotech Park, Magarpatta, Kharadi, Chakan Industrial Belt',
    salaryTrajectory: '+20% for Edge AI & Robotics specialists; stable for mechanical CAD designers',
    actionAdvice: 'Blend mechanical/automotive domain knowledge with Edge Computer Vision and real-time inference models.',
  },
  {
    city: 'Gurugram & Noida (NCR)',
    state: 'Delhi NCR',
    dominantSectors: ['BPO / KPO', 'FinTech Underwriting', 'Consulting', 'E-commerce Operations'],
    displacementRisk: 'High',
    riskScore: 76,
    aiOpportunityHubs: 'Cyber City, Golf Course Road, Sector 62 Noida, Udyog Vihar',
    salaryTrajectory: '+30% for AI Product Strategists; -25% for entry-level voice support & content mills',
    actionAdvice: 'Pivot aggressively into Customer Experience Architecture, High-Value Enterprise Escalations, and AI Prompt Engineering.',
  },
  {
    city: 'Mumbai',
    state: 'Maharashtra',
    dominantSectors: ['BFSI', 'Investment Banking', 'Media & Entertainment', 'Legal & Tax Services'],
    displacementRisk: 'Resilient',
    riskScore: 42,
    aiOpportunityHubs: 'BKC (Bandra Kurla Complex), Nariman Point, Lower Parel, Mindspace Malad',
    salaryTrajectory: '+28% for Algorithmic Risk modelers; steady for statutory auditors & investment bankers',
    actionAdvice: 'Combine RBI regulatory compliance acumen with Automated Credit Underwriting and Forensic LLM audit tools.',
  },
  {
    city: 'Chennai',
    state: 'Tamil Nadu',
    dominantSectors: ['SaaS Development', 'Automobile Manufacturing', 'Healthcare Informatics'],
    displacementRisk: 'Resilient',
    riskScore: 46,
    aiOpportunityHubs: 'OMR (Old Mahabalipuram Road), Taramani TIDEL Park, Guindy, Ambattur',
    salaryTrajectory: '+22% for Core SaaS architects & AI Medical imaging; stable for hardware testing',
    actionAdvice: 'Build verticalized AI agents for enterprise SaaS stacks (Zoho/Freshworks ecosystems) and HIPAA-compliant data pipelines.',
  },
];

interface CourseRoadmap {
  title: string;
  provider: string;
  duration: string;
  costINR: string;
  targetProfession: string;
  expectedCTCGain: string;
  badge: string;
  skillsAcquired: string[];
}

const UPSKILLING_COURSES: CourseRoadmap[] = [
  {
    title: 'Executive M.Tech / Diploma in AI & Machine Learning',
    provider: 'IIT Madras Pravartak & IIIT Bangalore',
    duration: '6 to 11 Months (Hybrid/Weekend)',
    costINR: '₹1.5 Lakhs – ₹2.8 Lakhs (EMI available)',
    targetProfession: 'Software Engineers, Systems Analysts, Junior Devs',
    expectedCTCGain: '+40% to +85% CTC uplift',
    badge: 'Premier National Credential',
    skillsAcquired: ['PyTorch & Transformers', 'Distributed Training', 'Fine-tuning & LoRA', 'Vector Databases (Pinecone/Milvus)'],
  },
  {
    title: 'Generative AI & Agentic Workflow Architect',
    provider: 'DeepLearning.AI + Coursera / Google Cloud',
    duration: '10 to 14 Weeks (Self-paced, 8 hrs/wk)',
    costINR: '₹3,500/month (or free audit option)',
    targetProfession: 'Frontend/Backend Engineers, DevOps, Technical Leads',
    expectedCTCGain: '+30% to +50% CTC uplift',
    badge: 'Fast-Track Implementation',
    skillsAcquired: ['LangChain & LangGraph', 'Autonomous Agents', 'RAG Architecture', 'Multi-Modal Reasoning'],
  },
  {
    title: 'Post Graduate Diploma in Advanced Computing (PG-DAC)',
    provider: 'C-DAC (Centre for Development of Advanced Computing)',
    duration: '24 Weeks (Full-time intensive)',
    costINR: '₹90,000 + GST',
    targetProfession: 'Fresh Engineering Graduates, Career Switchers',
    expectedCTCGain: 'Direct Campus Placement in GCCs (₹6L–₹14L CTC)',
    badge: 'Govt. of India Recognized',
    skillsAcquired: ['Full Stack Architecture', 'Microservices', 'Cloud AI Integration', 'Secure Coding Practices'],
  },
  {
    title: 'AI-Driven Financial Modeling & Forensic Analytics',
    provider: 'ICAI Continuing Professional Education (CPE) & NISM',
    duration: '8 Weeks (Self-paced weekend modules)',
    costINR: '₹12,000 – ₹25,000',
    targetProfession: 'Chartered Accountants, Financial Analysts, Bankers',
    expectedCTCGain: '+25% to +45% CTC uplift',
    badge: 'BFSI Leadership Fast-Track',
    skillsAcquired: ['Automated Ledger Recon', 'Predictive Cash Flow Modeling', 'Algorithmic Credit Scoring', 'Regulatory LLM Auditing'],
  },
];

interface FAQItem {
  question: string;
  answer: string;
  tag: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    tag: 'Macro Trends',
    question: 'Will Indian IT service giants (TCS, Infosys, Wipro, HCL) freeze campus hiring because of AI?',
    answer: 'The numbers indicate a qualitative transformation rather than a complete freeze. While entry-level "bench" hiring for manual coding and test maintenance has contracted by ~35% since 2023, campus hiring is aggressively shifting toward full-stack engineers with demonstrated proficiency in Copilot workflows, agent orchestration, and automated pipelines. IT firms bill clients on outcome-based contracts rather than pure billable headcount, meaning developers who produce 3x output using AI command higher starting packages.',
  },
  {
    tag: 'Career Survival',
    question: 'I work in customer support / telecalling in Gurgaon. How urgently do I need to switch?',
    answer: 'Very urgently. GenAI voice bots (like conversational speech agents handling Hindi, Hinglish, Tamil, and English) have reached 92% first-call resolution for tier-1 retail, banking, and telecom queries. Your window to transition is 12 to 18 months. The highest-leverage path is moving up the value chain: from first-touch answering to Escalation Dispute Resolution, Fraud Verification, Customer Success Management for Enterprise B2B, or Voice Agent Training & Quality Auditing.',
  },
  {
    tag: 'Tech Skills',
    question: 'Is learning Python and basic web development useless now that AI writes code?',
    answer: 'No, but the definition of competency has transformed. Knowing raw syntax (writing a for loop or standard API endpoint) is no longer a differentiator because LLMs do it in seconds. However, understanding system architecture, concurrency, database indexing, API security, and debugging hallucinated code is 10x more valuable today. Software engineers have become code reviewers and system architects rather than manual typists.',
  },
  {
    tag: 'GCC Rise',
    question: 'Why are Global Capability Centers (GCCs) expanding so rapidly in India despite global tech layoffs?',
    answer: 'Global enterprises (like Goldman Sachs, Walmart, Wells Fargo, Target, and Boeing) have established over 1,600 GCCs in India employing 1.6+ million professionals. Instead of outsourcing to third parties, they build proprietary AI centers of excellence in Bengaluru and Hyderabad where Indian engineers own core algorithmic IP, risk models, and cloud infrastructure at 30-40% lower cost than California or London.',
  },
  {
    tag: 'Govt / PSU',
    question: 'Are Indian Government, Bank PO, and PSU jobs safe from AI displacement?',
    answer: 'Government and public sector jobs (UPSC, State PSC, RBI Grade B, SBI PO) carry statutory tenure protections and constitutional shields against redundancy. However, the daily nature of the work is changing: internal administrative systems, tax scrutiny (Faceless Assessment by CBDT), and digital public infrastructure (India Stack, DigiLocker, UPI) are fully automated, meaning administrative officers will oversee algorithmic decisions rather than manually processing paper files.',
  },
  {
    tag: 'Financial Strategy',
    question: 'How much emergency fund should an Indian tech or corporate employee maintain in 2026?',
    answer: 'Given lengthening career transition cycles (average lateral hiring time in Indian tech increased from 45 days in 2021 to 90–120 days in 2026), standard 3-month funds are insufficient. Maintain at least 6 to 9 months of non-negotiable living expenses (Rent/EMI + Groceries + School Fees + Insurance Premiums) in liquid funds or flexi-FDs before undertaking aggressive career switches or resignations.',
  },
];

export const IndiaStateOfAIPortfolio: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedCity, setSelectedCity] = useState<CityInsight>(CITY_INSIGHTS[0]);

  return (
    <div className="w-full space-y-16 py-8">
      {/* 1. THE 2026 TECTONIC SHIFTS IN INDIAN LABOR */}
      <section className="relative rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 sm:p-10 shadow-lg overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800/60 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>2026 NATIONAL STRATEGIC DISPATCH</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif-heading font-bold text-slate-900 dark:text-slate-50 tracking-tight">
            The Three Tectonic Shifts Reshaping Indian Careers
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            India represents the global testbed for white-collar AI automation. With over 5.4 million IT/BPO workers and a booming ₹30 Lakh Crore digital economy, the ground beneath traditional career paths has decisively moved.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {/* Shift 1 */}
          <div className="p-6 rounded-2xl border border-rose-200/80 dark:border-rose-900/40 bg-rose-50/30 dark:bg-rose-950/20 relative group hover:border-rose-400 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 flex items-center justify-center font-mono font-bold text-sm mb-4">
              01
            </div>
            <h3 className="text-base font-bold font-serif-heading text-slate-900 dark:text-slate-100">
              The Collapse of the "L1/L2 Ticket" Economy
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              Tier-1 helpdesks, tele-calling banks, and manual regression QA are automated by multimodal agents. Roles built solely around reading standard operating procedures (SOPs) face an 80%+ reduction in billable hours.
            </p>
            <div className="mt-4 pt-3 border-t border-rose-200/60 dark:border-rose-900/40 text-[11px] font-mono text-rose-700 dark:text-rose-400 font-semibold">
              Displacement Velocity: Severe (12–24 Months)
            </div>
          </div>

          {/* Shift 2 */}
          <div className="p-6 rounded-2xl border border-teal-200/80 dark:border-teal-900/40 bg-teal-50/30 dark:bg-teal-950/20 relative group hover:border-teal-400 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300 flex items-center justify-center font-mono font-bold text-sm mb-4">
              02
            </div>
            <h3 className="text-base font-bold font-serif-heading text-slate-900 dark:text-slate-100">
              India as the Global AI Orchestration Engine (GCC 2.0)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              Global enterprises are centralizing core AI engineering in Indian GCCs. The demand for systems architects who can wire LLMs into legacy ERPs, SAP, and core banking has multiplied salaries by 1.6x.
            </p>
            <div className="mt-4 pt-3 border-t border-teal-200/60 dark:border-teal-900/40 text-[11px] font-mono text-teal-700 dark:text-teal-400 font-semibold">
              Expansion Velocity: +45% YoY in GCC Headcount
            </div>
          </div>

          {/* Shift 3 */}
          <div className="p-6 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 bg-amber-50/30 dark:bg-amber-950/20 relative group hover:border-amber-400 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 flex items-center justify-center font-mono font-bold text-sm mb-4">
              03
            </div>
            <h3 className="text-base font-bold font-serif-heading text-slate-900 dark:text-slate-100">
              The "Physical & Legal Moat" Premium
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              Occupations requiring tactile dexterity (surgical nursing, civil construction supervision) or statutory legal responsibility (ICAI certified sign-offs, High Court litigation) enjoy complete immunity.
            </p>
            <div className="mt-4 pt-3 border-t border-amber-200/60 dark:border-amber-900/40 text-[11px] font-mono text-amber-700 dark:text-amber-400 font-semibold">
              Safety Factor: 95% Long-term Resilience
            </div>
          </div>
        </div>
      </section>

      {/* 2. INDIAN TECH METRO RESILIENCE & OPPORTUNITY MATRIX */}
      <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-[#FBF9F5] dark:bg-slate-900/70 p-6 sm:p-10 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-teal-700 dark:text-teal-400 uppercase tracking-widest">
              <MapPin className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>GEOGRAPHIC WORKFORCE TELEMETRY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-slate-900 dark:text-slate-50 mt-1">
              Indian Metro AI Vulnerability & Growth Map
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
              How automation forces salary renegotiations across Bengaluru, Hyderabad, Mumbai, NCR, Pune, and Chennai.
            </p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {CITY_INSIGHTS.map((city) => (
              <button
                key={city.city}
                onClick={() => setSelectedCity(city)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium font-mono whitespace-nowrap transition-all ${
                  selectedCity.city === city.city
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {city.city}
              </button>
            ))}
          </div>
        </div>

        {/* Selected City Detail Card */}
        <motion.div
          key={selectedCity.city}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          <div className="lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-700/80 pb-6 lg:pb-0 lg:pr-8">
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold font-serif-heading text-slate-900 dark:text-slate-50">
                    {selectedCity.city}
                  </h3>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {selectedCity.state} • Prime Industrial Zone
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold ${
                      selectedCity.displacementRisk === 'High'
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300'
                        : selectedCity.displacementRisk === 'Moderate'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                    }`}
                  >
                    {selectedCity.displacementRisk === 'High' ? (
                      <AlertTriangle className="w-3.5 h-3.5" />
                    ) : (
                      <ShieldCheck className="w-3.5 h-3.5" />
                    )}
                    <span>{selectedCity.displacementRisk} Risk ({selectedCity.riskScore}%)</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase">
                  Dominant Employment Sectors
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedCity.dominantSectors.map((sector) => (
                    <span
                      key={sector}
                      className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700/70 text-slate-800 dark:text-slate-200 rounded-lg text-xs font-medium"
                    >
                      {sector}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase">
                  Prime Innovation Hubs
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-300 font-semibold mt-1">
                  {selectedCity.aiOpportunityHubs}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-700">
              <Link
                to="/salary-calculator"
                className="inline-flex items-center gap-2 text-xs font-bold text-teal-700 dark:text-teal-400 hover:underline"
              >
                <span>Run {selectedCity.city} Salary Simulation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/60">
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase flex items-center gap-1.5 font-semibold">
                <TrendingUp className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Salary Trajectory Divergence</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 mt-2 font-medium leading-relaxed">
                {selectedCity.salaryTrajectory}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-teal-50/50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/40">
              <div className="text-xs font-mono text-teal-800 dark:text-teal-400 uppercase flex items-center gap-1.5 font-semibold">
                <Compass className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Strategic Action Playbook for {selectedCity.city} Professionals</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">
                {selectedCity.actionAdvice}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center pt-2">
              <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/40">
                <div className="text-base font-bold font-mono text-slate-900 dark:text-white">
                  6 to 9 Months
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Recommended Emergency Runway
                </div>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/40">
                <div className="text-base font-bold font-mono text-teal-600 dark:text-teal-400">
                  ₹50k – ₹1.2L
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Annual Upskilling Budget
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. HIGH-ROI INDIAN UPSKILLING ROADMAPS & CERTIFICATIONS */}
      <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 sm:p-10 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-teal-700 dark:text-teal-400 uppercase tracking-widest">
              <GraduationCap className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>PRACTICAL CREDENTIAL REGISTRY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-slate-900 dark:text-slate-50 mt-1">
              Top Verified Upskilling Pathways for Indian Professionals
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
              Curated, peer-tested certifications with realistic fee structures and verified CTC uplifts.
            </p>
          </div>

          <Link
            to="/roadmap"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-semibold hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors shrink-0 shadow-xs"
          >
            <span>Open Custom Roadmap Generator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {UPSKILLING_COURSES.map((course) => (
            <div
              key={course.title}
              className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-teal-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono uppercase font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/70 px-2.5 py-0.5 rounded-full border border-teal-200/60 dark:border-teal-800/60">
                    {course.badge}
                  </span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {course.duration}
                  </span>
                </div>

                <h3 className="text-base font-bold font-serif-heading text-slate-900 dark:text-slate-100">
                  {course.title}
                </h3>
                <div className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1">
                  Issued by: <strong className="text-slate-800 dark:text-slate-200">{course.provider}</strong>
                </div>

                <div className="grid grid-cols-2 gap-3 my-4 p-3 bg-white dark:bg-slate-900/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-xs">
                  <div>
                    <span className="text-[11px] text-slate-400 font-mono">Investment (INR):</span>
                    <div className="font-semibold text-slate-900 dark:text-slate-100 mt-0.5">
                      {course.costINR}
                    </div>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 font-mono">Expected Impact:</span>
                    <div className="font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                      {course.expectedCTCGain}
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Target Audience: <span className="text-slate-700 dark:text-slate-300 font-medium">{course.targetProfession}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {course.skillsAcquired.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] px-2 py-0.5 rounded bg-slate-200/70 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                <Link
                  to="/roadmap"
                  className="text-teal-700 dark:text-teal-400 font-bold hover:underline inline-flex items-center gap-1"
                >
                  <span>Build transition milestone checklist</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. EXPANDABLE FAQ MOTION ACCORDION */}
      <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-[#FBF9F5] dark:bg-slate-900/70 p-6 sm:p-10 shadow-lg">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-teal-700 dark:text-teal-400 uppercase tracking-widest">
            <HelpCircle className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>INDIAN WORKFORCE INTELLIGENCE ARCHIVE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif-heading font-bold text-slate-900 dark:text-slate-50 mt-1">
            Frequently Asked Career Survival Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
            Honest, unfiltered answers addressing real concerns about job stability, hiring trends, and financial resilience in India.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={item.question}
                className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono uppercase font-bold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/70 px-2 py-0.5 rounded border border-teal-200/60 dark:border-teal-800/60">
                      {item.tag}
                    </span>
                    <span className="font-serif-heading font-semibold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                      {item.question}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800/60 leading-relaxed bg-slate-50/50 dark:bg-slate-900/40">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

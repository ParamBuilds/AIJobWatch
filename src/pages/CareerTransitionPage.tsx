import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  TrendingUp, 
  Briefcase, 
  BookOpen, 
  ExternalLink, 
  Award, 
  Share2, 
  Copy, 
  Check, 
  Layers, 
  ShieldCheck, 
  AlertTriangle,
  MapPin,
  ChevronRight,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import jobsData from '../data/jobs.json';
import { Job } from '../types';
import { SEOHelmet } from '../components/SEOHelmet';

interface TransitionPathway {
  id: string;
  targetTitle: string;
  targetSector: string;
  riskScore: number;
  transferabilityScore: number;
  avgSalaryIncrease: string;
  summary: string;
  retainedSkills: string[];
  bridgeSkills: string[];
  toolsToMaster: string[];
  certifications: { name: string; provider: string; url?: string }[];
  hubSalaries: { city: string; currentAvg: string; targetAvg: string }[];
  phases: {
    title: string;
    duration: string;
    objective: string;
    tasks: { id: string; label: string; details: string }[];
  }[];
}

export const CareerTransitionPage: React.FC = () => {
  const jobs = jobsData as Job[];

  // Selected source job (defaults to highest risk entry like Data Entry or Junior QA)
  const [selectedSourceSlug, setSelectedSourceSlug] = useState<string>('data-entry-operator');
  const [selectedTargetId, setSelectedTargetId] = useState<string>('ai-workflow-analyst');
  const [copied, setCopied] = useState(false);
  const [filterRisk, setFilterRisk] = useState<'all' | 'high' | 'medium'>('high');

  // Track checked milestones in localStorage
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('aijobwatch_transition_tasks');
        return saved ? JSON.parse(saved) : {};
      } catch {
        return {};
      }
    }
    return {};
  });

  useEffect(() => {
    try {
      localStorage.setItem('aijobwatch_transition_tasks', JSON.stringify(completedTasks));
    } catch {
      // ignore storage error
    }
  }, [completedTasks]);

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const currentJob = useMemo(() => {
    return jobs.find((j) => j.slug === selectedSourceSlug) || jobs[0];
  }, [jobs, selectedSourceSlug]);

  const filteredJobs = useMemo(() => {
    if (filterRisk === 'high') {
      return jobs.filter((j) => j.score >= 70);
    }
    if (filterRisk === 'medium') {
      return jobs.filter((j) => j.score >= 50 && j.score < 70);
    }
    return jobs;
  }, [jobs, filterRisk]);

  // Curated target pathways for Indian professionals
  const pathways: TransitionPathway[] = useMemo(() => {
    return [
      {
        id: 'ai-workflow-analyst',
        targetTitle: 'AI Workflow & Prompt Automation Specialist',
        targetSector: 'IT & Digital Operations',
        riskScore: 24,
        transferabilityScore: 78,
        avgSalaryIncrease: '+140% to +220%',
        summary: 'Architecting human-in-the-loop workflows, evaluating LLM prompt pipelines, and connecting enterprise business apps (Zapier/Make, LangChain, OpenAI APIs) to automate routine operational drag.',
        retainedSkills: [
          'Domain domain process understanding & error intuition',
          'Document parsing & accuracy verification standards',
          'Business rules comprehension and exception logging',
          'English language clarity & precise instruction phrasing'
        ],
        bridgeSkills: [
          'Advanced Prompt Engineering (Few-shot, Chain-of-Thought, DSPy)',
          'No-Code/Low-Code Orchestration (n8n, Make, Flowise)',
          'Basic Python API integration & JSON payload handling',
          'AI output evaluation, hallucination detection & guardrails'
        ],
        toolsToMaster: ['n8n / Make.com', 'Python (Requests, JSON)', 'LangChain / LangSmith', 'Anthropic Claude Console', 'OpenAI Playground'],
        certifications: [
          { name: 'Prompt Engineering for ChatGPT', provider: 'Vanderbilt / Coursera' },
          { name: 'Generative AI Fundamentals', provider: 'Google Cloud Skills Boost India' },
          { name: 'IIT Madras AI & Data Science Foundation', provider: 'NPTEL SWAYAM' }
        ],
        hubSalaries: [
          { city: 'Bengaluru', currentAvg: '₹3.2 - ₹4.5 LPA', targetAvg: '₹8.5 - ₹14.0 LPA' },
          { city: 'Hyderabad', currentAvg: '₹3.0 - ₹4.2 LPA', targetAvg: '₹7.5 - ₹12.5 LPA' },
          { city: 'Pune', currentAvg: '₹2.8 - ₹4.0 LPA', targetAvg: '₹7.0 - ₹11.5 LPA' },
          { city: 'Delhi-NCR', currentAvg: '₹3.0 - ₹4.5 LPA', targetAvg: '₹8.0 - ₹13.0 LPA' },
        ],
        phases: [
          {
            title: 'Phase 1: Foundations & Prompt Architecture',
            duration: 'Weeks 1 – 6 (5-7 hrs/week)',
            objective: 'Master structured prompting, system prompts, context window management, and JSON output formatting.',
            tasks: [
              { id: 'p1-1', label: 'Understand LLM Tokenization & Temperature', details: 'Experiment with temperature, top_p, and token constraints across Gemini, GPT-4o, and Claude.' },
              { id: 'p1-2', label: 'Master Structured Prompt Patterns', details: 'Practice Few-Shot prompting, ReAct frameworks, and forcing schema-compliant JSON outputs.' },
              { id: 'p1-3', label: 'Complete Free Python Crash Course', details: 'Cover lists, dictionaries, string manipulations, and calling REST APIs via Python requests.' },
            ]
          },
          {
            title: 'Phase 2: Workflow Automation & RAG Systems',
            duration: 'Weeks 7 – 15 (8-10 hrs/week)',
            objective: 'Build working pipelines that ingest real Indian business documents (PDFs, invoices, spreadsheets) and generate verified actions.',
            tasks: [
              { id: 'p2-1', label: 'Build Multi-Step Automations in n8n / Make', details: 'Trigger webhooks from Google Sheets, route through AI analysis, and update CRM portals automatically.' },
              { id: 'p2-2', label: 'Build a Local Knowledge Retriever (RAG)', details: 'Create a searchable vector database over 50 Indian company policy PDFs using ChromaDB and LangChain.' },
              { id: 'p2-3', label: 'Implement Error Guardrails & Fallbacks', details: 'Write validation checks where low-confidence AI predictions route to human review.' },
            ]
          },
          {
            title: 'Phase 3: Portfolio, Capstone & Indian Placement',
            duration: 'Weeks 16 – 24 (6-8 hrs/week)',
            objective: 'Publish 2 production-grade GitHub case studies and target hiring managers across Indian IT GCCs and mid-market SaaS firms.',
            tasks: [
              { id: 'p3-1', label: 'Deploy a Live Demo on HuggingFace / Streamlit', details: 'Share a working Indian GST invoice parsing or legal contract analyzer on LinkedIn.' },
              { id: 'p3-2', label: 'Update LinkedIn & Resume with Quantified Impact', details: 'Highlight: "Designed automated AI intake reducing manual clerical turnaround by 78% with 99.4% accuracy."' },
              { id: 'p3-3', label: 'Network in Indian AI Communities', details: 'Join Bangalore AI, HasGeek, and attend local GenAI hackathons in tech hubs.' },
            ]
          }
        ]
      },
      {
        id: 'bi-data-analyst',
        targetTitle: 'Business Intelligence & AI Data Strategist',
        targetSector: 'Analytics & Strategic Finance',
        riskScore: 32,
        transferabilityScore: 72,
        avgSalaryIncrease: '+110% to +180%',
        summary: 'Bridging technical data pipelines with executive business decision-making. Using AI copilots to generate SQL, build interactive Power BI/Tableau cockpits, and communicate growth insights to leaders.',
        retainedSkills: [
          'High familiarity with business metrics, ledgers & transaction data',
          'Eye for numerical discrepancies and transactional hygiene',
          'Domain understanding of Indian business cycles (GST cycles, quarterly filings)',
          'Stakeholder reporting and status presentation'
        ],
        bridgeSkills: [
          'Advanced SQL querying (Window functions, CTEs, indexing)',
          'Power BI / Tableau dashboard design & DAX formulas',
          'Python data science libraries (Pandas, Polars, Matplotlib)',
          'Statistical storytelling & executive presentation'
        ],
        toolsToMaster: ['PostgreSQL / BigQuery', 'Microsoft Power BI', 'Python (Pandas)', 'dbt (data build tool)', 'Tableau'],
        certifications: [
          { name: 'Microsoft Certified: Power BI Data Analyst Associate (PL-300)', provider: 'Microsoft Learn' },
          { name: 'Google Data Analytics Professional Certificate', provider: 'Coursera' },
          { name: 'NPTEL Data Analytics with Python', provider: 'IIT Roorkee / SWAYAM' }
        ],
        hubSalaries: [
          { city: 'Bengaluru', currentAvg: '₹3.5 - ₹5.0 LPA', targetAvg: '₹9.0 - ₹16.0 LPA' },
          { city: 'Mumbai', currentAvg: '₹3.8 - ₹5.2 LPA', targetAvg: '₹9.5 - ₹17.0 LPA' },
          { city: 'Hyderabad', currentAvg: '₹3.2 - ₹4.8 LPA', targetAvg: '₹8.0 - ₹14.0 LPA' },
          { city: 'Chennai', currentAvg: '₹3.0 - ₹4.5 LPA', targetAvg: '₹7.5 - ₹13.0 LPA' },
        ],
        phases: [
          {
            title: 'Phase 1: Relational Data & SQL Mastery',
            duration: 'Weeks 1 – 6 (6 hrs/week)',
            objective: 'Transition from spreadsheets to relational databases, mastering joins, aggregations, and window functions.',
            tasks: [
              { id: 'bi-1', label: 'PostgreSQL Relational Schema Design', details: 'Learn normalization, primary/foreign keys, and data typing.' },
              { id: 'bi-2', label: 'Advanced SQL Query Writing', details: 'Write complex queries utilizing JOINs, GROUP BY, HAVING, and CASE WHEN statements.' },
              { id: 'bi-3', label: 'Complete 50 LeetCode / HackerRank SQL Problems', details: 'Reach intermediate/advanced proficiency in data aggregation challenges.' },
            ]
          },
          {
            title: 'Phase 2: BI Dashboarding & DAX Modeling',
            duration: 'Weeks 7 – 15 (8 hrs/week)',
            objective: 'Build executive dashboards that answer strategic revenue, churn, and operational velocity questions.',
            tasks: [
              { id: 'bi-4', label: 'Build a Power BI Retail Analytics Model', details: 'Model star-schemas and create calculated measures with DAX.' },
              { id: 'bi-5', label: 'Use AI Copilots to Accelerate Data Prep', details: 'Leverage ChatGPT / Gemini to optimize SQL queries and formulate DAX logic.' },
              { id: 'bi-6', label: 'Indian Economic Data Project', details: 'Analyze Reserve Bank of India (RBI) or Ministry of Statistics public datasets.' },
            ]
          },
          {
            title: 'Phase 3: Certification & Executive Portfolios',
            duration: 'Weeks 16 – 24 (6 hrs/week)',
            objective: 'Clear the Microsoft PL-300 certification exam and interview for business analyst positions.',
            tasks: [
              { id: 'bi-7', label: 'Pass Microsoft PL-300 Certification', details: 'Clear official certification recognized by Indian IT firms and consultancies.' },
              { id: 'bi-8', label: 'Build an Interactive NovyPro Portfolio', details: 'Host 3 live clickable Power BI dashboards with business case summaries.' },
              { id: 'bi-9', label: 'Target Analytics Roles at Indian GCCs', details: 'Apply to Global Capability Centers (GCCs) in Bengaluru, Hyderabad, and Pune.' },
            ]
          }
        ]
      },
      {
        id: 'ai-qa-red-team',
        targetTitle: 'AI Quality Auditor & LLM Red-Teamer',
        targetSector: 'Software Engineering & AI Safety',
        riskScore: 28,
        transferabilityScore: 82,
        avgSalaryIncrease: '+130% to +210%',
        summary: 'Transitioning from manual test scripts to adversarial evaluation of generative AI models, assessing output hallucination rates, jailbreak resistance, bias mitigation, and compliance with Indian privacy laws (DPDP Act 2023).',
        retainedSkills: [
          'Methodical edge-case discovery and boundary testing discipline',
          'Bug reproducibility documentation and Jira reporting hygiene',
          'User empathy and anticipating unpredictable human behaviors',
          'Adherence to QA compliance checklists and regression suites'
        ],
        bridgeSkills: [
          'Adversarial Prompting & LLM Jailbreak techniques',
          'Automated AI Evaluation frameworks (Ragas, TruLens, DeepEval)',
          'Indian DPDP Act & Global AI Governance compliance (NIST AI RMF)',
          'Python automated testing (Pytest, Playwright)'
        ],
        toolsToMaster: ['DeepEval / Ragas', 'Weights & Biases', 'Postman / Newman', 'Python (Pytest)', 'Garak (LLM vulnerability scanner)'],
        certifications: [
          { name: 'Certified AI Security Specialist (CAISS)', provider: 'AI Safety Institute / Partner' },
          { name: 'ISTQB Certified Tester - AI Testing Specialty', provider: 'ISTQB India' },
          { name: 'NPTEL Software Testing & AI Validation', provider: 'IIT Kharagpur' }
        ],
        hubSalaries: [
          { city: 'Bengaluru', currentAvg: '₹3.6 - ₹5.5 LPA', targetAvg: '₹9.5 - ₹17.5 LPA' },
          { city: 'Hyderabad', currentAvg: '₹3.2 - ₹5.0 LPA', targetAvg: '₹8.5 - ₹15.0 LPA' },
          { city: 'Pune', currentAvg: '₹3.0 - ₹4.8 LPA', targetAvg: '₹8.0 - ₹14.0 LPA' },
          { city: 'Gurugram', currentAvg: '₹3.5 - ₹5.2 LPA', targetAvg: '₹9.0 - ₹16.0 LPA' },
        ],
        phases: [
          {
            title: 'Phase 1: Generative AI Vulnerabilities & Safety',
            duration: 'Weeks 1 – 6 (6 hrs/week)',
            objective: 'Understand how LLMs fail: hallucinations, prompt injection, data leakage, and toxic outputs.',
            tasks: [
              { id: 'qa-1', label: 'Study OWASP Top 10 for LLM Applications', details: 'Analyze prompt injection, insecure output handling, model theft, and sensitive data disclosure.' },
              { id: 'qa-2', label: 'Practice Manual Red-Teaming', details: 'Test open-source LLMs on HuggingFace to identify bypass techniques and guardrail failures.' },
              { id: 'qa-3', label: 'Study India’s Digital Personal Data Protection (DPDP) Act', details: 'Understand enterprise consent mechanisms and data processing obligations in Indian tech.' },
            ]
          },
          {
            title: 'Phase 2: Automated Eval Frameworks',
            duration: 'Weeks 7 – 15 (8 hrs/week)',
            objective: 'Write automated continuous-evaluation suites for production conversational agents and document parsers.',
            tasks: [
              { id: 'qa-4', label: 'Implement Ragas / DeepEval in Python', details: 'Measure faithfulness, answer relevancy, and context precision on RAG pipelines.' },
              { id: 'qa-5', label: 'Automate CI/CD Eval Pipelines in GitHub Actions', details: 'Prevent model regressions before deployment into customer-facing applications.' },
              { id: 'qa-6', label: 'Benchmarking Multilingual Indic Models', details: 'Test Hindi, Tamil, and Telugu translation fidelity using BLEU/chrF metrics.' },
            ]
          },
          {
            title: 'Phase 3: Certification & Enterprise Placements',
            duration: 'Weeks 16 – 24 (6 hrs/week)',
            objective: 'Position as a specialized AI QA Engineer, commanding premium rates over routine manual testers.',
            tasks: [
              { id: 'qa-7', label: 'Publish an Open Source AI Audit Report', details: 'Audit an existing open-source legal or healthcare chatbot and post findings on GitHub.' },
              { id: 'qa-8', label: 'Target Top Indian IT Giants & GCCs', details: 'Apply for "AI Quality Engineer" or "Model Evaluation Specialist" at TCS, Infosys, and global tech centers.' },
              { id: 'qa-9', label: 'Complete Mock AI Safety Interviews', details: 'Practice articulating trade-offs between model performance and safety guardrails.' },
            ]
          }
        ]
      },
      {
        id: 'cloud-devops-engineer',
        targetTitle: 'Cloud Infrastructure & MLOps Specialist',
        targetSector: 'IT & Cloud Infrastructure',
        riskScore: 21,
        transferabilityScore: 65,
        avgSalaryIncrease: '+150% to +260%',
        summary: 'Deploying scalable AI microservices, orchestrating GPU clusters, securing cloud container pipelines (Docker, Kubernetes), and managing production inference costs.',
        retainedSkills: [
          'Systems architecture curiosity and debugging discipline',
          'Terminal familiarity and log inspection mindset',
          'Understanding of network latency, uptime SLAs, and disaster recovery',
          'Experience with enterprise ticketing and release cycles'
        ],
        bridgeSkills: [
          'Linux systems administration & Bash scripting',
          'Docker containerization & Kubernetes cluster orchestration',
          'Cloud platforms (AWS / Azure / GCP) core networking and IAM',
          'MLOps deployment pipelines (vLLM, Ollama, Triton Inference Server)'
        ],
        toolsToMaster: ['Docker & Kubernetes', 'AWS / Google Cloud', 'Terraform', 'GitHub Actions', 'vLLM / HuggingFace TEI'],
        certifications: [
          { name: 'AWS Certified Solutions Architect – Associate', provider: 'AWS India' },
          { name: 'Certified Kubernetes Administrator (CKA)', provider: 'Linux Foundation' },
          { name: 'Google Associate Cloud Engineer', provider: 'Google Cloud' }
        ],
        hubSalaries: [
          { city: 'Bengaluru', currentAvg: '₹4.0 - ₹6.5 LPA', targetAvg: '₹12.0 - ₹22.0 LPA' },
          { city: 'Hyderabad', currentAvg: '₹3.8 - ₹6.0 LPA', targetAvg: '₹11.0 - ₹20.0 LPA' },
          { city: 'Pune', currentAvg: '₹3.5 - ₹5.5 LPA', targetAvg: '₹10.0 - ₹18.0 LPA' },
          { city: 'Noida / NCR', currentAvg: '₹3.8 - ₹6.0 LPA', targetAvg: '₹11.5 - ₹21.0 LPA' },
        ],
        phases: [
          {
            title: 'Phase 1: Linux, Containers & Cloud Basics',
            duration: 'Weeks 1 – 6 (8 hrs/week)',
            objective: 'Build ironclad comfort in the Linux terminal and containerize applications with Docker.',
            tasks: [
              { id: 'ops-1', label: 'Master Linux Terminal & Bash Automation', details: 'Process management, SSH keys, file permissions, and systemd services.' },
              { id: 'ops-2', label: 'Dockerize Multiple Applications', details: 'Write multi-stage Dockerfiles, optimize image layers, and link services with Docker Compose.' },
              { id: 'ops-3', label: 'Set Up AWS Free Tier Architecture', details: 'Deploy secure VPCs, EC2 instances, S3 buckets, and IAM roles.' },
            ]
          },
          {
            title: 'Phase 2: Kubernetes & CI/CD Pipelines',
            duration: 'Weeks 7 – 15 (10 hrs/week)',
            objective: 'Orchestrate distributed containers and automate production deployments.',
            tasks: [
              { id: 'ops-4', label: 'Kubernetes Cluster Management', details: 'Deploy Pods, Deployments, Services, ConfigMaps, and Ingress controllers.' },
              { id: 'ops-5', label: 'Build GitHub Actions CI/CD', details: 'Automate linting, testing, Docker image building, and cloud deployment on git push.' },
              { id: 'ops-6', label: 'Deploy Local LLM Server with vLLM', details: 'Host Llama-3 or Mistral on a cloud GPU instance with high-throughput API endpoints.' },
            ]
          },
          {
            title: 'Phase 3: Certification & High-Value Placement',
            duration: 'Weeks 16 – 24 (8 hrs/week)',
            objective: 'Clear AWS Solutions Architect or CKA and target top cloud engineering salaries in Indian tech metros.',
            tasks: [
              { id: 'ops-7', label: 'Clear AWS Certified Solutions Architect Exam', details: 'One of the most demanded certifications across Indian tech companies.' },
              { id: 'ops-8', label: 'Build Terraform Infrastructure-as-Code Project', details: 'Provision an entire cloud cluster via code and publish to GitHub.' },
              { id: 'ops-9', label: 'Target Cloud Consultancies & Unicorns', details: 'Apply to top cloud consultancies and enterprise tech employers.' },
            ]
          }
        ]
      }
    ];
  }, []);

  const currentPathway = useMemo(() => {
    return pathways.find((p) => p.id === selectedTargetId) || pathways[0];
  }, [pathways, selectedTargetId]);

  // Total tasks & completed count
  const allPathwayTasks = useMemo(() => {
    return currentPathway.phases.flatMap((phase) => phase.tasks);
  }, [currentPathway]);

  const completedCount = useMemo(() => {
    return allPathwayTasks.filter((t) => completedTasks[t.id]).length;
  }, [allPathwayTasks, completedTasks]);

  const progressPercent = Math.round((completedCount / (allPathwayTasks.length || 1)) * 100);

  const copyRoadmap = () => {
    const text = `AI Career Transition Roadmap: ${currentJob.title} -> ${currentPathway.targetTitle}
Transferability Match: ${currentPathway.transferabilityScore}%
Salary Growth: ${currentPathway.avgSalaryIncrease}
Target Risk Score: ${currentPathway.riskScore}/100 (Safe)

Top Skills to Learn:
${currentPathway.bridgeSkills.map(s => `- ${s}`).join('\n')}

Key Tools:
${currentPathway.toolsToMaster.join(', ')}

Curated on AIJobWatch India (https://aijobwatch.in/roadmap)`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] dark:bg-[#0C111C] text-[#171717] dark:text-[#F3F4F6] pb-20 transition-colors duration-200">
      <SEOHelmet
        title="AI Career Transition & Upskilling Roadmap (India) | AIJobWatch"
        description="Interactive 24-week career bridge simulator for Indian professionals. See skill transferability, Indian city salary jumps, certifications, and week-by-week transition milestones to future-proof your career."
        canonicalPath="/roadmap"
      />

      {/* Header Banner */}
      <section className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm pt-8 pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-teal-700 dark:text-teal-400 mb-3">
            <span className="px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-950/60 border border-teal-200/60 dark:border-teal-800/60 font-semibold uppercase tracking-wider">
              Career Bridge Simulator
            </span>
            <span>•</span>
            <span>24-Week Structured Action Plan</span>
            <span>•</span>
            <span>India Tech Hub CTC Benchmarks</span>
          </div>

          <h1 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-4">
            AI Career Transition & Upskilling Roadmap
          </h1>
          <p className="max-w-3xl text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Don’t wait for automation to compress your salary. Select your current Indian occupation to simulate a tailored, high-resilience transition pathway with verified skill transferability, IIT/SWAYAM certification pathways, and realistic salary growth across Bengaluru, Hyderabad, Pune, and NCR.
          </p>

          {/* Quick Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-slate-200/60 dark:border-slate-800/60">
            <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block">Avg CTC Jump</span>
              <span className="text-lg sm:text-xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">+120% – 240%</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block">Skill Retained</span>
              <span className="text-lg sm:text-xl font-bold text-teal-600 dark:text-teal-400 font-mono">65% – 82%</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block">Time Horizon</span>
              <span className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 font-mono">24 Weeks</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block">Weekly Effort</span>
              <span className="text-lg sm:text-xl font-bold text-amber-600 dark:text-amber-400 font-mono">6 – 8 Hours</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Workspace */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
        {/* Step 1 & 2 Selectors Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-8">
          {/* Left: Source Job Selector */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                Step 1: Your Current Indian Role
              </label>
              
              {/* Filter pills */}
              <div className="flex items-center gap-1 text-[11px] font-mono">
                <button
                  type="button"
                  onClick={() => setFilterRisk('high')}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    filterRisk === 'high' 
                      ? 'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 font-bold border border-rose-300 dark:border-rose-800' 
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  High Risk ({jobs.filter(j => j.score >= 70).length})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterRisk('all')}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    filterRisk === 'all' 
                      ? 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold' 
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  All (40)
                </button>
              </div>
            </div>

            <select
              value={selectedSourceSlug}
              onChange={(e) => setSelectedSourceSlug(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-medium focus:ring-2 focus:ring-teal-600 focus:outline-none transition-colors"
            >
              {filteredJobs.map((job) => (
                <option key={job.slug} value={job.slug}>
                  {job.title} — AI Risk: {job.score}% ({job.label})
                </option>
              ))}
            </select>

            {/* Current Job Snapshot Pill */}
            <div className="mt-4 p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block mb-0.5">
                  Sector: {currentJob.sectorName}
                </span>
                <span className="text-xs text-slate-700 dark:text-slate-300 leading-snug line-clamp-2">
                  {currentJob.summary}
                </span>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block">Risk Score</span>
                <span className={`text-base font-bold font-mono ${
                  currentJob.score >= 70 ? 'text-rose-600 dark:text-rose-400' :
                  currentJob.score >= 40 ? 'text-amber-600 dark:text-amber-400' :
                  'text-teal-600 dark:text-teal-400'
                }`}>
                  {currentJob.score}/100
                </span>
              </div>
            </div>
          </div>

          {/* Right: Target Resilient Destination Selector */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                Step 2: Recommended High-Growth Destination Role
              </label>
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                Low AI Exposure (21-32%)
              </span>
            </div>

            {/* Target Role Selector Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {pathways.map((path) => (
                <button
                  key={path.id}
                  type="button"
                  onClick={() => setSelectedTargetId(path.id)}
                  className={`text-left p-3 rounded-lg border transition-all ${
                    selectedTargetId === path.id
                      ? 'border-teal-600 dark:border-teal-500 bg-teal-50/70 dark:bg-teal-950/40 ring-1 ring-teal-600 dark:ring-teal-500'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-1">
                      {path.targetTitle}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-bold shrink-0">
                      {path.transferabilityScore}% Match
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span>{path.targetSector}</span>
                    <span className="font-mono text-teal-700 dark:text-teal-300 font-medium">{path.avgSalaryIncrease}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Transition Cockpit Header */}
        <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-slate-950 text-white rounded-2xl p-6 sm:p-8 mb-8 shadow-lg border border-teal-800/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-teal-800/60">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-teal-300 mb-2">
                <span>SIMULATED TRANSITION</span>
                <span>•</span>
                <span className="text-emerald-400 font-semibold">{currentPathway.avgSalaryIncrease} Expected CTC Delta</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif-heading text-white flex flex-wrap items-center gap-3">
                <span>{currentJob.title}</span>
                <ArrowRight className="w-5 h-5 text-teal-400 shrink-0" />
                <span className="text-teal-300">{currentPathway.targetTitle}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-2 leading-relaxed">
                {currentPathway.summary}
              </p>
            </div>

            {/* Actions: Copy & Progress */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={copyRoadmap}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-teal-800/80 hover:bg-teal-700 text-white text-xs font-medium border border-teal-700 transition-colors focus:ring-2 focus:ring-teal-400"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-teal-300" />}
                {copied ? 'Copied Roadmap' : 'Copy Plan to Clipboard'}
              </button>
              
              <Link
                to={`/compare/${currentJob.slug}-vs-${currentPathway.id === 'cloud-devops-engineer' ? 'devops-cloud-engineer' : 'data-analyst'}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/20 transition-colors"
              >
                Side-by-Side Compare
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Interactive Progress Bar */}
          <div className="pt-6">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-teal-200">
                Your Roadmap Progress: <strong className="text-white">{completedCount} of {allPathwayTasks.length} milestones complete</strong>
              </span>
              <span className="text-emerald-300 font-bold">{progressPercent}% Achieved</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
              <motion.div
                className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>

        {/* 2-Column Core: Left = Skills Matrix & Salary Deltas, Right = 24-Week Interactive Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Skill Overlap & Hub Salaries */}
          <div className="lg:col-span-5 space-y-6">
            {/* Skill Transferability Box */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif-heading text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  Skill Transferability Matrix
                </h3>
                <span className="text-xs font-mono font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/80 px-2 py-0.5 rounded border border-teal-200 dark:border-teal-800">
                  {currentPathway.transferabilityScore}% Retained
                </span>
              </div>

              {/* Retained Strengths (Your Unfair Advantage) */}
              <div className="mb-5">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5 mb-2.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  What You Already Bring (Retain & Leverage)
                </span>
                <ul className="space-y-2">
                  {currentPathway.retainedSkills.map((skill, i) => (
                    <li key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2 bg-emerald-50/60 dark:bg-emerald-950/30 p-2 rounded border border-emerald-200/50 dark:border-emerald-900/50">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* The Missing AI Bridge (What to Learn) */}
              <div className="mb-5">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400 font-bold flex items-center gap-1.5 mb-2.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  The AI Bridge (New Capabilities to Acquire)
                </span>
                <ul className="space-y-2">
                  {currentPathway.bridgeSkills.map((skill, i) => (
                    <li key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2 bg-amber-50/60 dark:bg-amber-950/30 p-2 rounded border border-amber-200/50 dark:border-amber-900/50">
                      <span className="text-amber-600 dark:text-amber-400 font-bold">→</span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tools to Master */}
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold block mb-2">
                  Priority Tools to Master
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentPathway.toolsToMaster.map((tool, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Indian Tech Hub Salary Trajectory Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
              <h3 className="font-serif-heading text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                Salary Trajectory Across Indian Tech Hubs
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                Real annual compensation brackets (₹ LPA) comparing current median pay vs post-transition AI-augmented roles:
              </p>

              <div className="space-y-2.5">
                {currentPathway.hubSalaries.map((hub) => (
                  <div key={hub.city} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">{hub.city}</span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">Current: {hub.currentAvg}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400 block">{hub.targetAvg}</span>
                      <span className="text-[10px] text-teal-600 dark:text-teal-400 font-mono font-semibold">+Target CTC</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Certifications in India */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
              <h3 className="font-serif-heading text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-3">
                <Award className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                Curated Indian & Global Certifications
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                Recognized by hiring teams across Indian GCCs, Indian IT Services, and Tier-1 startups:
              </p>

              <div className="space-y-2">
                {currentPathway.certifications.map((cert, i) => (
                  <div key={i} className="p-2.5 rounded bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 block">{cert.name}</span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{cert.provider}</span>
                    </div>
                    <BookOpen className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: 24-Week Interactive Checklist Roadmap */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="font-serif-heading text-xl font-bold text-slate-900 dark:text-slate-100">
                  24-Week Phased Action Checklist
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Click each task as you complete it. Progress is saved automatically to your device.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCompletedTasks({})}
                className="text-[11px] font-mono text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                title="Reset all checkboxes"
              >
                Reset Tasks
              </button>
            </div>

            {/* Render 3 Phases */}
            {currentPathway.phases.map((phase, pIdx) => {
              const phaseTasks = phase.tasks;
              const phaseCompleted = phaseTasks.filter((t) => completedTasks[t.id]).length;
              const isPhaseDone = phaseCompleted === phaseTasks.length;

              return (
                <div
                  key={pIdx}
                  className={`bg-white dark:bg-slate-900 rounded-xl p-6 border transition-all ${
                    isPhaseDone
                      ? 'border-emerald-300 dark:border-emerald-800/80 bg-emerald-50/20 dark:bg-emerald-950/10'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {/* Phase Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300">
                          {phase.duration}
                        </span>
                        {isPhaseDone && (
                          <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                            <Check className="w-3 h-3" /> Completed
                          </span>
                        )}
                      </div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 font-serif-heading">
                        {phase.title}
                      </h4>
                    </div>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 shrink-0">
                      {phaseCompleted}/{phaseTasks.length} milestones
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                    <strong>Objective:</strong> {phase.objective}
                  </p>

                  {/* Task Items */}
                  <div className="space-y-3">
                    {phase.tasks.map((task) => {
                      const isChecked = !!completedTasks[task.id];

                      return (
                        <div
                          key={task.id}
                          onClick={() => toggleTask(task.id)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              toggleTask(task.id);
                            }
                          }}
                          className={`p-3.5 rounded-lg border cursor-pointer transition-all flex items-start gap-3 select-none ${
                            isChecked
                              ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-300/80 dark:border-emerald-800/80'
                              : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-700/80 hover:border-teal-400 dark:hover:border-teal-600'
                          }`}
                        >
                          <div className="mt-0.5 shrink-0">
                            {isChecked ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                            ) : (
                              <Circle className="w-5 h-5 text-slate-400 dark:text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors" />
                            )}
                          </div>
                          <div className="flex-1">
                            <span
                              className={`text-xs sm:text-sm font-semibold block transition-colors ${
                                isChecked
                                  ? 'text-emerald-950 dark:text-emerald-200 line-through opacity-80'
                                  : 'text-slate-900 dark:text-slate-100'
                              }`}
                            >
                              {task.label}
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 block leading-relaxed">
                              {task.details}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Bottom Call to Action Card */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-slate-100 to-teal-50 dark:from-slate-800/70 dark:to-teal-950/40 border border-teal-200/80 dark:border-teal-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase font-bold text-teal-800 dark:text-teal-300 block mb-1">
                  Ready to test your risk score?
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Take the 2-minute diagnostic quiz or calculate your 5-year Indian salary trajectory.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  to="/salary-calculator"
                  className="px-3.5 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  Salary Risk Calculator →
                </Link>
                <Link
                  to="/quiz"
                  className="px-3 py-2 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  Career Quiz
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

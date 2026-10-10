export type RiskLabel = 'Low' | 'Moderate' | 'High' | 'Very High';
export type ConfidenceLevel = 'Low' | 'Medium' | 'High';
export type TaskStatus = 'now' | '5years' | 'unlikely';

export interface TaskItem {
  name: string;
  status: TaskStatus;
  note?: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface Job {
  slug: string;
  title: string;
  sector: string;
  sectorName: string;
  score: number; // 0 to 100
  label: RiskLabel;
  timeline: string; // e.g. "2027-2031"
  confidence: ConfidenceLevel;
  summary: string;
  tasks: TaskItem[];
  aiWillDo: string[];
  humansWillDo: string[];
  skillsToLearn: string[];
  toolsToLearn: string[];
  saferCareers: { title: string; slug: string }[];
  indiaNote: string;
  salaryRangeINR: string;
  hiringTrend: 'Declining' | 'Transforming' | 'Growing' | 'Stable';
  faqs: FAQItem[];
  lastUpdated: string;
}

export interface Sector {
  slug: string;
  name: string;
  iconName: string;
  shortDesc: string;
  summary: string;
  overallRisk: RiskLabel;
  avgScore: number;
  timeline: string;
  employmentShareIndia: string;
  emergingRoles: string[];
  riskDrivers: string[];
  resilientAreas: string[];
}

export interface TimelineMilestone {
  id: string;
  year: string;
  title: string;
  sector: string;
  sectorName: string;
  status: 'past' | 'current' | 'projected';
  description: string;
  impactLevel: 'Moderate' | 'High' | 'Transformational';
  indiaRelevance: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  sectorFocus?: string;
  content: string; // Markdown or rich formatted paragraphs
  tags: string[];
}

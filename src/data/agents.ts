export type AgentStatus = 'idle' | 'working' | 'busy';

export interface AgentProject {
  name: string;
  path: string;
  status: 'active' | 'review' | 'done' | 'planned';
  progress: number; // 0-100
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  emoji: string;
  color: string;
  bgColor: string;
  borderColor: string;
  status: AgentStatus;
  lastActivity: string;
  currentTask: string;
  projects: AgentProject[];
}

export const agents: Agent[] = [
  {
    id: 'ideas',
    name: 'Iris',
    role: 'Ideas Agent',
    description: 'Brainstorming, creative direction, concept development, and content ideation for all channels.',
    emoji: '💡',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-300',
    status: 'working',
    lastActivity: '2 min ago',
    currentTask: 'Brainstorming Q2 content calendar themes',
    projects: [
      { name: 'Content Calendar Q2', path: 'content-calendar/', status: 'active', progress: 35 },
      { name: 'YouTube Series Concepts', path: 'youtube-concepts/', status: 'active', progress: 60 },
      { name: 'Lead Magnet Ideas', path: 'lead-magnets/', status: 'review', progress: 90 },
      { name: 'Collaboration Pitches', path: 'collabs/', status: 'planned', progress: 10 },
    ],
  },
  {
    id: 'production',
    name: 'Max',
    role: 'Production Agent',
    description: 'Scripts, video planning, editing briefs, execution timelines, and production workflows.',
    emoji: '🎬',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-300',
    status: 'busy',
    lastActivity: 'Just now',
    currentTask: 'Editing script for Atemschool Module 5',
    projects: [
      { name: 'Atemschool Videos', path: 'atemschool/', status: 'active', progress: 72 },
      { name: 'Affiliate Build Series', path: 'affiliate-build/', status: 'active', progress: 45 },
      { name: 'Mission Control Demo', path: 'mission-control/', status: 'review', progress: 85 },
      { name: 'Short-Form Clips', path: 'shorts/', status: 'active', progress: 30 },
    ],
  },
  {
    id: 'sales',
    name: 'Sophie',
    role: 'Sales Agent',
    description: 'Marketing copy, funnel strategy, pricing models, landing pages, and conversion optimization.',
    emoji: '📈',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-300',
    status: 'idle',
    lastActivity: '1 hour ago',
    currentTask: 'Waiting for funnel review feedback',
    projects: [
      { name: 'Atemschool Sales Page', path: 'atemschool/sales/', status: 'review', progress: 95 },
      { name: 'Email Sequences', path: 'email-sequences/', status: 'active', progress: 55 },
      { name: 'Affiliate Program', path: 'affiliate-build/program/', status: 'active', progress: 40 },
      { name: 'Pricing Strategy', path: 'pricing/', status: 'done', progress: 100 },
    ],
  },
  {
    id: 'support',
    name: 'Kai',
    role: 'Support Agent',
    description: 'Student Q&A, troubleshooting, FAQ management, community engagement, and feedback collection.',
    emoji: '🛟',
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-300',
    status: 'working',
    lastActivity: '5 min ago',
    currentTask: 'Responding to 3 student tickets',
    projects: [
      { name: 'FAQ Knowledge Base', path: 'support/faq/', status: 'active', progress: 68 },
      { name: 'Onboarding Guide', path: 'support/onboarding/', status: 'done', progress: 100 },
      { name: 'Feedback Collection', path: 'support/feedback/', status: 'active', progress: 50 },
      { name: 'Community Templates', path: 'support/community/', status: 'planned', progress: 15 },
    ],
  },
  {
    id: 'research',
    name: 'Nova',
    role: 'Research Agent',
    description: 'Competitive analysis, market trends, audience data, SEO research, and strategic insights.',
    emoji: '🔬',
    color: 'text-violet-600',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-300',
    status: 'working',
    lastActivity: '8 min ago',
    currentTask: 'Analyzing competitor pricing models',
    projects: [
      { name: 'Competitor Analysis', path: 'research/competitors/', status: 'active', progress: 58 },
      { name: 'SEO Keyword Research', path: 'research/seo/', status: 'active', progress: 75 },
      { name: 'Audience Survey Results', path: 'research/audience/', status: 'review', progress: 88 },
      { name: 'Trend Report Q2', path: 'research/trends/', status: 'planned', progress: 20 },
    ],
  },
];

// In-memory store for agent activity tracking
// Persists across requests in dev (module cache), resets on cold start in Vercel serverless

export type AgentStatus = 'idle' | 'working' | 'busy';
export type ProjectStatus = 'active' | 'review' | 'done' | 'planned';

export interface AgentProject {
  id: string;
  name: string;
  status: ProjectStatus;
  progress: number;
  agentId: string;
}

export interface AgentData {
  id: string;
  name: string;
  role: string;
  description: string;
  emoji: string;
  color: string;
  bgColor: string;
  borderColor: string;
  status: AgentStatus;
  lastActivity: string; // ISO timestamp
  currentTask: string;
  projects: AgentProject[];
}

export interface ActivityLog {
  id: string;
  agentId: string;
  action: string;
  timestamp: string;
}

function makeId(): string {
  return Math.random().toString(36).slice(2, 10);
}

function seedData(): { agents: AgentData[]; logs: ActivityLog[] } {
  const now = new Date();
  const mins = (m: number) => new Date(now.getTime() - m * 60000).toISOString();

  const agents: AgentData[] = [
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
      lastActivity: mins(2),
      currentTask: 'Brainstorming Atem School course module ideas',
      projects: [
        { id: makeId(), name: 'Atem School Course Ideas', status: 'active', progress: 45, agentId: 'ideas' },
        { id: makeId(), name: 'Passive Income Angles', status: 'active', progress: 30, agentId: 'ideas' },
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
      lastActivity: mins(0),
      currentTask: 'Building SaaS Phase 1 backend architecture',
      projects: [
        { id: makeId(), name: 'Affiliate Blog Expansion', status: 'active', progress: 55, agentId: 'production' },
        { id: makeId(), name: 'SaaS Phase 1 Backend', status: 'active', progress: 25, agentId: 'production' },
        { id: makeId(), name: 'Mission Control Refinement', status: 'review', progress: 85, agentId: 'production' },
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
      status: 'working',
      lastActivity: mins(5),
      currentTask: 'Drafting affiliate site copy for landing page',
      projects: [
        { id: makeId(), name: 'Affiliate Site Copy', status: 'active', progress: 40, agentId: 'sales' },
        { id: makeId(), name: 'Pricing Strategy', status: 'active', progress: 60, agentId: 'sales' },
        { id: makeId(), name: 'Landing Page CTA', status: 'planned', progress: 10, agentId: 'sales' },
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
      lastActivity: mins(3),
      currentTask: 'Building Student Q&A system knowledge base',
      projects: [
        { id: makeId(), name: 'Student Q&A System', status: 'active', progress: 50, agentId: 'support' },
        { id: makeId(), name: 'Troubleshooting Docs', status: 'active', progress: 35, agentId: 'support' },
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
      status: 'idle',
      lastActivity: mins(45),
      currentTask: 'Waiting for new research assignments',
      projects: [
        { id: makeId(), name: 'Competitor Analysis', status: 'active', progress: 70, agentId: 'research' },
        { id: makeId(), name: 'Market Trends', status: 'active', progress: 40, agentId: 'research' },
        { id: makeId(), name: 'Tech Stack Research', status: 'review', progress: 90, agentId: 'research' },
      ],
    },
  ];

  return { agents, logs: [] };
}

// Use global to persist across hot reloads in dev
const globalStore = globalThis as unknown as {
  __mcStore?: { agents: AgentData[]; logs: ActivityLog[] };
};

if (!globalStore.__mcStore) {
  globalStore.__mcStore = seedData();
}

export const store = globalStore.__mcStore;

export function getAgent(id: string): AgentData | undefined {
  return store.agents.find((a) => a.id === id);
}

export function updateAgentStatus(id: string, status: AgentStatus): AgentData | undefined {
  const agent = getAgent(id);
  if (!agent) return undefined;
  agent.status = status;
  agent.lastActivity = new Date().toISOString();
  store.logs.push({ id: makeId(), agentId: id, action: `Status changed to ${status}`, timestamp: new Date().toISOString() });
  return agent;
}

export function assignTask(id: string, task: string): AgentData | undefined {
  const agent = getAgent(id);
  if (!agent) return undefined;
  agent.currentTask = task;
  agent.status = 'working';
  agent.lastActivity = new Date().toISOString();
  store.logs.push({ id: makeId(), agentId: id, action: `Assigned task: ${task}`, timestamp: new Date().toISOString() });
  return agent;
}

export function getAllProjects(): (AgentProject & { agentName: string; agentEmoji: string; agentColor: string })[] {
  return store.agents.flatMap((a) =>
    a.projects.map((p) => ({ ...p, agentName: a.name, agentEmoji: a.emoji, agentColor: a.color }))
  );
}

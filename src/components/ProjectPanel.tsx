'use client';

import { agents } from '@/data/agents';

interface ProjectEntry {
  name: string;
  path: string;
  status: string;
  progress: number;
  agentName: string;
  agentEmoji: string;
  agentColor: string;
}

const statusBadge = (status: string) => {
  const styles: Record<string, string> = {
    active: 'bg-blue-100 text-blue-700',
    review: 'bg-amber-100 text-amber-700',
    done: 'bg-green-100 text-green-700',
    planned: 'bg-gray-100 text-gray-500',
  };
  return styles[status] || styles.planned;
};

export default function ProjectPanel() {
  const allProjects: ProjectEntry[] = agents.flatMap((a) =>
    a.projects.map((p) => ({
      ...p,
      agentName: a.name,
      agentEmoji: a.emoji,
      agentColor: a.color,
    }))
  );

  allProjects.sort((a, b) => {
    const order = { active: 0, review: 1, planned: 2, done: 3 };
    return (order[a.status as keyof typeof order] ?? 4) - (order[b.status as keyof typeof order] ?? 4);
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-bold text-lg">📂 All Projects</h2>
        <p className="text-sm text-gray-400">{allProjects.length} projects across {agents.length} agents</p>
      </div>
      <div className="divide-y divide-gray-50 max-h-96 overflow-y-auto">
        {allProjects.map((p) => (
          <div key={`${p.agentName}-${p.path}`} className="px-5 py-3 flex items-center gap-3 hover:bg-gray-50 transition">
            <span className="text-lg">{p.agentEmoji}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-800 truncate">{p.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${statusBadge(p.status)}`}>{p.status}</span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <code className="text-xs text-gray-400 font-mono truncate">{p.path}</code>
                <span className="text-xs text-gray-300">•</span>
                <span className={`text-xs font-medium ${p.agentColor}`}>{p.agentName}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-medium text-gray-500">{p.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

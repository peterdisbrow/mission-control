'use client';

import { Agent } from '@/data/agents';

const statusConfig = {
  idle: { dot: 'bg-gray-400', label: 'Idle', pulse: false },
  working: { dot: 'bg-green-500', label: 'Working', pulse: true },
  busy: { dot: 'bg-red-500', label: 'Busy', pulse: true },
};

const progressColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-blue-500';
    case 'review': return 'bg-amber-500';
    case 'done': return 'bg-green-500';
    case 'planned': return 'bg-gray-300';
    default: return 'bg-gray-300';
  }
};

const statusBadge = (status: string) => {
  const styles: Record<string, string> = {
    active: 'bg-blue-100 text-blue-700',
    review: 'bg-amber-100 text-amber-700',
    done: 'bg-green-100 text-green-700',
    planned: 'bg-gray-100 text-gray-500',
  };
  return styles[status] || styles.planned;
};

export default function AgentCard({ agent, onClick }: { agent: Agent; onClick: () => void }) {
  const sc = statusConfig[agent.status];

  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-2xl border-2 ${agent.borderColor} ${agent.bgColor} p-5 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="text-4xl">{agent.emoji}</div>
          <div>
            <h3 className="font-bold text-lg leading-tight">{agent.name}</h3>
            <p className={`text-sm font-medium ${agent.color}`}>{agent.role}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`w-2.5 h-2.5 rounded-full ${sc.dot} ${sc.pulse ? 'animate-pulse' : ''}`} />
          <span className="text-xs text-gray-500 font-medium">{sc.label}</span>
        </div>
      </div>

      {/* Current task */}
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
        <span className="font-medium text-gray-700">Now:</span> {agent.currentTask}
      </p>

      {/* Top projects */}
      <div className="space-y-2">
        {agent.projects.slice(0, 2).map((p) => (
          <div key={p.path}>
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-xs font-medium text-gray-700 truncate">{p.name}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${statusBadge(p.status)}`}>
                {p.status}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className={`h-1.5 rounded-full ${progressColor(p.status)} transition-all`} style={{ width: `${p.progress}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-gray-400">Last active: {agent.lastActivity}</span>
        <span className="text-xs text-gray-400">{agent.projects.length} projects →</span>
      </div>
    </button>
  );
}

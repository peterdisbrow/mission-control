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

export default function AgentModal({ agent, onClose }: { agent: Agent; onClose: () => void }) {
  const sc = statusConfig[agent.status];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className={`relative w-full max-w-lg rounded-3xl border-2 ${agent.borderColor} bg-white shadow-2xl overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`${agent.bgColor} px-6 py-5`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-5xl">{agent.emoji}</div>
              <div>
                <h2 className="text-2xl font-bold">{agent.name}</h2>
                <p className={`font-semibold ${agent.color}`}>{agent.role}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-black/10 transition text-gray-500 text-xl">✕</button>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${sc.dot} ${sc.pulse ? 'animate-pulse' : ''}`} />
            <span className="text-sm font-medium text-gray-700">{sc.label}</span>
            <span className="text-sm text-gray-400 ml-2">• Last active {agent.lastActivity}</span>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5 max-h-[60vh] overflow-y-auto">
          {/* Description */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">About</h3>
            <p className="text-sm text-gray-600">{agent.description}</p>
          </div>

          {/* Current task */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Current Task</h3>
            <p className="text-sm text-gray-800 font-medium">{agent.currentTask}</p>
          </div>

          {/* All projects */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Projects & Files</h3>
            <div className="space-y-3">
              {agent.projects.map((p) => (
                <div key={p.path} className="bg-gray-50 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-800">{p.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusBadge(p.status)}`}>
                      {p.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-xs text-gray-400 font-mono">{p.path}</code>
                    <span className="text-xs text-gray-400 ml-auto">{p.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1.5">
                    <div className={`h-2 rounded-full ${progressColor(p.status)} transition-all`} style={{ width: `${p.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

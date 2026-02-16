'use client';

import { useState, useEffect, useCallback } from 'react';
import AgentCard from '@/components/AgentCard';
import AgentModal from '@/components/AgentModal';
import ProjectPanel from '@/components/ProjectPanel';

export interface AgentProject {
  id: string;
  name: string;
  status: 'active' | 'review' | 'done' | 'planned';
  progress: number;
  agentId: string;
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
  status: 'idle' | 'working' | 'busy';
  lastActivity: string;
  currentTask: string;
  projects: AgentProject[];
}

export default function Home() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selected, setSelected] = useState<Agent | null>(null);
  const [lastFetch, setLastFetch] = useState<Date | null>(null);

  const fetchAgents = useCallback(async () => {
    try {
      const res = await fetch('/api/agents', { cache: 'no-store' });
      if (res.ok) {
        const data: Agent[] = await res.json();
        setAgents(data);
        setLastFetch(new Date());
        // Update selected agent if modal is open
        if (selected) {
          const updated = data.find((a) => a.id === selected.id);
          if (updated) setSelected(updated);
        }
      }
    } catch (e) {
      console.error('Failed to fetch agents:', e);
    }
  }, [selected]);

  useEffect(() => {
    fetchAgents();
    const interval = setInterval(fetchAgents, 8000);
    return () => clearInterval(interval);
  }, [fetchAgents]);

  const working = agents.filter((a) => a.status !== 'idle').length;

  const timeAgo = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    return `${hrs}h ago`;
  };

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">🚀 Mission Control</h1>
            <p className="text-sm text-gray-500">Peter&apos;s AI Agent Team Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                {working} active
              </span>
              <span>•</span>
              <span>{agents.length} agents</span>
            </div>
            <div className="px-3 py-1.5 bg-green-100 rounded-full text-xs font-medium text-green-700 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Live
              {lastFetch && <span className="text-green-500 ml-1">• {timeAgo(lastFetch.toISOString())}</span>}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {agents.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-4xl mb-4">⏳</div>
            <p>Loading agents...</p>
          </div>
        ) : (
          <>
            {/* Agent Grid */}
            <section>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">🏢 The Office</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {agents.map((agent) => (
                  <AgentCard key={agent.id} agent={agent} onClick={() => setSelected(agent)} timeAgo={timeAgo} />
                ))}
              </div>
            </section>

            {/* Project Panel */}
            <section>
              <ProjectPanel agents={agents} />
            </section>
          </>
        )}
      </div>

      {/* Modal */}
      {selected && <AgentModal agent={selected} onClose={() => setSelected(null)} timeAgo={timeAgo} />}
    </main>
  );
}

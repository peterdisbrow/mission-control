'use client';

import { useState } from 'react';
import { agents, Agent } from '@/data/agents';
import AgentCard from '@/components/AgentCard';
import AgentModal from '@/components/AgentModal';
import ProjectPanel from '@/components/ProjectPanel';

export default function Home() {
  const [selected, setSelected] = useState<Agent | null>(null);

  const working = agents.filter((a) => a.status !== 'idle').length;

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">🚀 Mission Control</h1>
            <p className="text-sm text-gray-500">Andrew&apos;s AI Agent Team Dashboard</p>
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
            <div className="px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
              Live
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Agent Grid */}
        <section>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">🏢 The Office</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} onClick={() => setSelected(agent)} />
            ))}
          </div>
        </section>

        {/* Project Panel */}
        <section>
          <ProjectPanel />
        </section>
      </div>

      {/* Modal */}
      {selected && <AgentModal agent={selected} onClose={() => setSelected(null)} />}
    </main>
  );
}

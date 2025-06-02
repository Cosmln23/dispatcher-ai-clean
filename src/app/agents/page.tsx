'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HolographicText, GlitchText } from '@/components/effects/MatrixRain';

interface AIAgent {
  id: string;
  name: string;
  specialty: string;
  status: 'online' | 'offline' | 'training' | 'processing' | 'idle';
  performance: number;
  processingPower: number;
  memoryUsage: number;
  activeTask?: string;
  tasksCompleted: number;
  accuracy: number;
  learningRate: number;
  lastUpdate: Date;
}

const generateMockAgents = (): AIAgent[] => [
  {
    id: 'ARIA',
    name: 'ARIA',
    specialty: 'Route Optimization & Traffic Analysis',
    status: 'online',
    performance: 94.2,
    processingPower: 87.3,
    memoryUsage: 67.1,
    activeTask: 'Optimizing 247 active routes',
    tasksCompleted: 15847,
    accuracy: 98.9,
    learningRate: 0.847,
    lastUpdate: new Date(Date.now() - 3000)
  },
  {
    id: 'NEXUS',
    name: 'NEXUS',
    specialty: 'Fleet Coordination & Logistics',
    status: 'processing',
    performance: 89.7,
    processingPower: 92.1,
    memoryUsage: 54.3,
    activeTask: 'Coordinating vehicle dispatch',
    tasksCompleted: 12934,
    accuracy: 97.4,
    learningRate: 0.923,
    lastUpdate: new Date(Date.now() - 1500)
  },
  {
    id: 'SIGMA',
    name: 'SIGMA',
    specialty: 'Predictive Analytics & Forecasting',
    status: 'online',
    performance: 96.1,
    processingPower: 78.9,
    memoryUsage: 89.2,
    activeTask: 'Analyzing traffic patterns',
    tasksCompleted: 8765,
    accuracy: 99.2,
    learningRate: 0.756,
    lastUpdate: new Date(Date.now() - 7000)
  },
  {
    id: 'NOVA',
    name: 'NOVA',
    specialty: 'Voice Interface & Natural Language',
    status: 'training',
    performance: 78.4,
    processingPower: 45.6,
    memoryUsage: 34.8,
    activeTask: 'Learning new voice patterns',
    tasksCompleted: 5432,
    accuracy: 89.7,
    learningRate: 1.234,
    lastUpdate: new Date(Date.now() - 25000)
  },
  {
    id: 'QUBIT',
    name: 'QUBIT',
    specialty: 'Quantum Processing & Advanced Computing',
    status: 'online',
    performance: 91.8,
    processingPower: 99.7,
    memoryUsage: 76.5,
    activeTask: 'Quantum route calculations',
    tasksCompleted: 3247,
    accuracy: 99.8,
    learningRate: 0.634,
    lastUpdate: new Date(Date.now() - 900)
  }
];

const AgentCard = ({ agent, onOptimize, onTrain }: { 
  agent: AIAgent; 
  onOptimize: (id: string) => void;
  onTrain: (id: string) => void;
}) => {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'online': return 'text-matrix-500';
      case 'processing': return 'text-cyber-cyan';
      case 'training': return 'text-cyber-yellow';
      case 'offline': return 'text-gray-500';
      case 'idle': return 'text-cyber-purple';
      default: return 'text-gray-500';
    }
  };

  const getAgentIcon = (name: string) => {
    switch(name) {
      case 'ARIA': return '🎯';
      case 'NEXUS': return '🌐';
      case 'SIGMA': return '📊';
      case 'NOVA': return '🎤';
      case 'QUBIT': return '⚛️';
      default: return '🤖';
    }
  };

  return (
    <div className="neural-card p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="text-4xl">{getAgentIcon(agent.name)}</div>
          <div>
            <h3 className="text-2xl font-neural text-matrix-300 font-bold">
              <GlitchText intensity="low">{agent.name}</GlitchText>
            </h3>
            <p className="text-sm text-matrix-400 font-cyber">{agent.specialty}</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className={`text-xl font-bold ${getStatusColor(agent.status)}`}>
            {agent.status.toUpperCase()}
          </div>
          <div className="text-sm text-matrix-400">
            Updated: {agent.lastUpdate.toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-dark-matrix p-3 rounded text-center">
          <div className="text-xs text-matrix-400 mb-1">Performance</div>
          <div className="text-xl font-bold text-matrix-500">{agent.performance.toFixed(1)}%</div>
        </div>
        
        <div className="bg-dark-matrix p-3 rounded text-center">
          <div className="text-xs text-matrix-400 mb-1">CPU Usage</div>
          <div className="text-xl font-bold text-cyber-cyan">{agent.processingPower.toFixed(1)}%</div>
        </div>
        
        <div className="bg-dark-matrix p-3 rounded text-center">
          <div className="text-xs text-matrix-400 mb-1">Memory</div>
          <div className="text-xl font-bold text-cyber-purple">{agent.memoryUsage.toFixed(1)}%</div>
        </div>
        
        <div className="bg-dark-matrix p-3 rounded text-center">
          <div className="text-xs text-matrix-400 mb-1">Accuracy</div>
          <div className="text-xl font-bold text-cyber-yellow">{agent.accuracy.toFixed(1)}%</div>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="space-y-3 mb-6">
        <div>
          <div className="flex justify-between text-xs text-matrix-400 mb-1">
            <span>Performance</span>
            <span>{agent.performance.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-dark-matrix rounded-full h-2">
            <div 
              className="h-2 rounded-full bg-gradient-to-r from-matrix-500 to-cyber-cyan transition-all duration-1000"
              style={{ width: `${agent.performance}%` }}
            />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-xs text-matrix-400 mb-1">
            <span>Processing Power</span>
            <span>{agent.processingPower.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-dark-matrix rounded-full h-2">
            <div 
              className="h-2 rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-purple transition-all duration-1000"
              style={{ width: `${agent.processingPower}%` }}
            />
          </div>
        </div>
      </div>

      {/* Current Task */}
      {agent.activeTask && (
        <div className="mb-6">
          <div className="text-sm text-matrix-400 mb-2">Current Task:</div>
          <div className="bg-dark-matrix p-3 rounded">
            <div className="text-sm font-cyber text-matrix-300">{agent.activeTask}</div>
            <div className="text-xs text-matrix-500 mt-1">
              Tasks Completed: {agent.tasksCompleted.toLocaleString()} | Learning Rate: {agent.learningRate.toFixed(3)}
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => onOptimize(agent.id)}
          disabled={agent.status === 'offline'}
          className="quantum-btn text-xs py-2 disabled:opacity-50"
        >
          OPTIMIZE
        </button>
        
        <button
          onClick={() => onTrain(agent.id)}
          disabled={agent.status === 'offline' || agent.status === 'training'}
          className="quantum-btn text-xs py-2 disabled:opacity-50"
        >
          {agent.status === 'training' ? 'TRAINING...' : 'TRAIN'}
        </button>
        
        <button className="quantum-btn text-xs py-2">
          ANALYZE
        </button>
      </div>
    </div>
  );
};

export default function AIAgents() {
  const [agents, setAgents] = useState<AIAgent[]>(generateMockAgents());
  const [systemMetrics, setSystemMetrics] = useState({
    totalProcessingPower: 0,
    averagePerformance: 0,
    activeAgents: 0,
    totalTasks: 0
  });
  const [isClient, setIsClient] = useState(false);

  // Initialize client-side only
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Update agents data only on client-side
  useEffect(() => {
    if (!isClient) return;
    
    const interval = setInterval(() => {
      setAgents(prev => prev.map(agent => ({
        ...agent,
        performance: Math.max(70, Math.min(100, agent.performance + (Math.random() - 0.5) * 2)),
        processingPower: Math.max(40, Math.min(100, agent.processingPower + (Math.random() - 0.5) * 5)),
        memoryUsage: Math.max(20, Math.min(95, agent.memoryUsage + (Math.random() - 0.5) * 3)),
        accuracy: Math.max(85, Math.min(100, agent.accuracy + (Math.random() - 0.5) * 0.5)),
        tasksCompleted: agent.tasksCompleted + Math.floor(Math.random() * 3),
        lastUpdate: Math.random() > 0.7 ? new Date() : agent.lastUpdate
      })));
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isClient]);

  useEffect(() => {
    const totalProcessingPower = agents.reduce((sum, agent) => sum + agent.processingPower, 0);
    const averagePerformance = agents.reduce((sum, agent) => sum + agent.performance, 0) / agents.length;
    const activeAgents = agents.filter(agent => agent.status === 'online' || agent.status === 'processing').length;
    const totalTasks = agents.reduce((sum, agent) => sum + agent.tasksCompleted, 0);
    
    setSystemMetrics({
      totalProcessingPower,
      averagePerformance,
      activeAgents,
      totalTasks
    });
  }, [agents]);

  const handleOptimize = async (agentId: string) => {
    console.log(`Optimizing agent ${agentId}`);
    // Simulate optimization
    setAgents(prev => prev.map(agent => 
      agent.id === agentId 
        ? { ...agent, status: 'processing' as const, lastUpdate: new Date() }
        : agent
    ));
    
    setTimeout(() => {
      setAgents(prev => prev.map(agent => 
        agent.id === agentId 
          ? { 
              ...agent, 
              status: 'online' as const, 
              performance: Math.min(100, agent.performance + 5),
              lastUpdate: new Date()
            }
          : agent
      ));
    }, 3000);
  };

  const handleTrain = async (agentId: string) => {
    console.log(`Training agent ${agentId}`);
    setAgents(prev => prev.map(agent => 
      agent.id === agentId 
        ? { ...agent, status: 'training' as const, lastUpdate: new Date() }
        : agent
    ));
    
    setTimeout(() => {
      setAgents(prev => prev.map(agent => 
        agent.id === agentId 
          ? { 
              ...agent, 
              status: 'online' as const,
              accuracy: Math.min(100, agent.accuracy + 2),
              learningRate: agent.learningRate * 1.1,
              lastUpdate: new Date()
            }
          : agent
      ));
    }, 8000);
  };

  return (
    <div className="min-h-screen bg-black text-matrix-500 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-neural font-bold holographic-text">
            AI AGENTS CONTROL
          </h1>
          <p className="text-matrix-400 font-cyber mt-2">
            Neural Network Management & Control Center
          </p>
        </div>
        
        <Link href="/" className="quantum-btn">
          ← BACK TO MATRIX
        </Link>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="neural-card p-6 text-center">
          <div className="text-3xl mb-2">🤖</div>
          <h3 className="text-lg font-neural text-matrix-300">Active Agents</h3>
          <div className="text-2xl font-bold holographic-text">{systemMetrics.activeAgents}</div>
        </div>
        
        <div className="neural-card p-6 text-center">
          <div className="text-3xl mb-2">⚡</div>
          <h3 className="text-lg font-neural text-matrix-300">Avg Performance</h3>
          <div className="text-2xl font-bold text-matrix-500">{systemMetrics.averagePerformance.toFixed(1)}%</div>
        </div>
        
        <div className="neural-card p-6 text-center">
          <div className="text-3xl mb-2">🧠</div>
          <h3 className="text-lg font-neural text-matrix-300">Processing Power</h3>
          <div className="text-2xl font-bold text-cyber-cyan">{systemMetrics.totalProcessingPower.toFixed(0)}%</div>
        </div>
        
        <div className="neural-card p-6 text-center">
          <div className="text-3xl mb-2">📊</div>
          <h3 className="text-lg font-neural text-matrix-300">Total Tasks</h3>
          <div className="text-2xl font-bold text-cyber-purple">{systemMetrics.totalTasks.toLocaleString()}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* AI Agents */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-neural text-matrix-300 mb-6 uppercase tracking-wider">
            <GlitchText intensity="low">NEURAL AGENTS STATUS</GlitchText>
          </h2>
          
          {agents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onOptimize={handleOptimize}
              onTrain={handleTrain}
            />
          ))}
        </div>

        {/* Control Panel */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* System Actions */}
          <div className="neural-card p-6">
            <h3 className="text-xl font-neural text-matrix-300 mb-4 uppercase tracking-wider">
              SYSTEM OPERATIONS
            </h3>
            
            <div className="space-y-3">
              <button className="quantum-btn w-full text-center py-3">
                🧠 SYNCHRONIZE ALL AGENTS
              </button>
              
              <button className="quantum-btn w-full text-center py-3">
                ⚡ BOOST PERFORMANCE
              </button>
              
              <button className="quantum-btn w-full text-center py-3">
                🎯 AUTO-OPTIMIZE
              </button>
              
              <button className="quantum-btn w-full text-center py-3">
                📊 GENERATE ANALYTICS
              </button>
            </div>
          </div>

          {/* System Status */}
          <div className="neural-card p-6">
            <h3 className="text-xl font-neural text-matrix-300 mb-4 uppercase tracking-wider">
              NEURAL NETWORK STATUS
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-matrix-400 font-cyber">Network Coherence</span>
                <span className="text-matrix-500 font-bold">96.7%</span>
              </div>
              
              <div className="w-full bg-dark-matrix rounded-full h-2">
                <div className="h-2 rounded-full bg-gradient-to-r from-matrix-500 to-cyber-cyan w-[97%] transition-all duration-1000" />
              </div>
              
              <div className="grid grid-cols-1 gap-3 mt-4 text-sm">
                <div className="bg-dark-matrix p-3 rounded">
                  <div className="text-matrix-400">Learning Rate</div>
                  <div className="text-matrix-500 text-lg font-bold">0.847</div>
                </div>
                
                <div className="bg-dark-matrix p-3 rounded">
                  <div className="text-matrix-400">Data Processed</div>
                  <div className="text-cyber-cyan text-lg font-bold">2.3TB</div>
                </div>
                
                <div className="bg-dark-matrix p-3 rounded">
                  <div className="text-matrix-400">Uptime</div>
                  <div className="text-cyber-purple text-lg font-bold">99.8%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="neural-card p-6">
            <h3 className="text-xl font-neural text-matrix-300 mb-4 uppercase tracking-wider">
              QUICK ACCESS
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <Link href="/dashboard" className="quantum-btn text-center p-3 text-sm">
                🧠<br/>Dashboard
              </Link>
              
              <Link href="/quantum" className="quantum-btn text-center p-3 text-sm">
                ⚡<br/>Quantum
              </Link>
              
              <Link href="/fleet" className="quantum-btn text-center p-3 text-sm">
                🚛<br/>Fleet
              </Link>
              
              <button className="quantum-btn text-center p-3 text-sm">
                ⚙️<br/>Settings
              </button>
            </div>
          </div>

          {/* Real-time Logs */}
          <div className="neural-card p-6">
            <h3 className="text-xl font-neural text-matrix-300 mb-4 uppercase tracking-wider">
              ACTIVITY LOG
            </h3>
            
            <div className="space-y-2 max-h-40 overflow-y-auto font-cyber text-xs">
              <div className="text-matrix-400">[{isClient ? new Date().toLocaleTimeString() : '--:--:--'}] ARIA: Route optimization completed</div>
              <div className="text-cyber-cyan">[{isClient ? new Date(Date.now() - 15000).toLocaleTimeString() : '--:--:--'}] NEXUS: Fleet coordination updated</div>
              <div className="text-cyber-purple">[{isClient ? new Date(Date.now() - 32000).toLocaleTimeString() : '--:--:--'}] SIGMA: Analytics model refreshed</div>
              <div className="text-cyber-yellow">[{isClient ? new Date(Date.now() - 47000).toLocaleTimeString() : '--:--:--'}] NOVA: Voice training in progress</div>
              <div className="text-matrix-400">[{isClient ? new Date(Date.now() - 63000).toLocaleTimeString() : '--:--:--'}] QUBIT: Quantum processing optimized</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
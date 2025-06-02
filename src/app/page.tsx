'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useNeural, useNeuralMetrics, useAIAgents } from '@/lib/providers/neural-provider';
import { HolographicText, GlitchText } from '@/components/effects/MatrixRain';

// Simple Icons as text
const Icons = {
  brain: '🧠',
  cpu: '💻', 
  activity: '📊',
  zap: '⚡',
  shield: '🛡️',
  mic: '🎤',
  micOff: '🔇',
  wallet: '💰',
  trending: '📈',
  check: '✅',
  x: '❌',
  settings: '⚙️'
};

// Neural Dashboard Components
const MetricCard: React.FC<{
  title: string;
  value: string | number;
  change?: number;
  icon: string;
  subtitle?: string;
}> = ({ title, value, change, icon, subtitle }) => {
  return (
    <div className="neural-card p-6 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-matrix-500/5 to-cyber-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-lg bg-matrix-500/10 border border-matrix-500/30 text-2xl">
            {icon}
          </div>
          {change && (
            <div className={`flex items-center text-sm ${change > 0 ? 'text-matrix-500' : 'text-cyber-red'}`}>
              <span className="mr-1">{Icons.trending}</span>
              {change > 0 ? '+' : ''}{change.toFixed(1)}%
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-neural text-matrix-300 uppercase tracking-wider">
            {title}
          </h3>
          <div className="text-3xl font-bold holographic-text">
            {value}
          </div>
          {subtitle && (
            <p className="text-sm text-matrix-400 font-cyber">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const AIAgentCard: React.FC<{
  agent: any;
  onTrain: (id: string) => void;
  isTraining: boolean;
}> = ({ agent, onTrain, isTraining }) => {
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'online': return Icons.check;
      case 'offline': return Icons.x;
      case 'training': return Icons.activity;
      case 'processing': return Icons.cpu;
      default: return Icons.activity;
    }
  };

  return (
    <div className="neural-card p-4 relative group">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-matrix-500/20 border border-matrix-500/40 text-lg">
            {getStatusIcon(agent.status)}
          </div>
          <div>
            <h4 className="font-neural text-matrix-300 font-semibold">
              <GlitchText intensity="low">{agent.name}</GlitchText>
            </h4>
            <p className="text-xs text-matrix-400 font-cyber">
              {agent.specialty}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-lg font-bold text-matrix-500">
            {agent.performance.toFixed(1)}%
          </div>
          <div className="text-xs text-matrix-500 uppercase tracking-wider">
            {agent.status}
          </div>
        </div>
      </div>
      
      {/* Performance Bar */}
      <div className="w-full bg-dark-matrix rounded-full h-2 mb-3">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-matrix-500 to-cyber-cyan transition-all duration-1000"
          style={{ width: `${agent.performance}%` }}
        />
      </div>
      
      {/* Train Button */}
      <button
        onClick={() => onTrain(agent.id)}
        disabled={isTraining || agent.status === 'training'}
        className="quantum-btn w-full text-xs py-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {agent.status === 'training' ? 'TRAINING...' : 'OPTIMIZE'}
      </button>
    </div>
  );
};

const RealTimeChart: React.FC<{ data: any[] }> = ({ data }) => {
  return (
    <div className="neural-card p-6">
      <h3 className="text-lg font-neural text-matrix-300 mb-4 uppercase tracking-wider">
        Neural Activity
      </h3>
      
      <div className="h-40 relative overflow-hidden bg-dark-matrix rounded">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-matrix-500 text-6xl animate-cyber-pulse">
            {Icons.activity}
          </div>
        </div>
        
        {/* Simple data visualization */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-matrix-500/30">
          <div className="h-full bg-matrix-500 animate-pulse" style={{width: '67%'}} />
        </div>
      </div>
    </div>
  );
};

export default function ComingSoon() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [matrixText, setMatrixText] = useState('');

  // Update clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Matrix effect
  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const interval = setInterval(() => {
      let result = '';
      for (let i = 0; i < 20; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setMatrixText(result);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-matrix-500 p-6">
      <div className="text-center space-y-8 max-w-4xl">
        
        {/* Matrix Rain Effect */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="matrix-text text-xs">{matrixText}</div>
        </div>

        {/* Main Logo */}
        <div className="relative z-10">
          <h1 className="text-6xl md:text-8xl font-neural font-bold mb-4">
            <span className="holographic-text">DISPATCHER AI</span>
          </h1>
          
          <div className="text-2xl md:text-3xl font-cyber text-cyber-cyan mb-8">
            🚛 Neural Transport System 2030 🚛
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="neural-card p-6">
            <div className="text-4xl mb-3">🧠</div>
            <h3 className="text-lg font-neural text-matrix-300">AGI SYSTEM</h3>
            <p className="text-matrix-500 font-cyber">ONLINE</p>
          </div>
          
          <div className="neural-card p-6">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="text-lg font-neural text-matrix-300">QUANTUM CORE</h3>
            <p className="text-cyber-purple font-cyber">ACTIVE</p>
          </div>
          
          <div className="neural-card p-6">
            <div className="text-4xl mb-3">🚀</div>
            <h3 className="text-lg font-neural text-matrix-300">LAUNCH STATUS</h3>
            <p className="text-cyber-yellow font-cyber">INITIALIZING</p>
          </div>
        </div>

        {/* Main Message */}
        <div className="neural-card p-8 text-center">
          <h2 className="text-3xl md:text-4xl font-neural mb-6 text-matrix-300">
            LAUNCH SEQUENCE INITIATED
          </h2>
          
          <p className="text-xl text-matrix-400 mb-6 font-cyber">
            Sistemul de transport futurist cu AGI este acum LIVE!
          </p>
          
          <div className="space-y-4 text-lg">
            <Link href="/dashboard" className="block">
              <div className="flex items-center justify-between p-3 bg-dark-matrix rounded hover:bg-matrix-500/10 transition-all cursor-pointer group">
                <span className="font-cyber text-matrix-400 group-hover:text-matrix-300">✅ Neural Dashboard</span>
                <span className="text-matrix-500 group-hover:text-matrix-400">READY → ENTER</span>
              </div>
            </Link>
            
            <Link href="/quantum" className="block">
              <div className="flex items-center justify-between p-3 bg-dark-matrix rounded hover:bg-cyber-purple/10 transition-all cursor-pointer group">
                <span className="font-cyber text-matrix-400 group-hover:text-cyber-purple">⚡ Quantum Optimization</span>
                <span className="text-cyber-yellow group-hover:text-cyber-purple">ACTIVE → ENTER</span>
              </div>
            </Link>
            
            <Link href="/fleet" className="block">
              <div className="flex items-center justify-between p-3 bg-dark-matrix rounded hover:bg-cyber-cyan/10 transition-all cursor-pointer group">
                <span className="font-cyber text-matrix-400 group-hover:text-cyber-cyan">🚛 Fleet Management</span>
                <span className="text-cyber-cyan group-hover:text-cyan-300">ONLINE → ENTER</span>
              </div>
            </Link>
            
            <Link href="/agents" className="block">
              <div className="flex items-center justify-between p-3 bg-dark-matrix rounded hover:bg-cyber-pink/10 transition-all cursor-pointer group">
                <span className="font-cyber text-matrix-400 group-hover:text-cyber-pink">🤖 AI Agents Control</span>
                <span className="text-cyber-pink group-hover:text-pink-300">LIVE → ENTER</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="neural-card p-4 text-center">
            <div className="text-2xl mb-2">🎯</div>
            <h4 className="font-neural text-matrix-300">AGI Dispatcher</h4>
          </div>
          
          <div className="neural-card p-4 text-center">
            <div className="text-2xl mb-2">🌐</div>
            <h4 className="font-neural text-matrix-300">Blockchain</h4>
          </div>
          
          <div className="neural-card p-4 text-center">
            <div className="text-2xl mb-2">🎤</div>
            <h4 className="font-neural text-matrix-300">Voice Commands</h4>
          </div>
          
          <div className="neural-card p-4 text-center">
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-neural text-matrix-300">Real-time Analytics</h4>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center space-y-4">
          <div className="text-matrix-400 font-cyber">
            Current Time: {currentTime.toLocaleTimeString('ro-RO')} • 
            System Status: <span className="text-matrix-500">OPERATIONAL</span>
          </div>
          
          <div className="text-sm text-matrix-500 font-cyber">
            DispatcherAI Neural Transport System v2030.1.0
          </div>
        </div>

        {/* Loading Animation */}
        <div className="flex justify-center">
          <div className="neural-loading"></div>
        </div>

      </div>
    </div>
  );
}

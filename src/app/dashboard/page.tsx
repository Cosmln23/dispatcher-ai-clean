'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { HolographicText, GlitchText } from '@/components/effects/MatrixRain';

// Mock data pentru dashboard - static pentru SSR
const getInitialData = () => ({
  neuralActivity: 85,
  quantumCoherence: 92,
  activeAgents: 5,
  transportRequests: 125,
  efficiency: 94,
});

const generateMockData = () => ({
  neuralActivity: Math.floor(Math.random() * 40) + 60,
  quantumCoherence: Math.floor(Math.random() * 30) + 70,
  activeAgents: Math.floor(Math.random() * 3) + 5,
  transportRequests: Math.floor(Math.random() * 50) + 100,
  efficiency: Math.floor(Math.random() * 20) + 80,
});

const AIAgent = ({ name, status, performance, specialty }: any) => (
  <div className="neural-card p-4 mb-4">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center space-x-3">
        <div className={`w-3 h-3 rounded-full ${status === 'online' ? 'bg-matrix-500' : 'bg-gray-500'} animate-pulse`}></div>
        <div>
          <h4 className="font-neural text-matrix-300 font-semibold">{name}</h4>
          <p className="text-xs text-matrix-400 font-cyber">{specialty}</p>
        </div>
      </div>
      <div className="text-right">
        <div className="text-lg font-bold text-matrix-500">{performance}%</div>
        <div className="text-xs text-matrix-500 uppercase">{status}</div>
      </div>
    </div>
    
    <div className="w-full bg-dark-matrix rounded-full h-2 mb-3">
      <div
        className="h-2 rounded-full bg-gradient-to-r from-matrix-500 to-cyber-cyan transition-all duration-1000"
        style={{ width: `${performance}%` }}
      />
    </div>
    
    <button className="quantum-btn w-full text-xs py-2">
      OPTIMIZE NEURAL NETWORK
    </button>
  </div>
);

export default function Dashboard() {
  const [metrics, setMetrics] = useState(getInitialData());
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Initialize client-side only
  useEffect(() => {
    setIsClient(true);
    setCurrentTime(new Date());
  }, []);

  // Update data only on client-side
  useEffect(() => {
    if (!isClient) return;
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setMetrics(generateMockData());
    }, 3000);
    return () => clearInterval(timer);
  }, [isClient]);

  const agents = [
    { name: 'ARIA', status: 'online', performance: 94, specialty: 'Route Optimization' },
    { name: 'NEXUS', status: 'online', performance: 89, specialty: 'Fleet Coordination' },
    { name: 'SIGMA', status: 'online', performance: 96, specialty: 'Predictive Analytics' },
    { name: 'NOVA', status: 'training', performance: 78, specialty: 'Voice Interface' },
    { name: 'QUBIT', status: 'online', performance: 91, specialty: 'Quantum Processing' },
  ];

  return (
    <div className="min-h-screen bg-black text-matrix-500">
      <Navbar />
      
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-neural font-bold holographic-text">
              NEURAL DASHBOARD
            </h1>
            <p className="text-matrix-400 font-cyber mt-2">
              Real-time AGI Transport System Control
            </p>
          </div>
          
          <Link href="/marketplace" className="quantum-btn">
            📦 Marketplace
          </Link>
        </div>

        {/* System Status */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="neural-card p-6 text-center">
            <div className="text-3xl mb-2">🧠</div>
            <h3 className="text-lg font-neural text-matrix-300">Neural Activity</h3>
            <div className="text-2xl font-bold holographic-text">{metrics.neuralActivity}%</div>
          </div>
          
          <div className="neural-card p-6 text-center">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="text-lg font-neural text-matrix-300">Quantum Core</h3>
            <div className="text-2xl font-bold text-cyber-purple">{metrics.quantumCoherence}%</div>
          </div>
          
          <div className="neural-card p-6 text-center">
            <div className="text-3xl mb-2">🤖</div>
            <h3 className="text-lg font-neural text-matrix-300">Active Agents</h3>
            <div className="text-2xl font-bold text-cyber-cyan">{metrics.activeAgents}</div>
          </div>
          
          <div className="neural-card p-6 text-center">
            <div className="text-3xl mb-2">🚛</div>
            <h3 className="text-lg font-neural text-matrix-300">Transport Requests</h3>
            <div className="text-2xl font-bold text-cyber-yellow">{metrics.transportRequests}</div>
          </div>
          
          <div className="neural-card p-6 text-center">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="text-lg font-neural text-matrix-300">System Efficiency</h3>
            <div className="text-2xl font-bold text-matrix-500">{metrics.efficiency}%</div>
          </div>
        </div>

        {/* Main Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* AI Agents Column */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-neural text-matrix-300 mb-6 uppercase tracking-wider">
              <GlitchText intensity="low">AI AGENT STATUS</GlitchText>
            </h2>
            
            {agents.map((agent, index) => (
              <AIAgent key={index} {...agent} />
            ))}
          </div>

          {/* Central Control */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Real-time Activity Monitor */}
            <div className="neural-card p-6">
              <h3 className="text-xl font-neural text-matrix-300 mb-4 uppercase tracking-wider">
                Real-time Activity Monitor
              </h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-dark-matrix p-4 rounded">
                  <div className="text-sm text-matrix-400 mb-2">Current Dispatches</div>
                  <div className="text-3xl font-bold text-matrix-500">247</div>
                  <div className="text-xs text-cyber-cyan">+12% from last hour</div>
                </div>
                
                <div className="bg-dark-matrix p-4 rounded">
                  <div className="text-sm text-matrix-400 mb-2">Neural Processing</div>
                  <div className="text-3xl font-bold text-cyber-purple">1.2TB/s</div>
                  <div className="text-xs text-cyber-purple">Quantum accelerated</div>
                </div>
              </div>
              
              {/* Simulated Activity Graph */}
              <div className="h-32 bg-dark-matrix rounded relative overflow-hidden">
                {isClient && (
                  <div className="absolute inset-0 flex items-end space-x-1 p-2">
                    {Array.from({length: 20}).map((_, i) => (
                      <div
                        key={i}
                        className="bg-matrix-500 w-full"
                        style={{
                          height: `${Math.random() * 80 + 20}%`,
                          opacity: 0.7 + Math.random() * 0.3
                        }}
                      />
                    ))}
                  </div>
                )}
                <div className="absolute top-2 left-2 text-xs text-matrix-400">
                  Neural Activity Pattern
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="neural-card p-6">
              <h3 className="text-xl font-neural text-matrix-300 mb-4 uppercase tracking-wider">
                Quick Actions
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/marketplace" className="quantum-btn text-center p-4">
                  📦<br/>Marketplace<br/>Licitații
                </Link>
                
                <Link href="/quantum" className="quantum-btn text-center p-4">
                  ⚡<br/>Quantum<br/>Optimize
                </Link>
                
                <Link href="/fleet" className="quantum-btn text-center p-4">
                  🚛<br/>Fleet<br/>Manager
                </Link>
                
                <Link href="/agents" className="quantum-btn text-center p-4">
                  🤖<br/>AI Agents<br/>Control
                </Link>
              </div>
            </div>

            {/* System Logs */}
            <div className="neural-card p-6">
              <h3 className="text-xl font-neural text-matrix-300 mb-4 uppercase tracking-wider">
                System Activity Log
              </h3>
              
              <div className="space-y-2 max-h-40 overflow-y-auto font-cyber text-sm">
                <div className="text-matrix-400">[{isClient && currentTime ? currentTime.toLocaleTimeString() : '--:--:--'}] ARIA: Route optimization completed - 23% efficiency gain</div>
                <div className="text-cyber-cyan">[{isClient ? new Date(Date.now() - 15000).toLocaleTimeString() : '--:--:--'}] NEXUS: New transport request processed</div>
                <div className="text-cyber-purple">[{isClient ? new Date(Date.now() - 32000).toLocaleTimeString() : '--:--:--'}] QUBIT: Quantum coherence maintained at 96%</div>
                <div className="text-cyber-yellow">[{isClient ? new Date(Date.now() - 47000).toLocaleTimeString() : '--:--:--'}] SIGMA: Predictive model updated</div>
                <div className="text-matrix-400">[{isClient ? new Date(Date.now() - 63000).toLocaleTimeString() : '--:--:--'}] System: Neural network synchronization complete</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
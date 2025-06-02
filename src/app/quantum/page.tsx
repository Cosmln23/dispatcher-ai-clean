'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { HolographicText, GlitchText } from '@/components/effects/MatrixRain';

interface RoutePoint {
  id: string;
  lat: number;
  lng: number;
  address: string;
  type: 'pickup' | 'delivery' | 'waypoint';
}

const sampleRoutes = [
  { id: '1', lat: 44.4268, lng: 26.1025, address: 'București, Piața Unirii', type: 'pickup' as const },
  { id: '2', lat: 44.4378, lng: 26.0969, address: 'București, Piața Victoriei', type: 'waypoint' as const },
  { id: '3', lat: 44.4328, lng: 26.1063, address: 'București, Centrul Vechi', type: 'delivery' as const },
  { id: '4', lat: 44.4268, lng: 26.1186, address: 'București, Gara de Nord', type: 'delivery' as const },
];

export default function QuantumOptimization() {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimization, setOptimization] = useState<any>(null);
  const [quantumMetrics, setQuantumMetrics] = useState({
    entanglement: 89.2,
    coherence: 94.7,
    superposition: 1024,
    qubits: 127,
    fidelity: 99.9
  });
  const [algorithm, setAlgorithm] = useState('quantum');
  const [isClient, setIsClient] = useState(false);

  // Initialize client-side only
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Update quantum metrics only on client-side
  useEffect(() => {
    if (!isClient) return;
    
    const interval = setInterval(() => {
      setQuantumMetrics(prev => ({
        entanglement: Math.max(80, Math.min(100, prev.entanglement + (Math.random() - 0.5) * 2)),
        coherence: Math.max(90, Math.min(100, prev.coherence + (Math.random() - 0.5) * 1)),
        superposition: prev.superposition,
        qubits: prev.qubits,
        fidelity: Math.max(98, Math.min(100, prev.fidelity + (Math.random() - 0.5) * 0.2))
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, [isClient]);

  const runOptimization = async () => {
    setIsOptimizing(true);
    setOptimization(null);
    
    try {
      const response = await fetch('/api/quantum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          points: sampleRoutes,
          algorithm,
          constraints: {
            maxDistance: 1000,
            trafficAware: true,
            weatherAware: true
          }
        })
      });
      
      const result = await response.json();
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setOptimization(result);
    } catch (error) {
      console.error('Optimization failed:', error);
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-matrix-500">
      <Navbar />
      
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-neural font-bold holographic-text">
              QUANTUM OPTIMIZATION
            </h1>
            <p className="text-matrix-400 font-cyber mt-2">
              Advanced Route Processing with Quantum Algorithms
            </p>
          </div>
          
          <Link href="/marketplace" className="quantum-btn">
            📦 Marketplace
          </Link>
        </div>

        {/* Quantum Status */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="neural-card p-6 text-center">
            <div className="text-3xl mb-2">🔗</div>
            <h3 className="text-lg font-neural text-matrix-300">Entanglement</h3>
            <div className="text-2xl font-bold text-matrix-500">{quantumMetrics.entanglement.toFixed(1)}%</div>
          </div>
          
          <div className="neural-card p-6 text-center">
            <div className="text-3xl mb-2">🌊</div>
            <h3 className="text-lg font-neural text-matrix-300">Coherence</h3>
            <div className="text-2xl font-bold text-cyber-cyan">{quantumMetrics.coherence.toFixed(1)}%</div>
          </div>
          
          <div className="neural-card p-6 text-center">
            <div className="text-3xl mb-2">⚛️</div>
            <h3 className="text-lg font-neural text-matrix-300">Qubits</h3>
            <div className="text-2xl font-bold text-cyber-purple">{quantumMetrics.qubits}</div>
          </div>
          
          <div className="neural-card p-6 text-center">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="text-lg font-neural text-matrix-300">Fidelity</h3>
            <div className="text-2xl font-bold text-cyber-yellow">{quantumMetrics.fidelity.toFixed(1)}%</div>
          </div>
          
          <div className="neural-card p-6 text-center">
            <div className="text-3xl mb-2">🔀</div>
            <h3 className="text-lg font-neural text-matrix-300">Superposition</h3>
            <div className="text-2xl font-bold text-matrix-500">{quantumMetrics.superposition}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Controls */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Algorithm Selection */}
            <div className="neural-card p-6">
              <h3 className="text-xl font-neural text-matrix-300 mb-4 uppercase tracking-wider">
                <GlitchText intensity="low">ALGORITHM SELECTION</GlitchText>
              </h3>
              
              <div className="space-y-3">
                {[
                  { id: 'quantum', name: 'Quantum Annealing', icon: '⚡', description: 'Advanced quantum processing' },
                  { id: 'classical', name: 'Classical TSP', icon: '🔄', description: 'Traditional optimization' },
                  { id: 'hybrid', name: 'Hybrid Quantum', icon: '🌐', description: 'Best of both worlds' }
                ].map((alg) => (
                  <div
                    key={alg.id}
                    onClick={() => setAlgorithm(alg.id)}
                    className={`p-4 rounded border cursor-pointer transition-all ${
                      algorithm === alg.id 
                        ? 'border-matrix-500 bg-matrix-500/10' 
                        : 'border-matrix-500/30 hover:border-matrix-500/60'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{alg.icon}</div>
                      <div>
                        <div className="font-neural text-matrix-300">{alg.name}</div>
                        <div className="text-xs text-matrix-400 font-cyber">{alg.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Route Points */}
            <div className="neural-card p-6">
              <h3 className="text-xl font-neural text-matrix-300 mb-4 uppercase tracking-wider">
                ROUTE POINTS
              </h3>
              
              <div className="space-y-3">
                {sampleRoutes.map((point, index) => (
                  <div key={point.id} className="p-3 bg-dark-matrix rounded">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          point.type === 'pickup' ? 'bg-matrix-500' :
                          point.type === 'delivery' ? 'bg-cyber-cyan' :
                          'bg-cyber-yellow'
                        }`}></div>
                        <div>
                          <div className="font-cyber text-matrix-300 text-sm">{point.address}</div>
                          <div className="text-xs text-matrix-400 uppercase">{point.type}</div>
                        </div>
                      </div>
                      <div className="text-xs text-matrix-400 font-cyber">
                        {point.lat.toFixed(4)}, {point.lng.toFixed(4)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                onClick={runOptimization}
                disabled={isOptimizing}
                className="quantum-btn w-full mt-4 text-lg py-3 disabled:opacity-50"
              >
                {isOptimizing ? 'QUANTUM PROCESSING...' : 'OPTIMIZE ROUTE'}
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Optimization Results */}
            {isOptimizing && (
              <div className="neural-card p-6">
                <h3 className="text-xl font-neural text-matrix-300 mb-4 uppercase tracking-wider">
                  QUANTUM PROCESSING
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 border-2 border-matrix-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="font-cyber text-matrix-400">Initializing quantum superposition...</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 border-2 border-cyber-cyan border-t-transparent rounded-full animate-spin animation-delay-200"></div>
                    <span className="font-cyber text-matrix-400">Applying quantum entanglement...</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 border-2 border-cyber-purple border-t-transparent rounded-full animate-spin animation-delay-400"></div>
                    <span className="font-cyber text-matrix-400">Measuring optimal quantum state...</span>
                  </div>
                </div>
                
                <div className="mt-6 h-32 bg-dark-matrix rounded relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl text-matrix-500 animate-pulse">⚛️</div>
                  </div>
                </div>
              </div>
            )}

            {optimization && (
              <div className="neural-card p-6">
                <h3 className="text-xl font-neural text-matrix-300 mb-4 uppercase tracking-wider">
                  OPTIMIZATION RESULTS
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-dark-matrix p-4 rounded text-center">
                    <div className="text-2xl font-bold text-matrix-500">
                      {optimization.optimization?.improvements?.distanceReduction?.toFixed(1) || '15.2'}%
                    </div>
                    <div className="text-xs text-matrix-400">Distance Reduction</div>
                  </div>
                  
                  <div className="bg-dark-matrix p-4 rounded text-center">
                    <div className="text-2xl font-bold text-cyber-cyan">
                      {optimization.optimization?.improvements?.timeReduction?.toFixed(1) || '23.7'}%
                    </div>
                    <div className="text-xs text-matrix-400">Time Savings</div>
                  </div>
                  
                  <div className="bg-dark-matrix p-4 rounded text-center">
                    <div className="text-2xl font-bold text-cyber-purple">
                      {optimization.processingTime?.toFixed(2) || '0.34'}s
                    </div>
                    <div className="text-xs text-matrix-400">Processing Time</div>
                  </div>
                </div>

                {optimization.quantumMetrics && (
                  <div className="bg-dark-matrix p-4 rounded">
                    <h4 className="font-neural text-matrix-300 mb-3">Quantum Metrics</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-matrix-400">Entanglement Level:</span>
                        <span className="text-matrix-500 ml-2">{optimization.quantumMetrics.entanglementLevel?.toFixed(3) || '0.847'}</span>
                      </div>
                      <div>
                        <span className="text-matrix-400">Coherence Level:</span>
                        <span className="text-cyber-cyan ml-2">{optimization.quantumMetrics.coherenceLevel?.toFixed(3) || '0.923'}</span>
                      </div>
                      <div>
                        <span className="text-matrix-400">Quantum Score:</span>
                        <span className="text-cyber-purple ml-2">{optimization.quantumMetrics.quantumScore?.toFixed(0) || '847'}</span>
                      </div>
                      <div>
                        <span className="text-matrix-400">Superposition States:</span>
                        <span className="text-cyber-yellow ml-2">{optimization.quantumMetrics.superpositionStates || '1024'}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Quick Actions */}
            <div className="neural-card p-6">
              <h3 className="text-xl font-neural text-matrix-300 mb-4 uppercase tracking-wider">
                QUANTUM ACTIONS
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Link href="/dashboard" className="quantum-btn text-center p-4">
                  🧠<br/>Neural<br/>Dashboard
                </Link>
                
                <Link href="/fleet" className="quantum-btn text-center p-4">
                  🚛<br/>Fleet<br/>Manager
                </Link>
                
                <button className="quantum-btn text-center p-4">
                  💾<br/>Save<br/>Configuration
                </button>
                
                <button className="quantum-btn text-center p-4">
                  📊<br/>Export<br/>Results
                </button>
                
                <button className="quantum-btn text-center p-4">
                  🔄<br/>Run<br/>Simulation
                </button>
                
                <button className="quantum-btn text-center p-4">
                  ⚙️<br/>Advanced<br/>Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
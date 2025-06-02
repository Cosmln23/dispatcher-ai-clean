'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { HolographicText, GlitchText } from '@/components/effects/MatrixRain';

interface Vehicle {
  id: string;
  name: string;
  type: 'truck' | 'van' | 'drone' | 'autonomous';
  status: 'active' | 'idle' | 'maintenance' | 'charging';
  location: { lat: number; lng: number; address: string };
  battery?: number;
  cargo: number;
  efficiency: number;
  driver?: string;
}

const generateMockFleet = (): Vehicle[] => [
  {
    id: 'V001',
    name: 'ARIA PRIME',
    type: 'autonomous',
    status: 'active',
    location: { lat: 44.4268, lng: 26.1025, address: 'București, Piața Unirii' },
    battery: 87,
    cargo: 75,
    efficiency: 94,
  },
  {
    id: 'V002', 
    name: 'NEXUS CARGO',
    type: 'truck',
    status: 'active',
    location: { lat: 44.4378, lng: 26.0969, address: 'București, Piața Victoriei' },
    cargo: 92,
    efficiency: 89,
    driver: 'Ion Popescu'
  },
  {
    id: 'V003',
    name: 'SIGMA SWIFT',
    type: 'van',
    status: 'idle',
    location: { lat: 44.4328, lng: 26.1063, address: 'București, Centrul Vechi' },
    battery: 45,
    cargo: 0,
    efficiency: 91,
    driver: 'Maria Ionescu'
  },
  {
    id: 'V004',
    name: 'NOVA DRONE',
    type: 'drone',
    status: 'charging',
    location: { lat: 44.4268, lng: 26.1186, address: 'București, Gara de Nord' },
    battery: 23,
    cargo: 15,
    efficiency: 96,
  },
  {
    id: 'V005',
    name: 'QUBIT TRANSPORT',
    type: 'autonomous',
    status: 'maintenance',
    location: { lat: 44.4195, lng: 26.0969, address: 'București, Depoul Central' },
    battery: 0,
    cargo: 0,
    efficiency: 85,
  }
];

const VehicleCard = ({ vehicle, onDispatch }: { vehicle: Vehicle; onDispatch: (id: string) => void }) => {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'text-matrix-500';
      case 'idle': return 'text-cyber-cyan';
      case 'maintenance': return 'text-cyber-red';
      case 'charging': return 'text-cyber-yellow';
      default: return 'text-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'truck': return '🚛';
      case 'van': return '🚐';
      case 'drone': return '🛸';
      case 'autonomous': return '🤖';
      default: return '🚗';
    }
  };

  return (
    <div className="neural-card p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{getTypeIcon(vehicle.type)}</div>
          <div>
            <h4 className="font-neural text-matrix-300 font-semibold">{vehicle.name}</h4>
            <p className="text-xs text-matrix-400 font-cyber">{vehicle.id} • {vehicle.type.toUpperCase()}</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className={`text-lg font-bold ${getStatusColor(vehicle.status)}`}>
            {vehicle.status.toUpperCase()}
          </div>
          <div className="text-xs text-matrix-400">
            Efficiency: {vehicle.efficiency}%
          </div>
        </div>
      </div>

      {/* Vehicle Metrics */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {vehicle.battery !== undefined && (
          <div className="bg-dark-matrix p-2 rounded text-center">
            <div className="text-xs text-matrix-400">Battery</div>
            <div className={`text-lg font-bold ${vehicle.battery > 50 ? 'text-matrix-500' : vehicle.battery > 20 ? 'text-cyber-yellow' : 'text-cyber-red'}`}>
              {vehicle.battery}%
            </div>
          </div>
        )}
        
        <div className="bg-dark-matrix p-2 rounded text-center">
          <div className="text-xs text-matrix-400">Cargo</div>
          <div className="text-lg font-bold text-cyber-cyan">{vehicle.cargo}%</div>
        </div>
        
        <div className="bg-dark-matrix p-2 rounded text-center">
          <div className="text-xs text-matrix-400">Efficiency</div>
          <div className="text-lg font-bold text-cyber-purple">{vehicle.efficiency}%</div>
        </div>
      </div>

      {/* Location */}
      <div className="mb-4">
        <div className="text-xs text-matrix-400 mb-1">Current Location</div>
        <div className="text-sm font-cyber text-matrix-300">{vehicle.location.address}</div>
        <div className="text-xs text-matrix-400">
          {vehicle.location.lat.toFixed(4)}, {vehicle.location.lng.toFixed(4)}
        </div>
      </div>

      {/* Driver Info */}
      {vehicle.driver && (
        <div className="mb-4">
          <div className="text-xs text-matrix-400 mb-1">Driver</div>
          <div className="text-sm font-cyber text-matrix-300">{vehicle.driver}</div>
        </div>
      )}

      {/* Actions */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onDispatch(vehicle.id)}
          disabled={vehicle.status === 'maintenance' || vehicle.status === 'charging'}
          className="quantum-btn text-xs py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {vehicle.status === 'active' ? 'REDIRECT' : 'DISPATCH'}
        </button>
        
        <button className="quantum-btn text-xs py-2">
          TRACK
        </button>
      </div>
    </div>
  );
};

export default function FleetManagement() {
  const [fleet, setFleet] = useState<Vehicle[]>(generateMockFleet());
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [metrics, setMetrics] = useState({
    totalVehicles: 5,
    activeVehicles: 2,
    utilization: 78,
    efficiency: 91
  });
  const [isClient, setIsClient] = useState(false);

  // Initialize client-side only
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Update fleet data only on client-side
  useEffect(() => {
    if (!isClient) return;
    
    const interval = setInterval(() => {
      setFleet(prev => prev.map(vehicle => ({
        ...vehicle,
        battery: vehicle.battery !== undefined ? Math.max(0, Math.min(100, vehicle.battery + (Math.random() - 0.3) * 5)) : undefined,
        cargo: Math.max(0, Math.min(100, vehicle.cargo + (Math.random() - 0.5) * 10)),
        efficiency: Math.max(70, Math.min(100, vehicle.efficiency + (Math.random() - 0.5) * 2))
      })));
      
      setMetrics(prev => ({
        ...prev,
        utilization: Math.max(60, Math.min(100, prev.utilization + (Math.random() - 0.5) * 5)),
        efficiency: Math.max(80, Math.min(100, prev.efficiency + (Math.random() - 0.5) * 3))
      }));
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isClient]);

  const handleDispatch = (vehicleId: string) => {
    console.log(`Dispatching vehicle ${vehicleId}`);
    // Here you would integrate with the quantum optimization API
  };

  const activeVehicles = fleet.filter(v => v.status === 'active').length;
  const averageBattery = fleet.filter(v => v.battery !== undefined)
    .reduce((sum, v) => sum + (v.battery || 0), 0) / fleet.filter(v => v.battery !== undefined).length;

  return (
    <div className="min-h-screen bg-black text-matrix-500">
      <Navbar />
      
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-neural font-bold holographic-text">
              FLEET MANAGEMENT
            </h1>
            <p className="text-matrix-400 font-cyber mt-2">
              Neural Transport Vehicle Control System
            </p>
          </div>
          
          <Link href="/marketplace" className="quantum-btn">
            📦 Marketplace
          </Link>
        </div>

        {/* Fleet Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="neural-card p-6 text-center">
            <div className="text-3xl mb-2">🚛</div>
            <h3 className="text-lg font-neural text-matrix-300">Total Fleet</h3>
            <div className="text-2xl font-bold holographic-text">{fleet.length}</div>
          </div>
          
          <div className="neural-card p-6 text-center">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="text-lg font-neural text-matrix-300">Active Vehicles</h3>
            <div className="text-2xl font-bold text-matrix-500">{activeVehicles}</div>
          </div>
          
          <div className="neural-card p-6 text-center">
            <div className="text-3xl mb-2">🔋</div>
            <h3 className="text-lg font-neural text-matrix-300">Avg Battery</h3>
            <div className="text-2xl font-bold text-cyber-cyan">{averageBattery.toFixed(0)}%</div>
          </div>
          
          <div className="neural-card p-6 text-center">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="text-lg font-neural text-matrix-300">Fleet Efficiency</h3>
            <div className="text-2xl font-bold text-cyber-purple">{metrics.efficiency}%</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Vehicle List */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-neural text-matrix-300 mb-6 uppercase tracking-wider">
              <GlitchText intensity="low">VEHICLE STATUS</GlitchText>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fleet.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onDispatch={handleDispatch}
                />
              ))}
            </div>
          </div>

          {/* Control Panel */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Fleet Actions */}
            <div className="neural-card p-6">
              <h3 className="text-xl font-neural text-matrix-300 mb-4 uppercase tracking-wider">
                FLEET OPERATIONS
              </h3>
              
              <div className="space-y-3">
                <Link href="/quantum" className="quantum-btn w-full text-center py-3">
                  ⚡ QUANTUM ROUTE OPTIMIZATION
                </Link>
                
                <button className="quantum-btn w-full text-center py-3">
                  🎯 AUTO-DISPATCH ALL
                </button>
                
                <button className="quantum-btn w-full text-center py-3">
                  🔄 SYNCHRONIZE FLEET
                </button>
                
                <button className="quantum-btn w-full text-center py-3">
                  📊 GENERATE REPORT
                </button>
              </div>
            </div>

            {/* Fleet Status */}
            <div className="neural-card p-6">
              <h3 className="text-xl font-neural text-matrix-300 mb-4 uppercase tracking-wider">
                SYSTEM STATUS
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-matrix-400 font-cyber">Fleet Utilization</span>
                  <span className="text-matrix-500 font-bold">{metrics.utilization}%</span>
                </div>
                
                <div className="w-full bg-dark-matrix rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-matrix-500 to-cyber-cyan transition-all duration-1000"
                    style={{ width: `${metrics.utilization}%` }}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                  <div className="bg-dark-matrix p-3 rounded">
                    <div className="text-matrix-400">Active Routes</div>
                    <div className="text-matrix-500 text-lg font-bold">12</div>
                  </div>
                  
                  <div className="bg-dark-matrix p-3 rounded">
                    <div className="text-matrix-400">Pending Orders</div>
                    <div className="text-cyber-cyan text-lg font-bold">7</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="neural-card p-6">
              <h3 className="text-xl font-neural text-matrix-300 mb-4 uppercase tracking-wider">
                PERFORMANCE METRICS
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-matrix-400 font-cyber">Deliveries Today</span>
                  <span className="text-matrix-500 font-bold">47</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-matrix-400 font-cyber">Fuel Savings</span>
                  <span className="text-cyber-cyan font-bold">23.4%</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-matrix-400 font-cyber">On-Time Rate</span>
                  <span className="text-cyber-purple font-bold">96.8%</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-matrix-400 font-cyber">Customer Satisfaction</span>
                  <span className="text-cyber-yellow font-bold">4.9/5</span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="neural-card p-6">
              <h3 className="text-xl font-neural text-matrix-300 mb-4 uppercase tracking-wider">
                QUICK ACCESS
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                <Link href="/dashboard" className="quantum-btn text-center p-3 text-sm">
                  🧠<br/>Dashboard
                </Link>
                
                <Link href="/agents" className="quantum-btn text-center p-3 text-sm">
                  🤖<br/>AI Agents
                </Link>
                
                <button className="quantum-btn text-center p-3 text-sm">
                  📱<br/>Mobile App
                </button>
                
                <button className="quantum-btn text-center p-3 text-sm">
                  ⚙️<br/>Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
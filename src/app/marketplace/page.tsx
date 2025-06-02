'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { HolographicText, GlitchText } from '@/components/effects/MatrixRain';

interface CargoListing {
  id: string;
  title: string;
  description: string;
  weight: number;
  pickup: { address: string; date: string; };
  delivery: { address: string; date: string; };
  budget: number;
  bids: number;
  status: 'open' | 'assigned' | 'completed';
  urgency: 'low' | 'medium' | 'high';
  postedBy: string;
}

const mockListings: CargoListing[] = [
  {
    id: 'CRG001',
    title: 'Mobilier de birou - București → Cluj',
    description: 'Transport mobilier de birou nou: 3 birouri, 5 scaune, 2 dulapuri. Necesită atenție specială la manipulare.',
    weight: 450,
    pickup: { address: 'București, Strada Victoriei 125', date: '2025-01-20' },
    delivery: { address: 'Cluj-Napoca, Strada Dorobanților 45', date: '2025-01-21' },
    budget: 850,
    bids: 3,
    status: 'open',
    urgency: 'medium',
    postedBy: 'SC Office Solutions SRL'
  },
  {
    id: 'CRG002',
    title: 'Echipamente medicale - Timișoara → București',
    description: 'Transport urgent echipamente medicale sensibile. Necesită refrigerare și manipulare foarte atentă.',
    weight: 120,
    pickup: { address: 'Timișoara, Calea Aradului 67', date: '2025-01-16' },
    delivery: { address: 'București, Spitalul Universitar', date: '2025-01-16' },
    budget: 1200,
    bids: 1,
    status: 'open',
    urgency: 'high',
    postedBy: 'Spitalul Municipal Timișoara'
  },
  {
    id: 'CRG003',
    title: 'Materiale de construcție - Iași → Constanța',
    description: 'Transport materiale de construcție: cărămizi, ciment, fierărie. Încărcare cu macara.',
    weight: 2500,
    pickup: { address: 'Iași, Zona Industrială Tomești', date: '2025-01-18' },
    delivery: { address: 'Constanța, Șantier Mamaia Nord', date: '2025-01-19' },
    budget: 1500,
    bids: 5,
    status: 'assigned',
    urgency: 'low',
    postedBy: 'BuildCorp Construction'
  }
];

const PostCargoModal = ({ isOpen, onClose, onSubmit }: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    weight: '',
    pickupAddress: '',
    pickupDate: '',
    deliveryAddress: '',
    deliveryDate: '',
    budget: '',
    urgency: 'medium'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    // Reset form
    setFormData({
      title: '',
      description: '',
      weight: '',
      pickupAddress: '',
      pickupDate: '',
      deliveryAddress: '',
      deliveryDate: '',
      budget: '',
      urgency: 'medium'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="neural-card p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-neural text-matrix-300 font-bold">
            📦 Postează Marfă Nouă
          </h2>
          <button
            onClick={onClose}
            className="text-matrix-400 hover:text-matrix-300 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-cyber text-matrix-400 mb-2">Titlu</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-dark-matrix border border-matrix-500/30 rounded-lg px-3 py-2 text-matrix-300 font-cyber focus:border-matrix-500 focus:outline-none"
              placeholder="ex: Mobilier de birou - București → Cluj"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-cyber text-matrix-400 mb-2">Descriere</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full bg-dark-matrix border border-matrix-500/30 rounded-lg px-3 py-2 text-matrix-300 font-cyber focus:border-matrix-500 focus:outline-none h-24 resize-none"
              placeholder="Descrie marfa și cerințele speciale..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-cyber text-matrix-400 mb-2">Greutate (kg)</label>
            <input
              type="number"
              value={formData.weight}
              onChange={(e) => setFormData({...formData, weight: e.target.value})}
              className="w-full bg-dark-matrix border border-matrix-500/30 rounded-lg px-3 py-2 text-matrix-300 font-cyber focus:border-matrix-500 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-matrix-300 font-cyber font-semibold mb-3">📍 Ridicare</h4>
              <input
                type="text"
                value={formData.pickupAddress}
                onChange={(e) => setFormData({...formData, pickupAddress: e.target.value})}
                className="w-full bg-dark-matrix border border-matrix-500/30 rounded-lg px-3 py-2 text-matrix-300 font-cyber focus:border-matrix-500 focus:outline-none mb-3"
                placeholder="Adresa de ridicare"
                required
              />
              <input
                type="date"
                value={formData.pickupDate}
                onChange={(e) => setFormData({...formData, pickupDate: e.target.value})}
                className="w-full bg-dark-matrix border border-matrix-500/30 rounded-lg px-3 py-2 text-matrix-300 font-cyber focus:border-matrix-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <h4 className="text-matrix-300 font-cyber font-semibold mb-3">🎯 Livrare</h4>
              <input
                type="text"
                value={formData.deliveryAddress}
                onChange={(e) => setFormData({...formData, deliveryAddress: e.target.value})}
                className="w-full bg-dark-matrix border border-matrix-500/30 rounded-lg px-3 py-2 text-matrix-300 font-cyber focus:border-matrix-500 focus:outline-none mb-3"
                placeholder="Adresa de livrare"
                required
              />
              <input
                type="date"
                value={formData.deliveryDate}
                onChange={(e) => setFormData({...formData, deliveryDate: e.target.value})}
                className="w-full bg-dark-matrix border border-matrix-500/30 rounded-lg px-3 py-2 text-matrix-300 font-cyber focus:border-matrix-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-cyber text-matrix-400 mb-2">Budget maxim (RON)</label>
              <input
                type="number"
                value={formData.budget}
                onChange={(e) => setFormData({...formData, budget: e.target.value})}
                className="w-full bg-dark-matrix border border-matrix-500/30 rounded-lg px-3 py-2 text-matrix-300 font-cyber focus:border-matrix-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-cyber text-matrix-400 mb-2">Urgență</label>
              <select
                value={formData.urgency}
                onChange={(e) => setFormData({...formData, urgency: e.target.value})}
                className="w-full bg-dark-matrix border border-matrix-500/30 rounded-lg px-3 py-2 text-matrix-300 font-cyber focus:border-matrix-500 focus:outline-none"
              >
                <option value="low">Scăzută</option>
                <option value="medium">Medie</option>
                <option value="high">Înaltă</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600/20 text-gray-300 border border-gray-600/50 rounded-lg py-3 text-sm font-cyber hover:bg-gray-600/30 transition-all"
            >
              Anulează
            </button>
            <button
              type="submit"
              className="flex-1 quantum-btn py-3"
            >
              📦 Postează Marfa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function Marketplace() {
  const [listings, setListings] = useState<CargoListing[]>(mockListings);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getUrgencyColor = (urgency: string) => {
    switch(urgency) {
      case 'high': return 'text-red-400 bg-red-400/10 border-red-400/30';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'low': return 'text-green-400 bg-green-400/10 border-green-400/30';
      default: return 'text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'open': return 'text-matrix-500 bg-matrix-500/10 border-matrix-500/30';
      case 'assigned': return 'text-cyber-cyan bg-cyber-cyan/10 border-cyber-cyan/30';
      case 'completed': return 'text-green-400 bg-green-400/10 border-green-400/30';
      default: return 'text-gray-400';
    }
  };

  const handlePostCargo = (data: any) => {
    console.log('New cargo posted:', data);
    // În implementarea reală, ar trimite datele către server
    const newListing: CargoListing = {
      id: `CRG${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      title: data.title,
      description: data.description,
      weight: parseInt(data.weight),
      pickup: { address: data.pickupAddress, date: data.pickupDate },
      delivery: { address: data.deliveryAddress, date: data.deliveryDate },
      budget: parseInt(data.budget),
      bids: 0,
      status: 'open',
      urgency: data.urgency,
      postedBy: 'User Demo'
    };
    setListings(prev => [newListing, ...prev]);
  };

  const filteredListings = listings.filter(listing => {
    if (filter === 'all') return true;
    return listing.status === filter;
  });

  return (
    <div className="min-h-screen bg-black text-matrix-500">
      <Navbar />
      
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-neural font-bold holographic-text">
              MARKETPLACE
            </h1>
            <p className="text-matrix-400 font-cyber mt-2">
              Platformă de licitații pentru transport marfă - 2025
            </p>
          </div>
          
          <button
            onClick={() => setIsPostModalOpen(true)}
            className="quantum-btn px-6 py-3"
          >
            📦 Postează Marfă
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="neural-card p-6 text-center">
            <div className="text-3xl mb-2">📦</div>
            <h3 className="text-lg font-neural text-matrix-300">Active</h3>
            <div className="text-2xl font-bold holographic-text">
              {listings.filter(l => l.status === 'open').length}
            </div>
          </div>
          
          <div className="neural-card p-6 text-center">
            <div className="text-3xl mb-2">🚛</div>
            <h3 className="text-lg font-neural text-matrix-300">În transport</h3>
            <div className="text-2xl font-bold text-cyber-cyan">
              {listings.filter(l => l.status === 'assigned').length}
            </div>
          </div>
          
          <div className="neural-card p-6 text-center">
            <div className="text-3xl mb-2">✅</div>
            <h3 className="text-lg font-neural text-matrix-300">Completate</h3>
            <div className="text-2xl font-bold text-green-400">
              {listings.filter(l => l.status === 'completed').length}
            </div>
          </div>
          
          <div className="neural-card p-6 text-center">
            <div className="text-3xl mb-2">💰</div>
            <h3 className="text-lg font-neural text-matrix-300">Valoare totală</h3>
            <div className="text-2xl font-bold text-cyber-yellow">
              {listings.reduce((sum, l) => sum + l.budget, 0).toLocaleString()} RON
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex space-x-3 mb-6">
          {[
            { key: 'all', label: 'Toate', icon: '📋' },
            { key: 'open', label: 'Deschise', icon: '🟢' },
            { key: 'assigned', label: 'Asignate', icon: '🚛' },
            { key: 'completed', label: 'Completate', icon: '✅' }
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setFilter(item.key)}
              className={`px-4 py-2 rounded-lg text-sm font-cyber transition-all flex items-center space-x-2 ${
                filter === item.key
                  ? 'bg-matrix-500/20 text-matrix-300 border border-matrix-500/50'
                  : 'text-matrix-400 hover:text-matrix-300 hover:bg-matrix-500/10'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Listings */}
        <div className="space-y-6">
          {filteredListings.map((listing) => (
            <div key={listing.id} className="neural-card p-6 hover:border-matrix-500/60 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-neural text-matrix-300 font-semibold">
                      {listing.title}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-cyber border ${getUrgencyColor(listing.urgency)}`}>
                      {listing.urgency.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-cyber border ${getStatusColor(listing.status)}`}>
                      {listing.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-matrix-400 font-cyber mb-3">
                    {listing.description}
                  </p>
                </div>
                
                <div className="text-right ml-4">
                  <div className="text-2xl font-bold text-matrix-500">
                    {listing.budget} RON
                  </div>
                  <div className="text-xs text-matrix-400">Budget maxim</div>
                </div>
              </div>

              {/* Route Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-dark-matrix p-3 rounded">
                  <div className="text-xs text-matrix-400 mb-1">📍 RIDICARE</div>
                  <div className="text-sm font-cyber text-matrix-300">{listing.pickup.address}</div>
                  <div className="text-xs text-matrix-500">{listing.pickup.date}</div>
                </div>
                
                <div className="bg-dark-matrix p-3 rounded">
                  <div className="text-xs text-matrix-400 mb-1">🎯 LIVRARE</div>
                  <div className="text-sm font-cyber text-matrix-300">{listing.delivery.address}</div>
                  <div className="text-xs text-matrix-500">{listing.delivery.date}</div>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-cyber-cyan">{listing.weight} kg</div>
                  <div className="text-xs text-matrix-400">Greutate</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-cyber-yellow">{listing.bids}</div>
                  <div className="text-xs text-matrix-400">Oferte</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-matrix-400 mb-1">Postat de</div>
                  <div className="text-sm font-cyber text-matrix-300">{listing.postedBy}</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <button className="flex-1 quantum-btn text-center py-2">
                  👁️ Vezi Detalii
                </button>
                
                {listing.status === 'open' && (
                  <button className="flex-1 bg-matrix-500/20 text-matrix-300 border border-matrix-500/50 rounded-lg py-2 text-sm font-cyber hover:bg-matrix-500/30 transition-all">
                    💰 Fă Ofertă
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-neural text-matrix-300 mb-2">
              Nu sunt mărfuri disponibile
            </h3>
            <p className="text-matrix-400 font-cyber">
              Încearcă să modifici filtrele sau postează o marfă nouă.
            </p>
          </div>
        )}

        {/* Quick Links */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/dashboard" className="neural-card p-6 text-center hover:border-matrix-500/60 transition-all">
            <div className="text-4xl mb-3">🧠</div>
            <h3 className="font-neural text-matrix-300 mb-2">Neural Dashboard</h3>
            <p className="text-sm text-matrix-400 font-cyber">Monitorizare sistem complet</p>
          </Link>
          
          <Link href="/fleet" className="neural-card p-6 text-center hover:border-matrix-500/60 transition-all">
            <div className="text-4xl mb-3">🚛</div>
            <h3 className="font-neural text-matrix-300 mb-2">Fleet Management</h3>
            <p className="text-sm text-matrix-400 font-cyber">Gestionare vehicule transport</p>
          </Link>
          
          <Link href="/quantum" className="neural-card p-6 text-center hover:border-matrix-500/60 transition-all">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-neural text-matrix-300 mb-2">Quantum Routes</h3>
            <p className="text-sm text-matrix-400 font-cyber">Optimizare rute avansată</p>
          </Link>
        </div>
      </div>

      {/* Post Cargo Modal */}
      <PostCargoModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onSubmit={handlePostCargo}
      />
    </div>
  );
} 
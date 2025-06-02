'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/dashboard', label: 'Dashboard', icon: '🧠' },
    { href: '/marketplace', label: 'Marketplace', icon: '📦' },
    { href: '/quantum', label: 'Quantum Routes', icon: '⚡' },
    { href: '/fleet', label: 'Fleet', icon: '🚛' },
    { href: '/agents', label: 'AI Agents', icon: '🤖' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="bg-black/95 backdrop-blur-md border-b border-matrix-500/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="text-2xl animate-pulse">🚛</div>
            <div className="flex flex-col">
              <span className="text-xl font-neural font-bold holographic-text group-hover:text-matrix-500 transition-colors">
                DispatcherAI
              </span>
              <span className="text-xs text-matrix-400 font-cyber">
                Neural Transport 2025
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-cyber transition-all duration-300 flex items-center space-x-2 ${
                  isActive(item.href)
                    ? 'bg-matrix-500/20 text-matrix-300 border border-matrix-500/50'
                    : 'text-matrix-400 hover:text-matrix-300 hover:bg-matrix-500/10'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="px-4 py-2 text-sm font-cyber text-matrix-400 hover:text-matrix-300 transition-colors">
              🔔 Notifications
            </button>
            <button className="px-4 py-2 bg-matrix-500/20 text-matrix-300 border border-matrix-500/50 rounded-lg text-sm font-cyber hover:bg-matrix-500/30 transition-all">
              👤 Profile
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-matrix-400 hover:text-matrix-300 hover:bg-matrix-500/10 transition-all"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-matrix-500/30">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm font-cyber transition-all flex items-center space-x-3 ${
                    isActive(item.href)
                      ? 'bg-matrix-500/20 text-matrix-300 border border-matrix-500/50'
                      : 'text-matrix-400 hover:text-matrix-300 hover:bg-matrix-500/10'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
              
              <div className="border-t border-matrix-500/30 pt-3 mt-3">
                <button className="block w-full text-left px-3 py-2 text-sm font-cyber text-matrix-400 hover:text-matrix-300 transition-colors">
                  🔔 Notifications
                </button>
                <button className="block w-full text-left px-3 py-2 text-sm font-cyber text-matrix-400 hover:text-matrix-300 transition-colors">
                  👤 Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quantum Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-full w-full bg-gradient-to-r from-matrix-500/5 via-transparent to-cyber-cyan/5 opacity-50"></div>
      </div>
    </nav>
  );
};

export default Navbar; 
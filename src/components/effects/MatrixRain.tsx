'use client';

import React, { useEffect, useRef, useState } from 'react';

interface MatrixChar {
  char: string;
  x: number;
  y: number;
  speed: number;
  opacity: number;
}

export const MatrixRainProvider: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Matrix characters - mix of Japanese katakana, numbers, and symbols
    const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()+-=[]{}|;:,.<>?アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    let animationId: number;
    let drops: MatrixChar[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Reinitialize drops
      const fontSize = 14;
      const columns = Math.floor(canvas.width / fontSize);
      drops = [];
      
      for (let i = 0; i < columns; i++) {
        drops.push({
          char: matrixChars[Math.floor(Math.random() * matrixChars.length)],
          x: i * fontSize,
          y: Math.random() * canvas.height,
          speed: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2
        });
      }
    };

    const draw = () => {
      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text properties
      ctx.font = '14px Share Tech Mono, monospace';
      ctx.textAlign = 'center';

      drops.forEach((drop, index) => {
        // Gradient effect - brighter at the "head" of the drop
        const gradient = ctx.createLinearGradient(0, drop.y - 20, 0, drop.y + 20);
        gradient.addColorStop(0, `rgba(0, 255, 65, ${drop.opacity * 0.1})`);
        gradient.addColorStop(0.5, `rgba(0, 255, 65, ${drop.opacity})`);
        gradient.addColorStop(1, `rgba(0, 255, 65, ${drop.opacity * 0.1})`);
        
        ctx.fillStyle = gradient;
        ctx.fillText(drop.char, drop.x, drop.y);

        // Move drop down
        drop.y += drop.speed;

        // Reset drop when it goes off screen
        if (drop.y > canvas.height) {
          drop.y = -20;
          drop.char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
          drop.speed = Math.random() * 3 + 1;
          drop.opacity = Math.random() * 0.8 + 0.2;
        }

        // Randomly change character
        if (Math.random() < 0.01) {
          drop.char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    // Initialize
    resizeCanvas();
    draw();

    // Handle resize
    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-20"
      style={{ 
        background: 'transparent',
        mixBlendMode: 'screen'
      }}
    />
  );
};

// Additional Matrix effect components
export const DigitalRain: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`matrix-rain ${className}`}>
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="matrix-char"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${15 + Math.random() * 10}s`
          }}
        >
          {String.fromCharCode(0x30A0 + Math.random() * 96)}
        </div>
      ))}
    </div>
  );
};

export const GlitchText: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}> = ({ children, className = '', intensity = 'medium' }) => {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const intervals = {
      low: 5000,
      medium: 3000,
      high: 1000
    };

    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 200);
    }, intervals[intensity]);

    return () => clearInterval(interval);
  }, [intensity]);

  return (
    <span 
      className={`glitch-text ${glitching ? 'animate-glitch' : ''} ${className}`}
      data-text={children}
    >
      {children}
    </span>
  );
};

export const HolographicText: React.FC<{ 
  children: React.ReactNode; 
  className?: string 
}> = ({ children, className = '' }) => {
  return (
    <span className={`holographic-text ${className}`}>
      {children}
    </span>
  );
}; 
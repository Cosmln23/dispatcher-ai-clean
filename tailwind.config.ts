import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      // Matrix Cyberpunk Color Palette 2030
      colors: {
        // Primary Matrix Colors
        matrix: {
          50: '#e6ffe6',
          100: '#b3ffb3',
          200: '#80ff80',
          300: '#4dff4d',
          400: '#1aff1a',
          500: '#00ff41', // Primary Matrix Green
          600: '#00e63a',
          700: '#00cc33',
          800: '#00b32c',
          900: '#009926',
          950: '#006619',
        },
        
        // Cyber Colors
        cyber: {
          cyan: '#00FFFF',
          pink: '#FF00FF',
          purple: '#8B00FF',
          yellow: '#FFFF00',
          red: '#FF0040',
          orange: '#FF8000',
        },
        
        // Neural Network Colors
        neural: {
          blue: '#0080FF',
          violet: '#4000FF',
          indigo: '#6000FF',
        },
        
        // Dark Theme
        dark: {
          space: '#000000',
          matrix: '#001a00',
          surface: '#001100',
          panel: '#002200',
          border: '#003300',
        },
        
        // Background
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        
        // Components
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      
      // Futuristic Typography
      fontFamily: {
        'cyber': ['JetBrains Mono', 'Consolas', 'Courier New', 'monospace'],
        'neural': ['Orbitron', 'Inter', 'system-ui', 'sans-serif'],
        'matrix': ['Share Tech Mono', 'Courier New', 'monospace'],
      },
      
      // Holographic Effects
      boxShadow: {
        'matrix': '0 0 10px #00FF41, 0 0 20px #00FF41, 0 0 30px #00FF41',
        'cyber': '0 0 10px #00FFFF, 0 0 20px #00FFFF, 0 0 30px #00FFFF',
        'neural': '0 0 15px #FF00FF, 0 0 30px #FF00FF, 0 0 45px #FF00FF',
        'quantum': '0 0 20px #8B00FF, 0 0 40px #8B00FF, 0 0 60px #8B00FF',
        'hologram': 'inset 0 0 10px rgba(0, 255, 65, 0.3), 0 0 15px rgba(0, 255, 65, 0.5)',
        'glitch': '0 0 5px #FF0040, 0 0 10px #FF0040, 0 0 15px #FF0040',
      },
      
      // Animations
      animation: {
        'matrix-rain': 'matrix-rain 20s linear infinite',
        'cyber-pulse': 'cyber-pulse 2s ease-in-out infinite',
        'neural-glow': 'neural-glow 3s ease-in-out infinite alternate',
        'quantum-float': 'quantum-float 6s ease-in-out infinite',
        'hologram-flicker': 'hologram-flicker 0.1s infinite linear',
        'glitch': 'glitch 0.3s infinite linear alternate-reverse',
        'scan-line': 'scan-line 2s linear infinite',
        'data-stream': 'data-stream 1s linear infinite',
      },
      
      // Keyframes
      keyframes: {
        'matrix-rain': {
          '0%': { transform: 'translateY(-100vh)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'cyber-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 5px #00FFFF, 0 0 10px #00FFFF, 0 0 15px #00FFFF',
            opacity: '1'
          },
          '50%': { 
            boxShadow: '0 0 10px #00FFFF, 0 0 20px #00FFFF, 0 0 30px #00FFFF',
            opacity: '0.8'
          },
        },
        'neural-glow': {
          '0%': { 
            boxShadow: '0 0 10px #FF00FF, 0 0 20px #FF00FF',
            filter: 'brightness(1)'
          },
          '100%': { 
            boxShadow: '0 0 20px #FF00FF, 0 0 40px #FF00FF, 0 0 60px #FF00FF',
            filter: 'brightness(1.2)'
          },
        },
        'quantum-float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-10px) rotate(120deg)' },
          '66%': { transform: 'translateY(5px) rotate(240deg)' },
        },
        'hologram-flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'glitch': {
          '0%': { 
            clipPath: 'polygon(0 2%, 100% 2%, 100% 5%, 0 5%)',
            transform: 'translate(-2px, 0)'
          },
          '25%': { 
            clipPath: 'polygon(0 15%, 100% 15%, 100% 25%, 0 25%)',
            transform: 'translate(2px, 0)'
          },
          '50%': { 
            clipPath: 'polygon(0 50%, 100% 50%, 100% 70%, 0 70%)',
            transform: 'translate(-1px, 0)'
          },
          '75%': { 
            clipPath: 'polygon(0 80%, 100% 80%, 100% 95%, 0 95%)',
            transform: 'translate(1px, 0)'
          },
          '100%': { 
            clipPath: 'polygon(0 2%, 100% 2%, 100% 5%, 0 5%)',
            transform: 'translate(0, 0)'
          },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'data-stream': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100vw)' },
        },
      },
      
      // Gradients
      backgroundImage: {
        'matrix-gradient': 'linear-gradient(45deg, #000000, #001a00, #000000)',
        'cyber-gradient': 'linear-gradient(135deg, #00FFFF, #FF00FF, #00FFFF)',
        'neural-gradient': 'linear-gradient(90deg, #8B00FF, #FF00FF, #00FFFF)',
        'quantum-gradient': 'linear-gradient(180deg, #000000, #001100, #002200)',
        'hologram-gradient': 'linear-gradient(45deg, rgba(0,255,65,0.1), rgba(0,255,255,0.1), rgba(255,0,255,0.1))',
      },
      
      // Glass Morphism
      backdropFilter: {
        'neural': 'blur(10px) saturate(200%)',
        'quantum': 'blur(15px) brightness(120%)',
      },
      
      // Border Radius
      borderRadius: {
        'neural': '12px',
        'quantum': '8px',
        'cyber': '4px',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config 
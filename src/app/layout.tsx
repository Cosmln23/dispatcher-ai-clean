import type { Metadata } from "next";
import "./globals.css";
import { MatrixRainProvider } from "@/components/effects/MatrixRain";
import { NeuralProvider } from "@/lib/providers/neural-provider";

export const metadata: Metadata = {
  title: "DispatcherAI | Neural Transport System 2030",
  description: "Sistemul de transport futurist cu AGI, quantum optimization și blockchain transparency",
  keywords: "AI, transport, logistică, quantum, blockchain, neural networks, dispatcher",
  authors: [{ name: "DispatcherAI Team" }],
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#00FF41",
  openGraph: {
    title: "DispatcherAI | Neural Transport System 2030",
    description: "Cea mai avansată platformă de transport cu AGI și quantum optimization",
    type: "website",
    locale: "ro_RO",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DispatcherAI Neural Dashboard"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "DispatcherAI | Neural Transport System 2030",
    description: "Sistemul de transport futurist cu AGI și blockchain",
    images: ["/og-image.jpg"]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap" 
          rel="stylesheet" 
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
        <meta name="format-detection" content="telephone=no" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-screen bg-dark-space text-matrix-500 antialiased">
        {/* Neural Network Provider */}
        <NeuralProvider>
          {/* Matrix Digital Rain Effect */}
          <MatrixRainProvider />
          
          {/* Holographic Grid Background */}
          <div className="fixed inset-0 opacity-5 pointer-events-none z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-matrix-500/10 via-cyber-cyan/5 to-cyber-pink/10" />
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }} />
          </div>
          
          {/* Scanning Line Effect */}
          <div className="fixed top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-matrix-500 to-transparent opacity-60 animate-scan-line z-50 pointer-events-none" />
          
          {/* Neural Particles */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-cyber-cyan rounded-full opacity-60 animate-quantum-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 6}s`,
                  animationDuration: `${6 + Math.random() * 4}s`
                }}
              />
            ))}
          </div>
          
          {/* Main Application */}
          <div className="relative z-20">
            <main className="min-h-screen">
              {children}
            </main>
          </div>
          
          {/* Neural Status Indicator */}
          <div className="fixed bottom-4 right-4 z-50">
            <div className="flex items-center space-x-2 neural-card p-3">
              <div className="w-3 h-3 bg-matrix-500 rounded-full animate-cyber-pulse" />
              <span className="text-xs font-cyber text-matrix-400">
                Neural Network: ONLINE
              </span>
            </div>
          </div>
          
          {/* Quantum Status */}
          <div className="fixed bottom-4 left-4 z-50">
            <div className="flex items-center space-x-2 neural-card p-3">
              <div className="w-3 h-3 bg-cyber-purple rounded-full animate-quantum-float" />
              <span className="text-xs font-cyber text-cyber-purple">
                Quantum Core: ACTIVE
              </span>
            </div>
          </div>
          
        </NeuralProvider>
      </body>
    </html>
  );
}

import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SpaceEvents from './components/SpaceEvents';
import WowFacts from './components/WowFacts';

const App = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-purple-900 to-black overflow-hidden">
      
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />
      
      <div className="relative z-10">
        <Header />
        <Hero />
        <SpaceEvents />
        <WowFacts />
        
        {/* Footer */}
        <footer className="py-8 px-6 border-t border-cyan-500/20">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-gray-400">
              © 2025 The Space Story. Exploring the cosmos, one story at a time.
            </p>
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default App;
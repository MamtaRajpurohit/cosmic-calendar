import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Moon } from 'lucide-react';

const FlashCard = ({ fact, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 150);
    return () => clearTimeout(timer);
  }, [index]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      ref={cardRef}
      className={`h-72 cursor-pointer transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      onClick={handleFlip}
      style={{ perspective: '1000px' }}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 ease-out`}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-indigo-950/80 via-purple-900/60 to-slate-900/80 backdrop-blur-sm rounded-3xl p-8 border border-indigo-400/20 shadow-2xl flex flex-col items-center justify-center text-center hover:border-indigo-400/40 transition-all duration-300"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="text-7xl mb-6 animate-pulse">{fact.icon}</div>
          <h3 className="text-2xl font-light tracking-wide text-slate-100 mb-3">
            {fact.title}
          </h3>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent mb-4"></div>
          <p className="text-sm text-slate-400 uppercase tracking-widest font-light">
            Tap to reveal
          </p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-cyan-950/80 via-blue-900/60 to-slate-900/80 backdrop-blur-sm rounded-3xl p-8 border border-cyan-400/20 shadow-2xl flex items-center justify-center"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <p className="text-slate-200 text-center leading-relaxed text-base font-light">
            {fact.description}
          </p>
        </div>
      </div>
    </div>
  );
};



export default FlashCard;
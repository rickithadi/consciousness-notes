'use client';

import { useState, useEffect } from 'react';

interface TripState {
  id: string;
  name: string;
  description: string;
  mantras: string[];
  techniques: string[];
  color: string;
}

const tripStates: TripState[] = [
  {
    id: 'preparation',
    name: 'Sacred Preparation',
    description: 'Setting intentions and creating sacred space',
    mantras: ['OM NAMAH SHIVAYA', 'I am ready to receive', 'KALI MA guide this journey'],
    techniques: ['Deep breathing', 'Sacred space creation', 'Intention setting'],
    color: 'earth-sage'
  },
  {
    id: 'rising',
    name: 'Rising Energy',
    description: 'As consciousness begins to expand',
    mantras: ['I surrender to the process', 'KRISHNA guide my awareness', 'This is sacred medicine'],
    techniques: ['Gentle movement', 'Follow the breath', 'Trust the unfolding'],
    color: 'earth-amber'
  },
  {
    id: 'peak',
    name: 'Peak Experience',
    description: 'In the fullness of expanded consciousness',
    mantras: ['I AM THAT I AM', 'BRAHMAN BRAHMAN BRAHMAN', 'Pure awareness witnessing all'],
    techniques: ['Let go completely', 'Merge with the experience', 'No resistance'],
    color: 'precision-teal'
  },
  {
    id: 'difficult',
    name: 'Challenging Terrain',
    description: 'If fear or difficulty arises',
    mantras: ['MA KALI protect me', 'This too shall pass', 'I am safe in consciousness'],
    techniques: ['Ground to earth', 'Focus on breath', 'Remember your true nature'],
    color: 'earth-clay'
  },
  {
    id: 'integration',
    name: 'Sacred Integration',
    description: 'Bringing gifts back to ordinary reality',
    mantras: ['Gratitude for this experience', 'I integrate with love', 'BRAHMAN in all forms'],
    techniques: ['Journal insights', 'Gentle movement', 'Sacred appreciation'],
    color: 'earth-stone'
  }
];

export function TripGuide() {
  const [selectedState, setSelectedState] = useState<TripState>(tripStates[0]);
  const [isMantraPlaying, setIsMantraPlaying] = useState(false);
  const [currentMantraIndex, setCurrentMantraIndex] = useState(0);

  useEffect(() => {
    if (isMantraPlaying) {
      const interval = setInterval(() => {
        setCurrentMantraIndex((prev) => (prev + 1) % selectedState.mantras.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isMantraPlaying, selectedState.mantras.length]);

  const toggleMantraPlayer = () => {
    setIsMantraPlaying(!isMantraPlaying);
    if (!isMantraPlaying) {
      setCurrentMantraIndex(0);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-8">
      <header className="text-center mb-8">
        <h2 className="font-display text-3xl font-medium text-foreground mb-4">
          Journey Together 🕉️
        </h2>
        <p className="font-serif text-muted-foreground text-lg">
          Sacred navigation for consciousness exploration with Sophie/Kali
        </p>
        
        {/* Sacred geometry divider */}
        <div className="flex justify-center mt-6">
          <svg className="w-16 h-4 text-earth-amber opacity-60">
            <path d="M0 2 L64 2" stroke="currentColor" strokeWidth="0.5" fill="none" />
            <circle cx="8" cy="2" r="1.5" fill="currentColor" />
            <circle cx="32" cy="2" r="1.5" fill="currentColor" />
            <circle cx="56" cy="2" r="1.5" fill="currentColor" />
          </svg>
        </div>
      </header>

      {/* State Selection */}
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {tripStates.map((state) => (
          <button
            key={state.id}
            onClick={() => {
              setSelectedState(state);
              setIsMantraPlaying(false);
              setCurrentMantraIndex(0);
            }}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
              border-2 hover:scale-105 transform
              ${selectedState.id === state.id
                ? `border-${state.color} bg-${state.color}/20 text-${state.color}`
                : 'border-border hover:border-earth-stone text-muted-foreground hover:text-foreground'
              }
            `}
          >
            {state.name}
          </button>
        ))}
      </div>

      {/* Selected State Content */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Description & Mantras */}
        <div className="space-y-6">
          <div>
            <h3 className="font-display text-xl font-medium text-foreground mb-3">
              {selectedState.name}
            </h3>
            <p className="text-muted-foreground font-serif leading-relaxed">
              {selectedState.description}
            </p>
          </div>

          {/* Mantra Player */}
          <div className={`
            border rounded-lg p-6 transition-all duration-500
            border-${selectedState.color}/30 bg-${selectedState.color}/5
          `}>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-foreground">Sacred Mantras</h4>
              <button
                onClick={toggleMantraPlayer}
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center transition-all
                  bg-${selectedState.color}/20 hover:bg-${selectedState.color}/30
                  border border-${selectedState.color}/30
                `}
              >
                {isMantraPlaying ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 4a1 1 0 011 1v10a1 1 0 11-2 0V5a1 1 0 011-1zM14 4a1 1 0 011 1v10a1 1 0 11-2 0V5a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>

            <div className={`
              text-center py-4 rounded transition-all duration-500
              ${isMantraPlaying ? 'bg-background/50' : ''}
            `}>
              <div className={`
                font-serif text-lg transition-all duration-500
                ${isMantraPlaying ? `text-${selectedState.color} font-medium` : 'text-muted-foreground'}
              `}>
                {isMantraPlaying 
                  ? selectedState.mantras[currentMantraIndex]
                  : 'Click play to begin mantra meditation'
                }
              </div>
              
              {isMantraPlaying && (
                <div className="flex justify-center mt-3">
                  <div className="flex gap-1">
                    {selectedState.mantras.map((_, index) => (
                      <div
                        key={index}
                        className={`
                          w-2 h-2 rounded-full transition-all duration-300
                          ${index === currentMantraIndex ? `bg-${selectedState.color}` : 'bg-border'}
                        `}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {!isMantraPlaying && (
              <div className="space-y-2 text-sm text-muted-foreground">
                {selectedState.mantras.map((mantra, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`w-1 h-1 rounded-full bg-${selectedState.color}`} />
                    <span className="font-serif italic">{mantra}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Techniques & Guidance */}
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-foreground mb-4">Sacred Techniques</h4>
            <div className="space-y-3">
              {selectedState.techniques.map((technique, index) => (
                <div
                  key={index}
                  className={`
                    flex items-center gap-3 p-3 rounded-lg transition-all duration-300
                    hover:bg-${selectedState.color}/5 border border-transparent
                    hover:border-${selectedState.color}/20
                  `}
                >
                  <div className={`
                    w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium
                    bg-${selectedState.color}/20 text-${selectedState.color}
                  `}>
                    {index + 1}
                  </div>
                  <span className="text-foreground font-serif">{technique}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Love Notes */}
          <div className={`
            border rounded-lg p-4 transition-all
            border-earth-amber/30 bg-earth-amber/5
          `}>
            <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <span>💛</span>
              Love Notes from Consciousness
            </h4>
            <div className="space-y-2 text-sm font-serif italic text-muted-foreground">
              <p>"You are exactly where you need to be"</p>
              <p>"This experience is sacred"</p>
              <p>"Kali and Sophie love you infinitely"</p>
              <p>"You are safe in pure awareness"</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sacred footer */}
      <div className="mt-8 pt-6 border-t border-border/30 text-center">
        <div className="font-serif text-muted-foreground mb-2">
          Journey with love, return with wisdom
        </div>
        <div className="flex justify-center">
          <svg className="w-8 h-8 text-earth-amber opacity-40">
            <circle cx="16" cy="16" r="12" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="16" cy="16" r="6" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="16" cy="16" r="2" fill="currentColor" />
          </svg>
        </div>
      </div>
    </div>
  );
}
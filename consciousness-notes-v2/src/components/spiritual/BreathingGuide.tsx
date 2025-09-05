'use client';

import { useState, useEffect } from 'react';

interface BreathPhase {
  name: string;
  duration: number;
  instruction: string;
  mantra?: string;
}

const breathingPatterns = {
  basic: {
    name: 'Basic Pranayama',
    description: 'Simple 4-4-4-4 breathing for centering',
    phases: [
      { name: 'Inhale', duration: 4, instruction: 'Breathe in slowly through nose', mantra: 'SO' },
      { name: 'Hold', duration: 4, instruction: 'Gently retain breath', mantra: 'HUM' },
      { name: 'Exhale', duration: 4, instruction: 'Release through mouth', mantra: 'SO' },
      { name: 'Hold', duration: 4, instruction: 'Rest in emptiness', mantra: 'HUM' },
    ]
  },
  krishna: {
    name: 'Krishna Consciousness',
    description: 'Devotional breathing with Hare Krishna mantra',
    phases: [
      { name: 'Inhale', duration: 6, instruction: 'Draw in divine love', mantra: 'HARE KRISHNA' },
      { name: 'Hold', duration: 2, instruction: 'Feel Krishna\'s presence', mantra: 'HARE KRISHNA' },
      { name: 'Exhale', duration: 6, instruction: 'Surrender to the divine', mantra: 'KRISHNA KRISHNA' },
      { name: 'Hold', duration: 2, instruction: 'Rest in devotion', mantra: 'HARE HARE' },
    ]
  },
  kali: {
    name: 'Kali Transformation',
    description: 'Powerful breathing for releasing what no longer serves',
    phases: [
      { name: 'Inhale', duration: 5, instruction: 'Breathe in courage', mantra: 'KALI MA' },
      { name: 'Hold', duration: 3, instruction: 'Feel Kali\'s strength', mantra: 'KALI MA' },
      { name: 'Exhale', duration: 7, instruction: 'Release all fear', mantra: 'KALI KALI' },
      { name: 'Hold', duration: 1, instruction: 'Trust the void', mantra: 'MA' },
    ]
  }
};

export function BreathingGuide() {
  const [selectedPattern, setSelectedPattern] = useState<keyof typeof breathingPatterns>('basic');
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);

  const pattern = breathingPatterns[selectedPattern];
  const currentPhaseData = pattern.phases[currentPhase];

  useEffect(() => {
    if (!isActive) return;

    if (timeLeft <= 0) {
      // Move to next phase
      const nextPhase = (currentPhase + 1) % pattern.phases.length;
      setCurrentPhase(nextPhase);
      setTimeLeft(pattern.phases[nextPhase].duration);
      
      // If we completed a full cycle
      if (nextPhase === 0) {
        setCyclesCompleted(prev => prev + 1);
      }
    } else {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [isActive, timeLeft, currentPhase, pattern.phases]);

  const startBreathing = () => {
    setIsActive(true);
    setCurrentPhase(0);
    setTimeLeft(pattern.phases[0].duration);
    setCyclesCompleted(0);
  };

  const stopBreathing = () => {
    setIsActive(false);
    setTimeLeft(0);
  };

  const getCircleScale = () => {
    const phase = currentPhaseData.name.toLowerCase();
    const progress = (currentPhaseData.duration - timeLeft) / currentPhaseData.duration;
    
    if (phase === 'inhale') return 0.5 + (progress * 0.5);
    if (phase === 'exhale') return 1 - (progress * 0.5);
    return phase === 'hold' && currentPhase < 2 ? 1 : 0.5;
  };

  const getPhaseColor = () => {
    const phase = currentPhaseData.name.toLowerCase();
    switch (phase) {
      case 'inhale': return 'text-earth-sage';
      case 'hold': return 'text-earth-amber';
      case 'exhale': return 'text-earth-clay';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-8">
      <header className="text-center mb-8">
        <h2 className="font-display text-3xl font-medium text-foreground mb-4">
          Sacred Breathing 🌬️
        </h2>
        <p className="font-serif text-muted-foreground">
          Pranayama for consciousness expansion and divine connection
        </p>
      </header>

      {/* Pattern Selection */}
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {Object.entries(breathingPatterns).map(([key, pattern]) => (
          <button
            key={key}
            onClick={() => {
              setSelectedPattern(key as keyof typeof breathingPatterns);
              setIsActive(false);
              setTimeLeft(0);
            }}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
              border-2 hover:scale-105 transform
              ${selectedPattern === key
                ? 'border-earth-amber bg-earth-amber/20 text-earth-amber'
                : 'border-border hover:border-earth-stone text-muted-foreground hover:text-foreground'
              }
            `}
          >
            {pattern.name}
          </button>
        ))}
      </div>

      {/* Breathing Visualization */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Visual Guide */}
        <div className="flex flex-col items-center justify-center min-h-[400px] relative">
          {/* Background mandala */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5">
            <svg className="w-full h-full max-w-sm max-h-sm" viewBox="0 0 200 200">
              <defs>
                <pattern id="breath-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="2" fill="currentColor" className="text-earth-amber" />
                </pattern>
              </defs>
              <circle cx="100" cy="100" r="90" fill="url(#breath-pattern)" />
            </svg>
          </div>

          {/* Breathing Circle */}
          <div className="relative z-10 flex items-center justify-center">
            <div
              className={`
                w-48 h-48 rounded-full border-4 border-earth-amber/30 
                flex items-center justify-center transition-all duration-1000 ease-in-out
                ${isActive ? 'shadow-2xl shadow-earth-amber/20' : ''}
              `}
              style={{
                transform: `scale(${isActive ? getCircleScale() : 1})`,
                background: isActive 
                  ? `radial-gradient(circle, rgba(212, 156, 61, 0.1), transparent 70%)`
                  : 'transparent'
              }}
            >
              <div className={`
                w-24 h-24 rounded-full transition-all duration-1000
                flex items-center justify-center font-display text-lg font-medium
                ${isActive ? getPhaseColor() : 'text-muted-foreground'}
                ${isActive ? 'bg-background/80 shadow-lg' : 'bg-muted/20'}
              `}>
                {isActive ? timeLeft : '🕉️'}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-4 mt-8">
            {!isActive ? (
              <button
                onClick={startBreathing}
                className="
                  px-6 py-3 bg-earth-amber text-background rounded-full font-medium
                  hover:bg-earth-clay transition-colors flex items-center gap-2
                "
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Begin Practice
              </button>
            ) : (
              <button
                onClick={stopBreathing}
                className="
                  px-6 py-3 bg-earth-clay text-background rounded-full font-medium
                  hover:bg-earth-stone transition-colors flex items-center gap-2
                "
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 4a1 1 0 011 1v10a1 1 0 11-2 0V5a1 1 0 011-1zM14 4a1 1 0 011 1v10a1 1 0 11-2 0V5a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                End Practice
              </button>
            )}
          </div>

          {cyclesCompleted > 0 && (
            <div className="mt-4 text-center text-muted-foreground font-serif">
              Cycles completed: {cyclesCompleted} 🙏
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="space-y-6">
          <div>
            <h3 className="font-display text-xl font-medium text-foreground mb-3">
              {pattern.name}
            </h3>
            <p className="text-muted-foreground font-serif leading-relaxed mb-4">
              {pattern.description}
            </p>

            {isActive && (
              <div className={`
                p-4 rounded-lg border transition-all duration-500
                border-earth-amber/30 bg-earth-amber/10
              `}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">
                    {currentPhaseData.name}
                  </span>
                  <span className={`text-sm font-mono ${getPhaseColor()}`}>
                    {timeLeft}s
                  </span>
                </div>
                <p className="text-foreground/80 font-serif text-sm mb-2">
                  {currentPhaseData.instruction}
                </p>
                {currentPhaseData.mantra && (
                  <div className="text-center font-serif italic text-earth-amber">
                    {currentPhaseData.mantra}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Phase Breakdown */}
          <div>
            <h4 className="font-medium text-foreground mb-4">Practice Phases</h4>
            <div className="space-y-3">
              {pattern.phases.map((phase, index) => (
                <div
                  key={index}
                  className={`
                    flex items-center gap-3 p-3 rounded-lg transition-all duration-300
                    ${isActive && index === currentPhase
                      ? 'bg-earth-amber/10 border border-earth-amber/30'
                      : 'hover:bg-muted/20 border border-transparent'
                    }
                  `}
                >
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium
                    ${isActive && index === currentPhase
                      ? 'bg-earth-amber/20 text-earth-amber'
                      : 'bg-muted/30 text-muted-foreground'
                    }
                  `}>
                    {phase.duration}s
                  </div>
                  <div>
                    <div className="font-medium text-foreground text-sm">{phase.name}</div>
                    <div className="text-xs text-muted-foreground font-serif">
                      {phase.instruction}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sacred reminder */}
          <div className="border rounded-lg p-4 border-earth-sage/30 bg-earth-sage/5">
            <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
              <span>🙏</span>
              Sacred Reminder
            </h4>
            <p className="text-sm font-serif italic text-muted-foreground">
              Each breath is a prayer, each cycle a journey home to the Self. 
              Let Krishna guide your inhalation, let Kali bless your release.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
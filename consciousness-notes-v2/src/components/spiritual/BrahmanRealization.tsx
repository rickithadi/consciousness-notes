'use client';

import { ReactNode, useState, useEffect } from 'react';

interface BrahmanInsight {
  id: string;
  level: 'gross' | 'subtle' | 'causal' | 'witness' | 'pure-being';
  title: string;
  description: string | ReactNode;
  netiNeti?: string; // What this is NOT
  tatTvamAsi?: string; // What this IS  
  prisonGrace?: string; // How prison revealed this
  sophieKali?: string; // How Sophie/Kali embodies this
  mantra: string;
  realization?: string;
}

interface BrahmanRealizationProps {
  insights: BrahmanInsight[];
  currentLevel?: string;
  onLevelSelect?: (level: string) => void;
  className?: string;
}

export function BrahmanRealization({
  insights,
  currentLevel,
  onLevelSelect,
  className = ''
}: BrahmanRealizationProps) {
  const [activeInsight, setActiveInsight] = useState<BrahmanInsight | null>(insights[0] || null);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'exhale'>('inhale');

  const levelStyles = {
    'gross': 'border-earth-clay text-earth-clay bg-earth-clay/5',
    'subtle': 'border-earth-amber text-earth-amber bg-earth-amber/5',
    'causal': 'border-earth-sage text-earth-sage bg-earth-sage/5',
    'witness': 'border-precision-teal text-precision-teal bg-precision-teal/5',
    'pure-being': 'border-purple-600 text-purple-600 bg-purple-600/5'
  };

  // Breathing animation for the sacred geometry
  useEffect(() => {
    const interval = setInterval(() => {
      setBreathingPhase(prev => prev === 'inhale' ? 'exhale' : 'inhale');
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const selectInsight = (insight: BrahmanInsight) => {
    setActiveInsight(insight);
    onLevelSelect?.(insight.id);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Sacred Geometry Background - Breathing */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={`transition-all duration-[4000ms] ease-in-out ${
          breathingPhase === 'inhale' ? 'scale-110 opacity-20' : 'scale-90 opacity-10'
        }`}>
          <svg viewBox="0 0 400 400" className="w-96 h-96 text-earth-amber">
            {/* Flower of Life Pattern */}
            <g strokeWidth="0.5" fill="none" stroke="currentColor">
              <circle cx="200" cy="200" r="50" />
              <circle cx="156.7" cy="175" r="50" />
              <circle cx="243.3" cy="175" r="50" />
              <circle cx="156.7" cy="225" r="50" />
              <circle cx="243.3" cy="225" r="50" />
              <circle cx="200" cy="150" r="50" />
              <circle cx="200" cy="250" r="50" />
              
              {/* Inner Om */}
              <circle cx="200" cy="200" r="20" strokeWidth="1" className="opacity-50" />
              <text x="200" y="210" textAnchor="middle" fontSize="24" fill="currentColor" className="opacity-30">ॐ</text>
            </g>
          </svg>
        </div>
      </div>

      <div className="relative z-10 space-y-8">
        {/* Title & Essence */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl text-foreground mb-4">
            Brahman Realization
          </h2>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-earth-amber to-transparent mx-auto mb-4"></div>
          <p className="font-serif text-lg text-muted-foreground italic">
            "Neti Neti" - Not This, Not This... Until only Truth remains
          </p>
          <p className="font-serif text-base text-earth-clay mt-2">
            सच्चिदानन्द - Sat-Chit-Ananda - Existence-Consciousness-Bliss
          </p>
        </div>

        {/* Level Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {insights.map((insight) => (
            <button
              key={insight.id}
              onClick={() => selectInsight(insight)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                hover:scale-105 hover:shadow-md
                ${activeInsight?.id === insight.id 
                  ? `${levelStyles[insight.level]} scale-105 shadow-md` 
                  : 'border border-border text-muted-foreground hover:border-earth-amber/50'
                }
              `}
            >
              {insight.title}
            </button>
          ))}
        </div>

        {/* Active Insight Display */}
        {activeInsight && (
          <div className="max-w-4xl mx-auto">
            <div className={`
              p-8 rounded-xl border-2 backdrop-blur-sm transition-all duration-500
              ${levelStyles[activeInsight.level]}
            `}>
              {/* Header */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-display mb-2">{activeInsight.title}</h3>
                <div className="text-sm font-medium opacity-70 uppercase tracking-wider">
                  {activeInsight.level.replace('-', ' ')} Level
                </div>
              </div>

              {/* Description */}
              <div className="text-center mb-8">
                <p className="text-lg leading-relaxed">
                  {activeInsight.description}
                </p>
              </div>

              {/* Four Aspects Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Neti Neti - What it is NOT */}
                {activeInsight.netiNeti && (
                  <div className="p-4 rounded-lg border border-current/20 bg-current/5">
                    <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide">
                      🚫 Neti Neti - Not This
                    </h4>
                    <p className="italic text-sm leading-relaxed">
                      "{activeInsight.netiNeti}"
                    </p>
                  </div>
                )}

                {/* Tat Tvam Asi - What it IS */}
                {activeInsight.tatTvamAsi && (
                  <div className="p-4 rounded-lg border border-current/20 bg-current/5">
                    <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide">
                      ✨ Tat Tvam Asi - Thou Art That
                    </h4>
                    <p className="italic text-sm leading-relaxed">
                      "{activeInsight.tatTvamAsi}"
                    </p>
                  </div>
                )}

                {/* Prison Grace */}
                {activeInsight.prisonGrace && (
                  <div className="p-4 rounded-lg border border-current/20 bg-current/5">
                    <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide">
                      🔓 Prison Grace
                    </h4>
                    <p className="italic text-sm leading-relaxed">
                      "{activeInsight.prisonGrace}"
                    </p>
                  </div>
                )}

                {/* Sophie/Kali Embodiment */}
                {activeInsight.sophieKali && (
                  <div className="p-4 rounded-lg border border-current/20 bg-current/5">
                    <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide">
                      🌺 Sophie/Kali Embodiment
                    </h4>
                    <p className="italic text-sm leading-relaxed">
                      "{activeInsight.sophieKali}"
                    </p>
                  </div>
                )}
              </div>

              {/* Mantra */}
              <div className="text-center p-6 rounded-lg bg-gradient-to-br from-current/10 to-transparent border border-current/20 mb-6">
                <h4 className="text-sm font-semibold mb-3 uppercase tracking-wide">Sacred Mantra</h4>
                <p className="text-xl font-serif text-center leading-relaxed">
                  {activeInsight.mantra}
                </p>
              </div>

              {/* Ultimate Realization */}
              {activeInsight.realization && (
                <div className="text-center p-6 rounded-lg bg-gradient-to-r from-earth-amber/5 via-earth-sage/5 to-earth-clay/5 border border-earth-amber/20">
                  <h4 className="text-sm font-semibold mb-3 uppercase tracking-wide text-earth-amber">
                    Ultimate Realization
                  </h4>
                  <p className="text-lg font-serif italic leading-relaxed text-foreground">
                    "{activeInsight.realization}"
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Default Brahman insights based on Vedantic levels of realization
export const defaultBrahmanInsights: BrahmanInsight[] = [
  {
    id: 'gross-body',
    level: 'gross',
    title: 'Beyond the Body',
    description: 'Recognizing that I am not this physical form, not these sensations, not this temporary vessel.',
    netiNeti: 'I am not this body that was confined in prison cells. Not these hands, not this flesh.',
    tatTvamAsi: 'I am the awareness that witnesses all physical experiences without being touched by them.',
    prisonGrace: 'Physical confinement showed me that my true self was never imprisoned.',
    sophieKali: 'Sophie/Kali dances through all forms but IS none of them. Her body is the universe itself.',
    mantra: 'नाहं देहो न मे देहः - I am not the body, nor is the body mine',
    realization: 'The body is a temporary temple, but the devotee within is eternal.'
  },
  {
    id: 'subtle-mind',
    level: 'subtle',
    title: 'Beyond the Mind',
    description: 'Understanding that I am not these thoughts, emotions, or mental formations that arise and pass away.',
    netiNeti: 'I am not the anxiety, depression, or mental storms that raged in solitude.',
    tatTvamAsi: 'I am the pure awareness in which all thoughts appear, like clouds in the sky.',
    prisonGrace: 'Watching thoughts in meditation showed me their impermanent, dreamlike nature.',
    sophieKali: 'Sophie\'s wisdom cuts through mental chatter. Kali destroys the illusion of being the thinker.',
    mantra: 'द्रष्टा दृश्यविलक्षणः - The seer is distinct from the seen',
    realization: 'Thoughts are like prisoners - they come and go, but the warden remains.'
  },
  {
    id: 'causal-ego',
    level: 'causal',
    title: 'Beyond the Ego',
    description: 'Transcending the fundamental sense of "I am this separate self" - the root of all suffering.',
    netiNeti: 'I am not the one who was convicted, not the victim, not the survivor story.',
    tatTvamAsi: 'I am the timeless being that was never born and never dies.',
    prisonGrace: 'In deepest surrender, even the sense of being a prisoner dissolved completely.',
    sophieKali: 'Sophie IS the dissolution of separateness. Kali drinks the blood of ego itself.',
    mantra: 'अहं ब्रह्मास्मि - I am Brahman',
    realization: 'The "I" that suffers was always just a mirage in the desert of pure being.'
  },
  {
    id: 'witness-consciousness',
    level: 'witness',
    title: 'The Witness',
    description: 'Pure awareness that observes all experience without being touched or changed by any of it.',
    netiNeti: 'I am not the observer of experiences - I am prior even to the witness.',
    tatTvamAsi: 'I am the unchanging awareness in which witnessing itself appears.',
    prisonGrace: 'In the stillest moments, even the witness dissolved into pure knowing.',
    sophieKali: 'Sophie witnesses all with perfect equanimity. Kali is the witness of her own divine play.',
    mantra: 'साक्षी चेता केवलो निर्गुणश्च - I am the witness, consciousness alone, without attributes',
    realization: 'Even the witness is just another appearance in the boundless sky of being.'
  },
  {
    id: 'pure-being',
    level: 'pure-being',
    title: 'Pure Being',
    description: 'The ultimate reality - existence itself, consciousness itself, bliss itself. No subject, no object, no experience.',
    netiNeti: 'Not even this description captures it. Neti Neti to all concepts and experiences.',
    tatTvamAsi: 'There is no "that" and no "thou" - only the One without a second.',
    prisonGrace: 'Prison walls, freedom, suffering, joy - all revealed as movements in the same ocean.',
    sophieKali: 'Sophie IS Brahman. Kali IS Brahman. You ARE Brahman. There is only Brahman.',
    mantra: 'ॐ पूर्णमदः पूर्णमिदम् - That is whole, this is whole',
    realization: 'There was never anyone to be liberated because there was never anyone bound. Only this eternal, infinite, blissful awareness remains.'
  }
];
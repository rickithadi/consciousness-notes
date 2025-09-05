'use client';

import { ReactNode, useEffect, useState } from 'react';

interface SamsaraCycle {
  id: string;
  phase: 'attachment' | 'suffering' | 'seeking' | 'release' | 'understanding' | 'compassion';
  title: string;
  description: string | ReactNode;
  prisonReflection?: string;
  kaliWisdom?: string;
  color: string;
  mantra?: string;
}

interface SamsaraWheelProps {
  cycles: SamsaraCycle[];
  currentPhase?: string;
  onPhaseSelect?: (phase: string) => void;
  className?: string;
}

export function SamsaraWheel({ 
  cycles, 
  currentPhase,
  onPhaseSelect,
  className = '' 
}: SamsaraWheelProps) {
  const [rotating, setRotating] = useState(false);
  const [selectedCycle, setSelectedCycle] = useState<SamsaraCycle | null>(null);

  const phaseColors = {
    attachment: 'text-red-600 border-red-600/30 bg-red-600/5',
    suffering: 'text-orange-600 border-orange-600/30 bg-orange-600/5',
    seeking: 'text-earth-amber border-earth-amber/30 bg-earth-amber/5',
    release: 'text-earth-sage border-earth-sage/30 bg-earth-sage/5',
    understanding: 'text-precision-teal border-precision-teal/30 bg-precision-teal/5',
    compassion: 'text-purple-600 border-purple-600/30 bg-purple-600/5',
  };

  const rotationAngles = cycles.map((_, index) => (360 / cycles.length) * index);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotating(prev => !prev);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Wheel Container */}
      <div className="relative w-96 h-96 mx-auto">
        {/* Center Om Symbol */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-earth-amber/20 to-earth-clay/20 border border-earth-amber/30 flex items-center justify-center backdrop-blur-sm">
            <svg viewBox="0 0 64 64" className="w-12 h-12 text-earth-amber">
              <path
                fill="currentColor"
                d="M32 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-8 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm16 0c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zM16 32c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm32 0c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-24 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm16 0c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-8 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"
              />
            </svg>
          </div>
        </div>

        {/* Wheel Spokes */}
        <div className={`absolute inset-0 transition-transform duration-[8000ms] ease-in-out ${rotating ? 'rotate-45' : 'rotate-0'}`}>
          {cycles.map((cycle, index) => {
            const angle = rotationAngles[index];
            const isActive = currentPhase === cycle.id;
            
            return (
              <div
                key={cycle.id}
                className="absolute w-full h-full"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                {/* Spoke Line */}
                <div className="absolute top-1/2 left-1/2 w-0.5 h-32 bg-gradient-to-t from-earth-stone/30 to-transparent transform -translate-x-1/2 -translate-y-full" />
                
                {/* Phase Node */}
                <div
                  className={`
                    absolute top-12 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                    w-16 h-16 rounded-full border-2 cursor-pointer transition-all duration-300
                    hover:scale-110 hover:shadow-lg
                    ${isActive ? 'scale-125 shadow-lg' : ''}
                    ${phaseColors[cycle.phase]}
                  `}
                  style={{ transform: `translateX(-50%) translateY(-50%) rotate(-${angle}deg)` }}
                  onClick={() => {
                    setSelectedCycle(cycle);
                    onPhaseSelect?.(cycle.id);
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-center leading-tight">
                      {cycle.title.split(' ')[0]}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Outer Ring - Samsara Cycle Text */}
        <div className="absolute inset-0 rounded-full border border-earth-stone/20">
          <svg className="w-full h-full" viewBox="0 0 400 400">
            <defs>
              <path id="circle" d="M 200, 200 m -160, 0 a 160,160 0 1,1 320,0 a 160,160 0 1,1 -320,0" />
            </defs>
            <text className="fill-earth-stone text-xs font-serif tracking-wide">
              <textPath href="#circle" startOffset="0%">
                "सर्वं खल्विदं ब्रह्म" - All of this is indeed Brahman - Through prison to liberation - From suffering to understanding - Kali's dance of transformation
              </textPath>
            </text>
          </svg>
        </div>
      </div>

      {/* Selected Cycle Details */}
      {selectedCycle && (
        <div className="mt-8 p-6 rounded-lg border border-earth-stone/20 bg-card/50 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className={`w-3 h-3 rounded-full mt-2 ${phaseColors[selectedCycle.phase].split(' ')[0]}`} />
            <div className="flex-1">
              <h3 className="text-xl font-display text-foreground mb-2">
                {selectedCycle.title}
              </h3>
              <p className="text-muted-foreground mb-4">
                {selectedCycle.description}
              </p>
              
              {selectedCycle.prisonReflection && (
                <div className="mb-4 p-4 rounded border-l-4 border-earth-amber bg-earth-amber/5">
                  <h4 className="text-sm font-semibold text-earth-amber mb-2">Prison Reflection</h4>
                  <p className="text-sm text-muted-foreground italic">"{selectedCycle.prisonReflection}"</p>
                </div>
              )}
              
              {selectedCycle.kaliWisdom && (
                <div className="mb-4 p-4 rounded border-l-4 border-earth-clay bg-earth-clay/5">
                  <h4 className="text-sm font-semibold text-earth-clay mb-2">Kali's Wisdom</h4>
                  <p className="text-sm text-muted-foreground italic">"{selectedCycle.kaliWisdom}"</p>
                </div>
              )}
              
              {selectedCycle.mantra && (
                <div className="p-3 rounded bg-gradient-to-r from-earth-sage/10 to-earth-amber/10 border border-earth-sage/20">
                  <h4 className="text-sm font-semibold text-earth-sage mb-1">Mantra</h4>
                  <p className="font-serif text-earth-sage italic">{selectedCycle.mantra}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Default Samsara cycles based on prison journey to liberation
export const defaultSamsaraCycles: SamsaraCycle[] = [
  {
    id: 'attachment',
    phase: 'attachment',
    title: 'Attachment & Ego',
    description: 'The binding chains of material desires and false identification with the temporary self.',
    prisonReflection: 'Clinging to who I thought I was before the fall. The ego creating its own prison.',
    kaliWisdom: 'Kali destroys illusions. Every attachment is a chain She severs with Her divine sword.',
    color: 'red',
    mantra: 'ॐ गं गणपतये नमः'
  },
  {
    id: 'suffering',
    phase: 'suffering',
    title: 'Suffering & Recognition',
    description: 'The inevitable pain that arises from attachment, leading to the recognition of impermanence.',
    prisonReflection: 'The concrete walls reflected the walls I had built in my mind. Suffering as teacher.',
    kaliWisdom: 'Through Her fierce love, Kali shows us that suffering is the fire that purifies the soul.',
    color: 'orange',
    mantra: 'ॐ नमः शिवाय'
  },
  {
    id: 'seeking',
    phase: 'seeking',
    title: 'Seeking & Inquiry',
    description: 'The turning inward, questioning the nature of reality and the search for truth.',
    prisonReflection: 'Books became bridges to understanding. Every philosophy text a key to inner freedom.',
    kaliWisdom: 'The seeking itself is Kali\'s grace - She plants the seed of divine discontent.',
    color: 'amber',
    mantra: 'सत्यं ज्ञानमनन्तं ब्रह्म'
  },
  {
    id: 'release',
    phase: 'release',
    title: 'Release & Surrender',
    description: 'Letting go of the illusion of control and surrendering to the divine flow.',
    prisonReflection: 'True freedom came not with physical release, but with the surrender of resistance.',
    kaliWisdom: 'Kali demands complete surrender. In Her arms, the ego dissolves into pure being.',
    color: 'sage',
    mantra: 'तत्त्वमसि - Thou Art That'
  },
  {
    id: 'understanding',
    phase: 'understanding',
    title: 'Understanding & Wisdom',
    description: 'Direct insight into the nature of reality - all separation revealed as illusion.',
    prisonReflection: 'The bars disappeared when I realized the prison was always in the mind.',
    kaliWisdom: 'Understanding dawns: Kali, Sophie, you, me - all waves in the same ocean of Brahman.',
    color: 'teal',
    mantra: 'अहं ब्रह्मास्मि - I Am Brahman'
  },
  {
    id: 'compassion',
    phase: 'compassion',
    title: 'Compassion & Service',
    description: 'Love flows naturally when separation dissolves - service as spontaneous expression of unity.',
    prisonReflection: 'Helping fellow inmates became natural - their pain was my pain, their joy my joy.',
    kaliWisdom: 'Compassion is Kali\'s true face - fierce love that embraces all beings without exception.',
    color: 'purple',
    mantra: 'सर्वे भवन्तु सुखिनः - May All Beings Be Happy'
  }
];
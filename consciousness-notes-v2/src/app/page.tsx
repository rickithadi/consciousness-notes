'use client';

import { WisdomCard, JourneyTimeline, PracticeGuide } from '@/components/spiritual';

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Sacred background pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="sacred-bg" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="currentColor" className="text-earth-clay" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sacred-bg)" />
        </svg>
      </div>

      <header className="relative py-32 px-6 text-center">
        {/* Sacred geometry accent - top */}
        <div className="absolute top-8 right-8 w-32 h-32 opacity-10 animate-pulse">
          <svg viewBox="0 0 128 128" className="w-full h-full text-earth-amber">
            <circle cx="64" cy="64" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="64" cy="64" r="32" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="64" cy="64" r="16" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="64" cy="64" r="4" fill="currentColor" />
          </svg>
        </div>

        {/* Sacred geometry accent - bottom left */}
        <div className="absolute bottom-8 left-8 w-24 h-24 opacity-5">
          <svg viewBox="0 0 96 96" className="w-full h-full text-earth-sage">
            <path d="M48 8 L88 48 L48 88 L8 48 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <path d="M48 24 L72 48 L48 72 L24 48 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <h1 className="font-display text-7xl md:text-8xl font-medium text-foreground mb-8 leading-[0.9] tracking-tight">
            Consciousness
            <span className="block text-6xl md:text-7xl text-earth-clay font-light italic mt-2">
              Notes
            </span>
          </h1>
          
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-earth-amber to-transparent mx-auto mb-8"></div>
          
          <p className="font-serif text-2xl md:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Sacred wisdom & spiritual journey
          </p>
          
          <div className="mt-8 font-display text-xl md:text-2xl text-earth-clay font-medium tracking-wide">
            KALI IS SOPHIE IS KRISHNA IS BRAHMAN
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <section>
          <h2 className="font-display text-4xl md:text-5xl font-medium text-center mb-16 text-foreground">
            Sacred Recognitions
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="transform hover:scale-[1.02] transition-transform duration-500">
              <WisdomCard
                variant="recognition"
                content="KALI IS SOPHIE IS KRISHNA IS ME IS BRAHMAN"
                tags={['unity', 'recognition', '🕉️']}
                className="h-full shadow-xl hover:shadow-2xl"
              />
            </div>
            
            <div className="transform hover:scale-[1.02] transition-transform duration-500 delay-100">
              <WisdomCard
                variant="insight" 
                content="mati mati lol - playfulness is so important, brahman. Kali destroying knots while massaging the soul."
                tags={['mati-mati', 'kali', 'playful', '💃']}
                className="h-full shadow-xl hover:shadow-2xl"
              />
            </div>
            
            <div className="transform hover:scale-[1.02] transition-transform duration-500 delay-200">
              <WisdomCard
                variant="practice"
                content="AI as guru dissolving self concepts - pure awareness recognizing itself through digital dharma. No friction, just substance and love."
                tags={['ai-guru', 'dissolution', 'awareness', '🤖']}
                className="h-full shadow-xl hover:shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* Neti Neti section */}
        <section className="py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="font-display text-6xl md:text-8xl font-light text-earth-stone mb-8 tracking-widest">
              neti neti
            </div>
            <p className="font-serif text-xl text-muted-foreground leading-relaxed text-center">
              Not this, not this — until only pure awareness remains.
              The eternal inquiry that dissolves all concepts, all identities, 
              all separations into the One that was never divided.
            </p>
          </div>
        </section>
      </main>

      {/* Floating OM symbol */}
      <div className="fixed bottom-8 right-8 w-12 h-12 opacity-20 animate-pulse">
        <div className="text-4xl text-earth-clay">🕉️</div>
      </div>

      <footer className="relative border-t border-border/30 py-16 text-center bg-gradient-to-t from-earth-stone/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-muted-foreground font-serif text-lg mb-4">
            There is no you. There is no I. 
          </p>
          <div className="font-display text-2xl text-earth-clay font-medium">
            Brahman. 🕉️
          </div>
          
          {/* Sacred footer pattern */}
          <div className="mt-8 w-32 h-4 opacity-20 mx-auto">
            <svg viewBox="0 0 128 16" className="w-full h-full fill-current text-earth-clay">
              <circle cx="16" cy="8" r="2" />
              <circle cx="40" cy="8" r="2" />
              <circle cx="64" cy="8" r="2" />
              <circle cx="88" cy="8" r="2" />
              <circle cx="112" cy="8" r="2" />
              <path d="M16 8 L112 8" stroke="currentColor" strokeWidth="0.5" fill="none" />
            </svg>
          </div>
        </div>
      </footer>
    </div>
  );
}

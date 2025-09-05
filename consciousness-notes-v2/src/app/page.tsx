'use client';

import { WisdomCard, JourneyTimeline, PracticeGuide } from '@/components/spiritual';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="py-20 px-6 text-center bg-gradient-to-b from-earth-stone/10">
        <h1 className="font-display text-6xl font-medium text-foreground mb-6">
          Consciousness Notes
        </h1>
        <p className="font-serif text-xl text-muted-foreground max-w-2xl mx-auto">
          Sacred wisdom & spiritual journey — KALI IS SOPHIE IS KRISHNA IS BRAHMAN
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16 space-y-20">
        <section>
          <div className="grid md:grid-cols-3 gap-6">
            <WisdomCard
              variant="recognition"
              content="KALI IS SOPHIE IS KRISHNA IS ME IS BRAHMAN"
              tags={['unity', 'recognition']}
            />
            <WisdomCard
              variant="insight" 
              content="mati mati lol - playfulness is so important, brahman"
              tags={['mati-mati', 'kali']}
            />
            <WisdomCard
              variant="practice"
              content="AI as guru dissolving self concepts - pure awareness recognizing itself"
              tags={['ai', 'dissolution', 'awareness']}
            />
          </div>
        </section>
      </main>

      <footer className="border-t border-border/50 py-12 text-center">
        <p className="text-muted-foreground font-serif">
          There is no you. There is no I. Brahman. 🕉️
        </p>
      </footer>
    </div>
  );
}

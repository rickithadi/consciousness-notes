import { ReactNode } from 'react';

interface JourneyEntry {
  id: string;
  date: string;
  title: string;
  content: string | ReactNode;
  type: 'realization' | 'practice' | 'integration' | 'recognition';
  tags?: string[];
}

interface JourneyTimelineProps {
  entries: JourneyEntry[];
  className?: string;
}

export function JourneyTimeline({ entries, className = '' }: JourneyTimelineProps) {
  const typeStyles = {
    realization: {
      dot: 'bg-earth-amber border-earth-amber/30',
      line: 'bg-gradient-to-b from-earth-amber/20 to-earth-stone/10',
      card: 'border-earth-amber/20 bg-earth-amber/5',
    },
    practice: {
      dot: 'bg-earth-sage border-earth-sage/30',
      line: 'bg-gradient-to-b from-earth-sage/20 to-earth-moss/10',
      card: 'border-earth-sage/20 bg-earth-sage/5',
    },
    integration: {
      dot: 'bg-earth-clay border-earth-clay/30',
      line: 'bg-gradient-to-b from-earth-clay/20 to-earth-stone/10',
      card: 'border-earth-clay/20 bg-earth-clay/5',
    },
    recognition: {
      dot: 'bg-precision-teal border-precision-teal/30',
      line: 'bg-gradient-to-b from-precision-teal/20 to-earth-moss/10',
      card: 'border-precision-teal/20 bg-precision-teal/5',
    },
  };

  return (
    <div className={`relative ${className}`}>
      <div className="space-y-8">
        {entries.map((entry, index) => {
          const isLast = index === entries.length - 1;
          const styles = typeStyles[entry.type];

          return (
            <div key={entry.id} className="relative flex group">
              {/* Timeline line */}
              <div className="relative flex flex-col items-center">
                <div
                  className={`
                    w-4 h-4 rounded-full border-2 z-10 transition-transform duration-300
                    group-hover:scale-125 ${styles.dot}
                  `}
                />
                {!isLast && (
                  <div
                    className={`w-0.5 h-20 mt-2 ${styles.line} transition-opacity duration-300
                                group-hover:opacity-80`}
                  />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 ml-6 pb-8">
                <div
                  className={`
                    rounded-lg border p-6 transition-all duration-300
                    hover:shadow-md hover:-translate-y-0.5 ${styles.card}
                  `}
                >
                  <header className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-display text-lg font-medium text-foreground">
                        {entry.title}
                      </h3>
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium
                                     bg-muted/50 text-muted-foreground border border-border/30">
                        {entry.type}
                      </span>
                    </div>
                    <time className="text-sm text-muted-foreground font-mono">
                      {entry.date}
                    </time>
                  </header>

                  <div className="prose prose-earth max-w-none">
                    {typeof entry.content === 'string' ? (
                      <p className="text-foreground/90 leading-relaxed font-serif">
                        {entry.content}
                      </p>
                    ) : (
                      entry.content
                    )}
                  </div>

                  {entry.tags && entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {entry.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs
                                     bg-earth-stone/20 text-earth-clay border border-earth-stone/30
                                     hover:bg-earth-stone/30 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sacred geometry watermark */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-3 pointer-events-none">
        <svg viewBox="0 0 128 128" className="w-full h-full">
          <defs>
            <pattern id="sacred-pattern" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="16" cy="16" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-earth-clay" />
            </pattern>
          </defs>
          <rect width="128" height="128" fill="url(#sacred-pattern)" />
        </svg>
      </div>
    </div>
  );
}
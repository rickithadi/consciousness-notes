import { ReactNode } from 'react';

interface WisdomCardProps {
  title?: string;
  content: string | ReactNode;
  author?: string;
  date?: string;
  tags?: string[];
  variant?: 'default' | 'insight' | 'practice' | 'recognition';
  className?: string;
}

export function WisdomCard({
  title,
  content,
  author,
  date,
  tags,
  variant = 'default',
  className = '',
}: WisdomCardProps) {
  const variantStyles = {
    default: 'border-border bg-card',
    insight: 'border-earth-amber/30 bg-gradient-to-br from-earth-amber/5 to-earth-stone/10',
    practice: 'border-earth-sage/30 bg-gradient-to-br from-earth-sage/5 to-earth-moss/10',
    recognition: 'border-earth-clay/30 bg-gradient-to-br from-earth-clay/5 to-precision-teal/5',
  };

  return (
    <article
      className={`
        group relative overflow-hidden rounded-lg border p-6 transition-all duration-300
        hover:shadow-lg hover:-translate-y-1 hover:shadow-earth-clay/20
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {/* Sacred geometry accent */}
      <div className="absolute top-0 right-0 w-16 h-16 opacity-5">
        <svg viewBox="0 0 64 64" className="w-full h-full fill-current text-earth-clay">
          <circle cx="32" cy="32" r="24" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="32" cy="32" r="12" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="32" cy="32" r="4" fill="currentColor" />
        </svg>
      </div>

      <div className="relative z-10">
        {title && (
          <h3 className="font-display text-xl font-medium text-foreground mb-3 leading-relaxed">
            {title}
          </h3>
        )}

        <div className="prose prose-earth max-w-none">
          {typeof content === 'string' ? (
            <p className="text-foreground/90 leading-relaxed font-serif text-base">
              {content}
            </p>
          ) : (
            content
          )}
        </div>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                           bg-earth-stone/20 text-earth-clay border border-earth-stone/30
                           hover:bg-earth-stone/30 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <footer className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
          {author && (
            <span className="text-sm text-muted-foreground font-medium">
              — {author}
            </span>
          )}
          {date && (
            <time className="text-xs text-muted-foreground/70 font-mono">
              {date}
            </time>
          )}
        </footer>
      </div>
    </article>
  );
}
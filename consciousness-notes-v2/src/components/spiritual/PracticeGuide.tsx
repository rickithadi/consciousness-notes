import { ReactNode, useState } from 'react';

interface PracticeStep {
  id: string;
  title: string;
  content: string | ReactNode;
  duration?: string;
  optional?: boolean;
}

interface PracticeGuideProps {
  title: string;
  description?: string;
  steps: PracticeStep[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  duration?: string;
  tradition?: string;
  className?: string;
}

export function PracticeGuide({
  title,
  description,
  steps,
  difficulty = 'beginner',
  duration,
  tradition,
  className = '',
}: PracticeGuideProps) {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [expandedStep, setExpandedStep] = useState<string | null>(steps[0]?.id || null);

  const toggleStep = (stepId: string) => {
    setCompletedSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(stepId)) {
        newSet.delete(stepId);
      } else {
        newSet.add(stepId);
      }
      return newSet;
    });
  };

  const toggleExpanded = (stepId: string) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  const difficultyColors = {
    beginner: 'text-earth-sage border-earth-sage/30 bg-earth-sage/10',
    intermediate: 'text-earth-amber border-earth-amber/30 bg-earth-amber/10',
    advanced: 'text-earth-clay border-earth-clay/30 bg-earth-clay/10',
  };

  const progressPercentage = (completedSteps.size / steps.length) * 100;

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      {/* Header */}
      <header className="mb-6">
        <div className="flex items-start justify-between mb-3">
          <h2 className="font-display text-2xl font-medium text-foreground leading-tight">
            {title}
          </h2>
          <div className="flex items-center gap-2">
            {tradition && (
              <span className="text-xs font-medium text-muted-foreground px-2 py-1 
                             bg-muted/50 rounded border border-border/30">
                {tradition}
              </span>
            )}
            <span className={`text-xs font-medium px-2 py-1 rounded border ${difficultyColors[difficulty]}`}>
              {difficulty}
            </span>
          </div>
        </div>

        {description && (
          <p className="text-muted-foreground font-serif leading-relaxed mb-4">
            {description}
          </p>
        )}

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {duration && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12,6 12,12 16,14"/>
              </svg>
              {duration}
            </span>
          )}
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4"/>
              <circle cx="12" cy="12" r="10"/>
            </svg>
            {completedSteps.size} of {steps.length} completed
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-4 bg-muted/30 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-earth-sage to-earth-amber h-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </header>

      {/* Steps */}
      <div className="space-y-3">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.has(step.id);
          const isExpanded = expandedStep === step.id;

          return (
            <div
              key={step.id}
              className={`
                border rounded-lg transition-all duration-200
                ${isCompleted 
                  ? 'border-earth-sage/30 bg-earth-sage/5' 
                  : 'border-border hover:border-earth-stone/50 bg-card'
                }
                ${isExpanded ? 'shadow-sm' : ''}
              `}
            >
              <button
                onClick={() => toggleExpanded(step.id)}
                className="w-full flex items-center gap-4 p-4 text-left hover:bg-muted/30 
                           transition-colors rounded-lg"
              >
                {/* Step number/checkbox */}
                <div className="flex-shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStep(step.id);
                    }}
                    className={`
                      w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all
                      ${isCompleted
                        ? 'border-earth-sage bg-earth-sage text-white'
                        : 'border-border hover:border-earth-stone text-muted-foreground hover:text-foreground'
                      }
                    `}
                  >
                    {isCompleted ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span className="text-sm font-mono">{index + 1}</span>
                    )}
                  </button>
                </div>

                {/* Step title and meta */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-medium ${isCompleted ? 'text-foreground' : 'text-foreground'}`}>
                      {step.title}
                    </h3>
                    {step.optional && (
                      <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">
                        optional
                      </span>
                    )}
                  </div>
                  {step.duration && (
                    <span className="text-xs text-muted-foreground font-mono">
                      {step.duration}
                    </span>
                  )}
                </div>

                {/* Expand/collapse icon */}
                <svg
                  className={`w-5 h-5 text-muted-foreground transition-transform ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Step content */}
              {isExpanded && (
                <div className="px-4 pb-4 ml-12">
                  <div className="prose prose-earth max-w-none">
                    {typeof step.content === 'string' ? (
                      <div className="text-foreground/90 leading-relaxed font-serif">
                        {step.content.split('\n').map((line, i) => (
                          <p key={i} className={i > 0 ? 'mt-3' : ''}>{line}</p>
                        ))}
                      </div>
                    ) : (
                      step.content
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sacred geometry footer accent */}
      <div className="mt-6 pt-4 border-t border-border/30 flex justify-center">
        <div className="w-16 h-4 opacity-20">
          <svg viewBox="0 0 64 16" className="w-full h-full fill-current text-earth-clay">
            <circle cx="8" cy="8" r="3" />
            <circle cx="32" cy="8" r="3" />
            <circle cx="56" cy="8" r="3" />
            <path d="M8 8 L32 8 L56 8" stroke="currentColor" strokeWidth="0.5" fill="none" />
          </svg>
        </div>
      </div>
    </div>
  );
}
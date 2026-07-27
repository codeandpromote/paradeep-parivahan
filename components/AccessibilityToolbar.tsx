'use client';

/**
 * <AccessibilityToolbar />
 * Sits at the very top of the layout (above the header), NALCO-style.
 * Fully keyboard operable, ARIA-labelled, and every control reflects
 * pressed state via aria-pressed for screen readers.
 */

import { useAccessibility, FONT_STEPS } from '@/context/AccessibilityContext';
import {
  Contrast,
  Minus,
  Plus,
  RotateCcw,
  Type,
  Eye,
  Gauge,
  Volume2,
} from 'lucide-react';

export default function AccessibilityToolbar() {
  const {
    fontStepIndex,
    highContrast,
    reducedMotion,
    readingMode,
    increaseFont,
    decreaseFont,
    resetFont,
    toggleContrast,
    toggleMotion,
    toggleReading,
    resetAll,
  } = useAccessibility();

  // Screen-reader helper: read the current visible main heading aloud
  // using the Web Speech API (progressive enhancement — silently no-ops
  // where unsupported). This mirrors NALCO's "screen reader" affordance.
  const speakPage = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const main = document.querySelector('main');
    const text =
      main?.getAttribute('data-speak') ||
      document.querySelector('h1')?.textContent ||
      document.title;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(text || ''));
  };

  return (
    <div
      role="region"
      aria-label="Accessibility options"
      className="w-full border-b border-brand-800/40 bg-brand-950 text-white"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-end gap-x-4 gap-y-1 px-4 py-1.5 text-sm">
        {/* Font sizing group A- / A / A+ */}
        <div className="flex items-center gap-1" role="group" aria-label="Text size">
          <Type className="mr-1 h-4 w-4 opacity-70" aria-hidden />
          <ToolbarButton
            onClick={decreaseFont}
            disabled={fontStepIndex === 0}
            aria-label="Decrease text size"
          >
            <Minus className="h-3.5 w-3.5" aria-hidden />
            <span aria-hidden>A</span>
          </ToolbarButton>
          <ToolbarButton onClick={resetFont} aria-label="Reset text size to default">
            <span aria-hidden>A</span>
          </ToolbarButton>
          <ToolbarButton
            onClick={increaseFont}
            disabled={fontStepIndex === FONT_STEPS.length - 1}
            aria-label="Increase text size"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden />
            <span aria-hidden>A</span>
          </ToolbarButton>
        </div>

        <Divider />

        {/* High contrast */}
        <ToolbarButton
          onClick={toggleContrast}
          pressed={highContrast}
          aria-label="Toggle high contrast mode"
        >
          <Contrast className="h-4 w-4" aria-hidden />
          <span>Contrast</span>
        </ToolbarButton>

        {/* Reduced motion */}
        <ToolbarButton
          onClick={toggleMotion}
          pressed={reducedMotion}
          aria-label="Toggle reduced motion"
        >
          <Gauge className="h-4 w-4" aria-hidden />
          <span>Motion</span>
        </ToolbarButton>

        {/* Reading mode */}
        <ToolbarButton
          onClick={toggleReading}
          pressed={readingMode}
          aria-label="Toggle readable spacing mode"
        >
          <Eye className="h-4 w-4" aria-hidden />
          <span>Readable</span>
        </ToolbarButton>

        {/* Screen reader */}
        <ToolbarButton onClick={speakPage} aria-label="Read page heading aloud">
          <Volume2 className="h-4 w-4" aria-hidden />
          <span>Listen</span>
        </ToolbarButton>

        <Divider />

        <ToolbarButton onClick={resetAll} aria-label="Reset all accessibility settings">
          <RotateCcw className="h-4 w-4" aria-hidden />
          <span>Reset</span>
        </ToolbarButton>
      </div>
    </div>
  );
}

function ToolbarButton({
  children,
  onClick,
  pressed,
  disabled,
  'aria-label': ariaLabel,
}: {
  children: React.ReactNode;
  onClick: () => void;
  pressed?: boolean;
  disabled?: boolean;
  'aria-label': string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={pressed}
      aria-label={ariaLabel}
      className={[
        'inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium transition',
        'hover:bg-white/15 focus-visible:bg-white/15 disabled:cursor-not-allowed disabled:opacity-40',
        pressed ? 'bg-white/25 ring-1 ring-white/60' : '',
      ].join(' ')}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span aria-hidden className="hidden h-4 w-px bg-white/25 sm:inline-block" />;
}

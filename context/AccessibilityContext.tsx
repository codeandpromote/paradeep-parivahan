'use client';

/**
 * AccessibilityContext
 * --------------------
 * Global accessibility state (NALCO-style toolbar):
 *   - font scale     : A- / A / A+ / A++   (0.875 → 1.25)
 *   - high contrast  : black/yellow/cyan theme
 *   - reduced motion : kill animations
 *   - reading mode   : wider line-height, narrower measure
 *
 * State is applied as data-* attributes / CSS vars on <html> so it reaches
 * EVERYTHING — including dynamically injected SVGs and Framer Motion nodes —
 * and is persisted to localStorage so choices survive navigation & reload.
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

export const FONT_STEPS = [0.875, 1, 1.125, 1.25] as const;
export type FontScale = (typeof FONT_STEPS)[number];

interface A11yState {
  fontScale: FontScale;
  highContrast: boolean;
  reducedMotion: boolean;
  readingMode: boolean;
}

interface A11yContextValue extends A11yState {
  fontStepIndex: number;
  increaseFont: () => void;
  decreaseFont: () => void;
  resetFont: () => void;
  toggleContrast: () => void;
  toggleMotion: () => void;
  toggleReading: () => void;
  resetAll: () => void;
}

const DEFAULTS: A11yState = {
  fontScale: 1,
  highContrast: false,
  reducedMotion: false,
  readingMode: false,
};

const STORAGE_KEY = 'ppl-a11y';

const AccessibilityContext = createContext<A11yContextValue | null>(null);

function applyToDocument(state: A11yState) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty('--a11y-font-scale', String(state.fontScale));
  root.setAttribute('data-contrast', state.highContrast ? 'high' : 'normal');
  root.setAttribute('data-motion', state.reducedMotion ? 'reduced' : 'full');
  root.setAttribute('data-reading', state.readingMode ? 'true' : 'false');
}

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<A11yState>(DEFAULTS);

  // Hydrate from localStorage once on mount. With no saved preference, seed
  // reducedMotion from the OS setting so SMIL/SVG loops also respect it.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = { ...DEFAULTS, ...JSON.parse(raw) } as A11yState;
        if (!FONT_STEPS.includes(parsed.fontScale)) parsed.fontScale = 1;
        setState(parsed);
        return;
      }
      const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) setState((s) => ({ ...s, reducedMotion: true }));
    } catch {
      /* ignore malformed storage */
    }
  }, []);

  // Persist + apply on every change
  useEffect(() => {
    applyToDocument(state);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage may be unavailable (private mode) */
    }
  }, [state]);

  // Functional updates read the freshest scale — no ref needed.
  const stepFont = useCallback((delta: number) => {
    setState((s) => {
      const nextIndex = Math.max(
        0,
        Math.min(FONT_STEPS.length - 1, FONT_STEPS.indexOf(s.fontScale) + delta)
      );
      return { ...s, fontScale: FONT_STEPS[nextIndex] };
    });
  }, []);

  const increaseFont = useCallback(() => stepFont(1), [stepFont]);
  const decreaseFont = useCallback(() => stepFont(-1), [stepFont]);
  const resetFont = useCallback(() => setState((s) => ({ ...s, fontScale: 1 })), []);
  const toggleContrast = useCallback(
    () => setState((s) => ({ ...s, highContrast: !s.highContrast })),
    []
  );
  const toggleMotion = useCallback(
    () => setState((s) => ({ ...s, reducedMotion: !s.reducedMotion })),
    []
  );
  const toggleReading = useCallback(
    () => setState((s) => ({ ...s, readingMode: !s.readingMode })),
    []
  );
  const resetAll = useCallback(() => setState(DEFAULTS), []);

  const value: A11yContextValue = {
    ...state,
    fontStepIndex: FONT_STEPS.indexOf(state.fontScale),
    increaseFont,
    decreaseFont,
    resetFont,
    toggleContrast,
    toggleMotion,
    toggleReading,
    resetAll,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) {
    throw new Error('useAccessibility must be used within <AccessibilityProvider>');
  }
  return ctx;
}

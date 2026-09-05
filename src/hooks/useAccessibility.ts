import { useState, useEffect, useCallback } from 'react';
import { AccessibilitySettings } from '../types';

const STORAGE_KEY = 'skillbridge_a11y_settings_v1';

const DEFAULT_SETTINGS: AccessibilitySettings = {
  fontSize: 'normal',
  highContrast: false,
  reduceMotion: false,
  screenReaderAnnouncements: true,
};

export function useAccessibility() {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.warn('Failed to parse a11y settings from localStorage', e);
    }
    return DEFAULT_SETTINGS;
  });

  const [liveAnnouncement, setLiveAnnouncement] = useState<string>('');

  // Apply settings to document root for global CSS adjustments
  useEffect(() => {
    const root = document.documentElement;

    // Font size scaling
    root.classList.remove('text-scale-normal', 'text-scale-large', 'text-scale-xl');
    root.classList.add(`text-scale-${settings.fontSize}`);

    // High contrast
    if (settings.highContrast) {
      root.classList.add('high-contrast-mode');
    } else {
      root.classList.remove('high-contrast-mode');
    }

    // Motion preference
    if (settings.reduceMotion) {
      root.classList.add('reduce-motion-mode');
    } else {
      root.classList.remove('reduce-motion-mode');
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save a11y settings to localStorage', e);
    }
  }, [settings]);

  const setFontSize = useCallback((size: 'normal' | 'large' | 'xl') => {
    setSettings((prev) => ({ ...prev, fontSize: size }));
    announce(`Font size set to ${size === 'xl' ? 'extra large' : size}`);
  }, []);

  const toggleHighContrast = useCallback(() => {
    setSettings((prev) => {
      const next = !prev.highContrast;
      announce(next ? 'High contrast mode enabled' : 'High contrast mode disabled');
      return { ...prev, highContrast: next };
    });
  }, []);

  const toggleReduceMotion = useCallback(() => {
    setSettings((prev) => {
      const next = !prev.reduceMotion;
      announce(next ? 'Reduced motion enabled' : 'Standard motion enabled');
      return { ...prev, reduceMotion: next };
    });
  }, []);

  const announce = useCallback((message: string) => {
    setLiveAnnouncement(message);
    // Clear after a moment so repeat announcements trigger screen readers
    setTimeout(() => setLiveAnnouncement(''), 3000);
  }, []);

  return {
    settings,
    setFontSize,
    toggleHighContrast,
    toggleReduceMotion,
    announce,
    liveAnnouncement,
  };
}

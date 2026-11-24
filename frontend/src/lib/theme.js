import { useEffect, useState } from 'react';

export const THEME_VARIANTS = [
  { id: 'cyan', label: 'Obsidian (Cyan)', color: '#38BDF8', bg: '#0C0C0E' },
  { id: 'electric', label: 'Slate (Electric)', color: '#3B82F6', bg: '#0A0F1D' },
  { id: 'emerald', label: 'Charcoal (Emerald)', color: '#10B981', bg: '#0B0E0C' },
  { id: 'light', label: 'Light Mode', color: '#2E5AAC', bg: '#F5F7FB' }
];

export function getInitialTheme() {
  if (typeof window === 'undefined') return 'cyan';
  return localStorage.getItem('futurepaths_theme') || 'cyan';
}

export function applyTheme(theme) {
  if (typeof document === 'undefined') return;
  if (theme === 'cyan') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
  localStorage.setItem('futurepaths_theme', theme);
}

export function useThemeVariant() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return { theme, setTheme, variants: THEME_VARIANTS };
}

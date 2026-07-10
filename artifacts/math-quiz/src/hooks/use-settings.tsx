import { createContext, useContext, useEffect, useState, useRef } from 'react';

type Theme = 'light' | 'dark';

interface SettingsContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  playClick: () => void;
  playCorrect: () => void;
  playWrong: () => void;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [soundEnabled, setSoundEnabledState] = useState(true);

  // Audio refs
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const clickRef = useRef<HTMLAudioElement | null>(null);
  const correctRef = useRef<HTMLAudioElement | null>(null);
  const wrongRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Init from localStorage
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme === 'light' || savedTheme === 'dark') setThemeState(savedTheme);

    const savedSound = localStorage.getItem('sound');
    if (savedSound !== null) setSoundEnabledState(savedSound === 'true');

    const baseUrl = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : import.meta.env.BASE_URL + '/';
    
    bgmRef.current = new Audio(`${baseUrl}audio/bgm.mp3`);
    bgmRef.current.loop = true;
    bgmRef.current.volume = 0.3;

    clickRef.current = new Audio(`${baseUrl}audio/click.mp3`);
    correctRef.current = new Audio(`${baseUrl}audio/correct.mp3`);
    wrongRef.current = new Audio(`${baseUrl}audio/wrong.mp3`);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('sound', String(soundEnabled));
    if (bgmRef.current) {
      if (!soundEnabled) {
        bgmRef.current.pause();
      } else {
        // Only try to play if it was already playing, or let the user interaction handler trigger it
      }
    }
  }, [soundEnabled]);

  const setTheme = (t: Theme) => setThemeState(t);
  const setSoundEnabled = (s: boolean) => setSoundEnabledState(s);

  const playClick = () => {
    if (soundEnabled && clickRef.current) {
      clickRef.current.currentTime = 0;
      clickRef.current.play().catch(() => {});
    }
  };

  const playCorrect = () => {
    if (soundEnabled && correctRef.current) {
      correctRef.current.currentTime = 0;
      correctRef.current.play().catch(() => {});
    }
  };

  const playWrong = () => {
    if (soundEnabled && wrongRef.current) {
      wrongRef.current.currentTime = 0;
      wrongRef.current.play().catch(() => {});
    }
  };

  // Autoplay BGM on first user interaction if enabled
  useEffect(() => {
    const handleInteraction = () => {
      if (soundEnabled && bgmRef.current && bgmRef.current.paused) {
        bgmRef.current.play().catch(() => {});
      }
    };
    document.addEventListener('click', handleInteraction);
    return () => document.removeEventListener('click', handleInteraction);
  }, [soundEnabled]);

  return (
    <SettingsContext.Provider value={{ theme, setTheme, soundEnabled, setSoundEnabled, playClick, playCorrect, playWrong }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
}

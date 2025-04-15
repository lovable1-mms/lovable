
import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeMode = 'light' | 'dark' | 'auto';

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get saved theme from sessionStorage first, then localStorage as fallback, or default to 'auto'
  const [mode, setMode] = useState<ThemeMode>(() => {
    const sessionMode = sessionStorage.getItem('theme-mode');
    const localMode = localStorage.getItem('theme-mode');
    return (sessionMode as ThemeMode) || (localMode as ThemeMode) || 'auto';
  });
  
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  
  // Effect to update storage when mode changes
  useEffect(() => {
    sessionStorage.setItem('theme-mode', mode);
    localStorage.setItem('theme-mode', mode); // Keep localStorage for backward compatibility
  }, [mode]);
  
  // Effect to handle 'auto' mode based on time of day and apply theme
  useEffect(() => {
    const updateTheme = () => {
      if (mode === 'auto') {
        const currentHour = new Date().getHours();
        // Dark mode between 7 PM (19:00) and 6 AM (6:00)
        const shouldBeDark = currentHour >= 19 || currentHour < 6;
        setIsDarkMode(shouldBeDark);
        document.documentElement.classList.toggle('dark', shouldBeDark);
      } else {
        setIsDarkMode(mode === 'dark');
        document.documentElement.classList.toggle('dark', mode === 'dark');
      }
    };
    
    updateTheme();
    
    // Update theme every minute if in auto mode
    const interval = mode === 'auto' ? setInterval(updateTheme, 60000) : null;
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [mode]);
  
  return (
    <ThemeContext.Provider value={{ mode, setMode, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

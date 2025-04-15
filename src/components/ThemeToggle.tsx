
import React from 'react';
import { Moon, Sun, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';

const ThemeToggle = () => {
  const { mode, setMode, isDarkMode } = useTheme();
  
  // Toggle between light/dark modes
  const toggleMode = () => {
    setMode(isDarkMode ? 'light' : 'dark');
  };
  
  // Set to auto mode
  const setAutoMode = () => {
    setMode('auto');
  };

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={setAutoMode}
        className={`${mode === 'auto' ? 'bg-secondary' : ''}`}
        aria-label="Auto mode"
      >
        <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMode}
        className={`${mode !== 'auto' ? 'bg-secondary' : ''}`}
        aria-label={isDarkMode ? "Light mode" : "Dark mode"}
      >
        {isDarkMode ? (
          <Sun className="h-5 w-5 text-yellow-500" />
        ) : (
          <Moon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        )}
      </Button>
    </div>
  );
};

export default ThemeToggle;

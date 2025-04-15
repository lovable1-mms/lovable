
import React, { useState, useRef, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Lock, ArrowRight } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SwipeConfirmProps {
  onConfirm: () => void;
  disabled?: boolean;
}

const SwipeConfirm: React.FC<SwipeConfirmProps> = ({ onConfirm, disabled = false }) => {
  const [value, setValue] = useState([0]);
  const [confirming, setConfirming] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleValueChange = (newValue: number[]) => {
    setValue(newValue);
    
    // When slider reaches 100, trigger confirmation
    if (newValue[0] >= 95) {
      setConfirming(true);
      
      // Small delay for visual feedback
      timeoutRef.current = setTimeout(() => {
        onConfirm();
        // Reset after confirmation
        setValue([0]);
        setConfirming(false);
      }, 300);
    } else if (newValue[0] > 0 && newValue[0] < 95 && !confirming) {
      // If released before 95%, animate back to start
      const releaseTimeout = setTimeout(() => {
        setValue([0]);
      }, 150);
      return () => clearTimeout(releaseTimeout);
    }
  };

  return (
    <div className="w-full px-2 py-4">
      <div className="flex items-center gap-2 mb-3 text-sm">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1 border border-green-200 bg-green-50 dark:bg-[#0d1117] dark:border-[#30363d] px-3 py-1 rounded-full">
                <Lock className="h-4 w-4 text-green-700 dark:text-green-400" />
                <span className="text-green-800 dark:text-green-400 font-medium">Secure payment</span>
              </div>
            </TooltipTrigger>
            <TooltipContent className="dark:bg-[#161b22] dark:text-[#c9d1d9] dark:border-[#30363d]">
              <p className="text-xs">Your payment information is encrypted and secure</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <p className="text-sm text-gray-700 dark:text-[#c9d1d9] mb-3 font-medium text-center">
        By swiping, you agree to securely complete this purchase using your saved credit card.
      </p>
      
      <div className="relative mt-6">
        <div 
          className={`absolute inset-0 rounded-full ${
            confirming ? 'bg-green-100 dark:bg-green-900/30' : ''
          } transition-colors duration-300 pointer-events-none`} 
          style={{ 
            clipPath: `inset(0 ${100 - value[0]}% 0 0)`,
            opacity: 0.2
          }}
        />
        
        <Slider
          disabled={disabled || confirming}
          value={value}
          max={100}
          step={1}
          onValueChange={handleValueChange}
          className={`h-12 ${confirming ? 'bg-green-50 dark:bg-green-900/20' : ''} dark:bg-[#30363d]`}
          aria-label="Confirm purchase by sliding"
        />
        
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#8b949e] pointer-events-none">
          <ArrowRight className={`h-5 w-5 ${value[0] < 20 ? 'animate-pulse' : ''}`} />
        </div>
        
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full pointer-events-none">
          <div 
            className="text-sm font-medium text-center dark:text-[#c9d1d9]"
            style={{ 
              transform: `translateX(${Math.min(Math.max(value[0] - 10, 0), 80)}%)` 
            }}
          >
            {value[0] < 20 ? "Slide to confirm" : value[0] > 90 ? "Confirming..." : "Continue sliding"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwipeConfirm;

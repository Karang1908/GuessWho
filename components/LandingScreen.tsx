import React from 'react';
import Button from './Button';
import { Sparkles, HelpCircle } from 'lucide-react';

interface LandingScreenProps {
  onStart: () => void;
}

const LandingScreen: React.FC<LandingScreenProps> = ({ onStart }) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onStart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onStart]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center animate-fade-in relative overflow-hidden">

      {/* Tech Grid Background Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="space-y-8 mb-24 text-center">
          <h1 className="text-8xl md:text-[12rem] font-black text-white tracking-[-0.08em] leading-[0.8] drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)] animate-slide-up select-none">
            GUESS <br className="md:hidden" /><span className="text-white/40">WHO</span>
          </h1>

          <div className="flex items-center justify-center gap-6 animate-fade-in [animation-delay:0.3s]">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
            <h2 className="text-sm md:text-lg text-white/50 font-black tracking-[1em] uppercase animate-pulse transition-all">
              AI Character Edition
            </h2>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent via-white/40 to-transparent"></div>
          </div>
        </div>

        <div className="max-w-xs w-full animate-fade-in [animation-delay:0.7s]">
          <div className="relative group/btn">
            <div className="absolute -inset-1 bg-white/20 blur opacity-0 group-hover/btn:opacity-100 transition duration-500 rounded-full"></div>
            <Button
              onClick={onStart}
              size="xl"
              fullWidth
              className="relative z-10 py-6 text-xl tracking-[0.2em] font-black rounded-full border-t border-white/40 shadow-2xl glass-noise"
            >
              Enter
            </Button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-12 flex flex-col items-center gap-4 animate-fade-in opacity-40">
        <div className="w-px h-12 bg-gradient-to-t from-white to-transparent"></div>
        <p className="text-[10px] font-bold text-white tracking-[0.5em] uppercase">
          Identify the Persona
        </p>
      </div>
    </div>
  );
};

export default LandingScreen;
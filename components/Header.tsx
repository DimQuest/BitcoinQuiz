
import React from 'react';
import { Language } from '../types';

interface HeaderProps {
  lang: Language;
  currentStep: number;
  totalSteps: number;
  finished: boolean;
}

const Header: React.FC<HeaderProps> = ({ lang, currentStep, totalSteps, finished }) => {
  const progress = finished ? 100 : ((currentStep) / totalSteps) * 100;
  
  return (
    <header className="w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-900 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bitcoin-bg rounded-xl flex items-center justify-center glow-orange">
            <span className="text-xl font-black text-white">₿</span>
          </div>
          <span className="font-black text-white text-lg tracking-tighter">BTC READY?</span>
        </div>
        
        {!finished && (
          <div className="flex items-center gap-4 w-1/2 sm:w-1/3">
            <div className="flex-grow bg-slate-900 h-2 rounded-full overflow-hidden">
              <div 
                className="bitcoin-bg h-full transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] glow-orange"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[10px] font-black text-slate-500 uppercase">
              {currentStep + 1} / {totalSteps}
            </span>
          </div>
        )}

        <div className="flex gap-4">
          <div className="hidden sm:flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Live Network</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

import React from 'react';
import { Language } from '../types';

interface LanguageSelectorProps {
  currentLang: Language;
  onSelect: (lang: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLang, onSelect }) => {
  return (
    <div className="flex items-center gap-3 p-1 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
      <button
        onClick={() => onSelect('en')}
        className={`px-3 py-1.5 text-[10px] font-black rounded-xl transition-all uppercase tracking-widest ${
          currentLang === 'en' 
            ? 'bg-orange-500 text-white glow-orange shadow-lg' 
            : 'text-slate-500 hover:text-slate-300'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => onSelect('id')}
        className={`px-3 py-1.5 text-[10px] font-black rounded-xl transition-all uppercase tracking-widest ${
          currentLang === 'id' 
            ? 'bg-orange-500 text-white glow-orange shadow-lg' 
            : 'text-slate-500 hover:text-slate-300'
        }`}
      >
        ID
      </button>
    </div>
  );
};

export default LanguageSelector;
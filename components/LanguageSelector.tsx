
import React from 'react';
import { Language } from '../types';

interface LanguageSelectorProps {
  currentLang: Language;
  onSelect: (lang: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLang, onSelect }) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onSelect('en')}
        className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
          currentLang === 'en' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => onSelect('id')}
        className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
          currentLang === 'id' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
        }`}
      >
        ID
      </button>
    </div>
  );
};

export default LanguageSelector;

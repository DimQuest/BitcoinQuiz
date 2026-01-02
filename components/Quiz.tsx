
import React, { useState, useEffect } from 'react';
import { Question, Language } from '../types';

interface QuizProps {
  lang: Language;
  question: Question;
  onAnswer: (optionIndex: number, score: number) => void;
  stepIndex: number;
}

const Quiz: React.FC<QuizProps> = ({ lang, question, onAnswer, stepIndex }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isExploding, setIsExploding] = useState(false);

  // Reset local state when question changes
  useEffect(() => {
    setSelectedOption(null);
    setIsExploding(false);
  }, [question]);

  const handleSelect = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    setIsExploding(true);
    
    // Auto advance after short delay for "funny response" to be seen
    setTimeout(() => {
      onAnswer(idx, question.options[idx].readinessScore);
    }, 1200);
  };

  return (
    <div className="max-w-2xl w-full">
      <div className="mb-12 text-center">
        <div className="inline-block px-3 py-1 bg-slate-900 border border-slate-800 text-orange-400 text-[10px] font-black rounded-full uppercase tracking-[0.2em] mb-4">
          {question.category}
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white leading-[1.1] tracking-tight">
          {question.question[lang]}
        </h2>
      </div>

      <div className="space-y-4 mb-8">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            disabled={selectedOption !== null}
            onClick={() => handleSelect(idx)}
            className={`w-full p-6 text-left rounded-3xl border-2 transition-all duration-300 flex items-center justify-between group relative overflow-hidden
              ${selectedOption === idx 
                ? 'border-orange-500 bg-orange-500/10' 
                : selectedOption !== null 
                  ? 'border-slate-900 bg-slate-900/40 opacity-30 scale-95' 
                  : 'border-slate-900 bg-slate-900/60 hover:border-orange-500/50 hover:bg-slate-900 hover:shadow-[0_0_30px_rgba(247,147,26,0.1)] hover:-translate-y-1'
              }`}
          >
            <span className={`text-lg font-bold ${selectedOption === idx ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
              {option.text[lang]}
            </span>
            
            {selectedOption === idx && (
              <div className="absolute right-6 top-1/2 -translate-y-1/2 animate-in slide-in-from-right-4 duration-300">
                <span className="text-2xl font-black text-orange-400 whitespace-nowrap bg-slate-950 px-3 py-1 rounded-full shadow-lg border border-orange-500/20">
                  {option.explanation[lang]}
                </span>
              </div>
            )}

            {selectedOption === null && (
               <div className="w-8 h-8 rounded-2xl bg-slate-900 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                  <div className="w-1.5 h-1.5 bg-slate-700 rounded-full group-hover:bg-orange-500 transition-colors" />
               </div>
            )}
          </button>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
         <div className="flex gap-1">
            {[...Array(10)].map((_, i) => (
              <div 
                key={i} 
                className={`w-8 h-1 rounded-full transition-all duration-500 ${i <= stepIndex ? 'bg-orange-500 glow-orange' : 'bg-slate-900'}`} 
              />
            ))}
         </div>
      </div>
    </div>
  );
};

export default Quiz;

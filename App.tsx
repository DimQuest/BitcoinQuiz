
import React, { useState } from 'react';
import { Language, UserAnswer } from './types';
import { QUESTIONS } from './constants';
import Header from './components/Header';
import Quiz from './components/Quiz';
import Results from './components/Results';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [isStarted, setIsStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleStart = () => {
    setIsStarted(true);
  };

  const handleAnswer = (optionIndex: number, score: number) => {
    const newAnswer: UserAnswer = {
      questionId: QUESTIONS[currentStep].id,
      optionIndex,
      score
    };
    setAnswers([...answers, newAnswer]);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setQuizFinished(false);
    setIsStarted(false);
  };

  if (!isStarted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-950/20">
        <div className="absolute top-6 right-6 flex items-center gap-3 text-xs font-bold uppercase tracking-widest">
           <button 
             onClick={() => setLang('en')} 
             className={`transition-colors ${lang === 'en' ? 'text-orange-400' : 'text-slate-500 hover:text-orange-300'}`}
           >
             English
           </button>
           <span className="text-slate-700">|</span>
           <button 
             onClick={() => setLang('id')} 
             className={`transition-colors ${lang === 'id' ? 'text-orange-400' : 'text-slate-500 hover:text-orange-300'}`}
           >
             Indonesia
           </button>
        </div>
        
        <div className="max-w-xl w-full text-center animate-in fade-in zoom-in duration-700">
          <div className="mb-8 inline-block p-4 rounded-full bg-orange-500/10 glow-orange">
            <span className="text-7xl">₿</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-black mb-6 tracking-tighter">
            Are you ready for <span className="bitcoin-orange">Bitcoin?</span>
          </h1>
          <p className="text-xl text-slate-400 mb-12 leading-relaxed max-w-lg mx-auto">
            {lang === 'en' 
              ? "Your friends are talking about it. Your feed is full of it. But is Bitcoin really right for you?" 
              : "Bitcoin lagi ramai dibahas di tongkrongan dan media sosial. Tapi apakah Bitcoin pilihan yang tepat buat anda?"}
          </p>
          
          <div className="max-w-xs mx-auto">
            <button
              onClick={handleStart}
              className="group relative w-full py-5 bg-orange-500 text-white rounded-2xl font-black text-xl hover:bg-orange-600 transition-all active:scale-95 glow-orange-strong overflow-hidden"
            >
              <span className="relative z-10">{lang === 'en' ? "Find out now" : "Cari tahu sekarang"}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
            </button>
          </div>
        </div>

        <style>{`
          @keyframes shimmer {
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pb-12">
      <Header lang={lang} currentStep={currentStep} totalSteps={QUESTIONS.length} finished={quizFinished} />
      
      <main className="flex-grow container mx-auto px-4 mt-8 flex justify-center">
        {!quizFinished ? (
          <Quiz 
            lang={lang} 
            question={QUESTIONS[currentStep]} 
            onAnswer={handleAnswer} 
            stepIndex={currentStep}
          />
        ) : (
          <Results 
            lang={lang} 
            answers={answers} 
            onReset={resetQuiz}
          />
        )}
      </main>

      <footer className="mt-12 text-center text-slate-600 text-xs px-4 uppercase tracking-[0.2em]">
        <p>{lang === 'en' ? "Education only • No financial advice" : "Hanya edukasi • Bukan saran keuangan"}</p>
      </footer>
    </div>
  );
};

export default App;

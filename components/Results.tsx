import React, { useMemo, useEffect, useState } from 'react';
import { Language, UserAnswer } from '../types';
import { PERSONAS, QUESTIONS } from '../constants';
import { GoogleGenAI, Type } from "@google/genai";

interface ResultsProps {
  lang: Language;
  answers: UserAnswer[];
  onReset: () => void;
}

interface FlagPoint {
  type: 'green' | 'red';
  label: string;
  feedback: string;
  recommendation: string;
}

interface AIAnalysis {
  narrative: string;
  insights: FlagPoint[];
}

const Results: React.FC<ResultsProps> = ({ lang, answers, onReset }) => {
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const totalPoints = useMemo(() => answers.reduce((acc, curr) => acc + curr.score, 0), [answers]);
  const readinessScore = useMemo(() => Math.max(1, Math.round((totalPoints / 20) * 10)), [totalPoints]);

  const persona = useMemo(() => {
    let selected = PERSONAS[0];
    for (const p of PERSONAS) {
      if (totalPoints >= p.minScore) {
        selected = p;
      }
    }
    return selected;
  }, [totalPoints]);

  const isReady = readinessScore >= 7;

  useEffect(() => {
    const fetchAnalysis = async () => {
      const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : undefined;
      
      if (!apiKey) {
        console.warn("API_KEY not found. AI Analysis skipped.");
        return;
      }

      setLoadingAi(true);
      try {
        const ai = new GoogleGenAI({ apiKey });
        
        const context = answers.map(ans => {
          const q = QUESTIONS.find(qi => qi.id === ans.questionId);
          return `Q: ${q?.question.en} | A: ${q?.options[ans.optionIndex].text.en}`;
        }).join('\n');

        const prompt = `
          Analyze these user answers from a Bitcoin readiness quiz:
          ${context}

          Base Persona: ${persona.name.en}
          
          TASK: 
          1. Generate a 'narrative': A 2-3 sentence personalized description.
          2. Generate 3 'insights' (green/red flags).

          CRITICAL GUIDELINES:
          - STRATEGY: Mention DCA (Dollar Cost Averaging).
          - LANGUAGE: ${lang === 'en' ? 'English' : 'Natural Bahasa Indonesia (e.g., "Uang dingin", "Kena mental")'}.
          - NO FINANCIAL ADVICE.
        `;

        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                narrative: { type: Type.STRING },
                insights: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      type: { type: Type.STRING, enum: ['green', 'red'] },
                      label: { type: Type.STRING },
                      feedback: { type: Type.STRING },
                      recommendation: { type: Type.STRING },
                    },
                    required: ['type', 'label', 'feedback', 'recommendation'],
                  },
                },
              },
              required: ['narrative', 'insights'],
            },
          },
        });
        
        if (response.text) {
          // Robust parsing in case of markdown wrapping
          let cleanText = response.text.trim();
          if (cleanText.startsWith('```')) {
            cleanText = cleanText.replace(/^```(json)?\n?/, '').replace(/\n?```$/, '');
          }
          const parsed = JSON.parse(cleanText) as AIAnalysis;
          setAnalysis(parsed);
        }
      } catch (e) {
        console.error("AI Analysis failed:", e);
      } finally {
        setLoadingAi(false);
      }
    };
    fetchAnalysis();
  }, [totalPoints, lang, answers, persona.name.en]);

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div className="max-w-2xl w-full animate-in zoom-in duration-700">
      <div className="bg-slate-900/40 backdrop-blur-xl rounded-[3rem] shadow-2xl overflow-hidden border border-slate-800">
        <div className={`p-12 text-center relative overflow-hidden ${isReady ? 'bg-green-500/5' : 'bg-orange-500/5'}`}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/80 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="text-8xl mb-6 drop-shadow-[0_0_20px_rgba(255,247,147,0.3)]">
              {isReady ? '🌕' : '🌱'}
            </div>
            <h2 className="text-[10px] font-black tracking-[0.3em] text-orange-500 uppercase mb-2">
              {lang === 'en' ? "Your Persona" : "Persona Anda"}
            </h2>
            <h3 className="text-5xl font-black text-white mb-4 tracking-tighter">
              {persona.name[lang]}
            </h3>
            
            <div className={`inline-flex items-center gap-3 px-6 py-2 rounded-full text-xs font-black tracking-widest uppercase ${isReady ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'}`}>
               <div className={`w-2 h-2 rounded-full ${isReady ? 'bg-green-400 animate-pulse' : 'bg-orange-400'}`} />
               <span>
                {isReady 
                  ? (lang === 'en' ? "Mission Ready" : "Misi Siap") 
                  : (lang === 'en' ? "Research Required" : "Perlu Riset")
                }
               </span>
               <span className="opacity-40">•</span>
               <span className="text-slate-400">{lang === 'en' ? 'Your Score' : 'Skor Anda'}: <span className="text-white">{readinessScore}/10</span></span>
            </div>
          </div>
        </div>

        <div className="p-12 pt-6">
          <div className="min-h-[100px] flex items-center justify-center mb-10">
            {loadingAi ? (
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" />
              </div>
            ) : (
              <p className="text-xl text-slate-300 leading-relaxed text-center font-medium italic">
                "{analysis?.narrative || persona.description[lang]}"
              </p>
            )}
          </div>

          <div className="mb-10">
            <h4 className="font-black text-slate-500 mb-6 uppercase text-[10px] tracking-[0.2em] text-center">
              {lang === 'en' ? "ANALYSING YOUR JOURNEY" : "MENGANALISA PERJALANAN ANDA"}
            </h4>
            
            <div className="space-y-4">
              {loadingAi ? (
                <div className="flex flex-col items-center gap-4 py-12">
                   <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                   <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Generating custom insights...</span>
                </div>
              ) : analysis?.insights && analysis.insights.length > 0 ? (
                analysis.insights.map((flag, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => toggleExpand(idx)}
                    className={`cursor-pointer flex flex-col p-5 rounded-3xl border-l-4 bg-slate-950/40 backdrop-blur-sm transition-all hover:bg-slate-900/60 ${flag.type === 'green' ? 'border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.05)]' : 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.05)]'}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${flag.type === 'green' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                        {flag.type === 'green' ? '✓' : '!'}
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-center mb-1">
                          <h5 className={`font-black text-xs uppercase tracking-widest ${flag.type === 'green' ? 'text-green-400' : 'text-red-400'}`}>
                            {flag.label}
                          </h5>
                          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter">
                            {expandedIndex === idx 
                              ? (lang === 'en' ? 'Close' : 'Tutup') 
                              : (lang === 'en' ? 'Learn more' : 'Lihat detail')}
                          </span>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed font-medium">
                          {flag.feedback}
                        </p>
                      </div>
                    </div>
                    
                    {expandedIndex === idx && (
                      <div className="mt-4 pt-4 border-t border-slate-800 animate-in slide-in-from-top-2 duration-300">
                        <div className="bg-slate-900/80 p-4 rounded-2xl border border-orange-500/20">
                          <div className="flex items-center gap-2 mb-2">
                             <span className="text-lg">💡</span>
                             <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest">
                               {lang === 'en' ? 'Tip / Fun Fact' : 'Tips / Fakta Menarik'}
                             </span>
                          </div>
                          <p className="text-slate-200 text-sm leading-relaxed font-semibold italic">
                            {flag.recommendation}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-slate-600 border border-dashed border-slate-800 rounded-3xl">
                  {lang === 'en' ? "Analysis results appear here after you finish!" : "Hasil analisa akan muncul di sini setelah kuis selesai!"}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={onReset}
            className="w-full py-5 bg-white text-black rounded-3xl font-black text-lg hover:bg-orange-500 hover:text-white transition-all duration-300 flex items-center justify-center glow-orange"
          >
            {lang === 'en' ? "Retake Quiz" : "Ulangi Kuis"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
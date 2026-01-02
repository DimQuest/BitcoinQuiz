
export type Language = 'en' | 'id';

export interface Question {
  id: string;
  category: string;
  question: {
    en: string;
    id: string;
  };
  options: {
    text: { en: string; id: string };
    readinessScore: number;
    explanation: { en: string; id: string };
  }[];
}

export interface UserAnswer {
  questionId: string;
  optionIndex: number;
  score: number;
}

export interface QuizResult {
  totalScore: number;
  persona: string;
  isReady: boolean;
  explanation: string;
}

export interface PersonaInfo {
  name: { en: string; id: string };
  description: { en: string; id: string };
  minScore: number;
}

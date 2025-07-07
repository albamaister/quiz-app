export type Category = "React" | "JavaScript" | "HTML" | "CSS";

export interface Question {
  id: number;
  category: Category;
  question: string;
  options: {
    id: string;
    text: string;
  }[];
  correctAnswer: string;
  explanation: string;
}

export interface QuizState {
  currentQuestion: number;
  selectedAnswer: string | null;
  showFeedback: boolean;
  score: number;
  answeredQuestions: number[];
}

export interface UserProgress {
  totalQuestions: number;
  correctAnswers: number;
  completedQuizzes: number;
  categoryProgress: Record<Category, { correct: number; total: number }>;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
}
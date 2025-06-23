import type { UserProgress } from "../types/quiz";

export const defaultEmptyProgress: UserProgress = {
  totalQuestions: 0,
  correctAnswers: 0,
  completedQuizzes: 0,
  categoryProgress: {
    React: { correct: 0, total: 0 },
    JavaScript: { correct: 0, total: 0 },
    HTML: { correct: 0, total: 0 },
    CSS: { correct: 0, total: 0 },
  },
};

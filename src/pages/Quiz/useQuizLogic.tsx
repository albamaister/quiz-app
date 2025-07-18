import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import type { Question, QuizState } from "../../types/quiz";
import { getAllQuestions } from "../../services/questions";

export const useQuizLogic = () => {
  const { updateProgress, completeQuiz } = useAuth();
  const [loading, setLoading] = useState(true)

  const [questions, setQuestions] = useState<Question[]>([]);


  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    selectedAnswer: null,
    showFeedback: false,
    score: 0,
    answeredQuestions: [],
  });

  useEffect(() => {
  const fetchQuestions = async () => {
    const all = await getAllQuestions();
    const shuffled = all.sort(() => 0.5 - Math.random()).slice(0, 10);
    setQuestions(shuffled);
    setLoading(false)
  };
  fetchQuestions();
}, []);


  const currentQuestion = questions[quizState.currentQuestion];
  const isQuizComplete = quizState.currentQuestion >= questions.length;

  const handleAnswerSelect = (answerId: string) => {
    if (quizState.showFeedback) return;

    setQuizState((prev) => ({
      ...prev,
      selectedAnswer: answerId,
    }));
  };

  const handleSubmitAnswer = () => {
    if (!quizState.selectedAnswer) return;

    const isCorrect =
      quizState.selectedAnswer === currentQuestion.correctAnswer;

    updateProgress(currentQuestion.category, isCorrect);

    setQuizState((prev) => ({
      ...prev,
      showFeedback: true,
      score: isCorrect ? prev.score + 1 : prev.score,
      answeredQuestions: [...prev.answeredQuestions, prev.currentQuestion],
    }));
  };

  const handleNextQuestion = () => {
    if (quizState.currentQuestion === questions.length - 1) {
      completeQuiz();
    }

    setQuizState((prev) => ({
      ...prev,
      currentQuestion: prev.currentQuestion + 1,
      selectedAnswer: null,
      showFeedback: false,
    }));
  };

  const handleRestartQuiz = () => {
    setQuizState({
      currentQuestion: 0,
      selectedAnswer: null,
      showFeedback: false,
      score: 0,
      answeredQuestions: [],
    });
  };

  const getButtonText = () => {
    if (!quizState.selectedAnswer) return "Select an answer";
    if (!quizState.showFeedback) return "Submit Answer";
    if (quizState.currentQuestion === questions.length - 1)
      return "Complete Quiz";
    return "Next Question";
  };

  const handleButtonClick = () => {
    if (!quizState.showFeedback) {
      handleSubmitAnswer();
    } else {
      handleNextQuestion();
    }
  };

  const progressPercentage = Math.round(
    ((quizState.currentQuestion + 1) / questions.length) * 100
  );

  return {
    quizState,
    loading,
    currentQuestion,
    isQuizComplete,
    progressPercentage,
    handleAnswerSelect,
    handleSubmitAnswer,
    handleNextQuestion,
    handleRestartQuiz,
    getButtonText,
    handleButtonClick,
  };
};

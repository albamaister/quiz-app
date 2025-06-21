import type { Question, QuizState } from "../../types/quiz";
import {
  OptionButton,
  OptionContent,
  OptionLetter,
  OptionText,
  FeedbackIcon,
} from "./styles";

import { Check, X } from "lucide-react";

interface OptionButtonProps {
  option: { id: string; text: string };
  quizState: QuizState;
  currentQuestion: Question;
  handleAnswerSelect: (answerId: string) => void;
}

export const OptionButtonComponent: React.FC<OptionButtonProps> = ({
  option,
  quizState,
  currentQuestion,
  handleAnswerSelect,
}) => {
  return (
    <OptionButton
      $isSelected={quizState.selectedAnswer === option.id}
      $isCorrect={
        quizState.showFeedback && option.id === currentQuestion.correctAnswer
      }
      $showFeedback={quizState.showFeedback}
      onClick={() => handleAnswerSelect(option.id)}
    >
      <OptionContent>
        <OptionLetter
          $isSelected={quizState.selectedAnswer === option.id}
          $isCorrect={
            quizState.showFeedback &&
            option.id === currentQuestion.correctAnswer
          }
          $showFeedback={quizState.showFeedback}
        >
          {option.id}
        </OptionLetter>

        <OptionText>{option.text}</OptionText>
      </OptionContent>

      {quizState.showFeedback &&
        (option.id === currentQuestion.correctAnswer ||
          (quizState.selectedAnswer === option.id &&
            option.id !== currentQuestion.correctAnswer)) && (
          <FeedbackIcon
            $isCorrect={option.id === currentQuestion.correctAnswer}
          >
            {option.id === currentQuestion.correctAnswer ? (
              <Check size={20} />
            ) : (
              <X size={20} />
            )}
          </FeedbackIcon>
        )}
    </OptionButton>
  );
};

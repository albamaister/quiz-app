import { Check, RotateCcw } from "lucide-react";
import {
  CompletionCard,
  CompletionTitle,
  CompletionIcon,
  ScoreDisplay,
  ScoreText,
} from "./styles";
import { ActionButton } from "../../pages/Quiz/styles";
import { questions } from "../../data/questions";
import type { QuizState } from "../../types/quiz";

interface QuizCompleteProps {
  quizState: QuizState;
  handleRestartQuiz: () => void;
  percentage: number;
}

export const QuizComplete: React.FC<QuizCompleteProps> = ({
  quizState,
  handleRestartQuiz,
  percentage,
}) => {
  return (
    <CompletionCard>
      <CompletionIcon>
        <Check size={64} />
      </CompletionIcon>

      <CompletionTitle>Quiz Complete!</CompletionTitle>

      <ScoreDisplay>
        {quizState.score}/{questions.length}
      </ScoreDisplay>
      <ScoreText>{percentage}% Correct</ScoreText>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <ActionButton onClick={handleRestartQuiz}>
          <RotateCcw size={20} />
          Try Again
        </ActionButton>
        <ActionButton onClick={() => console.log("View Progress")}>
          View Progress
        </ActionButton>
      </div>
    </CompletionCard>
  );
};

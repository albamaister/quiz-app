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

interface QuizCompleteProps {
  score: number;
  handleRestartQuiz: () => void;
  percentage: number;
}

export const QuizComplete: React.FC<QuizCompleteProps> = ({
  score,
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
        {score}/{questions.length}
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

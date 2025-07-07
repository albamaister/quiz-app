import { Check, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  CompletionCard,
  CompletionTitle,
  CompletionIcon,
  ScoreDisplay,
  ScoreText,
} from "./styles";
import { ActionButton } from "../../pages/Quiz/styles";

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
  const navigate = useNavigate();
  return (
    <CompletionCard>
      <CompletionIcon>
        <Check size={64} />
      </CompletionIcon>

      <CompletionTitle>Quiz Complete!</CompletionTitle>

      <ScoreDisplay>
        {score}/{10}
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
        <ActionButton onClick={() => navigate("/progress")}>
          View Progress
        </ActionButton>
      </div>
    </CompletionCard>
  );
};

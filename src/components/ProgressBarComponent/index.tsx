import type { QuizState } from "../../types/quiz";

import {
  ProgressSection,
  ProgressInfo,
  ProgressText,
  ProgressBar,
  ProgressFill,
} from "./styles";

interface ProgressBarProps {
  quizState: QuizState;
  progressPercentage: number;
}

export const ProgressBarComponent: React.FC<ProgressBarProps> = ({
  quizState,
  progressPercentage,
}) => {
  return (
    <ProgressSection>
      <ProgressInfo>
        <ProgressText>
          Question {quizState.currentQuestion + 1} of {10 /* update */}
        </ProgressText>
        <ProgressText>{progressPercentage}%</ProgressText>
      </ProgressInfo>
      <ProgressBar>
        <ProgressFill $percentage={progressPercentage} />
      </ProgressBar>
    </ProgressSection>
  );
};

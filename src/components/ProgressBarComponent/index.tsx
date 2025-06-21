import {
  ProgressSection,
  ProgressInfo,
  ProgressText,
  ProgressBar,
  ProgressFill,
} from "./styles";

interface ProgressBarProps {
  currentQuestion: number;
  progressPercentage: number;
}

export const ProgressBarComponent: React.FC<ProgressBarProps> = ({
  currentQuestion,
  progressPercentage,
}) => {
  return (
    <ProgressSection>
      <ProgressInfo>
        <ProgressText>
          Question {currentQuestion + 1} of {10 /* update */}
        </ProgressText>
        <ProgressText>{progressPercentage}%</ProgressText>
      </ProgressInfo>
      <ProgressBar>
        <ProgressFill $percentage={progressPercentage} />
      </ProgressBar>
    </ProgressSection>
  );
};

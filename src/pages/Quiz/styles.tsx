import styled from "styled-components";

export const QuizContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

export const ProgressSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const ProgressText = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 0.75rem;
  background: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ $percentage: number }>`
  width: ${({ $percentage }) => $percentage}%;
  height: 100%;
  background: ${({ theme }) => theme.gradients.primary};
  transition: width 0.5s ease;
`;

//Card

export const QuestionCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: 0 4px 6px ${({ theme }) => theme.colors.shadow};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const QuestionText = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

// CategoryBadge

export const CategoryBadge = styled.span<{ $category: string }>`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  ${({ $category }) => {
    const colors = {
      React: { bg: "#61DAFB20", text: "#61DAFB" },
      JavaScript: { bg: "#F7DF1E20", text: "#F7DF1E" },
      HTML: { bg: "#E34F2620", text: "#E34F26" },
      CSS: { bg: "#1572B620", text: "#1572B6" },
    };
    const color = colors[$category as keyof typeof colors] || colors.React;
    return `
      background: ${color.bg};
      color: ${color.text};
    `;
  }}
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const OptionButton = styled.button<{
  $isSelected: boolean;
  $isCorrect?: boolean;
  $showFeedback: boolean;
}>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 2px solid;
  background: ${({ theme }) => theme.colors.surface};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: ${({ $showFeedback }) => ($showFeedback ? "default" : "pointer")};
  transition: all 0.2s ease;

  ${({ $isSelected, $isCorrect, $showFeedback, theme }) => {
    if (!$showFeedback) {
      return $isSelected
        ? `
          border-color: ${theme.colors.primary};
          background: ${theme.colors.primary}10;
        `
        : `
          border-color: ${theme.colors.border};
          &:hover {
            border-color: ${theme.colors.borderHover};
            background: ${theme.colors.surfaceHover};
          }
        `;
    }

    if ($isCorrect) {
      return `
        border-color: ${theme.colors.success};
        background: ${theme.colors.success}10;
      `;
    }

    if ($isSelected && !$isCorrect) {
      return `
        border-color: ${theme.colors.error};
        background: ${theme.colors.error}10;
      `;
    }

    return `
      border-color: ${theme.colors.border};
      opacity: 0.5;
    `;
  }}
`;

export const OptionContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const OptionLetter = styled.span<{
  $isSelected: boolean;
  $isCorrect?: boolean;
  $showFeedback: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: 700;
  font-size: 0.875rem;

  ${({ $isSelected, $isCorrect, $showFeedback, theme }) => {
    if (!$showFeedback) {
      return $isSelected
        ? `
          background: ${theme.colors.primary};
          color: white;
        `
        : `
          background: ${theme.colors.border};
          color: ${theme.colors.textMuted};
        `;
    }

    if ($isCorrect) {
      return `
        background: ${theme.colors.success};
        color: white;
      `;
    }

    if ($isSelected && !$isCorrect) {
      return `
        background: ${theme.colors.error};
        color: white;
      `;
    }

    return `
      background: ${theme.colors.border};
      color: ${theme.colors.textMuted};
    `;
  }}
`;

export const OptionText = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

export const FeedbackIcon = styled.div<{ $isCorrect: boolean }>`
  color: ${({ $isCorrect, theme }) =>
    $isCorrect ? theme.colors.success : theme.colors.error};
`;

//explain

export const ExplanationBox = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surfaceHover};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
`;

export const ExplanationTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const ExplanationText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`;

export const ActionButton = styled.button<{ $disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme, $disabled }) =>
    $disabled ? theme.colors.border : theme.gradients.primary};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-weight: 600;
  margin: 0 auto;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};
  }
`;

export const CompletionCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xxl};
  text-align: center;
  box-shadow: 0 4px 6px ${({ theme }) => theme.colors.shadow};
`;

export const CompletionIcon = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.warning};
`;

export const CompletionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const ScoreDisplay = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: ${({ theme }) => theme.spacing.xl} 0;
`;

export const ScoreText = styled.div`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const BackButton = styled.button`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  font-weight: 600;
  font-size: 0.875rem;
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

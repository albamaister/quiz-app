import styled from "styled-components";

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

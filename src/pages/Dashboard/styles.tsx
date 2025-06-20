import styled from "styled-components";

export const WelcomeSection = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxl};
  text-align: center;
`;

export const WelcomeTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: 1.2;
`;

export const WelcomeSubtitle = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  line-height: 1.6;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  justify-content: center;
  flex-wrap: wrap;
`;

export const ActionButton = styled.button<{
  $variant?: "primary" | "secondary";
}>`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.2s ease;

  ${({ $variant, theme }) =>
    $variant === "secondary"
      ? `
        background: ${theme.colors.surface};
        color: ${theme.colors.text};
        border: 2px solid ${theme.colors.border};
        
        &:hover {
          border-color: ${theme.colors.primary};
          color: ${theme.colors.primary};
        }
      `
      : `
        background: ${theme.gradients.primary};
        color: white;
        
        &:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px ${theme.colors.shadow};
        }
      `}
`;

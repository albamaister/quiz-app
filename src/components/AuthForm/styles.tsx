import styled from 'styled-components'

export const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: 0 10px 25px ${({ theme }) => theme.colors.shadow};
`;

export const Title = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const InputGroup = styled.div`
  position: relative;
`;

export const InputIcon = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.textMuted};
  z-index: 1;
`;

export const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.md} 3rem;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const PasswordToggle = styled.button`
  position: absolute;
  right: ${({ theme }) => theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  background: none;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const SubmitButton = styled.button<{ $loading?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.gradients.primary};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 600;
  opacity: ${({ $loading }) => $loading ? 0.7 : 1};
  cursor: ${({ $loading }) => $loading ? 'not-allowed' : 'pointer'};

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};
  }
`;

export const ToggleText = styled.p`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ToggleLink = styled.button`
  background: none;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  padding: 0;
  margin-left: ${({ theme }) => theme.spacing.xs};

  &:hover {
    text-decoration: underline;
  }
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.875rem;
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.sm};
`;
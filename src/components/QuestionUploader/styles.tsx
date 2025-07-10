import styled from "styled-components";

export const Container = styled.div`
  max-width: 600px;
  margin: auto;
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const UploadBox = styled.div`
  border: 2px dashed ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

export const FileInput = styled.input`
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const UploadButton = styled.button`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background: ${({ theme }) => theme.gradients.primary};
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

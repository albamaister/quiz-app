import styled from "styled-components";

export const FooterWrapper = styled.footer`
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  background-color: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: auto;
`;

export const FooterText = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

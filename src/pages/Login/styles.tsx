import styled from 'styled-components'
 
export const ContentContainer = styled.main`
  padding: ${({ theme }) => theme.spacing.xl};
`;

export const Redirect = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
  color: ${({theme}) => theme.colors.textSecondary};
`
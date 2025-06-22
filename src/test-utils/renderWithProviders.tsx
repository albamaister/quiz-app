import type { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider as CustomThemeProvider } from '../contexts/ThemeContext';
import { AuthProvider } from '../contexts/AuthContext';
import { lightTheme } from '../styles/theme';

interface Props {
  children: ReactNode;
}

export const renderWithProviders = ({ children }: Props) =>
  render(
    <BrowserRouter>
      <AuthProvider>
        <CustomThemeProvider>
          <StyledThemeProvider theme={lightTheme}>
            {children}
          </StyledThemeProvider>
        </CustomThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );

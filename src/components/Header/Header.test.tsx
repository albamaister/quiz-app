import { renderWithProviders } from '../../test-utils/renderWithProviders';
import { screen } from '@testing-library/react';
import { Header } from './index';

describe('Header', () => {
  it('renders the logo text', () => {
    renderWithProviders({ children: <Header /> });

    expect(screen.getByText(/Frontend Quiz/i)).toBeInTheDocument();
  });
});

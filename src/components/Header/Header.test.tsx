import { renderWithProviders } from '../../test-utils/renderWithProviders';
import { screen } from '@testing-library/react';
import { Header } from './index';

jest.mock("../../firebase", () => ({

  auth: {
    onAuthStateChanged: jest.fn(),
    currentUser: null,
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
  },
  db: {}, 
}));


describe('Header', () => {
  it('renders the logo text', () => {
    renderWithProviders({ children: <Header /> });

    expect(screen.getByText(/Frontend Quiz/i)).toBeInTheDocument();
  });
});

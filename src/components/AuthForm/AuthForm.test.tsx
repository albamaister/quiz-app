import { screen, fireEvent, waitFor } from "@testing-library/react";
import { AuthForm } from "./index";
import { renderWithProviders } from "../../test-utils/renderWithProviders";

jest.mock("../../contexts/AuthContext", () => {
  const actual = jest.requireActual("../../contexts/AuthContext");
  return {
    ...actual,
    useAuth: () => ({
      login: jest.fn(() => Promise.resolve(true)),
      register: jest.fn(() => Promise.resolve(true)),
    }),
  };
});

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

describe("AuthForm", () => {
  const EMAIL = "test@example.com";
  const PASSWORD = "securepass";

  it("renders the email and password fields by default", () => {
    const onSuccess = jest.fn();
    renderWithProviders({ children: <AuthForm onSuccess={onSuccess} /> });

    expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });

  it("lets the user type into email and password fields", () => {
    const onSuccess = jest.fn();
    renderWithProviders({ children: <AuthForm onSuccess={onSuccess} /> });

    fireEvent.change(screen.getByPlaceholderText(/email address/i), {
      target: { value: EMAIL },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: PASSWORD },
    });

    expect(screen.getByPlaceholderText(/email address/i)).toHaveValue(EMAIL);
    expect(screen.getByPlaceholderText(/password/i)).toHaveValue(PASSWORD);
  });

  it("calls onSuccess when the form is valid and submitted", async () => {
    const onSuccess = jest.fn();
    renderWithProviders({ children: <AuthForm onSuccess={onSuccess} /> });

    fireEvent.change(screen.getByPlaceholderText(/email address/i), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "securepass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledTimes(1);
    });
  });

  it("toggles between login and register modes", () => {
    const onSuccess = jest.fn();
    renderWithProviders({ children: <AuthForm onSuccess={onSuccess} /> });

    const submitButton = screen.getByTestId("auth-submit");
    const toggle = screen.getByTestId("auth-toggle");

    expect(submitButton).toBeInTheDocument();
    expect(toggle).toHaveTextContent(/sign up/i);

    fireEvent.click(toggle);
    expect(toggle).toHaveTextContent(/sign in/i);
    fireEvent.click(toggle);

    expect(toggle).toHaveTextContent(/sign up/i);
  });
});

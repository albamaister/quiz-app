import { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  name: string;
}

export type Category = "React" | "JavaScript" | "HTML" | "CSS";

interface UserProgress {
  totalQuestions: number;
  correctAnswers: number;
  completedQuizzes: number;
  categoryProgress: Record<Category, { correct: number; total: number }>;
}

interface AuthContextType {
  user: User | null;
  userProgress: UserProgress | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProgress: (category: Category, isCorrect: boolean) => void;
  completeQuiz: (score: number, total: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedProgress = localStorage.getItem("userProgress");

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedProgress) setUserProgress(JSON.parse(savedProgress));
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (email && password) {
      const mockUser: User = {
        id: "1",
        email,
        name: email.split("@")[0],
      };

      const mockProgress: UserProgress = {
        totalQuestions: 0,
        correctAnswers: 0,
        completedQuizzes: 0,
        categoryProgress: {
          React: { correct: 0, total: 0 },
          JavaScript: { correct: 0, total: 0 },
          HTML: { correct: 0, total: 0 },
          CSS: { correct: 0, total: 0 },
        },
      };

      setUser(mockUser);
      setUserProgress(mockProgress);

      localStorage.setItem("user", JSON.stringify(mockUser));
      localStorage.setItem("userProgress", JSON.stringify(mockProgress));

      return true;
    }

    return false;
  };

  // register user

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // simula delay

    if (name && email && password) {
      const mockUser: User = {
        id: "1",
        email,
        name,
      };

      const mockProgress: UserProgress = {
        totalQuestions: 0,
        correctAnswers: 0,
        completedQuizzes: 0,
        categoryProgress: {
          React: { correct: 0, total: 0 },
          JavaScript: { correct: 0, total: 0 },
          HTML: { correct: 0, total: 0 },
          CSS: { correct: 0, total: 0 },
        },
      };

      setUser(mockUser);
      setUserProgress(mockProgress);

      localStorage.setItem("user", JSON.stringify(mockUser));
      localStorage.setItem("userProgress", JSON.stringify(mockProgress));

      return true;
    }

    return false;
  };

  // logout

  const logout = () => {
    setUser(null);
    setUserProgress(null);
    localStorage.removeItem("user");
    localStorage.removeItem("userProgress");
  };

  const updateProgress = (category: Category, isCorrect: boolean) => {
    if (!userProgress) return;

    const updatedCategory =
      userProgress.categoryProgress[
        category as keyof typeof userProgress.categoryProgress
      ];

    const updatedProgress: UserProgress = {
      ...userProgress,
      totalQuestions: userProgress.totalQuestions + 1,
      correctAnswers: isCorrect
        ? userProgress.correctAnswers + 1
        : userProgress.correctAnswers,
      categoryProgress: {
        ...userProgress.categoryProgress,
        [category]: {
          correct: isCorrect
            ? updatedCategory.correct + 1
            : updatedCategory.correct,
          total: updatedCategory.total + 1,
        },
      },
    };

    setUserProgress(updatedProgress);
    localStorage.setItem("userProgress", JSON.stringify(updatedProgress));
  };

  //complete quiz

  const completeQuiz = () => {
    if (!userProgress) return;

    const updatedProgress: UserProgress = {
      ...userProgress,
      completedQuizzes: userProgress.completedQuizzes + 1,
    };

    setUserProgress(updatedProgress);
    localStorage.setItem("userProgress", JSON.stringify(updatedProgress));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProgress,
        login,
        register,
        logout,
        updateProgress,
        completeQuiz,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

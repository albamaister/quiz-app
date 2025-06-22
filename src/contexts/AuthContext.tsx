import { createContext, useContext, useEffect, useState } from "react";
import type { Category } from "../types/quiz";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase"; 

interface User {
  id: string;
  email: string;
  name: string;
}

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
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const restoredUser: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email ?? "",
          name:
            firebaseUser.displayName ?? firebaseUser.email?.split("@")[0] ?? "",
        };

        const storedProgress = localStorage.getItem("userProgress");
        const progress: UserProgress = storedProgress
          ? JSON.parse(storedProgress)
          : {
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

        setUser(restoredUser);
        setUserProgress(progress);
      } else {
        setUser(null);
        setUserProgress(null);
      }
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = result.user;

      const mockUser: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email ?? "",
        name:
          firebaseUser.displayName ?? firebaseUser.email?.split("@")[0] ?? "",
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
    } catch (error) {
      console.error("Firebase login failed:", error);
      return false;
    }
  };

  // register user

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = result.user;

      const mockUser: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email ?? "",
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
    } catch (error) {
      console.error("Firebase registration failed:", error);
      return false;
    }
  };

  // logout
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserProgress(null);
      localStorage.removeItem("user");
      localStorage.removeItem("userProgress");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const updateProgress = (category: Category, isCorrect: boolean) => {
    if (!userProgress) return;

    const updatedCategory = userProgress.categoryProgress[category];

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

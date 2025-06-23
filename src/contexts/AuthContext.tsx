import { createContext, useContext, useEffect, useState } from "react";
import type { Category, User, UserProgress } from "../types/quiz";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";

import { auth } from "../firebase";
import {
  loadProgressFromFirestore,
  saveProgressToFirestore,
} from "../services/userProgress";

interface AuthContextType {
  user: User | null;
  userProgress: UserProgress | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProgress: (category: Category, isCorrect: boolean) => void;
  completeQuiz: () => void;
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
    const userLocalStorage = localStorage.getItem("user");
    if (userLocalStorage) {
      const userParsed = JSON.parse(userLocalStorage);

      if (
        userParsed &&
        typeof userParsed === "object" &&
        "id" in userParsed &&
        "email" in userParsed &&
        "name" in userParsed
      ) {
        setUser(userParsed as User);
      }
    }
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const restoredUser: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email ?? "",
          name:
            firebaseUser.displayName ?? firebaseUser.email?.split("@")[0] ?? "",
        };

        loadProgressFromFirestore(firebaseUser.uid).then((progress) => {
          setUser(restoredUser);
          setUserProgress(
            progress ?? {
              totalQuestions: 0,
              correctAnswers: 0,
              completedQuizzes: 0,
              categoryProgress: {
                React: { correct: 0, total: 0 },
                JavaScript: { correct: 0, total: 0 },
                HTML: { correct: 0, total: 0 },
                CSS: { correct: 0, total: 0 },
              },
            }
          );
        });
      } else {
        setUser(null);
        setUserProgress(null);
      }
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const userData: User = {
        id: user.uid,
        email: user.email ?? "",
        name: user.displayName ?? user.email?.split("@")[0] ?? "",
      };

      localStorage.setItem("user", JSON.stringify(userData));
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
      await updateProfile(result.user, { displayName: name });
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
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const updateProgress = (category: Category, isCorrect: boolean) => {
    if (!user || !userProgress) return;

    const categoryStats = userProgress.categoryProgress[category] ?? {
      correct: 0,
      total: 0,
    };

    const updatedProgress: UserProgress = {
      ...userProgress,
      correctAnswers: userProgress.correctAnswers + (isCorrect ? 1 : 0),
      totalQuestions: userProgress.totalQuestions + 1,
      categoryProgress: {
        ...userProgress.categoryProgress,
        [category]: {
          correct: categoryStats.correct + (isCorrect ? 1 : 0),
          total: categoryStats.total + 1,
        },
      },
    };

    setUserProgress(updatedProgress);
    saveProgressToFirestore(user.id, updatedProgress);
  };

  //complete quiz

  const completeQuiz = () => {
    if (!user || !userProgress) return;

    const updatedProgress: UserProgress = {
      ...userProgress,
      completedQuizzes: userProgress.completedQuizzes + 1,
    };

    setUserProgress(updatedProgress);

    saveProgressToFirestore(user.id, updatedProgress);
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

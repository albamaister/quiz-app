import { createContext, useContext, useEffect, useState } from "react";
import type { Category, User, UserProgress } from "../types/quiz";
import { onAuthStateChanged } from "firebase/auth";

import { auth, db } from "../firebase";
import {
  loadProgressFromFirestore,
  saveProgressToFirestore,
} from "../services/userProgress";
import { defaultEmptyProgress } from "../constants/defaultProgress";
import { loginUser, logoutUser, registerUser } from "../services/firebaseAuth";
import { doc, getDoc } from "firebase/firestore";

interface AuthContextType {
  user: User | null;
  userProgress: UserProgress | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<User | null>;
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

  const login = loginUser;
  const register = async (name: string, email: string, password: string) => {
    const newUser = await registerUser(name, email, password);

    if (newUser) {
      setUser(newUser);
      return newUser;
    }

    return null;
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    setUserProgress(null);
  };

  const loadUserFromFirestore = async (uid: string): Promise<User | null> => {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);
    if (snap.exists()) return snap.data() as User;
    return null;
  };

  useEffect(() => {
    const userLocalStorage = localStorage.getItem("user");
    if (userLocalStorage) {
      const userParsed = JSON.parse(userLocalStorage);

      if (
        userParsed &&
        typeof userParsed === "object" &&
        "id" in userParsed &&
        "email" in userParsed &&
        "name" in userParsed &&
        "role" in userParsed
      ) {
        setUser(userParsed as User);
      }
    }
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userFromFirestore = await loadUserFromFirestore(
            firebaseUser.uid
          );
          if (userFromFirestore) {
            setUser(userFromFirestore);
            const progress = await loadProgressFromFirestore(firebaseUser.uid);
            setUserProgress(progress ?? defaultEmptyProgress);
          } else {
            console.error("User not found in Firestore");
          }
        } catch (err) {
          console.error("Error restoring user", err);
        }
      } else {
        setUser(null);
        setUserProgress(null);
      }
    });

    return unsubscribe;
  }, []);

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

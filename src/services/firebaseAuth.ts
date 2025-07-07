import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import type { User } from "../types/quiz";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export const loginUser = async (
  email: string,
  password: string
): Promise<boolean> => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const userData: User = {
      id: user.uid,
      email: user.email ?? "",
      name: user.displayName ?? user.email?.split("@")[0] ?? "",
      role: user.email === "bryan@admin.com" ? "admin" : "user",
    };

    localStorage.setItem("user", JSON.stringify(userData));
    return true;
  } catch (error) {
    console.error("Firebase login failed:", error);
    return false;
  }
};

// register user

export const registerUser = async (
  name: string,
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const uid = result.user.uid;

    const newUser: User = {
      id: uid,
      email,
      name,
      role: email === "bryan@admin.com" ? "admin" : "user",
    };

    await setDoc(doc(db, "users", uid), newUser);
    await updateProfile(result.user, { displayName: name });

    localStorage.setItem("user", JSON.stringify(newUser));
    return newUser;
  } catch (error) {
    console.error("Firebase registration failed:", error);
    return null;
  }
};

// logout
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

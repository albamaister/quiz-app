import { getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import type { UserProgress } from "../types/quiz";

export const saveProgressToFirestore = async (
  userId: string,
  progress: UserProgress
) => {
  try {
    const ref = doc(db, "progress", userId);
    await setDoc(ref, progress);
  } catch (error) {
    console.error("Failed to save progress to Firestore:", error);
  }
};

export const loadProgressFromFirestore = async (
  userId: string
): Promise<UserProgress | null> => {
  try {
    const ref = doc(db, "progress", userId);
    const snapshot = await getDoc(ref);

    if (snapshot.exists()) {
      return snapshot.data() as UserProgress;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error loading progress from Firestore:", error);
    return null;
  }
};
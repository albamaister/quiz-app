import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import type { Question } from "../types/quiz";

export const getAllQuestions = async () => {
  try {
    const snapshot = await getDocs(collection(db, "questions"));
    return snapshot.docs.map((doc, idx) => ({
      id: idx,
      ...doc.data(),
    })) as Question[];
  } catch (error) {
    console.error("Failed to fetch questions from Firestore:", error);
    return [];
  }
};

import React, { useState } from "react";
import * as XLSX from "xlsx";
import { collection, doc, writeBatch } from "firebase/firestore";
import { db } from "../../firebase";
import { Container, FileInput, UploadBox, UploadButton } from "./styles";
import { BackButton } from "../../pages/Quiz/styles";
import { useNavigate } from "react-router-dom";

const QuestionUploader = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);

  const navigate = useNavigate();


  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      try {
        const transformed = jsonData.map((row: any) => {
          if (
            !row.category ||
            !row.question ||
            !row.optionA ||
            !row.optionB ||
            !row.optionC ||
            !row.optionD ||
            !row.correctAnswer
          ) {
            throw new Error("Missing required fields in row.");
          }

          return {
            category: row.category,
            question: row.question,
            options: [
              { id: "A", text: row.optionA },
              { id: "B", text: row.optionB },
              { id: "C", text: row.optionC },
              { id: "D", text: row.optionD },
            ],
            correctAnswer: row.correctAnswer,
            explanation: row.explanation ?? "",
          };
        });

        setQuestions(transformed);
        console.log("Transformed questions:", transformed);
      } catch (error) {
        console.error("Error transforming questions:", error);
        alert("Invalid format in one or more rows.");
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const uploadToFirestore = async () => {
    try {
      const batch = writeBatch(db);
      questions.forEach((question) => {
        const ref = doc(collection(db, "questions"));
        batch.set(ref, question);
      });
      await batch.commit();
      alert("Questions uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. See console for details.");
    }
  };

  return (
    <Container>
      <BackButton onClick={() => navigate("/")}>← Back to Dashboard</BackButton>

      <h2>Upload Questions</h2>
      <UploadBox>
        <p>Select a CSV or Excel file</p>
        <FileInput
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleFileUpload}
        />
        {fileName && <p>Loaded: {fileName}</p>}
      </UploadBox>
      {questions.length > 0 && (
        <UploadButton onClick={uploadToFirestore}>
          Upload {questions.length} Questions to Firestore
        </UploadButton>
      )}
    </Container>
  );
};

export default QuestionUploader;

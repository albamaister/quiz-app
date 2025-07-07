import React, { useState } from "react";
import * as XLSX from "xlsx";
import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  margin: auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const UploadBox = styled.div`
  border: 2px dashed ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

const FileInput = styled.input`
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const QuestionUploader = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = evt.target?.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setQuestions(jsonData);
      console.log("Parsed questions:", jsonData);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <Container>
      <h2>Upload Questions</h2>
      <UploadBox>
        <p>Select a CSV or Excel file</p>
        <FileInput type="file" accept=".xlsx,.xls,.csv" onChange={handleFileUpload} />
        {fileName && <p>Loaded: {fileName}</p>}
      </UploadBox>
    </Container>
  );
};

export default QuestionUploader;

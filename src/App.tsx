import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { Header } from "./components/Header";
import PrivateRoute from "./routes/PrivateRoute";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Quiz } from "./pages/Quiz";
import { Progress } from "./pages/Progress";
import { Footer } from "./components/Footer";
import QuestionUploader from "./components/QuestionUploader";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* background: ${({ theme }) => theme.colors.background}; */
`;

const MainContent = styled.main`
  padding: ${({ theme }) => theme.spacing.xl} 0;
  flex: 1;
`;

export const App = () => {
  return (
    <Router>
      <AppContainer>
        <Header />
        <MainContent>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/quiz"
              element={
                <PrivateRoute>
                  <Quiz />
                </PrivateRoute>
              }
            />
            <Route
              path="/progress"
              element={
                <PrivateRoute>
                  <Progress />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/upload"
              element={
                <PrivateRoute requireAdmin>
                  <QuestionUploader />
                </PrivateRoute>
              }
            />
          </Routes>
        </MainContent>
        <Footer />
      </AppContainer>
    </Router>
  );
};

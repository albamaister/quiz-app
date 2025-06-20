import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { Header } from "./components/Header";
import PrivateRoute from "./routes/PrivateRoute";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Quiz } from "./pages/Quiz";
import { Progress } from "./pages/Progress";

const MainContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

const ContentContainer = styled.main`
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

export const App = () => {
  return (
    <Router>
      <MainContainer>
        <Header />
        <ContentContainer>
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
          </Routes>
        </ContentContainer>
      </MainContainer>
    </Router>
  );
};

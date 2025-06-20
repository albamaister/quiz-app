import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { Header } from "./components/Header";

import PrivateRoute from "./routes/PrivateRoute";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";

const MainContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

export const App = () => {
  return (
    <Router>
      <MainContainer>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </MainContainer>
    </Router>
  );
};

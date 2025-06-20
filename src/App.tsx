import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import Login from "./pages/Login";
import PrivateRoute from "./routes/PrivateRoute";
import { Home } from "./pages/Home";
// import { useTheme } from "./contexts/ThemeContext";

export const App = () => {
  // const { isDarkMode, toggleTheme } = useTheme();
  return (
    <Router>
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
    </Router>
  );
};

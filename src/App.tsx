import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import Login from "./pages/Login";
// import { useTheme } from "./contexts/ThemeContext";

export const App = () => {
  // const { isDarkMode, toggleTheme } = useTheme();
  return (
    <Router>
      <Header />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

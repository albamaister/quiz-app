import { useTheme } from "./contexts/ThemeContext";

export const App = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme}>
      Switch to {isDarkMode ? "Light" : "Dark"} Mode
    </button>
  );
};

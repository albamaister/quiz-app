import { Moon, Sun, Code2, User, LogOut, Upload } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import {
  HeaderActions,
  HeaderContainer,
  HeaderContent,
  IconButton,
  Logo,
  LogoIcon,
  LogoText,
  UserInfo,
} from "./styles";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>
          <LogoIcon>
            <Code2 size={32} />
          </LogoIcon>
          <LogoText>Frontend Quiz</LogoText>
        </Logo>

        <HeaderActions>
          {user && (
            <UserInfo>
              <User size={16} />
              <span>{user.name}</span>
            </UserInfo>
          )}
          <IconButton onClick={toggleTheme} aria-label="Toggle dark mode">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </IconButton>
          {user && (
            <IconButton onClick={logout} aria-label="Logout">
              <LogOut size={20} />
            </IconButton>
          )}
          {user?.role === "admin" && (
            <Link to="/upload" style={{ fontWeight: 500, marginRight: "1rem" }}>
              <IconButton aria-label="Upload">
                <Upload size={20} />
              </IconButton>
            </Link>
          )}
        </HeaderActions>
      </HeaderContent>
    </HeaderContainer>
  );
};

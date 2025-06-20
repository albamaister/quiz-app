import { Moon, Sun, Code2, User, LogOut } from "lucide-react";
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
        </HeaderActions>
      </HeaderContent>
    </HeaderContainer>
  );
};

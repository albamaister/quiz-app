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

export const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

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
          <UserInfo>
            <User size={16} />
            <span>Bryan</span>
          </UserInfo>
          <IconButton onClick={toggleTheme} aria-label="Toggle dark mode">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </IconButton>
          <IconButton onClick={() => {}} aria-label="Logout">
            <LogOut size={20} />
          </IconButton>
        </HeaderActions>
      </HeaderContent>
    </HeaderContainer>
  );
};

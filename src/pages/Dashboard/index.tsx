import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  ActionButton,
  ActionButtons,
  WelcomeSection,
  WelcomeSubtitle,
  WelcomeTitle,
} from "./styles";

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <WelcomeSection>
      <WelcomeTitle>Welcome back, {user!.name}!</WelcomeTitle>
      <WelcomeSubtitle>
        Ready to test your frontend development skills? Choose from our
        collection of carefully crafted questions covering React, JavaScript,
        HTML, and CSS.
      </WelcomeSubtitle>
      <ActionButtons>
        <ActionButton onClick={() => navigate("/quiz")}>
          Start Quiz
        </ActionButton>
        <ActionButton
          $variant="secondary"
          onClick={() => navigate("/progress")}
        >
          View Progress
        </ActionButton>
      </ActionButtons>
    </WelcomeSection>
  );
};

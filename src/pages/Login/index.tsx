import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { AuthForm } from "../../components/AuthForm";
import { ContentContainer, Redirect } from "./styles";

export const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSuccess = () => {
    navigate("/");
  };

  if (user) {
    return <Redirect>Redirecting...</Redirect>;
  }

  return (
    <ContentContainer>
      <h1 className="sr-only">Login Page</h1>
      <AuthForm onSuccess={handleSuccess} />
    </ContentContainer>
  );
};

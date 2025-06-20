import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { AuthForm } from "../../components/AuthForm";

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

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
      <AuthForm onSuccess={handleSuccess} />
    </div>
  );
};

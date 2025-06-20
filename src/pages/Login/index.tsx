import { useNavigate } from "react-router-dom";
import { AuthForm } from "../../components/AuthForm";

const Login = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
      <AuthForm onSuccess={handleSuccess} />
    </div>
  );
};

export default Login;

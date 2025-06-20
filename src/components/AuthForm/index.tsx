import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  ErrorMessage,
  Form,
  FormContainer,
  Input,
  InputGroup,
  InputIcon,
  PasswordToggle,
  SubmitButton,
  Title,
  ToggleLink,
  ToggleText,
} from "./styles";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";

interface AuthFormProps {
  onSuccess: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let success = false;

      if (isLogin) {
        success = await login(formData.email, formData.password);
      } else {
        success = await register(
          formData.name,
          formData.email,
          formData.password
        );
      }

      if (success) {
        onSuccess();
      } else {
        setError("Authentication failed. Please try again.");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <FormContainer>
      <Title>{isLogin ? "Welcome Back" : "Create Account"}</Title>

      <Form onSubmit={handleSubmit}>
        {!isLogin && (
          <InputGroup>
            <InputIcon>
              <User size={20} />
            </InputIcon>
            <Input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </InputGroup>
        )}

        <InputGroup>
          <InputIcon>
            <Mail size={20} />
          </InputIcon>
          <Input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </InputGroup>

        <InputGroup>
          <InputIcon>
            <Lock size={20} />
          </InputIcon>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <PasswordToggle
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </PasswordToggle>
        </InputGroup>

        <SubmitButton type="submit" $loading={loading} disabled={loading}>
          {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
        </SubmitButton>
      </Form>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <ToggleText>
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <ToggleLink
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            setError("");
            setFormData({ name: "", email: "", password: "" });
          }}
        >
          {isLogin ? "Sign Up" : "Sign In"}
        </ToggleLink>
      </ToggleText>
    </FormContainer>
  );
};

import { useAuth } from "../../contexts/AuthContext";

export const Home = () => {
  const { user } = useAuth();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome, {user?.name}</h1>
      <p>Your email: {user?.email}</p>
    </div>
  );
};


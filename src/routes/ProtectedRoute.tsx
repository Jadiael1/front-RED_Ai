import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoadingPage from "../pages/utils/Loading";

interface ProtectedRouteProps {
  children: React.ReactNode;
  path: string;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingPage />;
  }

  // se o usuario não fez login, e o loading terminou.
  if (!isLoading && !user) {
    return <Navigate to="/auth/signin" />;
  }

  // se usuario tiver logado, e o loading tiver terminado, porem não ativou seu cadastro
  if (!isLoading && user && !user?.email_verified_at) {
    return <Navigate to="/auth/activate-account" />;
  }

  // se chegou aqui é porque usuario fez login, e aqui verifica se loading terminou
  if (!isLoading) {
    return <>{children}</>;
  }
};

import { Navigate } from "react-router-dom";
import { IAuthState, useAuthContext } from "../contexts/auth";
import { ReactNode } from "react";

interface IProtectedPageProps {
  children: ReactNode;
}

const ProtectedPage = ({ children }: IProtectedPageProps) => {
  const { username, token, email } = useAuthContext() as IAuthState;
  if (!username && !token && !email) return <Navigate to={"/signin"} />;

  return <>{children}</>;
};

export default ProtectedPage;

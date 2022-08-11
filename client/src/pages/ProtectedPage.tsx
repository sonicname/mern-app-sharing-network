import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts";
import { IProtectedPageProps } from "../interfaces";

const ProtectedPage = ({ children }: IProtectedPageProps) => {
  const { username, token, email } = useAuthContext();
  if (!username && !token && !email) return <Navigate to={"/signin"} />;

  return <>{children}</>;
};

export default ProtectedPage;

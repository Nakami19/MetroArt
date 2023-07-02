import { Navigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import { HOME_URL } from "../../constants/url";
import styles from "./PublicRoute.module.css";

export function PublicRoute({ children }) {
  const { user, isLoading } = useUserContext();

  if(isLoading) {
    return (
        <div className="flex text-center justify-center content-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
        </div>
    )
  }

  if (!isLoading && user) {
    return <Navigate to={HOME_URL} />;
  }

  return children;
}

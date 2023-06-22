import { Navigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import { LOGIN_URL } from "../../constants/url";
import styles from "./PrivateRoute.module.css";

export function PrivateRoute({ children }) {
  const { user, isLoading } = useUserContext();

  if (isLoading) {
    return <h1 className={styles.loadingScreen}>Cargando...</h1>;
  }

  if (!isLoading && !user) {
    return <Navigate to={LOGIN_URL} />;
  }

  return children;
}

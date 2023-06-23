import { Navigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import { HOME_URL } from "../../constants/url";
import styles from "./PublicRoute.module.css";

export function PublicRoute({ children }) {
  const { user, isLoading } = useUserContext();

  if (isLoading) {
    return <h1 className={styles.loadingScreen}>CARGANDO...</h1>;
  }

  if (!isLoading && user) {
    return <Navigate to={HOME_URL} />;
  }

  return children;
}

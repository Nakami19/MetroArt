import { Navigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import { LOGIN_URL , COMPLETE_URL } from "../../constants/url";
import styles from "./PrivateRouteVisitante.module.css";
import { useState, useEffect } from "react";
import {
  doc,
  onSnapshot ,
} from 'firebase/firestore';
import { db } from '../../firebase/config';

export function PrivateRouteVisitante({ children }) {
  const { user, isLoading } = useUserContext();
  const [tipodeuser, setTipodeuser] = useState(null);

  useEffect(() => {
    if (user && user.id) {
      const userDocRef = doc(db, "users", user.id);

      const unsubscribe = onSnapshot(userDocRef, (doc) => {
        setTipodeuser(doc.data().usertype);
      });

      return () => unsubscribe();
    }
  }, [user]);

  if (isLoading) {
    return <h1 className={styles.loadingScreen}>CARGANDO...</h1>;
  }

  if (!isLoading && !user || tipodeuser == "") {
    return <Navigate to={COMPLETE_URL} />;}
    
  else if (!isLoading && !user || tipodeuser != "Visitante") {
    return <Navigate to={LOGIN_URL} />;}
  
  return children;
}
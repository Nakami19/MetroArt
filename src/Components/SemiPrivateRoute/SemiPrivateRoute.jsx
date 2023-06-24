import { Navigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import { COMPLETE_URL } from "../../constants/url";
import styles from "./SemiPrivateRoute.module.css";
import { useState, useEffect } from "react";
import {
  doc,
  onSnapshot ,
} from 'firebase/firestore';
import { db } from '../../firebase/config';

export function SemiPrivateRoute({ children }) {
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


  if (!isLoading && user!=null){
    if(tipodeuser == "" && location.pathname !== COMPLETE_URL) {
    return <Navigate to={COMPLETE_URL} />;}
  }

  return children;
}

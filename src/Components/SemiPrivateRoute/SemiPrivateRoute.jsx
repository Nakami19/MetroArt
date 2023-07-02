import { Navigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import { COMPLETE_URL , LOGIN_URL, HOME_URL, TOURS_URL} from "../../constants/url";
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


  if(isLoading) {
    return (
        <div className="flex text-center justify-center content-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
        </div>
    )
  }

  if (!isLoading && user!=null){
    if(tipodeuser == "" && location.pathname !== COMPLETE_URL) {
    return <Navigate to={COMPLETE_URL} />;}
    
  }else if (!isLoading && !user && location.pathname !== HOME_URL && location.pathname !== TOURS_URL){
    return <Navigate to={LOGIN_URL} />;
  }

  return children;
}

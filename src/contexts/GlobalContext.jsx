import React, { createContext, useContext, useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';


export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [firebaseToursData, setFirebaseToursData] = useState({ data_tour: [] });
  const [firebaseArtsData, setFirebaseArtsData] = useState({ data_art: [] });
  const [firebaseUsersData, setFirebaseUsersData]= useState({data_user: []})

  useEffect(() => {
    const toursRef = collection(db, 'tours');
    const artsRef = collection(db, 'obras');
    const usersRef= collection(db, "users")

    const unsubscribeTours = onSnapshot(toursRef, (snapshot) => {
      const data_tour = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setFirebaseToursData({ data_tour });
    });

    const unsubscribeArts = onSnapshot(artsRef, (snapshot) => {
      const data_art = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    
      setFirebaseArtsData({ data_art })
       
    });

    const unsubscribeUsers = onSnapshot(usersRef, (snapshot) => {
        const data_user = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      
        setFirebaseUsersData({ data_user })
         
      });
   
    return () => {
      unsubscribeTours();
      unsubscribeArts();
      unsubscribeUsers();
    };
  }, []);

  return (
    <GlobalContext.Provider value={{ firebaseToursData, firebaseArtsData, firebaseUsersData }}>
      {children}
    </GlobalContext.Provider>
  );
};

export function useGlobalContext() {
    return useContext(GlobalContext)
}
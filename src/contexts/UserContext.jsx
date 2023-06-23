import { onAuthStateChanged } from "firebase/auth";
import React, { useContext, useEffect, useState, createContext } from "react";
import { auth } from "../firebase/config";
import { getUserProfile } from "../firebase/users-service";


export const UserContext = createContext(null);
export function UserContextProvider({ children }) {
    const [isLoading, SetIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        onAuthStateChanged(auth, async (firebaseUser) => {
            SetIsLoading(true)
            if(firebaseUser){
               const profile = await getUserProfile(firebaseUser.email)
                setUser(profile);   
            }else{
                setUser(null);
            }
            SetIsLoading(false);
        });
    }, []);

    return (
    <UserContext.Provider
        value ={{
            user,
            isLoading,
        }}
    > {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}

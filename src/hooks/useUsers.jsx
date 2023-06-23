import { useState } from "react";
import { getUserDocuments } from "../firebase/info";



export function useUsers() {
    const [usuarios, setUsuarios]=useState([]);
    const [isLoading, setLoading]=useState(false); 
    

    const getUsuarios= async ()=> {
        setLoading(true)
        const username= await getUserDocuments();
        setUsuarios(username);
        setLoading(false)
    }

    return {
        usuarios,isLoading,getUsuarios
    }

   
}
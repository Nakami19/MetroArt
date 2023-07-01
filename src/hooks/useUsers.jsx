import { useState } from "react";
import { getUserDocuments } from "../firebase/info";



export function useUsers() {
    const [usuarios, setUsuarios]=useState([]);
    const [isLoading, setLoading]=useState(false); 
    

    const getUsuarios= async (usuarios)=> {
        setLoading(true)
        // const username= await getUserDocuments();
        setUsuarios(usuarios);
        setLoading(false)
    }

    return {
        usuarios,isLoading,getUsuarios
    }

   
}
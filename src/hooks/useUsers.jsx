import { useState } from "react";
import { getUserDocuments } from "../firebase/info";



export function useUsers() {
    const [usuarios, setUsuarios]=useState([]);
    const [isLoading, setLoading]=useState(false); 
    const [comentUser, setCommentUser]=useState([])
    

    const getUsuarios= async (usuarios)=> {
        setLoading(true)
        // const username= await getUserDocuments();
        setUsuarios(usuarios);
        setLoading(false)
    }

    const getCommentUser = (userId, usuarios)=>{
        usuarios.map((user)=>{
            if(user.id==userId) {
                setCommentUser(user)
            }
        })
    }

    return {
        usuarios,isLoading,getUsuarios, comentUser, getCommentUser
    }

   
}
import { useState } from "react"
import { getArtDocuments } from "../firebase/info";



export function useArts() {
    const [arts, setArts]=useState([]);
    const [art, setArt]=useState([]);
    const [isLoading, setLoading]=useState(false); 

    const getArts= async ()=> {
        setLoading(true)
        const obra= await getArtDocuments();
        setArts(obra);
        setLoading(false)
    }

    const getOneArt= async (artId)=> {
        setLoading(true);
        const obras=await getArtDocuments();
        obras.map((one)=>{
            if(one.id==artId) {
              setArt(one);  
            }
        }) 
        setLoading(false);
    }

    return{
        arts, getArts, art, getOneArt, isLoading
    }
}
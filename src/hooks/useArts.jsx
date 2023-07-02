import { useState } from "react"
import { getArtDocuments } from "../firebase/info";



export function useArts() {
    const [arts, setArts]=useState([]);
    const [art, setArt]=useState([]);
    const [isLoading, setLoading]=useState(false); 

    const getArts= async (artDocuments)=> {
        setLoading(true)
        // const obra= await getArtDocuments();
        setArts(artDocuments);
        setLoading(false)
    }

    const getOneArt= async (artId, artDocuments)=> {
        
        setLoading(true);
        // const obras=await getArtDocuments();
        artDocuments.map((one)=>{
            console.log(artId + " < Id > "+ one.id)
            if(one.id==artId) {
              setArt(one);  
            }
        }) 
        setLoading(false);
    }

    const getSearchArt=async (busqueda, option, obra)=>{
        let coincide=[];
        // const obra= await getArtDocuments();
        busqueda=busqueda.toLowerCase();
        if (option=="Nombre de obra" && busqueda!="" ){
            obra.map((one)=>{
                if(one.nombre.toLowerCase().includes(busqueda)) {
                    coincide.push(one)
                }
            })
            setArts(coincide)
        }
        else if (option=="Autor" && busqueda!="" ){

            obra.map((one)=>{
                let autores="";
                try {
                one.autor.map((autor)=>{
                    autores+=autor+"\n";
                })  
                } catch (error) {
                    
                }
                if(autores.toLowerCase().includes(busqueda)) {
                    coincide.push(one)
                }
            })
            setArts(coincide)
        }
        else if (option=="Ubicación" && busqueda!="" ) {

            obra.map((one)=>{
                if(one.ubicacion.toLowerCase().includes(busqueda)) {
                    coincide.push(one)
                }
            })
            setArts(coincide)

        }
        else {
            setArts(obra);
        }

    }

    return{
        arts, getArts, art, getOneArt, isLoading,getSearchArt
    }
}
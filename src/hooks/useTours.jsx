import { useState } from "react";
import { getToursDocuments } from "../firebase/info";



export function useTours() {
    const [tours, setTours]=useState([]);
    

    const getTours= async ()=> {
        const tour= await getToursDocuments()
        setTours(tour);
    }

    return {
        tours, getTours
    }
}
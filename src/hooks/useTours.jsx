import { useState } from "react";
import { getToursDocuments } from "../firebase/info";



export function useTours() {
    const [tours, setTours]=useState([]);
    const [tour, setTour]=useState([]);
    const [isLoading, setLoading]=useState(false); 
    

    const getTours= async ()=> {
        setLoading(true)
        const tour= await getToursDocuments();
        setTours(tour);
        setLoading(false)
    }

    const getOneTour= async (TourId) => {
        setLoading(true)
        const tour= await getToursDocuments();
        tour.map((one)=>{
            if (one.id==TourId) {
               setTour(one)
            }  
        })
        setLoading(false)
    }

    return {
        tours, getTours, tour, getOneTour, isLoading
    }

   
}
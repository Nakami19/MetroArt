import { useState } from "react";
import { getToursDocuments } from "../firebase/info";



export function useTours() {
    const [tours, setTours]=useState([]);
    const [tour, setTour]=useState([]);
    

    const getTours= async ()=> {
        const tour= await getToursDocuments();
        setTours(tour);
    }

    const getOneTour= async (TourId) => {
        const tour= await getToursDocuments();
        tour.map((one)=>{
            if (one.id==TourId) {
               setTour(one)
            }  
        })
    }

    return {
        tours, getTours, tour, getOneTour
    }

   
}
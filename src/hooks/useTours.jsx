import { useEffect, useState } from "react";
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
        const toure= await getToursDocuments();
        toure.map((one)=>{
            if (one.id==TourId) {
               setTour(one)
            }  
        })
        setLoading(false)
    }

    const getSearchTours=async (busqueda, option)=>{
        let coincide=[];
        const tour= await getToursDocuments();
        busqueda=busqueda.toLowerCase();
        if (option=="Nombre de tour" && busqueda!="" ){
            tour.map((one)=>{
                if(one.name.toLowerCase().includes(busqueda)) {
                    coincide.push(one)
                }
            })
            setTours(coincide)
        }
        else if (option=="Id de tour"  && busqueda!="" ) { 
            tour.map((one)=>{
                if(one.id.toLowerCase().includes(busqueda)) {
                    coincide.push(one)
                }
            })
            setTours(coincide)

        }
        else if (option=="Ubicación"  && busqueda!="" ) {
            tour.map((one)=>{
                if(one.important_places.toLowerCase().includes(busqueda)) {
                    coincide.push(one)
                }
            })
            setTours(coincide)

        }
        else {
           setTours(tour); 
        }
        
       
    }

    return {
        tours, getTours, tour, getOneTour, isLoading, getSearchTours
    }

   
}
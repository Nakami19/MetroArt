import { useEffect, useState } from "react";
import { getToursDocuments } from "../firebase/info";



export function useTours() {
    const [tours, setTours]=useState([]);
    const [tour, setTour]=useState([]);
    const [isLoading, setLoading]=useState(false); 
    

    const getTours= async (tourDocuments)=> {
        setLoading(true)
        //const tour= await getToursDocuments();
        setTours(tourDocuments);
        setLoading(false)
    }

    const getOneTour= async (TourId, tourDocuments) => {
        setLoading(true)
        // const toure= await getToursDocuments();
        tourDocuments.map((one)=>{
            if (one.id==TourId) {
               setTour(one)
            }  
        })
        setLoading(false)
    }

    const getSearchTours=async (busqueda, option,tour)=>{
        let coincide=[];
        // const tour= await getToursDocuments();
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
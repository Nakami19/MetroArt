import React, { useEffect, useState } from 'react'
import { TourCard } from '../../Components/TourCard/TourCard'
import { useTours } from '../../hooks/useTours'
import { useUserContext } from '../../contexts/UserContext'

export function ToursPage() {
    const {tours, getTours, getSearchTours} =useTours()
    const { user, isLoadingUser } = useUserContext(); 
    const [filtro, setFiltro]=useState("Nombre de tour");
    const [buscar, setBuscar]=useState("");
    let isAdmin = false;

    useEffect(()=>{
        getTours();
    },[])

    


 if(!isLoadingUser){
    try{
        if(user.usertype == "Administrador"){
            isAdmin = true
        } 
    }catch(error){

    }

    const handlerBuscar= (e)=> {
        const option=e.target.value
        setFiltro(option)
    }
    
    const handleChange= (e)=>{
        const ey=e.target.value
        setBuscar(ey)
        getSearchTours(ey, filtro)
            
    }

useEffect(()=> {
    },[buscar])
        return (
            <>
                <div className="join flex justify-center p-6">
                    <div className=' w-28 md:w-10/12'>
                        <div>
                        <input className="input input-bordered bg-slate-100 join-item w-full" placeholder="Buscar..." onChange={handleChange}/>
                        </div>
                    </div>
                    <select className="select select-bordered join-item" onChange={handlerBuscar}>
                        <option>Nombre de tour</option>
                        <option>Id de tour</option>    
                        <option>Ubicación</option>
                    </select>
                    <div className="indicator">
                        <button className="btn join-item normal-case bg-[#FF8C42] text-white hover:bg-[#a14207]">Buscar</button>
                    </div>
                </div>
                <div className='p-6 flex gap-3'>
                    <h1 className='font-raleway font-bold text-[#C14C00] text-2xl'>Tours</h1>
                    {isAdmin && (
                        <button className='btn btn-sm text-xs normal-case font-montserrat bg-[#001A72] text-white'>Agregar tour</button>
                    )}   
                </div>
                <div className='grid grid-cols-2 gap-4 p-6 md:grid-cols-4 justify-items-center lg:grid-cols-6 xl:grid-cols-7'>
                    {
                        tours.map((tour)=>{
                            return (
                                <TourCard tour={tour} user={user} key={tour.id}/>
                            )
                        })
                    }
                </div>
            </>
          )
 }
  
}

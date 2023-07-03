import React, { useEffect, useState } from 'react'
import { TourCard } from '../../Components/TourCard/TourCard'
import { useTours } from '../../hooks/useTours'
import { useUserContext } from '../../contexts/UserContext'
import { Link } from 'react-router-dom'
import { ADDTOUR_URL } from '../../constants/url'
import { useGlobalContext } from '../../contexts/GlobalContext'

export function ToursPage() {
    const {tours, getTours, getSearchTours, isLoading} =useTours()
    const { user, isLoadingUser } = useUserContext(); 
    const [filtro, setFiltro]=useState("Nombre de tour");
    const [buscar, setBuscar]=useState("");
    const {firebaseToursData, firebaseArtsData}=useGlobalContext()
    let isAdmin = false;

    useEffect(()=>{

        getTours(firebaseToursData.data_tour);
    },[firebaseToursData])

    useEffect(()=>{},[buscar])


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
        getSearchTours(ey, filtro,firebaseToursData.data_tour)
            
    }
    let componet= <div className='p-6'>
        <div className='font-montserrat flex items-center justify-center bg-[#FF8C42]/10 w-full text-center rounded-xl h-72'>
            <div className='flex flex-col gap-2 p-4'>
                <h1 className='text-[#864317] font-bold'>No hay resultados que coincidan con su búsqueda</h1>
                <p className='text-[#864317] text-xs'>Verifique que ha introducido los datos correctamente</p>
            </div> 
            </div>
        </div>

    if(tours.length>0){
        componet=<div className='grid grid-cols-2 gap-4 p-6 md:grid-cols-4 justify-items-center lg:grid-cols-6 xl:grid-cols-7'>
        {
            tours.map((tour)=>{
                return (
                    <TourCard tour={tour} user={user} key={tour.id}/>
                )
            })
        }
    </div>
    }

useEffect(()=> {
    },[buscar])


    if(isLoading) {
        return (
            <div className="flex text-center justify-center content-center min-h-screen">
            <span className="loading loading-spinner loading-lg"></span>
            </div>
        )
    }
        return (
            <section className='lg:min-h-screen'>
                <div className="join flex justify-center p-6 xl:p-8">
                    <div className=' w-44 md:w-11/12'>
                        <div>
                        <input className="input input-bordered bg-slate-100 join-item w-full" placeholder="Buscar..." onChange={handleChange}/>
                        </div>
                    </div>
                    <select className="select select-bordered join-item" onChange={handlerBuscar}>
                        <option>Nombre de tour</option>
                        <option>Id de tour</option>    
                        <option>Ubicación</option>
                    </select>
                </div>
                <div className='p-6 flex gap-3'>
                    <h1 className='font-raleway font-bold text-[#C14C00] text-2xl'>Tours</h1>
                    {isAdmin && (
                        <Link to={ADDTOUR_URL}>
                            <button className='btn btn-sm text-xs normal-case font-montserrat bg-[#001A72]  text-white'>Agregar tour</button>
                        </Link>
                    )}   
                </div>
                {componet}
            </section>
          )
 }
  
}

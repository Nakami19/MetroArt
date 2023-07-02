import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArtCard } from '../../Components/ArtCard/ArtCard'
import { useArts } from '../../hooks/useArts'
import { useUserContext } from '../../contexts/UserContext'
import { useGlobalContext } from '../../contexts/GlobalContext'
// import { firebaseArtsData, loadArtsFromFirebase } from '../../firebase/data'




export function ArtPage() {
    const {arts, getArts, isLoading, getSearchArt} =useArts()
    const { user, isLoadingUser } = useUserContext(); 
    const [buscar, setBuscar]=useState("");
    const [filtro, setFiltro]=useState("Nombre de obra");
    const {firebaseToursData, firebaseArtsData}=useGlobalContext()
    let isAdmin = false;


    useEffect(()=>{

        getArts(firebaseArtsData.data_art);
    },[firebaseArtsData])

    useEffect(()=>{},[buscar])

    const handleChange= (e)=>{
        const ey=e.target.value
        setBuscar(ey);
        getSearchArt(ey,filtro, firebaseArtsData.data_art);     
    }
    const handlerBuscar= (e)=> {
        const option=e.target.value
        setFiltro(option)
    }

    let componet= <div className='p-6'>
        <div className='font-montserrat flex items-center justify-center bg-[#FF8C42]/10 w-full text-center rounded-xl h-72'>
            <div className='flex flex-col gap-2 p-4'>
                <h1 className='text-[#864317] font-bold'>No hay resultados que coincidan con su búsqueda</h1>
                <p className='text-[#864317] text-xs'>Verifique que ha introducido los datos correctamente</p>
            </div> 
            </div>
        </div>

    if(arts.length>0) {
        componet=<div className='grid grid-cols-2 gap-4 p-6 md:grid-cols-4 justify-items-center lg:grid-cols-5 xl:grid-cols-6'>
        {
            arts.map((obra)=>{
                    return (
                        <ArtCard obra={obra} user={user} key={obra.id}/>
                    )
                })
            }
        </div>
    }

    

    if(isLoadingUser) {
        return (
            <div className="flex text-center justify-center content-center min-h-screen">
            <span className="loading loading-spinner loading-lg"></span>
            </div>
        )
    } else if (!isLoadingUser) {
        
     
    return (
        <>
            <div className="join flex justify-center p-6">
                <div className=' w-28 md:w-10/12'>
                    <div>
                    <input className="input input-bordered bg-slate-100 join-item w-full" placeholder="Buscar..." onChange={handleChange}/>
                    </div>
                </div>
                <select className="select select-bordered join-item" onChange={handlerBuscar}>
                    <option>Nombre de obra</option>
                    <option>Autor</option>
                    <option>Ubicación</option>
                </select>
            </div>
            <div className='p-6 flex gap-3 mx-5'>
                <h1 className='font-raleway font-bold text-[#C14C00] text-2xl'>Obras</h1>
                <Link to={'/addartwork'}>
                <button className='btn btn-sm text-xs normal-case font-montserrat bg-[#001A72] text-white'>Agregar obra</button>
                </Link>
                 
            </div>
            {componet}
          
        </>
      )
 }
}

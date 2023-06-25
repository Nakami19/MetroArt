import React, { useEffect } from 'react'
import { ArtCard } from '../../Components/ArtCard/ArtCard'
import { useArts } from '../../hooks/useArts'
import { useUserContext } from '../../contexts/UserContext'



export function ArtPage() {
    const {arts, getArts, isLoading} =useArts()
    const { user, isLoadingUser } = useUserContext(); 
    let isAdmin = false;

    useEffect(()=>{
        getArts();
    },[])

    

    if(isLoading) {
        return (
            <>
            <span className="loading loading-spinner loading-lg position"></span>
            
            </>
        )
    } else if (!isLoading) {
        
     
    return (
        <>
            <div className="join flex justify-center p-6">
                <div className=' w-28 md:w-10/12'>
                    <div>
                    <input className="input input-bordered bg-slate-100 join-item w-full" placeholder="Buscar..."/>
                    </div>
                </div>
                <select className="select select-bordered join-item">
                    <option>Todas las categorías</option>
                    <option>Nombre de obra</option>
                    <option>Nombre de tour</option>
                    <option>Ubicación</option>
                </select>
                <div className="indicator">
                    <button className="btn join-item normal-case bg-[#FF8C42] text-white hover:bg-[#a14207]">Buscar</button>
                </div>
            </div>
            <div className='p-6 flex gap-3'>
                <h1 className='font-raleway font-bold text-[#C14C00] text-2xl'>Obras</h1>
                 
            </div>
            <div className='grid grid-cols-2 gap-4 p-6 md:grid-cols-4 justify-items-center lg:grid-cols-6 xl:grid-cols-7'>
            {
                arts.map((obra)=>{
                        return (
                            <ArtCard obra={obra} key={obra.id}/>
                        )
                    })
                }
            </div>
          
        </>
      )
 }
}

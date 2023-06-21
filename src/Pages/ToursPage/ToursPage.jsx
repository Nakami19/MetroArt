import React, { useEffect } from 'react'
import { TourCard } from '../../Components/TourCard/TourCard'
import { useTours } from '../../hooks/useTours'

export function ToursPage() {
    const {tours, getTours} =useTours()

    useEffect(()=>{
        getTours();
    },[])

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

        <h1 className='p-6 font-raleway font-bold text-[#C14C00] text-2xl'>Tours</h1>
        <div className='grid grid-cols-2 gap-4 p-6 md:grid-cols-4 justify-items-center lg:grid-cols-7'>
            {
                tours.map((tour)=>{
                    return (
                        <TourCard tour={tour} key={tour.id}/>
                    )
                })
            }
        </div>
    </>
  )
}

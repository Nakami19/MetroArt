import React from 'react'
import { useTours } from '../../hooks/useTours';
import { useParams } from 'react-router';
import { useEffect } from 'react'

export function EditTourPage() {

    const {tourId}=useParams();
    const {tour, getOneTour, isLoading}=useTours();
    let component=null;

    useEffect(()=>{
        getOneTour(tourId);
    },[])

    if(tour.disponible) {
        component= <><div className=' bg-green-800 w-3 h-3 rounded-full'></div>
        <p>Disponible</p></>
    } else {
        component=<><div className=' bg-red-800 w-3 h-3 rounded-full'></div>
        <p>No Disponible</p></>
    }

    if(isLoading) {
        return (
            <>
            <span className="loading loading-spinner loading-lg"></span>
            </>
        )
    } else if (!isLoading && tour.obras) {

        return (
        <section className='p-7 md:p-16 flex flex-col gap-5 lg:flex-row lg:justify-center lg:items-center'>
        <div className='flex flex-col gap-5 w-full lg:items-center lg:w-96'>
            <h1 className='text-center font-raleway text-2xl font-bold text-[#4E598C]'>{tour.name}</h1>
            <div className="avatar">
                <div className=" w-full rounded">
                    <img src={tour.url} />
                </div>
            </div>
        </div>
        <div className='font-montserrat flex flex-col gap-7 lg:w-7/12 md:justify-evenly'>

            <div className='flex flex-col gap-2 lg:gap-4'>
                <h1 className='font-bold'>Información del tour</h1>
                <div className='bg-black w-full h-0.5 '></div>
                
                <div className='text-xs flex flex-col gap-3 font-bold '>
                <div className='flex gap-2 items-center'> 
                    <p>Disponibilidad:</p>
                    <select className="select select-bordered select-sm max-w-xs text-xs">
                        <option>Disponible</option>
                        <option>No disponible</option>
                    </select>
                </div>
                <div className='flex items-center gap-2'>
                    <p>Duración:</p>
                    <select className="select select-bordered select-sm max-w-xs text-xs">
                        <option>45</option>
                        <option>60</option>
                        <option>160</option>
                    </select>
                    <p>minutos</p>
                </div>
            </div>
            </div>
            
            <div className='text-xs flex flex-col gap-2 text-justify lg:gap-4'>
                <p className='font-bold'>Descripción</p>
                <textarea className="textarea textarea-bordered h-24 text-xs" defaultValue={tour.description}></textarea>
                <div className='flex items-center gap-3'>
                    <p className='font-bold' id='lugares'>Lugares importantes</p>
                    <input type="text" className="input input-sm input-bordered w-full" />
                    <button className='btn rounded-full btn-neutral  btn-ghost btn-sm text-lg font-montserrat'>+</button>
                </div>
            </div>
            <div className='lg:flex lg:justify-end lg:gap-2'>
                <button className="btn btn-sm btn-outline normal-case text-[#FF8C42] hover:bg-[#c45815] font-montserrat md:btn-md lg:btn-wide">Cancelar</button>
                <button className="btn btn-sm bg-[#FF8C42] normal-case text-white hover:bg-[#c45815] font-montserrat md:btn-md lg:btn-wide">Guardar</button>
            </div>
            
        </div>
    </section>
        )}
}

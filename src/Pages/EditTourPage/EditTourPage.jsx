import React from 'react'
import { useTours } from '../../hooks/useTours';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react'
import { useArts } from '../../hooks/useArts';

export function EditTourPage() {

    const {tourId}=useParams();
    const {tour, getOneTour, isLoading}=useTours();
    const {arts, getArts} =useArts();
    const [checkedValues, setValue] = useState([])
    
    
    let component=null;

    function handleChange(event){

        const {value, checked} = event.target

        if(checked){
            setValue(pre => [...pre, value])
        }else(
            setValue(pre => [...pre.filter(skill => skill!==value)]
            )
        )

    }

    function handleForm(){
        let array = [];
        checkedValues.map((nameobra) => {
            arts.map((obra) => {
                if(nameobra == obra.nombre){
                    array.push(obra)
                }
            })
        })
        console.log(array)
    }

    console.log(checkedValues)

    useEffect(()=>{
        getOneTour(tourId);
        getArts()
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
                <button className="btn btn-sm bg-[#FF8C42] normal-case text-white hover:bg-[#c45815] font-montserrat md:btn-md lg:btn-wide" onClick={handleForm}>Guardar</button>
            </div>
            
        </div>
        <div id="dropdownSearch" className=" bg-white rounded-lg shadow w-60 ">
    <div className="p-3">
      <label htmlFor="input-group-search" className="sr-only">Search</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-500 " aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
        </div>
        <input type="text" id="input-group-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Buscar obra"/>
      </div>
    </div>
    <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700" aria-labelledby="dropdownSearchButton">

      {
        arts.map((art) => {
            return (
                <li>
                    <div className="flex items-center p-2 rounded hover:bg-gray-100">
                    <input id="checkbox-item-11" type="checkbox" value={art.nombre} onChange={handleChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"/>
                    <label htmlFor="checkbox-item-11" className="w-full ml-2 text-sm font-medium text-gray-900 rounded">{art.nombre}</label>
                    </div>
                </li>
            )
        })
      }
   
      
    </ul>

    </div>
    </section>
        )}
}




import React, { useEffect } from 'react'
import { useTours } from '../../hooks/useTours'
import { useGlobalContext } from '../../contexts/GlobalContext'

export function ReserveCard({reserva}) {
  const {tour, getOneTour, isLoading}=useTours();
  const {firebaseToursData, firebaseArtsData}=useGlobalContext()

  useEffect(()=>{
    getOneTour(reserva.id_tour,firebaseToursData.data_tour)

  },[firebaseToursData])


  
  return (
<div className='block mr-3'>
        <a href='#a' className="flex lg: flex-col items-center bg-white border border-gray-200 rounded-lg shadow mt-6 lg:max-w-md md:flex-row md: max-w-xl h-5/6 hover:bg-gray-100 ">
            <img className="object-cover lg:w-2/5 md: w-full rounded-t-lg lg:h-full md: h-36 md:rounded-none md:rounded-l-lg" src={tour.url} alt=""/>
            <div className="w-3/4 flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white font-raleway">{tour.name}</h5>
                <p className="mb-1 font-normal text-gray-700 dark:text-gray-400 font-montserrat">Fecha: {reserva.fecha} </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 font-montserrat">Hora: {reserva.horario} </p>
                
                
            </div>
        </a>


        
        


        <div className="dropdown dropdown-right">
  <label tabIndex={0} className="btn btn-circle btn-ghost">
    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
</label>
  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
    <li><a href="#my_modal_8">Opinar</a></li>
  </ul>
</div>
            


        <div className="modal" id="my_modal_8">
        <div className="modal-box">
            <h3 className="font-bold text-lg font-raleway mb-5">Rating</h3>
                    <div className="rating">
                        <input type="radio" name="rating" className="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating" className="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating" className="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating" className="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating" className="mask mask-star-2 bg-orange-400" />
                        
                    </div>
                    <div className="form-control w-full ">
                    <label className="label mt-5">
                        <span className="label-text font-montserrat">Comentario</span>
                    </label>
                    <textarea placeholder="Escribe aquí" className="textarea textarea-bordered w-full " />
                    
                    </div>
            <div className="modal-action">
            <a href="#" className="btn normal-case">Enviar</a>
            </div>
        </div>
        </div>
        </div>

  )}





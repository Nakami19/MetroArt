import React from 'react'
import { Link } from 'react-router-dom'
import { TOURDETAILS_URL } from '../../constants/url'
import { DeleteTour } from '../../firebase/info'


export function TourCard({tour, user}) {

    if (!user  || user.usertype == "Visitante"){
        return (
    
            <Link to={`/tours/${tour.id}`}>
            <div className='bg-[#4E598C] w-40 h-56 rounded-lg relative'>
                        <div className='absolute p-2 z-10 w-full'>
                            <div className='bg-white  w-fit rounded-md'>
                                <h1 className='p-1 flex text-xs font-montserrat font-bold items-center gap-x-1'>
                                    <img className ="h-4"src='https://img.icons8.com/?size=512&id=19295&format=png'/>
                                    <p>{tour.rating}</p>
                                </h1>
                            </div>
                        </div>
                        <div className='absolute p-2 z-10 w-full flex justify-end'>
                            <div className='bg-[#4E598C] w-fit rounded-md opacity-80'>
                                <h1 className='p-1 text-xs text-white font-montserrat font-bold items-center'>
                                        <p>{tour.id}</p>
                                    </h1>
                                </div>
                                <div>
                            </div>
                        </div>
                        <div className="avatar">
                            <div className="w-40 rounded">
                                <img src={tour.url} />
                            </div>
                        </div>
                        <div className='h-1/4 flex items-center justify-center'>
                            <p className='text-white font-montserrat text-center text-xs'>{tour.name}</p>
                        </div>
            </div>
            </Link>
          )
    }else{
        return (
            <div className='bg-[#4E598C] w-40 h-56 rounded-lg '>
                        <div className='h-fit relative'>
                            <div className='absolute z-10 p-3 gap-3 flex justify-between items-end h-full'>
                                <div className=''>
                                    <Link to={`/toursedit/${tour.id}`}>
                                        <button className='btn btn-xs normal-case font-montserrat bg-[#C15100] hover:bg-[#703308] text-white'>Editar</button>
                                    </Link>
                                </div>
                                <div className=''>
                                    <a href="#my_modal_8" className='btn btn-xs normal-case font-montserrat bg-[#C15100] hover:bg-[#703308] text-white'>Eliminar</a>
                                </div>
                            </div>
                            <div className="avatar contrast-75 saturate-150	brightness-50">
                                <div className="w-40 rounded">
                                    <img src={tour.url} />
                                </div>
                            </div>
                        </div>
                        <div className="modal" id="my_modal_8">
                                        <div className="modal-box font-montserrat">
                                            <h3 className="font-bold text-lg">¿Estás seguro?</h3>
                                            <p className="py-4">Los cambios no son reversibles</p>
                                            <div className="modal-action">
                                               
                                                <a href="#" className="btn normal-case" onClick={()=>{DeleteTour(tour.generated_id)}}>Sí, estoy seguro</a>
                                                
                                                <a href="#" className="btn normal-case">Cancelar</a>
                                            </div>
                                        </div>
                                    </div>
                        <div className='h-1/4 flex items-center justify-center'>
                            <p className='text-white font-montserrat text-center text-xs'>{tour.name}</p>
                        </div>
            </div> )
    }
  
}

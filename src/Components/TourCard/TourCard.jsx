import React from 'react'
import { Link } from 'react-router-dom'


export function TourCard({tour, user}) {

    let rating=0;

    if (tour.feedbacks) {
        if(tour.feedbacks.length!=0) {
           tour.feedbacks.map((comentario)=>{
                rating+=comentario.rating
            }) 
        rating=rating/tour.feedbacks.length    
        }
    }

    if (!user  || user.usertype == "Visitante"){
        return (
    
            <Link to={`/tours/${tour.id}`}>
            <div className='bg-[#4E598C] w-40 h-56 rounded-lg relative'>
                        <div className='absolute p-2 z-10 w-full'>
                            <div className='bg-white  w-fit rounded-md'>
                                <h1 className='p-1 flex text-xs font-montserrat font-bold items-center gap-x-1'>
                                    <img className ="h-4"src='https://img.icons8.com/?size=512&id=19295&format=png'/>
                                    <p>{rating}</p>
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
                                    <button className='btn btn-xs normal-case font-montserrat bg-[#C15100] hover:bg-[#703308] text-white'>Eliminar</button>
                                </div>
                            </div>
                            <div className="avatar contrast-75 saturate-150	brightness-50">
                                <div className="w-40 rounded">
                                    <img src={tour.url} />
                                </div>
                            </div>
                        </div>
                        <div className='h-1/4 flex items-center justify-center'>
                            <p className='text-white font-montserrat text-center text-xs'>{tour.name}</p>
                        </div>
            </div> )
    }
  
}

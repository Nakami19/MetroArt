import React from 'react'
import { Link } from 'react-router-dom'

export function ArtCard({obra}) {
  return (
    <Link to={"/artdetails"}>
    <div className='font-montserrat text-xs lg:w-full flex flex-col gap-1'>
            <img src={obra.url}/>
            <p className='font-bold text-justify'>{obra.nombre}</p>
            <p className='font-baskervville'>{obra.autor}</p>
            <p className='font-baskervville'>{obra.tipo}, {obra.fecha}</p>    
    </div>
    </Link>
  )
}

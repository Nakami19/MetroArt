import React from 'react'
import { Link } from 'react-router-dom'
import { ARTDETAIL_URL } from '../../constants/url'

export function ArtCard({obra}) {
  return (
    <Link to={`/obras/${obra.id}`}>
    <div className='font-montserrat text-xs lg:w-full flex flex-col gap-1'>
            <div className="avatar">
              <div className="w-44">
                <img src={obra.url}/>
              </div>
            </div>
            <p className='font-bold text-justify'>{obra.nombre}</p>
            <p className='font-baskervville'>{obra.autor}</p>
            <p className='font-baskervville'>{obra.tipo}, {obra.fecha}</p>    
    </div>
    </Link>
  )
}

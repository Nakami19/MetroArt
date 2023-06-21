import React from 'react'
import { Link } from 'react-router-dom'

export function ArtCard() {
  return (
    <Link to={"/artdetails"}>
    <div className='font-montserrat text-xs lg:w-full flex flex-col gap-1'>
            <img src="./src/assets/Doña Laura Singre.jpg"/>
            <p className='font-bold text-justify'>Retrato de Doña Laura Singre de Schlageter</p>
            <p className='font-baskervville'>Antonio Herrera Toro</p>
            <p className='font-baskervville'>Óleo, 1902</p>    
    </div>
    </Link>
  )
}

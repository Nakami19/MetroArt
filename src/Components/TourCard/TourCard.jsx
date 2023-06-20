import React from 'react'
import { Link } from 'react-router-dom'

export function TourCard() {
  return (
    <Link to={"/tourdetails"}>
    <div className='bg-[#4E598C] w-40 h-fit rounded-lg relative'>
                <div className='absolute p-2 w-full'>
                    <div className='bg-white w-fit rounded-md'>
                        <p className='p-1 flex text-xs font-montserrat font-bold items-center gap-x-1'>
                            <img className ="h-4"src='https://img.icons8.com/?size=512&id=19295&format=png'/>
                            <p>5.0</p>
                        </p>
                    </div>
                </div>
                <div className='absolute p-2 w-full flex justify-end'>
                    <div className='bg-[#4E598C] w-fit rounded-md opacity-80'>
                        <p className='p-1 text-xs text-white font-montserrat font-bold items-center'>
                                <p>Q1234</p>
                            </p>
                        </div>
                        <div>
                    </div>
                </div>
                <img className="w-40 h-44 rounded-lg" src="./src/assets/Doña Laura Singre.jpg"/>
                <p className='text-white font-montserrat text-center text-xs p-2'>Paseo en la biblioteca Pedro Grases</p>
    </div>
    </Link>
  )
}

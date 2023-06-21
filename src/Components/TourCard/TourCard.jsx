import React from 'react'
import { Link } from 'react-router-dom'
import { TOURDETAILS_URL } from '../../constants/url'


export function TourCard({tour}) {
  return (
    <Link to={`/tours/${tour.id}`}>
    <div className='bg-[#4E598C] w-40 h-fit rounded-lg relative'>
                <div className='absolute p-2 w-full'>
                    <div className='bg-white w-fit rounded-md'>
                        <h1 className='p-1 flex text-xs font-montserrat font-bold items-center gap-x-1'>
                            <img className ="h-4"src='https://img.icons8.com/?size=512&id=19295&format=png'/>
                            <p>{tour.rating}</p>
                        </h1>
                    </div>
                </div>
                <div className='absolute p-2 w-full flex justify-end'>
                    <div className='bg-[#4E598C] w-fit rounded-md opacity-80'>
                        <h1 className='p-1 text-xs text-white font-montserrat font-bold items-center'>
                                <p>{tour.id}</p>
                            </h1>
                        </div>
                        <div>
                    </div>
                </div>
                <img className="w-40 h-44 rounded-lg" src={tour.url}/>
                <p className='text-white font-montserrat text-center text-xs p-2'>{tour.name}</p>
    </div>
    </Link>
  )
}

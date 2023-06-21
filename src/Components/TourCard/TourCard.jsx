import React from 'react'
import { Link } from 'react-router-dom'
import { TOURDETAILS_URL } from '../../constants/url'


export function TourCard({tour}) {
  return (
    <Link to={TOURDETAILS_URL}>
    <div className='bg-[#4E598C] w-40 h-56 rounded-lg relative'>
                <div className='absolute z-10 p-2 w-full'>
                    <div className='bg-white w-fit rounded-md'>
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
}

import React from 'react'
import { Link } from 'react-router-dom'
import { ARTDETAIL_URL } from '../../constants/url'

export function ArtCard({obra, user}) {
  let autores="";
  try {
  obra.autor.map((autor)=>{
    autores+=autor+"\n";
  })
  } catch (error) {}
  autores=autores.replace("\n",", ")

  if (!user  || user.usertype == "Visitante"){

  return (
    <Link to={`/obras/${obra.id}`}>
    <div className='font-montserrat text-xs lg:w-full flex flex-col gap-1'>
            <div className="avatar">
              <div className="w-44">
                <img src={obra.url}/>
              </div>
            </div>
            <p className='font-bold text-justify'>{obra.nombre}</p>
            <p className='font-baskervville'>{autores}</p>
            <p className='font-baskervville'>{obra.tipo}, {obra.fecha}</p>    
    </div>
    </Link>
  ) }else{

    return(

    <div className='font-montserrat text-xs lg:w-full flex flex-col gap-1'>
            <div className="avatar w-full">
              <div className="w-full">
                <div className='absolute z-10 p-4 flex justify-between items-end w-full h-full'>
                  <div>
                      <Link to={`/editartwork/${obra.id}`}>
                          <button className='btn btn-xs normal-case font-montserrat bg-[#C15100] hover:bg-[#703308] text-white'>Editar</button>
                      </Link>
                  </div>
                  <div>
                      <button className='btn btn-xs normal-case font-montserrat bg-[#C15100] hover:bg-[#703308] text-white'>Eliminar</button>
                  </div>
            </div>   
                <img src={obra.url}/>
              </div>
            </div>
            <p className='font-bold text-justify'>{obra.nombre}</p>
            <p className='font-baskervville'>{autores}</p>
            <p className='font-baskervville'>{obra.tipo}, {obra.fecha}</p> 
    </div>

  )}
}

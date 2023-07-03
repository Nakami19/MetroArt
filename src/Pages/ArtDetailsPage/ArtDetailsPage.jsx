import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useArts } from '../../hooks/useArts';
import { useGlobalContext } from '../../contexts/GlobalContext';

export function ArtDetailsPage() {

    const {artId}=useParams();
    const {art,getOneArt, isLoading}=useArts();
    const {firebaseToursData, firebaseArtsData}=useGlobalContext()

    let autores="";

   if(art.autor) {
    
    art.autor.map((au)=>{
        autores+=au+"\n";
    })
    autores=autores.replace("\n",", ")
   }




    useEffect(()=>{
        getOneArt(artId, firebaseArtsData.data_art);
    },[firebaseArtsData])

    if(isLoading) {
        return (
            <div className="flex text-center justify-center content-center min-h-screen">
            <span className="loading loading-spinner loading-lg"></span>
            </div>
        )
    } else if (!isLoading) {
        
        return (
         
            <div className='p-10 lg:px-40 flex flex-col items-center gap-y-7 md:flex-row '>
                <div className='flex flex-col gap-5 w-full lg:w-1/3'>
                    <h1 className=' font-raleway font-bold text-2xl text-center text-[#001A72]'>
                        {art.nombre}
                    </h1>
                    <div className="avatar">
                        <div className="w-full h-96 rounded">
                            <img src={art.url} />
                        </div>
                    </div>
                </div>
            <div className='font-montserrat grid gap-3 p-1 lg:w-2/3 md:p-7'>
            <h2 className="font-bold text-base text-center md:text-start">Información de la obra</h2>
            <div className='bg-black w-full h-0.5 '></div>
                    <div className='flex gap-x-2 h-fit text-justify'>
                        <p className='font-bold text-sm'>Nombre:</p>
                        <p className='text-sm'>{art.nombre }</p>
                    </div>
                    <div className='flex gap-x-2 h-fit text-justify'>
                        <p className='font-bold text-sm'>Ubicación: </p>
                        <p className='text-sm'>{art.ubicacion}</p>
                    </div>
                    <div className='flex gap-x-2 h-fit text-justify'>
                        <p className='font-bold text-sm'>Tipo: </p>
                        <p className='text-sm'>{art.tipo}</p>
                    </div>
                    <div className='flex gap-x-2 h-fit text-justify'>
                        <p className='font-bold text-sm'>Autor: </p>
                        <p className='text-sm'>{autores}</p>
                    </div>
                    <div className='h-fit text-justify'>
                        <p className='font-bold text-sm'>Descripción: </p>
                        <p className='text-sm'>{art.descripcion}</p>
                    </div>
                </div>
            </div>
            
  )

    }
    
}

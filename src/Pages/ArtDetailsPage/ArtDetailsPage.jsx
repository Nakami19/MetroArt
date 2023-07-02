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
            <div className='p-10 flex flex-col items-center gap-y-7 md:flex-row'>
                <div className='flex flex-col gap-5 md:w-full lg:w-2/4'>
                    <h1 className=' font-raleway font-bold text-2xl text-center text-[#001A72]'>
                        {art.nombre}
                    </h1>
                    <img className="h-3/4 rounded-md md:w-full "src={art.url}/>
                </div>
                <div className='font-montserrat grid gap-3 p-1 md:p-7'>
                    <h2 className="font-bold text-center md:text-start">Información de la obra</h2>
                    <div className='flex gap-x-1 h-fit text-justify'>
                        <p className='font-bold'>Nombre:</p>
                        <p>{art.nombre }</p>
                    </div>
                    <div className='flex gap-x-1 h-fit text-justify'>
                        <p className='font-bold'>Ubicación: </p>
                        <p>{art.ubicacion}</p>
                    </div>
                    <div className='flex gap-x-1 h-fit text-justify'>
                        <p className='font-bold'>Tipo: </p>
                        <p>{art.tipo}</p>
                    </div>
                    <div className='flex gap-x-1 h-fit text-justify'>
                        <p className='font-bold'>Autor: </p>
                        <p>{autores}</p>
                    </div>
                    <div className='h-fit text-justify'>
                        <p className='font-bold'>Descripción </p>
                        <p>{art.descripcion}</p>
                    </div>
                </div>
            </div>
  )

    }
    
}

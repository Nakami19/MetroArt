import React from 'react'
import { ArtCard } from '../../Components/ArtCard/ArtCard'
import { ComentContainer } from '../../Components/ComentContainer/ComentContainer'

export function TourDetailsPage() {
  return (
    <>

    {/*Detalles del tour*/}
    <section className='p-7 flex flex-col gap-5 md:flex-row lg:justify-center'>
        <div className='flex flex-col gap-5 w-full lg:items-center lg:w-72'>
            <h1 className='text-center font-raleway text-2xl font-bold text-[#4E598C]'>El paseo de esculturas</h1>
            <img className='w-full lg:full' src="./src/assets/Doña Laura Singre.jpg"/>
        </div>
        <div className='font-montserrat flex flex-col gap-2 lg:w-7/12 md:justify-evenly'>
            <div className='flex flex-col gap-2 lg:gap-4'>
                <h1 className='font-bold'>Información del tour</h1>
                <div className='bg-black w-full h-0.5 '></div>
                <div className='text-xs flex gap-4 font-bold items-center'>
                <div className='flex gap-1 items-center'>
                    <img className='h-4' src="https://img.icons8.com/?size=512&id=19295&format=png"/>
                    <p>5.0</p>
                </div>
                <div className='flex gap-1 items-center'>
                    <div className=' bg-green-800 w-3 h-3 rounded-full'></div>
                    <p>Disponible</p>
                </div>
                <div>
                    <p>Duración: 40 minutos</p>
                </div>
            </div>
            </div>
            
            <div className='text-xs flex flex-col gap-2 text-justify'>
                <p className='font-bold'>Descripción</p>
                <p>Las obras de arte nos ayudan a expresar nuestras emociones creando piezas que pueden resultar simbólicas y atractivas para otras personas, dándoles un significado único. Es por ello que el Departamento de Cultura te invita a visitar las obras alojadas en la Universidad. ¡Anímate a aprender sobre las obras y sus historias reservando un tour!</p>
                <p className='font-bold'>Lugares importantes</p>
                <p>Universidad Metropolitana, Eugenio Mendoza, Biblioteca Pedro Grases.</p>
            </div>
            <button className="btn btn-sm bg-[#FF8C42] normal-case text-white hover:bg-[#c45815] font-montserrat md:btn-md lg:btn-wide">Reservar</button>
        </div>
    </section>

    {/*Obras en la zona*/}

    <section className='p-7 flex flex-col gap-5'>
        <h1 className='text-[#4E598C] font-bold font-raleway text-xl text-center'>Obras de arte que se encuentran en la zona</h1>

        {/*Card*/}
        <div className='grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6 lg:h-80 lg:gap-10 overflow-y-scroll h-72'>
            <ArtCard/>
            <ArtCard/>
            <ArtCard/>
            <ArtCard/>
            <ArtCard/>
            <ArtCard/>
            <ArtCard/>
            <ArtCard/>
            <ArtCard/>
            <ArtCard/>
        </div>
        
    </section>


    {/*Coment section*/}
    <section className='bg-[#fcaf58]/50 p-6 md:flex md:gap-4'>
        <div className='bg-[#4E598C]/25 rounded-lg p-4 flex flex-col gap-3 md:w-2/4'>
            <h1 className='font-bold font-raleway'>Comentarios</h1>
            <div className='h-72 flex flex-col gap-2 overflow-y-scroll'>
                <ComentContainer/> 
                <ComentContainer/> 
                <ComentContainer/> 
            </div>
        </div>
        <div className="md:w-2/4 md:rounded-2xl md:bg-[url('https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]"></div>
    </section>

    </>
  )
}

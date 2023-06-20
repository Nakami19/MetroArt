import React from 'react'

export function ArtDetailsPage() {
  return (
    <div className='p-10 flex flex-col items-center gap-y-7 md:flex-row'>
        <div className='flex flex-col gap-5 md:w-full lg:w-2/4'>
            <h1 className=' font-raleway font-bold text-2xl text-center text-[#001A72]'>
                En la mira del verdugo
            </h1>
            <img className="h-3/4 rounded-md md:w-full "src='./src/assets/En la mira del verdugo.jpg'/>
        </div>
        <div className='font-montserrat grid gap-3 p-1 md:p-7'>
            <h2 className="font-bold text-center md:text-start">Información de la obra</h2>
            <div className='flex gap-x-1 h-fit text-justify'>
                <p className='font-bold'>Nombre:</p>
                <p>En la mira del verdugo</p>
            </div>
            <div className='flex gap-x-1 h-fit text-justify'>
                <p className='font-bold'>Ubicación: </p>
                <p>Biblioteca Pedro Grases</p>
            </div>
            <div className='flex gap-x-1 h-fit text-justify'>
                <p className='font-bold'>Tipo: </p>
                <p>Pintura al óleo</p>
            </div>
            <div className='flex gap-x-1 h-fit text-justify'>
                <p className='font-bold'>Autor: </p>
                <p>Luis Dominguez Salazar</p>
            </div>
            <div className='h-fit text-justify'>
                <p className='font-bold'>Descripción </p>
                <p>Pintura de Luis Dominguez Salazar quien se caracterizaba por su estilo inclinado al dominio del claroscuro, usaba la verosimilitud en el parecido humano, al estilo fantástico y de humor. Sus obras comunmente contenian deformaciones acercandose a lo monstruoso.</p>
            </div>
        </div>
    </div>
  )
}

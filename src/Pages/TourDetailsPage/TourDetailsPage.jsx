import React, { useEffect } from 'react'
import { ArtCard } from '../../Components/ArtCard/ArtCard'
import { ComentContainer } from '../../Components/ComentContainer/ComentContainer'
import { useTours } from '../../hooks/useTours';
import { useParams } from 'react-router';

export function TourDetailsPage() {

    const {tourId}=useParams();
    const {tour, getOneTour, isLoading}=useTours();
    let component=null;

    

    useEffect(()=>{
        getOneTour(tourId);
    },[])

    if(tour.disponible) {
        component= <><div className=' bg-green-800 w-3 h-3 rounded-full'></div>
        <p>Disponible</p></>
    } else {
        component=<><div className=' bg-red-800 w-3 h-3 rounded-full'></div>
        <p>No Disponible</p></>
    }

    if(isLoading) {
        return (
            <>
            <span className="loading loading-spinner loading-lg"></span>
            </>
        )
    } else if (!isLoading && tour.obras) {
        return (
    <>

    {/*Detalles del tour*/}
    <section className='p-7 flex flex-col gap-5 md:flex-row lg:justify-center'>
        <div className='flex flex-col gap-5 w-full lg:items-center lg:w-72'>
            <h1 className='text-center font-raleway text-2xl font-bold text-[#4E598C]'>{tour.name}</h1>
            <div className="avatar">
                <div className="w-full h-full rounded">
                    <img src={tour.url} />
                </div>
            </div>
        </div>
        <div className='font-montserrat flex flex-col gap-2 lg:w-7/12 md:justify-evenly'>
            <div className='flex flex-col gap-2 lg:gap-4'>
                <h1 className='font-bold'>Información del tour</h1>
                <div className='bg-black w-full h-0.5 '></div>
                <div className='text-xs flex gap-4 font-bold items-center'>
                <div className='flex gap-1 items-center'>
                    <img className='h-4' src="https://img.icons8.com/?size=512&id=19295&format=png"/>
                    <p>{tour.rating}</p>
                </div>
                <div className='flex gap-1 items-center'> 
                    {component}
                    {/* <div className=' bg-green-800 w-3 h-3 rounded-full'></div>
                    <p>Disponible</p> */}
                </div>
                <div>
                    <p>Duración: {tour.duration} minutos</p>
                </div>
            </div>
            </div>
            
            <div className='text-xs flex flex-col gap-2 text-justify'>
                <p className='font-bold'>Descripción</p>
                <p>{tour.description}</p>
                <p className='font-bold'>Lugares importantes</p>
                <p>{tour.important_places}</p>
            </div>
            <button className="btn btn-sm bg-[#FF8C42] normal-case text-white hover:bg-[#c45815] font-montserrat md:btn-md lg:btn-wide">Reservar</button>
        </div>
    </section>

    {/*Obras en la zona*/}

    <section className='p-7 flex flex-col gap-5'>
        <h1 className='text-[#4E598C] font-bold font-raleway text-xl text-center'>Obras de arte que se encuentran en la zona</h1>

        {/*Card*/}
        <div className='grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6 lg:h-80 lg:gap-10 overflow-y-scroll h-fit'>
            {
            tour.obras.map((obra)=>{
                return (
                    <ArtCard obra={obra} key={obra.id}/>
                )
                
            })
            }
        </div>
        
    </section>


    {/*Coment section*/}
    <section className='bg-[#fcaf58]/50 p-6 md:flex md:gap-4'>
        <div className='bg-[#4E598C]/25 rounded-lg p-4 flex flex-col gap-3 md:w-2/4'>
            <h1 className='font-bold font-raleway'>Comentarios</h1>
            <div className='h-72 flex flex-col gap-2 overflow-y-scroll'>
                {
                    tour.feedbacks.map((comment)=>{
                        console.log(comment)
                        return (
                           <ComentContainer comment={comment}/>  
                        )
                        
                    })
                }
                {/* <ComentContainer/> 
                <ComentContainer/> 
                <ComentContainer/>  */}
            </div>
        </div>
        <div className="md:w-2/4 md:rounded-2xl md:bg-[url('https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]"></div>
    </section>

    </>
  )
    } else {
        return (
            <>
            <h1>Cargando...</h1>
            </>
        )
    }

  
}

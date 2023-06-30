import React from 'react'
import { useTours } from '../../hooks/useTours';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react'
import { useArts } from '../../hooks/useArts';
import { updateDoc } from '@firebase/firestore';
import { UpdateTour } from '../../firebase/info';
import { Link, useNavigate } from "react-router-dom";
import { TOURS_URL } from '../../constants/url';

export function EditTourPage() {

    const {tourId}=useParams();
    const {arts, getArts, getSearchArt} =useArts();
    const {tour, getOneTour, isLoading}=useTours();
    const [filtro, setFiltro]=useState("Nombre de obra");
    const [buscar, setBuscar]=useState("");
    const [checkedValues, setValue] = useState([]);
    const [selectValue, setSelectValue] = useState();
    const [nameValue, setNameValue] = useState();
    const [durationValue, setDurationValue] = useState();
    const [descriptionValue, setDescriptionValue] = useState();

        useEffect(()=>{
            try{
                let array= [];
                tour.obras.map((obra)=>{
                array.push(obra.nombre)
                setValue(array)
                setNameValue(tour.name)
                setSelectValue(tour.disponible)
                setDurationValue(tour.duration)
                setDescriptionValue(tour.description)
                
            })
            }catch(error){

            }
            
        },[tour])

        function handleChangeInput(event){

            const {value, checked} = event.target
    
    
            if(checked){
                setValue(pre => [...pre, value])
            }else(
                setValue(pre => [...pre.filter(skill => skill!==value)]
                )
            )
    
        }
    
    
        function handleForm(){
            let arrayobras = [];
            let important=""
            checkedValues.map((nameobra) => {
                arts.map((obra) => {
                    if(nameobra == obra.nombre){
                        arrayobras.push(obra)
                        important+= obra.ubicacion + ', ';
                    }
                })
            })
            let disp = true;
            if(selectValue == 'false'){
                disp = false;
            }
    
            const data = {
                description: descriptionValue,
                disponible: disp,
                duration: durationValue,
                feedbacks:tour.feedbacks,
                id:tour.id,
                generated_id : tour.generated_id,
                important_places: important,
                name: nameValue,
                obras: arrayobras,
                reviews: tour.reviews,
                url: tour.url,
            }
            console.log(data)
            const aaaa = UpdateTour(data, tour.generated_id)
    
        }

    

    useEffect(()=>{},[buscar])

    const handleChange= (e)=>{
        const ey=e.target.value
        setBuscar(ey);
        getSearchArt(ey,filtro);     
    }
    const handlerBuscar= (e)=> {
        const option=e.target.value
        setFiltro(option)
    }


    useEffect(()=>{
        getOneTour(tourId);
        getArts()
    },[])


    


    if(isLoading) {
        return (
            <>
            <span className="loading loading-spinner loading-lg"></span>
            </>
        )
    } else if (!isLoading && tour.obras) {

        console.log(checkedValues)
        
        
        return (
        <section className='p-7 md:p-16 flex flex-col gap-5 lg:flex-row lg:justify-center lg:items-center'>
        <div className='flex flex-col gap-5 w-full lg:items-center lg:w-96'>
            <h1 className='text-center font-raleway text-2xl font-bold text-[#4E598C]'>{tour.name}</h1>
            <div className="avatar">
                <div className=" w-full rounded">
                    <img src={tour.url} />
                </div>
            </div>
        </div>
        <div className='font-montserrat flex flex-col gap-7 lg:w-7/12 md:justify-evenly'>


            
                <div className='flex flex-col gap-2 lg:gap-4'>
                    <h1 className='font-bold'>Información del tour</h1>
                    <div className='bg-black w-full h-0.5 '></div>
                    
                    <div className='lg:flex lg:justify-between lg:gap-4'>
                        <div className='w-full'>
                            <div className='text-xs flex flex-col gap-3 font-bold '>
                            <div className='flex gap-2 items-center'>
                                <p>Nombre:</p>
                                <input type="text" defaultValue={nameValue} onChange={(event)=> setNameValue(event.target.value)} placeholder="Nombre" className="input input-bordered input-sm font-normal text-xs" />
                            </div>
                            
                            <div className='flex gap-2 items-center'> 
                                <p>Disponibilidad:</p>
                                <select  value={selectValue} onChange={(event)=> setSelectValue(event.target.value)} className="select select-bordered select-sm max-w-xs text-xs">
                                <option value={true}>Disponible</option>
                                <option  value={false}>No disponible</option>
                                </select>
                            </div>
                            <div className='flex items-center gap-2'>
                                <p>Duración:</p>
                                <select value={durationValue} onChange={(event)=> setDurationValue(event.target.value)} className="select select-bordered select-sm max-w-xs text-xs">
                                    <option value={'45'}>45</option>
                                    <option value={'60'}>60</option>
                                    <option value={'160'}>160</option>
                                </select>
                                <p>minutos</p>
                            </div>
                        </div>
                        <div className='text-xs flex flex-col gap-2 text-justify lg:gap-4'>
                            <p className='font-bold'>Descripción</p>
                            <textarea defaultValue={descriptionValue} onChange={(event)=> setDescriptionValue(event.target.value)} className="textarea textarea-bordered h-32 text-xs"></textarea>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <h1 className='font-montserrat font-bold text-xs'>Seleccione las obras que desea incluir</h1>
                        <div id="dropdownSearch" className="bg-[#FF8C42]/10 rounded-lg shadow w-60 lg:h-64 font-montserrat ">
                        <div className="p-3">
                        <label htmlFor="input-group-search" className="sr-only">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500 " aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                            </div>
                            <input onChange={handleChange} type="text" id="input-group-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Buscar obra"/>
                        </div>
                        </div>
                        <ul className="h-44 lg:h-34 px-3 pb-3 overflow-y-auto text-sm text-gray-700" aria-labelledby="dropdownSearchButton">

                        {
                            arts.map((art) => {
                                let si = false;
                                tour.obras.map((obra)=>{
                                    if(obra.nombre == art.nombre){   
                                        si = true;
                                        
                                    }
                                })
                            
                                return (
                                    <li>
                                        <div className="flex items-center p-2 rounded hover:bg-gray-100">
                                        <input id="checkbox-item-11" defaultChecked={si} type="checkbox" value={art.nombre} onChange={handleChangeInput} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"/>
                                        <label htmlFor="checkbox-item-11" className="w-full ml-2 text-sm font-medium text-gray-900 rounded">{art.nombre}</label>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    
                        
                        </ul>

                        </div>
                    </div>
                    </div>
                    
                    
                    
                </div>
            
                
                <div className='lg:flex lg:justify-end lg:gap-2'>
                    <Link to={TOURS_URL}>
                    <button className="btn btn-sm btn-outline normal-case text-[#FF8C42] hover:bg-[#c45815] font-montserrat md:btn-md lg:btn-wide">Cancelar</button>
                    </Link>
                    <Link to={TOURS_URL}>
                    <button className="btn btn-sm bg-[#FF8C42] normal-case text-white hover:bg-[#c45815] font-montserrat md:btn-md lg:btn-wide" onClick={handleForm} >Guardar</button>
                    </Link>
                </div>
                
        </div>
            
    </section>
        )}
}

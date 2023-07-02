import React, { useEffect, useState } from 'react'
import { useArts } from '../../hooks/useArts';
import { AddTour } from '../../firebase/info';
import { TOURS_URL } from '../../constants/url';
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from '../../contexts/GlobalContext';
import {v4 as uuidv4} from 'uuid';
import { storage } from '../../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL, } from "firebase/storage";

export function AddTourPage() {
    const {arts, getArts, isLoading, getSearchArt} =useArts();
    const [checkedValues, setValue] = useState([]);
    const [selectValue, setSelectValue] = useState("Disponible");
    const [nameValue, setNameValue] = useState("");
    const [durationValue, setDurationValue] = useState("45");
    const [descriptionValue, setDescriptionValue] = useState("");
    const [buscar, setBuscar]=useState("");
    const [filtro, setFiltro]=useState("Nombre de obra");
    const [imageUrl, setImageUrl] = useState("");
    const [filename, setFilename] = useState("");
    const {firebaseToursData, firebaseArtsData}=useGlobalContext()
    const [titulo, setTitulo] = useState("...");

    useEffect(()=>{},[buscar])

    const handleChange= (e)=>{
        const ey=e.target.value
        setBuscar(ey);
        getSearchArt(ey,filtro, firebaseArtsData);     
    }
    const handlerBuscar= (e)=> {
        const option=e.target.value
        setFiltro(option)
    }

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        const code = uuidv4();
        const storageRef = ref(storage, `tours-imagenes/${file.name+" "+code}`);
        setFilename(file.name+" "+code)
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on("state_changed", null, null, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageUrl(downloadUrl);
        });
      });
    };


    function handleChangeInput(event){

        const {value, checked} = event.target

        if(checked){
            setValue(pre => [...pre, value])
        }else(
            setValue(pre => [...pre.filter(skill => skill!==value)]
            )
        )

    }
    function generarIdTicket() {
        const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numeros = '0123456789';
        let id = '';
      
        // Agregar una letra aleatoria en una posición aleatoria
        const posicionLetra = Math.floor(Math.random() * 5);
        const letraAleatoria = letras.charAt(Math.floor(Math.random() * letras.length));
        id += id.length === posicionLetra ? letraAleatoria : numeros.charAt(Math.floor(Math.random() * numeros.length));
      
        // Agregar un número aleatorio en una posición aleatoria diferente a la anterior
        let posicionNumero = Math.floor(Math.random() * 5);
        while (posicionNumero === posicionLetra) {
          posicionNumero = Math.floor(Math.random() * 5);
        }
        const numeroAleatorio = numeros.charAt(Math.floor(Math.random() * numeros.length));
        id += id.length === posicionNumero ? numeroAleatorio : letras.charAt(Math.floor(Math.random() * letras.length));
      
        // Agregar caracteres alfanuméricos aleatorios en las posiciones restantes
        for (let i = 0; i < 5; i++) {
          if (i !== posicionLetra && i !== posicionNumero) {
            const caracterAleatorio = Math.random() < 0.5 ? letras.charAt(Math.floor(Math.random() * letras.length)) : numeros.charAt(Math.floor(Math.random() * numeros.length));
            id += caracterAleatorio;
          }
        }
      
        return id;
      }

    function handleForm(){
        let arrayobras = [];
        let important = "";
        checkedValues.map((nameobra) => {
            arts.map((obra) => {
                if(nameobra == obra.nombre){
                    arrayobras.push(obra)
                    important+=(obra.ubicacion+' ')
                }
            })
        })
        let disp = false
        if(selectValue == 'Disponible'){
            disp = true
        }

        const idTicket = generarIdTicket();

        const data = {
            description: descriptionValue,
            disponible: disp,
            duration: durationValue,
            feedbacks:[],
            id: idTicket,
            generated_id:"",
            important_places: important,
            name: nameValue,
            obras: arrayobras,
            reviews: 0,
            url: imageUrl,
        }
        console.log(data)
        const add = AddTour(data)

    }

    useEffect(()=>{
        getArts(firebaseArtsData.data_art)
    },[firebaseArtsData])

    const handleOnChange = (event) => {
        setTitulo(event.target.value);
        setNameValue(event.target.value)
    };


    if(isLoading) {
        return (
            <div className="flex text-center justify-center content-center min-h-screen">
            <span className="loading loading-spinner loading-lg"></span>
            </div>
        )
    } else if (!isLoading) {

        return (
            <section className='p-7 md:p-16 flex flex-col gap-5 lg:flex-row lg:justify-center lg:items-center'>
            <div className='flex flex-col gap-5 w-full lg:items-center lg:w-96'>
                <h1 className='text-center font-raleway text-2xl font-bold text-[#4E598C]'>{titulo}</h1>
                <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full lg:h-[70vh] md: h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <img className="relative opacity-50 object-cover lg:h-[70vh] md: h-64 rounded-md " src={imageUrl}></img>
                        <svg aria-hidden="true" className="w-10 h-10 mb-32 text-gray-700 absolute z-10" fill={"none"} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                        <p className="mb-14 text-sm black dark:text-gray-400 absolute z-10 md: mt-5"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs black dark:text-gray-400 absolute z-10">SVG, PNG or JPG (MAX. 800x400px)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" onChange={handleUpload} accept="image/png, image/jpeg, image/jpg"/>
                </label>
            </div> 
            </div>
            <div className='font-montserrat flex flex-col gap-7 lg:w-7/12 md:justify-evenly'>

                <div className='flex flex-col gap-2 md:gap-4'>
                    <h1 className='font-bold'>Información del tour</h1>
                    <div className='bg-black w-full h-0.5 '></div>
                    <div className='flex flex-col gap-4 md:flex-row md:justify-between md:gap-2'>
                        <div className='w-full'>
                            <div className='text-xs flex flex-col gap-3 font-bold '>
                            <div className='flex gap-2 items-center'>
                                <p>Nombre:</p>
                                <input type="text" onChange={handleOnChange} placeholder="Nombre" className="input input-bordered input-sm font-normal text-xs" />
                            </div>
                            
                            <div className='flex gap-2 items-center'> 
                                <p>Disponibilidad:</p>
                                <select value={selectValue} onChange={(event)=> setSelectValue(event.target.value)} className="select select-bordered select-sm max-w-xs text-xs">
                                    <option>Disponible</option>
                                    <option>No disponible</option>
                                </select>
                            </div>
                            <div className='flex items-center gap-2'>
                                <p>Duración:</p>
                                <select value={durationValue} onChange={(event)=> setDurationValue(event.target.value)} className="select select-bordered select-sm max-w-xs text-xs">
                                    <option>45</option>
                                    <option>60</option>
                                    <option>160</option>
                                </select>
                                <p>minutos</p>
                            </div>
                            </div>
                            
                            <div className='text-xs mt-2 flex flex-col gap-2 text-justify lg:gap-2'>
                                <p className='font-bold'>Descripción</p>
                                <textarea onChange={(event)=> setDescriptionValue(event.target.value)} className="textarea textarea-bordered h-32 lg:h-52 text-xs" defaultValue={""}></textarea>
                            </div>
                        </div>
                        
                        <div className='flex flex-col gap-3'>
                            <h1 className='font-montserrat font-bold text-xs'>Seleccione las obras que desea incluir</h1>
                            <div id="dropdownSearch" className="bg-[#FF8C42]/10 rounded-lg shadow w-full h-64 md:w-60 lg:h-80 font-montserrat ">
                            <div className="p-3">
                            <label htmlFor="input-group-search" className="sr-only">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500 " aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                </div>
                                <input onChange={handleChange} type="text" id="input-group-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Buscar obra"/>
                            </div>
                            </div>
                            <ul className="h-44 lg:h-60 px-3 pb-3 overflow-y-auto text-sm text-gray-700" aria-labelledby="dropdownSearchButton">

                            {
                                arts.map((art) => {
                                    return (
                                        <li key={art.id}>
                                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                                            <input id="checkbox-item-11" type="checkbox" value={art.nombre} onChange={handleChangeInput} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"/>
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
                
                
                <div className='md:flex lg:justify-end md:gap-2 md:justify-center'>
                    <Link to={TOURS_URL}>
                    <button className="btn btn-sm btn-outline md:btn-wide normal-case text-[#FF8C42] hover:bg-[#c45815] font-montserrat md:btn-md lg:btn-wide">Cancelar</button>
                    </Link>
                    <Link to={TOURS_URL}>
                    <button className="btn btn-sm md:btn-wide bg-[#FF8C42] normal-case text-white hover:bg-[#c45815] font-montserrat md:btn-md lg:btn-wide" onClick={handleForm}>Guardar</button>
                    </Link>
                </div>
                
            </div>
            </section>
        )}
}

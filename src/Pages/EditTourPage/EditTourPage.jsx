import React from 'react'
import { useTours } from '../../hooks/useTours';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react'
import { useArts } from '../../hooks/useArts';
import { updateDoc } from '@firebase/firestore';
import { UpdateTour } from '../../firebase/info';
import { Link, useNavigate } from "react-router-dom";
import { TOURS_URL } from '../../constants/url';
import { useGlobalContext } from '../../contexts/GlobalContext';
import {v4 as uuidv4} from 'uuid';
import { storage } from '../../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL, } from "firebase/storage";

export function EditTourPage() {

    const {tourId}=useParams();
    const {arts, getArts, getSearchArt} =useArts();
    const {tour, getOneTour, isLoading}=useTours();
    const [filtro, setFiltro]=useState("Nombre de obra");
    const [buscar, setBuscar]=useState("");
    const [checkedValues, setValue] = useState([]);
    const [selectValue, setSelectValue] = useState();
    const [nameValue, setNameValue] = useState("");
    const [durationValue, setDurationValue] = useState("45");
    const [descriptionValue, setDescriptionValue] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const {firebaseToursData, firebaseArtsData}=useGlobalContext()
    const [filename, setFilename] = useState("");
    const [titulo, setTitulo] = useState("");
    const [errors, setErrors] = useState({});
    const newErrors = {};
    const navigate = useNavigate();
    const [arrayLoading, setArrayLoading]=useState();

        useEffect(()=>{
            setArrayLoading(true)
            try{
                
                let array= [];
                tour.obras.map((obra)=>{
                array.push(obra.nombre)
                setValue(array)
                setNameValue(tour.name)
                setTitulo(tour.name)
                setSelectValue(tour.disponible)
                setDurationValue(tour.duration)
                setDescriptionValue(tour.description)
                setImageUrl(tour.url)
                
                
            })
            setArrayLoading(false)
            }catch(error){

            }
            
        },[tour])

        const handleUpload = async (e) => {
            const file = e.target.files[0];
            const code = uuidv4();
            const extension = file.name.substr(file.name.lastIndexOf("."))
            const allowedExtensionsRegx = /(\.jpg|\.jpeg|\.png)$/i
            const isAllowed = allowedExtensionsRegx.test(extension)

            if(isAllowed){
            const storageRef = ref(storage, `tours-imagenes/${file.name+" "+code}`);
            setFilename(file.name+" "+code)
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on("state_changed", null, null, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
              setImageUrl(downloadUrl);
            });
            });  
            }else {
                newErrors.archivo = "Tipo de archivo inválido";
                setErrors(newErrors);
            }

            
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
    
    
        function handleForm(){
            if(nameValue == '' || descriptionValue=='' || titulo =='' || checkedValues.length==0 || imageUrl=="" ||descriptionValue==' '){
                newErrors.vacio = "Evite dejar campos vacíos";
                
                if (imageUrl == "") {
                    newErrors.vacio = "Por favor cargue una imagen para el tour"
                } else if (checkedValues.length==0) {
                    newErrors.vacio = "Por favor añada obras al tour"
                }
                else {
                    newErrors.vacio = "Evite dejar campos vacíos";
                }
            
                if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
                } else {
                    setErrors({});
                }
            
            } else {
            let arrayobras = [];
            let important = [];
            let imp="";
            checkedValues.map((nameobra) => {
                arts.map((obra) => {
                    if(nameobra == obra.nombre){
                        arrayobras.push(obra)
                        if(!imp.includes(obra.ubicacion)){
                            imp+=(obra.ubicacion+', ')
                            important.push(obra.ubicacion)
                        }
                    }
                })
            })
            important = important.join(", ")
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
                url: imageUrl,
            }
            const aaaa = UpdateTour(data, tour.generated_id);
            console.log("ijijij")
            navigate(TOURS_URL);
        }
    
        }

    

    useEffect(()=>{},[buscar])

    const handleChange= (e)=>{
        const ey=e.target.value
        setBuscar(ey);
        getSearchArt(ey,filtro, firebaseArtsData.data_art);     
    }


    useEffect(()=>{
        getOneTour(tourId,firebaseToursData.data_tour);
        getArts(firebaseArtsData.data_art)
    },[firebaseToursData, firebaseArtsData])

    const handleOnChange = (event) => {
        setTitulo(event.target.value);
        setNameValue(event.target.value)
    };


    


    if(isLoading) {
        return (
            <>
            <span className="loading loading-spinner loading-lg"></span>
            </>
        )
    } else if (!isLoading && tour.obras && !arrayLoading) {
    
        return (


        <>

            {errors.vacio && (
            <div className='px-52 hidden lg:block'>
            <div className="alert alert-error mt-5 font-montserrat">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{errors.vacio}</span>
            </div>
            </div>
        )
        }
            {errors.archivo && (
            <div className='px-52 hidden lg:block'>
            <div className="alert alert-error mt-5 font-montserrat">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{errors.archivo}</span>
            </div>
            </div>
        )
        }
        <section className='p-7 md:p-16 flex flex-col gap-5 lg:flex-row lg:justify-center lg:items-center'>
            {errors.vacio && (
            <div className='lg:hidden'>
            <div className="alert alert-error mt-5 font-montserrat">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{errors.vacio}</span>
            </div>
            </div>
        )
        }
            {errors.archivo && (
            <div className='lg:hidden'>
            <div className="alert alert-error mt-5 font-montserrat">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{errors.archivo}</span>
            </div>
            </div>
        )
        }
        <div className='flex flex-col gap-5 w-full lg:items-center lg:w-96'>
            <h1 className='text-center font-raleway text-2xl font-bold text-[#4E598C]'>{titulo}</h1>
            <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full lg:h-[76vh] xl:h-[67vh] md:h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <img className="relative opacity-50 object-cover lg:h-[76vh] xl:h-[67vh] md: h-64 rounded-md " src={imageUrl}></img>
                        <svg aria-hidden="true" className="w-10 h-10 mb-32 text-gray-700 absolute z-10" fill={"none"} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                        <p className="mb-14 text-sm black dark:text-gray-400 absolute z-10 md: mt-5"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs black dark:text-gray-400 absolute z-10">SVG, PNG or JPG (MAX. 800x400px)</p>
                    </div>
                    <input id="dropzone-file" type="file"  className="hidden" onChange={handleUpload} />
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
                                <input type="text" defaultValue={nameValue} onChange={handleOnChange} placeholder="Nombre" className="input input-bordered input-sm font-normal text-xs" />
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
                        <div className='text-xs mt-2 flex flex-col gap-2 text-justify lg:gap-2'>
                            <p className='font-bold'>Descripción</p>
                            <textarea value={descriptionValue} onChange={(event)=> (setDescriptionValue(event.target.value) )} className="textarea textarea-bordered h-32 lg:h-52 text-xs"></textarea>
                        </div>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <h1 className='font-montserrat font-bold text-xs text-center'>Selecciona las obras que deseas incluir</h1>
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
                                    let si = false;
                                    checkedValues.map((obra)=>{
                                        if(obra == art.nombre){   
                                            si = true;
                                            
                                        }
                                    })
                                    console.log(si)
                                
                                    return (
                                        <li key={art.id}>
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
            
                
                <div className='md:flex lg:justify-end md:gap-2 md:justify-center'>
                    <Link to={TOURS_URL}>
                    <button className="btn btn-sm md:btn-wide btn-outline normal-case text-[#FF8C42] hover:bg-[#c45815] font-montserrat md:btn-md lg:btn-wide">Cancelar</button>
                    </Link>
                    {/* <Link to={TOURS_URL}> */}
                    <button className="btn btn-sm md:btn-wide bg-[#FF8C42] normal-case text-white hover:bg-[#c45815] font-montserrat md:btn-md lg:btn-wide" onClick={handleForm} >Guardar</button>
                    {/* </Link> */}
                </div>
                
        </div>
            
    </section>
    </>
        )}
}

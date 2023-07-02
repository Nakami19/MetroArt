import React, {useState, useEffect} from 'react'
import { useArts } from '../../hooks/useArts';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom'
import {
    doc,
    setDoc,
    collection,
  } from 'firebase/firestore';
  import { db } from '../../firebase/config';
  import {v4 as uuidv4} from 'uuid';
  import { storage } from '../../firebase/config';
  import { ref, uploadBytesResumable, getDownloadURL, } from "firebase/storage";
import { ARTPAGE_URL } from '../../constants/url';
import { useGlobalContext } from '../../contexts/GlobalContext';
  
  

export function EditArtworkPage() {

    const [filename, setFilename] = useState("");
    const artcollection = collection(db, 'obras');
    const {artId}=useParams();
    const {art,getOneArt, isLoading}=useArts();
    const [descripcion, setDescripcion] = useState("");
    const [fecha, setFecha] = useState("");
    const [nombre, setNombre] = useState("");
    const [tipo, setTipo] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [titulo, setTitulo] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [autor, setautor]= useState([""]);
    const navigate = useNavigate();
    const {firebaseToursData, firebaseArtsData}=useGlobalContext();
    const [errors, setErrors] = useState({});
    const newErrors = {};


    const handleinputchange=(e, index)=>{
        
        const list= [...art.autor];
        list[index]= e.target.value;
        art.autor = list;
        setautor(art.autor);
        

    }

    const handleremove= index=>{
        const list=[...art.autor];
        if (index>0){
        list.splice(index);
        art.autor = list;
        setautor(art.autor);
        }
    }

    const handleaddclick=()=>{ 
        setautor(art.autor.push(""));
       
    }

    const handleOk= () => {
      navigate(ARTPAGE_URL)
    }

    useEffect(() => {
       setautor(art.autor);
       setDescripcion(art.descripcion)
       setNombre(art.nombre)
       setTitulo(art.nombre)
       setFecha(art.fecha)
       setTipo(art.tipo)
       setUbicacion(art.ubicacion)
       setImageUrl(art.url)

    },[art]);



// EDIT FUNCTION
async function updateArt() {
    setautor(art.autor);
       setDescripcion(art.descripcion)
       setNombre(art.nombre)
       setTitulo(art.nombre)
       setFecha(art.fecha)
       setTipo(art.tipo)
       setUbicacion(art.ubicacion)
       setImageUrl(art.url)
        
        const newArt = {
            autor,
            descripcion,
            fecha,
            id: artId,
            nombre,
            tipo,
            ubicacion,
            url: imageUrl,
           
            }
            try {
            const artRef = doc(artcollection, artId);
            await setDoc(artRef, newArt);} catch (error) {
                console.error(error);
                }
    }
    const handleUpdate = async (e) => {
        e.preventDefault();
        if(nombre == '' || ubicacion=='' || tipo =='' || fecha =='' || descripcion =='' || autor[0]=="" || imageUrl==""){
            
            if (imageUrl == "") {
                newErrors.vacio = "Por favor cargue una imagen para la obra"
            }else {
                newErrors.vacio = "Evite dejar campos vacíos";
            }
        
            if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
            } else {
                setErrors({});
            }
        
        } else {
        updateArt();
        window.my_modal_5.showModal() 
    }
    }

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        const code = uuidv4();
        const extension = file.name.substr(file.name.lastIndexOf("."))
        const allowedExtensionsRegx = /(\.jpg|\.jpeg|\.png)$/i
        const isAllowed = allowedExtensionsRegx.test(extension)

        if(isAllowed){
        const storageRef = ref(storage, `obras-imagenes/${file.name+" "+code}`);
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


    useEffect(()=>{
        getOneArt(artId, firebaseArtsData.data_art);
    },[firebaseArtsData])


  

    const handleOnChange = (event) => {
        setTitulo(event.target.value);
        setNombre(event.target.value);
    };

    if(isLoading) {
        return (
            <div className="flex text-center justify-center content-center min-h-screen">
            <span className="loading loading-spinner loading-lg"></span>
            </div>
        )
    } else if (!isLoading) {

  return (
    <>
    {errors.vacio && (
            <div className='px-5'>
            <div className="alert alert-error mt-5 font-montserrat">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{errors.vacio}</span>
            </div>
            </div>
        )
        }
        {errors.archivo && (
            <div className='px-5'>
            <div className="alert alert-error mt-5 font-montserrat">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{errors.archivo}</span>
            </div>
            </div>
        )
        }
    <div className='py-10 lg:px-52 flex flex-col items-center gap-y-7 md:flex-row'>
        <div className='flex flex-col gap-5 md:w-full lg:w-1/3'>
            <h1 className=' font-raleway font-bold text-2xl text-center text-[#001A72]'>
                {titulo}
            </h1>
            
            

            <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center lg:h-[70vh] md: h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <img className="relative opacity-50 object-cover lg:h-[70vh] md: h-64 rounded-md " src={imageUrl}></img>
                        <svg aria-hidden="true" className="w-10 h-10 mb-32 text-gray-700 absolute z-10" fill={"none"} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                        <p className="mb-14 text-sm black dark:text-gray-400 absolute z-10 md: mt-5"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs black dark:text-gray-400 absolute z-10">SVG, PNG or JPG (MAX. 800x400px)</p>
                    </div>
                    <input id="dropzone-file" type="file"  className="hidden" onChange={handleUpload} />
                </label>
            </div> 


        </div>
        <div className='font-montserrat grid gap-3 p-1 w-2/3 md:p-7'>
            <h2 className="font-bold text-center md:text-start">Información de la obra</h2>
            <div className='bg-black w-full h-0.5 '></div>
            <div className='flex gap-x-1 h-fit text-justify'>
                <p className='font-bold text-sm'>Nombre:</p>
                <input type="text" defaultValue={art.nombre} className="input input-bordered input-sm w-full max-w-xs" onChange={handleOnChange}/>
            </div>
            <div className='flex gap-x-1 h-fit text-justify'>
                <p className='font-bold text-sm'>Ubicación: </p>
                <input type="text" defaultValue={art.ubicacion} className="input input-bordered input-sm w-full max-w-xs" onChange={(e)=>(setUbicacion(e.target.value))} />
            </div>
            <div className='flex gap-x-1 h-fit text-justify'>
                <p className='font-bold text-sm'>Tipo: </p>
                <input type="text" defaultValue={art.tipo} className="input input-bordered input-sm w-full max-w-xs" onChange={(e)=>(setTipo(e.target.value))}/>
            </div>
            <div className='flex gap-x-1 h-fit text-justify'>
                <p className='font-bold text-sm'>Fecha: </p>
                <input type="text" defaultValue={art.fecha} className="input input-bordered input-sm w-full max-w-xs" onChange={(e)=>(setFecha(e.target.value))}/>
            </div>
            <div className='flex gap-x-1 h-fit text-justify'>
                <p className='font-bold text-sm'>Autor: </p>





                <div className='flex'>

            <div className="row">
            <div className="col-sm-12">
                
                    { art.autor &&
                    art.autor.map( (x,i)=>{
                    return(
                    <div className="flex row mb-3" key={art.id}>
                        <div className="form-group col-md-4" key={art.id}>
                        <input type="text" defaultValue={x} name="autor" className="form-control input input-bordered input-sm"  placeholder="Ingresa un autor" onChange={ e=>handleinputchange(e,i)} />
                
                    </div>
                    {/* <div className="form-group col-md-2 mt-4"> */}
                    {
                        art.autor.length!==1 &&
                        <button  className="btn btn-error mx-1 btn-xs normal-case" onClick={()=> handleremove(i)}>Eliminar</button>
                    }
                    { art.autor.length-1===i &&
                    <button  className="btn btn-xs mx-1 normal-case" onClick={ handleaddclick}>Agregar</button>
                    }
                    {/* </div> */}
                    </div>
                    );
                    } )} 

                    
            </div>
            </div>

            </div>

          
          
          
          
          
            </div>
            <div className='h-fit text-justify'>
                <p className='font-bold text-sm'>Descripción </p>
                <textarea defaultValue={art.descripcion} className="textarea textarea-bordered h-44 w-full" onChange={(e)=>(setDescripcion(e.target.value))} ></textarea>
            </div>
            <div className='flex gap-3 lg:ms-auto md: justify-around'>
                <button className="btn md:btn-sm lg:btn-md normal-case" onClick={handleUpdate}>Confirmar</button>
                <Link to={`/art`}>
                <button className="btn btn-error md:btn-sm lg:btn-md normal-case">Cancelar</button>
                </Link>
            </div>
        </div>
        {/* Open the modal using ID.showModal() method */}
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
            <form method="dialog" className="modal-box">
                <h3 className="font-bold text-lg">Guardado exitoso</h3>
                <p className="py-4">Se ha editado la obra con éxito</p>
                <div className="modal-action">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn bg-green-500" onClick={handleOk}>OK</button>
                </div>
            </form>
            </dialog>  
    </div>
</>
    
  )
}
}
import React from 'react'
import { ReserveCard } from '../../Components/ReserveCard/ReserveCard'
import { useUserContext } from '../../contexts/UserContext'
import { db } from '../../firebase/config';
import {v4 as uuidv4} from 'uuid';
import { storage } from '../../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL  } from "firebase/storage";
import {
    doc,
    updateDoc,
    collection,
    onSnapshot ,
  } from 'firebase/firestore';
import { useState, useEffect } from "react";
import { useUsers } from "../../hooks/useUsers";
import { useGlobalContext } from '../../contexts/GlobalContext';
import { Link } from 'react-router-dom';
import { TOURS_URL } from '../../constants/url';

export function ProfilePage() {

    let isAdmin = false;

    const { user, isLoadingUser } = useUserContext(); 
    const profilecollection = collection(db, 'users');
    const [imagenFirebase, setImagenFirebase] = useState(null);
    const [tipodeuser, setTipodeuser] = useState(null);
    const [nombreusuario, setNombreusuario] = useState(null);
    const [correousuario, setCorreousuario] = useState(null);
    const [nombrecompleto, setNombrecompleto] = useState(null);
    const [misreservas, setMisReservas] = useState([]);
    const [formData, setData] = useState({name:"",
    fullname:""});
    const [divPerfil, setDivPerfil] = useState(' lg:w-1/3 md: w-full lg:min-h-screen p-3');

    const [errors, setErrors] = useState({});

    const [disableUser, setDisableUser] = useState(true);
    const [disableName, setDisableName] = useState(true);
    const [disableEmail, setDisableEmail] = useState(true);
    const [style, setStyle] = useState("hidden");
    const {firebaseToursData, firebaseArtsData, firebaseUsersData}=useGlobalContext()
    const {usuarios, getUsuarios} = useUsers()


    const slideLeft = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 500;
      };
    
      const slideRight = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 500;
      };


    useEffect(()=>{
      getUsuarios(firebaseUsersData.data_user);
    },[firebaseUsersData])
    useEffect(()=>{
        if (isAdmin){
        setDivPerfil(' lg:w-full md: w-full lg:min-h-screen p-3')}
      },[isLoadingUser])

    useEffect(() => {
        const userDocRef = doc(db, "users", user.id);
    
        const unsubscribe = onSnapshot(userDocRef, (doc) => {
            setImagenFirebase(doc.data().url);
            setTipodeuser(doc.data().usertype);
            setNombreusuario(doc.data().name);
            setCorreousuario(doc.data().email);
            setNombrecompleto(doc.data().fullname);
            setMisReservas(doc.data().reservas);
        });
    
        return () => unsubscribe();
      }, [user]);

      const handleUpload = async (e) => {
        const file = e.target.files[0];
        const fileName = file.name
        const extension = fileName.substr(fileName.lastIndexOf("."))
        const allowedExtensionsRegx = /(\.jpg|\.jpeg|\.png)$/i
        const isAllowed = allowedExtensionsRegx.test(extension)
        console.log(isAllowed)
        if(isAllowed){
            const code = uuidv4();
        const storageRef = ref(storage, `perfil-imagenes/${file.name+" "+code}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on("state_changed", null, null, () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
              const userRef = doc(profilecollection, user.id);
              updateDoc(userRef, { url: downloadUrl }).then(() => {
                  setImagenFirebase(downloadUrl);
              });
          });
        });
        }
        else {
            alert("Tipo de archivo invalido!")
        }
        };


    const editUser = (event) => {
        setDisableUser(false);
        setStyle("mt-5 flex gap-3 lg:ms-auto")
    };
    const editName = (event) => {
        setDisableName(false);
        setStyle("mt-5 flex gap-3 lg:ms-auto")
    };

    const newErrors = {};

    const saveChanges = async (event) => {


        event.preventDefault();
        const userRef = doc(profilecollection, user.id);

        if(formData.name !== ''){
        if(formData.name.length < 4){
          newErrors.name="El mínimo de caracteres para el nombre de usuario es 4"
        } else if(formData.name.length > 16){
          newErrors.name="El límite es de 16 caracteres"
        }else if (formData.name.includes(" ")) { 
            newErrors.name = "El nombre de usuario no puede contener espacios en blanco";}
            usuarios.map((usuario)=>{
          if (usuario.name == formData.name && user.name != usuario.name){
            newErrors.name = "El nombre de usuario ya ha sido registrado";}
          })}
        
        if( formData.fullname !== ''){

        if (!/^[a-zA-Z\s]+$/.test(formData.fullname)) {
            newErrors.fullname = "El nombre y apellido solo pueden contener letras y espacios en blanco";
          }
         else if (formData.fullname.trim().length !== formData.fullname.length) {
          newErrors.fullname = "El nombre y apellido no pueden comenzar ni terminar con espacios en blanco";
        }}


        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
          } else {
            setErrors({});
          }

          if(formData.name !== ''){
            await updateDoc(userRef, { "name": formData.name });
          }
          
          if( formData.fullname !== ''){
            await updateDoc(userRef, { "fullname": formData.fullname });
          }
        setData({name:"",
        fullname:""
    });
        setDisableUser(true);
        setDisableName(true);
        setDisableEmail(true);
        setStyle("hidden");};

    const cancelChanges = (event) => {
        setErrors({});
        setData({name:"",
        fullname:""});
        setDisableUser(true);
        setDisableName(true);
        setDisableEmail(true);
        setStyle("hidden");
    };

    const onChange = (event) => {
        setData((oldData) => ({
          ...oldData,
          [event.target.name]: event.target.value,
        }));

      };



    if(!isLoadingUser){
        try{
            if(user.usertype == "Administrador"){
                isAdmin = true
            } 
        }catch(error){
    
        }
  return (
    <div>
    <div className="md: h-36 lg:h-48 w-full p-4 bg-[url('https://www.unimet.edu.ve/wp-content/uploads/2019/11/bannerdade-1200x630.jpg')]  justify-center rounded-3xl bg-clip-border mx-auto  bg-no-repeat bg-cover border-8 border-white">
        <div className="avatar" on="true">
            <div className="lg:w-36 md: w-24 lg:mt-20 md: mt-16 lg:ml-12 md: ml-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2   transition duration-200 transform hover:scale-110">
            {imagenFirebase ? (
                <img src={imagenFirebase} alt="Profile" />
                ) : (
                    <img src="https://firebasestorage.googleapis.com/v0/b/metro-art-collection.appspot.com/o/perfil-imagenes%2Fperfil_generico.jpg?alt=media&token=f9f29c3c-7df8-479a-bb3b-3f0e02c6f83b" alt="Profile" />
                )}            
            </div>
        </div>
    </div>
        <div className="relative w-48 lg:ml-48 lg:mt-6 md: ml-36 md: mt-3">
            <label title="Click to upload" htmlFor="button2" className="cursor-pointer ">
            <div className="w-max relative">
                <img className="w-8" src="https://svgsilh.com/svg/1294842.svg" alt="file upload icon" />
            </div>
            </label>
            <input hidden={true} type="file" name="button2" id="button2" onChange={handleUpload} accept="image/png, image/jpeg, image/jpg"/>
        </div>

        {errors.name && (
            <div className='px-5'>
            <div className="alert alert-error mt-5 font-montserrat">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{errors.name}</span>
            </div>
            </div>
        )
        }
        
        {errors.fullname && (
            <div className='px-5'>
            <div className="alert alert-error mt-5 font-montserrat">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{errors.fullname}</span>
            </div>
            </div>
        )
        }
        
        <div className='min-h-screen lg:flex lg:mt-14 md: mt-8'>

            <div className={divPerfil}>
                <h1 className='font-raleway font-bold text-2xl lg:ml-8 md: ml-4'>Perfil de Usuario</h1>



                <div className="bg-white overflow-hidden shadow rounded-lg border lg:ml-4 lg:mt-10 md: mt-3">
                    <div className="px-4 py-5 sm:px-6">
                        
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        ({tipodeuser})
                        </p>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <dl className="sm:divide-y sm:divide-gray-200">
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500 font-montserrat">
                                    Username
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-montserrat flex flex-wrap justify-between">
                                    <input  id= "name" type="text" placeholder={"@"+nombreusuario} value={formData.name} className="input input-sm w-5/6 disabled:bg-white disabled:placeholder:text-black" disabled={disableUser} name="name" onChange={onChange}/>
                                    <button><img  className="w-6" src="https://svgsilh.com/svg/1294842.svg" onClick={editUser}/></button>
                                </dd>
                            </div>
                            
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 font-montserrat">
                                <dt className="text-sm font-medium text-gray-500">
                                    Nombre
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-montserrat flex flex-wrap justify-between">
                                <input  id= "fullname" type="text" placeholder={nombrecompleto} value={formData.fullname} className="input input-sm w-5/6 disabled:bg-white disabled:placeholder:text-black" disabled={disableName} name="fullname" onChange={onChange}/>
                                    <button><img  className="w-6" src="https://svgsilh.com/svg/1294842.svg" onClick={editName}/></button>
                                </dd>
                            </div>
                            
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 font-montserrat">
                                <dt className="text-sm font-medium text-gray-500">
                                    E-mail
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-montserrat flex flex-wrap justify-between">
                                <input type="text" placeholder={correousuario} className="placeholder:truncate input input-sm w-5/6 disabled:bg-white disabled:placeholder:text-black" disabled={disableEmail}/>
                                </dd>
                            </div>
                            
                        </dl>
                    </div>
            </div>
            <div className={style}>
                <button className="btn md:btn-sm lg:btn-md normal-case" onClick={saveChanges}>Confirmar</button>
                <button className="btn btn-error md:btn-sm lg:btn-md normal-case" onClick={cancelChanges}>Cancelar</button>
            </div>
            </div>



            {!isAdmin && misreservas[0]!=null && ( <div className={'lg:w-2/3 md: w-full lg:min-h-screen py-5 lg:px-20 md: px-5'}>
            <h1 className='font-raleway font-bold text-2xl ml-4'>Tus reservas</h1>

            
            <div className='flex'>
                <div className='flex flex-wrap opacity-50 cursor-pointer hover:opacity-100 content-center p-2' onMouseEnter={slideLeft} size={40}> ❮</div>
                <div id='slider' className="carousel carousel-center h-[50vh] w-full p-4 space-x-4 rounded-box overflow-y-visible snap-none">
                    <div className="carousel-item p-3">
                        {misreservas.map((reserva)=>{
                            
                            return(
                              <ReserveCard reserva={reserva} key={reserva.id} />  
                            )

                        })}
                    
                    </div>
                </div>
                <div className='flex flex-wrap opacity-50 cursor-pointer hover:opacity-100 content-center p-2' onMouseEnter={slideRight} size={40}> ❯ </div>
               </div>
            </div>
            )}

            {!isAdmin && misreservas[0]==null && ( <div className={'lg:w-2/3 md: w-full lg:min-h-screen py-5 lg:px-20 md: px-5'}>
            <h1 className='font-raleway font-bold text-2xl ml-4'>Tus reservas</h1>

            <Link to={TOURS_URL}>
            <div className='font-montserrat flex items-center justify-center mt-6 bg-[#FF8C42]/10 w-full text-center rounded-xl h-72 hover:scale-105 transition ease-in-out duration-200'>
            <div className='flex flex-col gap-2 p-4'>
                <h1 className='text-[#864317] font-bold'>Aún no has hecho ninguna reserva</h1>
                
                <p className='text-[#864317] text-xs'>¡Dirígete a la página de Tours para hacer la primera!</p>
                
            </div>
            </div>
            </Link> 
        </div>

            )}

           


    </div>

      
        
   </div>
    
  )
}

}

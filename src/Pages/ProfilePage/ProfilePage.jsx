import React from 'react'
import { ReserveCard } from '../../Components/ReserveCard/ReserveCard'
import { useUserContext } from '../../contexts/UserContext';
import { db } from '../../firebase/config';
import {v4 as uuidv4} from 'uuid';
import { storage } from '../../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject  } from "firebase/storage";
import {
    doc,
    updateDoc,
    collection,
    onSnapshot ,
  } from 'firebase/firestore';
import { useState, useEffect } from "react";



export function ProfilePage() {
    const { user, isLoadingUser } = useUserContext(); 
    const profilecollection = collection(db, 'users');
    const [imagenFirebase, setImagenFirebase] = useState(null);

    useEffect(() => {
        const userDocRef = doc(db, "users", user.id);
    
        const unsubscribe = onSnapshot(userDocRef, (doc) => {
            setImagenFirebase(doc.data().url);
        });
    
        return () => unsubscribe();
      }, [user]);


    const handleUpload = async (e) => {
      const file = e.target.files[0];
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
      });};

    async function editProfile(user,imageUrl) {
        try {
          const userRef = doc(profilecollection, user.id);
          await updateDoc(userRef, {"url": imageUrl.valueOf(imageUrl)});
        } catch (error) {
          console.error(error);
        }
      }

    return (
    <div>
    <div className="md: h-36 lg:h-48 w-full p-4 bg-[url('https://www.unimet.edu.ve/wp-content/uploads/2019/11/bannerdade-1200x630.jpg')]  justify-center rounded-3xl bg-clip-border mx-auto  bg-no-repeat bg-cover border-8 border-white">
        <div className="avatar">
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
            <input onChange={handleUpload}  hidden={true} type="file" name="button2" id="button2" accept="image/png, image/jpeg, image/jpg"/>
            <button onClick={() => editProfile(user,imageUrl)}>Actualizar </button>
        </div>

        
        
        <div className='min-h-screen lg:flex lg:mt-14 md: mt-8'>

            <div className=' lg:w-1/3 md: w-full lg:min-h-screen p-3'>
                <h1 className='font-raleway font-bold text-2xl lg:ml-8 md: ml-4'>Perfil de Usuario</h1>



                <div className="bg-white overflow-hidden shadow rounded-lg border lg:ml-4 lg:mt-6 md: mt-3">
                    <div className="px-4 py-5 sm:px-6">
                        
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            ({user.usertype})
                        </p>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <dl className="sm:divide-y sm:divide-gray-200">
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500 font-montserrat">
                                    Username
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-montserrat">
                                    @{user.name}
                                </dd>
                            </div>
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 font-montserrat">
                                <dt className="text-sm font-medium text-gray-500">
                                    Nombre
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-montserrat">
                                    Tu nombre
                                </dd>
                            </div>
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 font-montserrat">
                                <dt className="text-sm font-medium text-gray-500">
                                    Correo electrónico
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-montserrat">
                                    {user.email}
                                </dd>
                            </div>
                            
                        </dl>
                    </div>
            </div>
            </div>



            <div className=' lg:w-2/3 md: w-full lg:min-h-screen py-5 lg:px-20 md: px-5'>
            <h1 className='font-raleway font-bold text-2xl ml-4'>Tus reservas</h1>

            
                <div className="carousel carousel-center w-full p-4 space-x-4 rounded-box overflow-y-visible">
                    <div className="carousel-item">
                     <ReserveCard/>
                    </div>
                    <div className="carousel-item">
                     <ReserveCard/>
                    </div>
                    <div className="carousel-item">
                     <ReserveCard/>
                    </div>
                </div>
                

               </div>


           


    </div>

      
        
   </div>
  )
}


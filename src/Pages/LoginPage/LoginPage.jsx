import React from 'react'
import { useState } from "react";
import {useNavigate } from "react-router-dom";
import { HOME_URL } from "../../constants/url";

import {
  loginWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase/auth-service";

export function LoginPage() {
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
  
    const onSuccess = () => {
      navigate(HOME_URL);
    };
  
    const onFail = (_error) => {
      alert("Inicio de sesión fallido");
    };
  
    const onSubmit = async (event) => {
      event.preventDefault();
      const newErrors = {};
      if (!formData.email) {
        newErrors.email = "El correo electrónico es obligatorio";
      }
      if (!formData.password) {
        newErrors.password = "La contraseña es obligatoria";
      }
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      await loginWithEmailAndPassword({ userData: formData, onSuccess, onFail });
    };
  
    const onChange = (event) => {
      const { name, value } = event.target;
  
      setFormData((oldData) => ({ ...oldData, [name]: value }));
    };
  
    const handleGoogleClick = async () => {
      await signInWithGoogle({
        onSuccess: () => navigate(HOME_URL),
      });
    };

  return (
    // <!-- component -->
    <div className="min-h-screen  bg-[url('https://firebasestorage.googleapis.com/v0/b/metro-art-collection.appspot.com/o/proyecto-imagenes%2Ffondo2.png?alt=media&token=8ee412b6-5d37-4c7a-8310-f5ff7ecd68c0')] bg-no-repeat lg: bg-left lg:bg-contain bg-[#4E598C] md: bg-cover">
    
            <div className="flex flex-col items-center justify-center">
            
            <div className="bg-white shadow relative  lg:rounded-none md: rounded-xl lg:px-28 md: px-10 md: pb-10 lg:min-h-screen lg:ms-auto md: h-5/6 lg:w-1/2 md: w-5/6  lg:mt-0 md: mt-24">
                
                <div className="scale-90">


                <p tabIndex="0" className="focus:outline-none text-sm mt-8 font-medium leading-none text-gray-500 font-montserrat text-right">¿No tienes una cuenta? <a href="/register"  className="hover:text-orange-700 focus:text-orange-700 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none  text-orange-500 cursor-pointer font-montserrat"> Regístrate</a></p>
                <p tabIndex="0" className="focus:outline-none text-3xl font-extrabold leading-6 font-raleway text-[#001A72] text-center lg:mt-24 md: mt-10">Iniciar sesión</p>

                        {/* Inputs */}

                            <div className='lg:mt-16 md: mt-6'>
                                <label id="email" className="text-sm font-medium leading-none text-gray-800 font-montserrat">
                                    Correo electrónico
                                </label>
                                <input aria-labelledby="email" name="email" type="email" className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" onChange={onChange} placeholder="Ej. simoncito@email.com"/>
                            </div>
                            {errors.email && (<p className="text-red-500 text-xs mt-1">{errors.email}</p>)}

                            <div className="mt-4  w-full">
                                <label htmlFor="pass" className="text-sm font-medium leading-none text-gray-800 font-montserrat">
                                    Contraseña
                                </label>
                               <div className="relative flex items-center justify-center">
                                <input id="pass" name="password" type="password" className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" onChange={onChange} placeholder="********"/>
                                <div className="absolute right-0 mt-2 mr-3 cursor-pointer">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z" fill="#71717A"/>
                                        </svg>
                                        
                                </div>
                               </div>
                            </div>
                            {errors.password && (<p className="text-red-500 text-xs mt-1">{errors.password}</p>)}


                        {/* Botones */}

                            <div className="mt-8">
                                <button role="button" className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-black border rounded hover:bg-gray-700 py-4 w-full"  onClick={onSubmit}>Iniciar sesión</button>
                            </div>
                
                        
                        <div className="w-full flex items-center justify-between py-5 mt-2">
                             <hr className="w-full bg-gray-400"></hr>
                             <p className="text-base font-medium leading-4 px-2.5 text-gray-400">O</p>
                             <hr className="w-full bg-gray-400  "></hr>
                        </div>

                        <button aria-label="Continue with google" role="button" className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-4" onClick={handleGoogleClick}>
                            <img className="h-5 w-5" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/882px-Google_%22G%22_Logo.svg.png?20230305195327" alt="Google Logo" />
                            
                            <p className="text-base font-medium ml-4 text-gray-700 font-montserrat">Continuar con Google</p>
                        </button>
                        


                        <button aria-label="Continue with github" role="button" className="focus:outline-none  focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-4">
                            <img className="h-5 w-5" src="https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/768px-Facebook_f_logo_%282021%29.svg.png?20210818083032" alt="Facebook Logo" />
                                
                            <p className="text-base font-medium ml-3 text-gray-700 font-montserrat">Continuar con Facebook</p>
                        </button>    

                        </div>

                    </div>
                </div>
            </div>
            
  )
  }
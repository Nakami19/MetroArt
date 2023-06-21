import React from 'react'

export function SignupPage() {
  return (
    // <!-- component -->
    <div className="min-h-screen  bg-[url('src/assets/Images/fondo2.png')] bg-no-repeat lg: bg-left bg-contain bg-[#4E598C] ">
    
                <div className="flex flex-col items-center justify-center ">

                    
    
                    <div className="bg-white shadow relative lg:rounded-none md: rounded-xl lg:px-28 md: px-10 md: pb-10 lg:min-h-screen lg:ms-auto md: h-5/6 lg:w-1/2 md: w-5/6  lg:mt-0 md: mt-10">
                     <div className="scale-90">   
                        <p tabIndex="0" className="focus:outline-none text-sm mt-1 font-medium leading-none text-gray-500 font-montserrat text-right">¿Ya tienes una cuenta? <a href="/login"   className="hover:text-orange-700 focus:text-orange-700 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none  text-orange-500 cursor-pointer font-montserrat"> Inicia sesión</a></p>
                        <p tabIndex="0" className="focus:outline-none text-3xl font-extrabold leading-6  font-raleway text-[#001A72] text-center lg:mt-14 md: mt-10">Registrarse</p>

                        {/* Inputs */}

                            <div className='mt-6'>
                                <label id="email" className="text-sm font-medium leading-none text-gray-800 font-montserrat">
                                    Correo electrónico
                                </label>
                                <input aria-labelledby="email" type="email" className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"/>
                            </div>

                            <div className='mt-4'>
                                <label id="username" className="text-sm font-medium leading-none text-gray-800 font-montserrat">
                                    Nombre de usuario
                                </label>
                                <input aria-labelledby="email" type="email" className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"/>
                            </div>


                            <div className='mt-4'>
                                <label id="usertype" className="text-sm font-medium leading-none text-gray-800 font-montserrat">
                                    Tipo de usuario
                                </label>
                                <select className="select w-full bg-gray-200 mt-2">
                                    <option></option>
                                    <option>Visitante</option>
                                    <option>Administrador</option>
                                </select>
                            </div>


                            <div className="mt-4  w-full">
                                <label htmlFor="pass" className="text-sm font-medium leading-none text-gray-800 font-montserrat">
                                    Contraseña
                                </label>
                               <div className="relative flex items-center justify-center">
                                <input id="pass" type="password" className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"/>
                                <div className="absolute right-0 mt-2 mr-3 cursor-pointer">
                                        
                                </div>
                               </div>
                            </div>


                        {/* Botones */}

                            <div className="mt-8">
                                <button role="button" className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-black border rounded hover:bg-gray-700 py-4 w-full">Registrarse</button>
                            </div>
                
                        
                        <div className="w-full flex items-center justify-between py-5 mt-2">
                             <hr className="w-full bg-gray-400"></hr>
                             <p className="text-base font-medium leading-4 px-2.5 text-gray-400">O</p>
                             <hr className="w-full bg-gray-400  "></hr>
                        </div>


                        <button aria-label="Continue with google" role="button" className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-3">
                            <img className="h-5 w-5" src="src/assets/Images/google.svg" alt="Google Logo" />
                            
                            <p className="text-base font-medium ml-4 text-gray-700 font-montserrat">Continuar con Google</p>
                        </button>
                        


                        <button aria-label="Continue with github" role="button" className="focus:outline-none  focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-4">
                            <img className="h-5 w-5" src="src/assets/Images/facebook.svg" alt="Facebook Logo" />
                                
                            <p className="text-base font-medium ml-3 text-gray-700 font-montserrat">Continuar con Facebook</p>
                        </button>    
                        </div>

                    </div>
                </div>
            </div>
            
  )
  }
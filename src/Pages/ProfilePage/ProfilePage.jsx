import React from 'react'
import { ReserveCard } from '../../Components/ReserveCard/ReserveCard'

export function ProfilePage() {
  return (
    <div>
    <div className="md: h-36 lg:h-48 w-full p-4 bg-[url('https://www.unimet.edu.ve/wp-content/uploads/2019/11/bannerdade-1200x630.jpg')]  justify-center rounded-3xl bg-clip-border mx-auto  bg-no-repeat bg-cover border-8 border-white">
        <div className="avatar">
            <div className="lg:w-36 md: w-24 lg:mt-20 md: mt-16 lg:ml-12 md: ml-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2   transition duration-200 transform hover:scale-110">
                <img src="https://user-images.githubusercontent.com/11250/39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e.jpg" />
            </div>
        </div>
    </div>
        <div className="relative w-48 lg:ml-48 lg:mt-6 md: ml-36 md: mt-3">
            <label title="Click to upload" htmlFor="button2" className="cursor-pointer ">
            <div className="w-max relative">
                <img className="w-8" src="https://svgsilh.com/svg/1294842.svg" alt="file upload icon" />
            </div>
            </label>
            <input hidden={true} type="file" name="button2" id="button2"/>
        </div>

        
        
        <div className='min-h-screen lg:flex lg:mt-14 md: mt-8'>

            <div className=' lg:w-1/3 md: w-full lg:min-h-screen p-3'>
                <h1 className='font-raleway font-bold text-2xl lg:ml-8 md: ml-4'>Perfil de Usuario</h1>



                <div className="bg-white overflow-hidden shadow rounded-lg border lg:ml-4 lg:mt-6 md: mt-3">
                    <div className="px-4 py-5 sm:px-6">
                        
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            (Visitante)
                        </p>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <dl className="sm:divide-y sm:divide-gray-200">
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500 font-montserrat">
                                    Username
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-montserrat">
                                    @nombredeusuario
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
                                    E-mail
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-montserrat">
                                    tucorreo@example.com
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


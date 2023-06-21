import React from 'react'

export function ComentContainer() {
  return (
    <div className='bg-white border border-[#29487D] rounded-xl flex flex-col gap-2 w-full p-4 text-xs font-montserrat'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-1'>
                            <div className="avatar">
                                <div className="w-6 rounded-full">
                                    <img src="https://images.pexels.com/photos/3775168/pexels-photo-3775168.jpeg?auto=compress&cs=tinysrgb&w=600" />
                                </div>
                            </div>
                            <p className='font-bold text-[#29487D]'>Name</p>
                        </div>
                        <div>Estrellas</div>
                    </div>
                    <p className='text-justify'>¡Me encantó el tour de las esculturas! Fue una experiencia inolvidable y sin duda mi favorita fue *Inserte nombre*. Fue un paseo muy interesante ideal para aquellos que desean una tarde diferente.</p>
                </div>
  )
}

import React from 'react'

export function ComentContainer({comment}) {
  return (
    <div className='bg-white border border-[#29487D] rounded-xl flex flex-col gap-2 w-full p-4 text-xs font-montserrat'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-1'>
                            <div className="avatar">
                                <div className="w-6 rounded-full">
                                    <img src="https://images.pexels.com/photos/3775168/pexels-photo-3775168.jpeg?auto=compress&cs=tinysrgb&w=600" />
                                </div>
                            </div>
                            <p className='font-bold text-[#29487D]'>{comment.user}</p>
                        </div>
                        <div>{comment.rating} Estrellas</div>
                    </div>
                    <p className='text-justify'>{comment.comment}</p>
                </div>
  )
}

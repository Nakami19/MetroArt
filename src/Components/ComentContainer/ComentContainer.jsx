import React, { useEffect } from 'react'
import { useGlobalContext } from '../../contexts/GlobalContext'
import { useUsers } from '../../hooks/useUsers'

export function ComentContainer({comment}) {

    const {firebaseToursData, firebaseArtsData, firebaseUsersData}=useGlobalContext()
    const {comentUser, getCommentUser}=useUsers()
    const CommentError = {};

    useEffect(()=>{
        getCommentUser(comment.user, firebaseUsersData.data_user)
    },[firebaseUsersData])

  return (
    <div className='bg-white border border-[#29487D] rounded-xl flex flex-col gap-2 w-full p-4 text-xs font-montserrat'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-1'>
                            <div className="avatar">
                                <div className="w-6 rounded-full">
                                    <img src={comentUser.url} />
                                </div>
                            </div>
                            <p className='font-bold text-[#29487D]'>{comentUser.name}</p>
                        </div>
                        <div>{comment.rating} Estrellas</div>
                    </div>
                    <p className='text-justify'>{comment.comment}</p>
                </div>
  )
}

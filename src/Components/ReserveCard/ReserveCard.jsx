import React, { useEffect, useState } from 'react'
import { useTours } from '../../hooks/useTours'
import { useGlobalContext } from '../../contexts/GlobalContext'
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';
import { UpdateTour } from '../../firebase/info';
import { PROFILE_URL } from '../../constants/url';
import {updateDoc } from "firebase/firestore";

export function ReserveCard({reserva}) {
  const {tour, getOneTour, isLoading}=useTours();
  const {firebaseToursData, firebaseArtsData}=useGlobalContext()
  const [rating, setRating]=useState(5);
  const [comentario, setComentario]=useState("");
  const { user, isLoadingUser } = useUserContext(); 
  const navigate = useNavigate();
  const newErrors = {};
  const [errors, setErrors] = useState({})

  useEffect(()=>{
    getOneTour(reserva.id_tour,firebaseToursData.data_tour)

  },[firebaseToursData])

  useEffect(()=>{

  },[rating, comentario])

   const handleChange= (e)=>{
    setRating(e.target.value)
  } 

  const handleChangeText=(e) => (
    setComentario(e.target.value)
  )
 

  const modalId = `my_modal_${reserva.id_tour}`;

  const handleEnviar= async (event) => {
    event.preventDefault();
    let comment=tour.feedbacks;
    
    if (comentario == "") {
      newErrors.commented = "No puede dejar este campo vacio";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    comment.push({
      user: user.id,
      comment: comentario,
      rating: rating,
    });

    const datos = {
      description: tour.description,
      disponible: tour.disponible,
      duration: tour.duration,
      feedbacks:comment,
      id:tour.id,
      generated_id : tour.generated_id,
      important_places: tour.important_places,
      name: tour.name,
      obras: tour.obras,
      reviews: tour.reviews,
      url: tour.url,
  }
    const aaa= UpdateTour(datos, tour.generated_id)


    aaa.then(() => {
      navigate(PROFILE_URL);
      window.location.reload();
    }).catch((error) => {
      console.log(error);
    });
  }



  
  return (
    <>
<div className='block ml-3'>
<Link to={`/tours/${tour.id}`}>
        <h1 className="flex lg: flex-col items-center bg-white border border-gray-200 rounded-lg shadow mt-6 lg:max-w-md md:flex-row md: max-w-xl h-5/6 hover:bg-gray-100 ">
            <img className="object-cover h-36 w-full md:h-full lg:w-2/5 md:w-2/5 rounded-t-lg lg:h-full md:rounded-none md:rounded-l-lg" src={tour.url} alt=""/>
            <div className="w-3/4 flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 font-raleway">{tour.name}</h5>
                <p className="mb-1 font-normal text-gray-700 font-montserrat">Fecha: {reserva.fecha} </p>
                <p className="mb-3 font-normal text-gray-700  font-montserrat">Hora: {reserva.horario} </p>
                
                
            </div>
        </h1>
</Link>

        
        

{user.modalId}
        <div className="dropdown dropdown-right">
  <label tabIndex={0} className="btn btn-circle btn-ghost">
    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
</label>
  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
    <li><a href={`#${modalId}`}>Opinar</a></li>
  </ul>
</div>
            

        <div className="modal" id={modalId}>
        <div className="modal-box">
            <h3 className="font-bold text-lg font-raleway mb-5">Rating</h3>
                    <div className="rating">
                        <input type="radio"  name="rating" className="mask mask-star-2 bg-orange-400" value={1} onChange={handleChange}/>
                        <input type="radio"  name="rating" className="mask mask-star-2 bg-orange-400" value={2} onChange={handleChange}/>
                        <input type="radio"  name="rating" className="mask mask-star-2 bg-orange-400" value={3} onChange={handleChange}/>
                        <input type="radio"  name="rating" className="mask mask-star-2 bg-orange-400" value={4} onChange={handleChange}/>
                        <input type="radio"  name="rating" className="mask mask-star-2 bg-orange-400" value={5} onChange={handleChange}/>
                        
                    </div>
                    <div className="form-control w-full ">
                    <label className="label mt-5">
                        <span className="label-text font-montserrat">Comentario</span>
                    </label>
                    
                    <textarea placeholder="Escribe aquí" name="commented" className="textarea textarea-bordered w-full " onChange={handleChangeText}/>
                    
                    </div>
                    {errors.commented && (<p className="text-red-500 text-xs mt-1">{errors.commented}</p>)}

            <div className="modal-action">
            <a href="#" className="btn normal-case" onClick={handleEnviar}>Enviar</a>
            </div>
        </div>
        </div>
        </div>
      </>
  )}





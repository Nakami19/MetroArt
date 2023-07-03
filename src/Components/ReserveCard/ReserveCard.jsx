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
  const [fecha, setFecha]=useState();
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
  function generarIdTicket() {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numeros = '0123456789';
    let id = '';
  
    // Agregar una letra aleatoria en una posición aleatoria
    const posicionLetra = Math.floor(Math.random() * 9);
    const letraAleatoria = letras.charAt(Math.floor(Math.random() * letras.length));
    id += id.length === posicionLetra ? letraAleatoria : numeros.charAt(Math.floor(Math.random() * numeros.length));
  
    // Agregar un número aleatorio en una posición aleatoria diferente a la anterior
    let posicionNumero = Math.floor(Math.random() * 5);
    while (posicionNumero === posicionLetra) {
      posicionNumero = Math.floor(Math.random() * 5);
    }
    const numeroAleatorio = numeros.charAt(Math.floor(Math.random() * numeros.length));
    id += id.length === posicionNumero ? numeroAleatorio : letras.charAt(Math.floor(Math.random() * letras.length));
  
    // Agregar caracteres alfanuméricos aleatorios en las posiciones restantes
    for (let i = 0; i < 5; i++) {
      if (i !== posicionLetra && i !== posicionNumero) {
        const caracterAleatorio = Math.random() < 0.5 ? letras.charAt(Math.floor(Math.random() * letras.length)) : numeros.charAt(Math.floor(Math.random() * numeros.length));
        id += caracterAleatorio;
      }
    }
  
    return id;
  }

  const handleEnviar=(e)=>{
    e.preventDefault();
    let comment=tour.feedbacks;
    if (comentario == "") {
      newErrors.commented = "No puede dejar este campo vacio";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const id=generarIdTicket();
    comment.push({
      user: user.id,
      comment: comentario,
      rating: rating,
      id: id,
    });

    const data = {
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
    const aaa= UpdateTour(data, tour.generated_id)
    aaa.then(() => {
      navigate(PROFILE_URL);
      window.location.reload();
    }).catch((error) => {
      console.log(error);
    });
  }


  const modalId = `my_modal_${reserva.id}`;
  
useEffect(() => {
  const reserve = user.reservas.find((reservass) => (reservass.id_tour === tour.generated_id) && (reservass.id=== reserva.id) );
  if (reserve) {
    setFecha(reserve.fecha);
  }
}, [user.reservas, tour.generated_id, reserva]);

useEffect(() => {
    let f = new Date()
    let fechaActual="0"+(f.getMonth()+1)+"/"+"0"+f.getDate() + "/" +f.getFullYear()
    //  console.log( (f.getMonth()+1)+"/"+f.getDate() + "/" +f.getFullYear() + " < fecha actual")
    //   console.log(fecha + " <fecha de tour")
    // console.log(Date.parse(fecha) + " aaaaaa "+ Date.parse(fechaActual))
  //   if(Date.parse(fecha) > Date.parse(fechaActual)) {

  //     console.log(fecha + " es mayor")
  //  }
  // console.log(Date.parse(fecha) + " "+  Date.parse(fechaActual))
  // console.log(Date.parse(fecha)== Date.parse(fechaActual))

}, [fecha]);
let f = new Date()
let fechaActual=(f.getMonth()+1)+"/"+f.getDate() + "/" +f.getFullYear()
let modal=<>
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
                    <textarea placeholder="Escribe aquí" className="textarea textarea-bordered w-full " name="commented" onChange={handleChangeText}/>
                    
                    </div>
                    {errors.commented && (<p className="text-red-500 text-xs mt-1">{errors.commented}</p>)}
            <div className="modal-action">
            <a href="#" className="btn normal-case" onClick={handleEnviar}>Enviar</a>
            </div>
</div>
</>

if(Date.parse(fecha) > Date.parse(fechaActual) || Date.parse(fecha)== Date.parse(fechaActual) ) {
  modal= <>
  <div className="modal-box">
                    <div className="form-control w-full ">
                    <label className="label mt-5">
                        <h1 className="font-bold text-lg font-raleway mb-5">Te invitamos a comentar una vez hayas realizado el tour</h1>
                    </label>
                    </div>
            <div className="modal-action">
            <a href="#" className="btn normal-case">Ok</a>
            </div>
</div>
  </>
}

  return (
    <>
<div className='block ml-3'>

        <h1 className="flex lg: flex-col items-center bg-white border border-gray-200 rounded-lg shadow mt-6 lg:max-w-md md:flex-row md: max-w-xl h-5/6 hover:bg-gray-100 ">
          
            <img className="object-cover h-36 w-full md:h-full lg:w-2/5 md:w-2/5 rounded-t-lg lg:h-full md:rounded-none md:rounded-l-lg" src={tour.url} alt=""/>
            <div className="w-3/4 flex flex-col justify-between p-4 leading-normal">
              <Link to={`/tours/${tour.id}`}>  
                <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white font-raleway">{tour.name}</h5>
                <p className="mb-1 font-normal text-gray-700 dark:text-gray-400 font-montserrat">Fecha: {reserva.fecha} </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 font-montserrat">Hora: {reserva.horario} </p> 
               </Link> 
                <button className='btn btn-xs normal-case font-montserrat bg-[#C15100] hover:bg-[#703308] text-white'>Cancelar Reserva</button>
                

            </div>
            
        </h1>


        
        


        <div className="dropdown dropdown-right">
  <label tabIndex={0} className="btn btn-circle btn-ghost">
    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
</label>
  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
    <li><a href={`#${modalId}`}>Opinar</a></li>
  </ul>
</div>
            


        <div className="modal" id={modalId}>
        {modal}
        </div>
        </div>
      </>
  )}





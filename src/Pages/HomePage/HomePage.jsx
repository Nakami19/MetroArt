import React, { useEffect } from 'react'
import {AiOutlineLineChart, AiOutlineEye} from 'react-icons/ai'
import { db } from '../../firebase/config';
import { collection } from 'firebase/firestore';
import { doc, setDoc, addDoc, updateDoc, getDoc, getDocs } from "firebase/firestore";
import DefaultCarousel from '../../Components/DefaultCarousel/DefaultCarousel';



export function HomePage() {

  const scroll=() => {
    const element=document.getElementById('info-section');
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  function removeEvent(event) {
    event.preventDefault()
  }

  return (
    <>

    {/*Hero*/}
    <div className="hero min-h-screen bg-[url('https://www.unimet.edu.ve/wp-content/uploads/2020/10/Campus-galer%C3%ADa-52.jpg')]">
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-white">
        <div className="max-w-md">
          <h1 className="mb-5 text-4xl font-bold font-raleway">Un vistazo a las obras de arte de la Universidad Metropolitana</h1>
          <p className="mb-5  text-lg font-baskervville">¡Descubre todos los tours que tenemos para ofrecerte!</p>
          <button className="btn btn-wide btn-primary font-montserrat text-[#dd8d58] normal-case text-base" onClick={scroll}>Ver más</button>
        </div>
      </div>
    </div>

    {/*Content*/}
    <section className='text-center lg:min-h-fit lg:flex lg:p-12' id='info-section'>
    <div className='rounded-lg bg-[url(https://www.unimet.edu.ve/unimetsite/wp-content/uploads/2014/05/IMG_0389.jpg)] bg-cover w-9/12'>
    </div>
      <div className='p-10 lg:w-full'>
        <h1 className='mb-5 text-3xl font-bold font-raleway text-[#C14C00]'>Conoce, aprende, comenta</h1>
        <p className='mb-5  text-sm font-montserrat text-justify'>Las obras de arte nos ayudan a expresar nuestras emociones creando piezas que pueden resultar simbólicas y atractivas para otras personas, dándoles un significado único. Es por ello que el Departamento de Cultura te invita a visitar las obras alojadas en la Universidad. ¡Anímate a aprender sobre las obras y sus historias reservando un tour!</p>
        <div className='md:flex font-montserrat text-xs p-3 gap-3 items-center w-full '>
          <div className='p-5 flex flex-col gap-2 transition ease-in-out delay-150 justify-center items-center rounded-lg hover:bg-[#C14C00]/10 hover:scale-105'>
            <AiOutlineLineChart size={70} color='#C14C00'/>
            <h1 className='font-bold'>Misión</h1>
            <p className='text-justify'>Nuestra aplicación web tiene como misión promover la cultura en la comunidad de la Universidad Metropolitana, mediante la gestión de tours y reservas para visitar las obras de arte existentes en nuestro campus. Buscamos fomentar el conocimiento y la apreciación del arte y la historia en nuestra comunidad académica y en el público en general</p>
          </div>
          <div className='p-5 flex flex-col gap-2 items-center transition ease-in-out delay-150 rounded-lg hover:bg-[#C14C00]/10 hover:scale-105'>
            <AiOutlineEye size={70} color='#C14C00'/>
            <h1 className='font-bold'>Visión</h1>
            <p className='text-justify'>Nos proyectamos como la aplicación web líder en la gestión de tours y reservas para visitar las obras de arte en la Universidad Metropolitana. Queremos ser reconocidos por nuestra eficiencia, innovación y calidad en la gestión de los servicios culturales que ofrecemos. Aspiramos a ser una plataforma indispensable para la promoción de la cultura y el patrimonio artístico de nuestra institución y de la sociedad en general.</p>
          </div>
      </div>
      </div>
    </section>

    {/*Cards*/}
    <section className='bg-[#4E598C] p-10 flex flex-col gap-10'>
    <div className='flex justify-center items-center gap-40'>
      <h1 className='font-raleway font-bold text-center text-2xl text-white'>Aquí encontrarás</h1>
    </div>
    <div className='flex flex-col gap-y-10 md:flex-row md:justify-evenly lg:gap-x-10 gap-x-5'>
      <div className=" card lg:transition lg:hover:scale-105 lg:ease-in-out lg:delay-150 lg:w-96 h-96 shadow-xl bg-[#C2C9E7]">
        <figure><img src="https://images.pexels.com/photos/2859169/pexels-photo-2859169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="tour" /></figure>
        <div className="card-body text-center text-sm">
          <h2 className='font-bold font-raleway text-2xl text-accent'>Tours</h2>
          <p className=' font-montserrat text-justify  md:text-center'>Reserva tus tours desde la comodidad de tu casa para no perderte de ninguna obra de arte.</p>
        </div>
      </div>

      <div className="card lg:transition lg:hover:scale-105 lg:ease-in-out lg:delay-150 lg:w-96 md:h-96 shadow-xl bg-[#C2C9E7]">
        <figure><img src="https://images.pexels.com/photos/1604991/pexels-photo-1604991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="ObraArte" /></figure>
        <div className="card-body text-center text-sm">
          <h2 className='font-bold font-raleway text-2xl text-accent'>Obras de arte</h2>
          <p className=' font-montserrat text-justify md:text-center'>Diviértete conociendo las historias que quiere transmitir cada pieza.</p>
        </div>
      </div>

      <div className="card lg:transition lg:hover:scale-105 lg:ease-in-out lg:delay-150 lg:w-96 h-96 shadow-xl bg-[#C2C9E7]">
        <figure><img src="https://images.pexels.com/photos/5622557/pexels-photo-5622557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="tour" /></figure>
        <div className="card-body text-sm text-center">
          <h2 className='font-bold font-raleway text-2xl text-accent'>Feedback</h2>
          <p className=' font-montserrat text-justify md:text-center'>Comparte tu experiencia con los otros usuarios y conoce las suyas.</p>
        </div>
      </div>
    </div>
    </section>

    </>
  )
}

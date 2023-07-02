import React, { useEffect } from 'react'
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

//   const getDocuments= async ()=>{
//     const mmm= collection(db, "obras")
//     const lol = await getDocs(mmm);
//     lol.forEach((doc) => {
//       // doc.data() nunca es undefined en este caso
//       console.log(doc.id, " siiiiuu => ", doc.data().autor);
//     });
//   }

//   useEffect(()=>{
// getDocuments()
//   },[])
  

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
    <section className='text-center h-screen lg:flex lg:p-12' id='info-section'>
      <DefaultCarousel/>
      <div className='p-10'>
        <h1 className='mb-5 text-3xl font-bold font-raleway text-[#C14C00]'>Conoce, aprende, comenta</h1>
        <p className='mb-5  text-sm font-baskervville text-justify'>Las obras de arte nos ayudan a expresar nuestras emociones creando piezas que pueden resultar simbólicas y atractivas para otras personas, dándoles un significado único. Es por ello que el Departamento de Cultura te invita a visitar las obras alojadas en la Universidad. ¡Anímate a aprender sobre las obras y sus historias reservando un tour!</p>
      </div>
    </section>

    {/*Cards*/}

    <section className='bg-[#4E598C] p-10 flex flex-col gap-y-10 lg:flex-row lg:justify-evenly lg:gap-x-10'>
      <div className=" card w-50 shadow-xl bg-[#C2C9E7]">
        <figure><img src="https://images.pexels.com/photos/2859169/pexels-photo-2859169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="tour" /></figure>
        <div className="card-body text-center">
          <h2 className='font-bold font-raleway text-2xl text-accent'>Tours</h2>
          <p className=' font-montserrat text-justify md:text-center'>Reserva tus tours desde la comodidad de tu casa para no perderte de ninguna obra de arte</p>
        </div>
      </div>

      <div className="card w-50 shadow-xl bg-[#C2C9E7]">
        <figure><img src="https://images.pexels.com/photos/1604991/pexels-photo-1604991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="ObraArte" /></figure>
        <div className="card-body text-center">
          <h2 className='font-bold font-raleway text-2xl text-accent'>Obras de arte</h2>
          <p className=' font-montserrat text-justify md:text-center'>Diviértete conociendo las historias que quiere transmitir cada pieza</p>
        </div>
      </div>

      <div className="card w-50 shadow-xl bg-[#C2C9E7]">
        <figure><img src="https://images.pexels.com/photos/5622557/pexels-photo-5622557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="tour" /></figure>
        <div className="card-body text-center">
          <h2 className='font-bold font-raleway text-2xl text-accent'>Feedback</h2>
          <p className=' font-montserrat text-justify md:text-center'>Comparte tu experiencia con los otros usuarios y conoce las suyas.</p>
        </div>
      </div>
    </section>

    </>
  )
}

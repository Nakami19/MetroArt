import React from 'react'
import { Calendar } from '../../Components/Calendar/Calendar'
import { useState } from "react";

export function ReservationPage() {

    const openPopup = () => {
        const width = 600;
        const height = 400;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;
        const popupUrl = 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=FJ48PVKAP2RMJ';
        const popupName = '_blank';
        const popupFeatures = `width=${width},height=${height},left=${left},top=${top}`;
      
        window.open(popupUrl, popupName, popupFeatures);
      }
  return (
    <div className='p-6 flex flex-col gap-4 lg:gap-6'>
        <h1 className='font-bold font-raleway text-[#C14C00] text-xl text-center'>¡Completa tu reserva!</h1>
        <div className='flex flex-col gap-3 lg:flex-row lg:justify-center lg:gap-7'>
            <div className='flex flex-col gap-2'>
                <h2 className='font-bold text-center font-montserrat'>Nombre del tour</h2>
                <img className='h-96'src="https://firebasestorage.googleapis.com/v0/b/metro-art-collection.appspot.com/o/perfil-imagenes%2Fperfil_generico.jpg?alt=media&token=f9f29c3c-7df8-479a-bb3b-3f0e02c6f83b"/>
            </div>
            <form className='font-montserrat text-xs flex flex-col h-80 justify-evenly lg:h-96 lg:justify-center lg:gap-5'>
                <div>
                    <p className='font-bold'>Selecciona el día de la reserva</p>
                    <Calendar/>
                </div>
                <div className='flex flex-col gap-2'>
                    <p className='font-bold'>Selecciona un horario</p>
                    <select className='p-4 border'>
                        <option disabled selected>Pulsa aquí para ver las horas</option>
                        <option>2</option>
                        <option>4</option>
                        <option>3</option>
                    </select>
                </div>
                <div className='flex items-center justify-evenly'>
                    <button className='btn normal-case font-montserrat text-xs text-[#4E598C] btn-outline hover:bg-[#4E598C]'>Cancelar</button>
                    <button className='btn normal-case font-montserrat text-white text-xs bg-[#4E598C] hover:bg-[#1c285f]'>Confirmar reserva</button>
                </div>
            </form>
        </div>
        <div className='flex flex-col items-center gap-3'>
            <h1 className='text-center font-raleway font-bold text-xl text-[#4E598C]'>¡Ayúdanos y dona con PayPal!</h1>
            <button className='btn w-fit bg-[#C9D1F7]'><img className='h-5' onClick={openPopup} src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png"/></button>
        </div>
    </div>
    
  )
}

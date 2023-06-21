import React from 'react'

export function Footer() {
  return (
    <footer className="footer p-10 bg-[#cf6a2b] text-neutral-content">
        <div>
            <span className="footer-title normal-case font-montserrat opacity-100">Atencion al cliente</span> 
            <a className="link link-hover">reservasMAC@gmail.com</a>
        </div> 
        <div>
            <span className="footer-title normal-case font-montserrat opacity-100">Información de los administradores</span> 
            <a className="link link-hover">cultura@unimet.edu.ve</a>
        </div> 
        <div>
            <span className="footer-title normal-case font-montserrat opacity-100">Dirección</span> 
            <a className="link link-hover">Av. Boyacá con autopista Petare-Guarenas.Urbanización Terrazas del Ávila, Caracas-Miranda. Zona postal 1073</a>
        </div>
    </footer>
  )
}

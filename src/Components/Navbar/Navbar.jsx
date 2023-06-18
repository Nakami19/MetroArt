import React from 'react'

export default function Navbar() {
  return (
    <div className="navbar bg-[#4E598C]">
        <div className="navbar-start">
            <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm font-montserrat dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Inicio</a></li>
                <li><a>Tours</a></li>
                <li><a>Perfil</a></li>
                <li><a>Opiniones</a></li>
            </ul>
            </div>
            <img src="./src/assets/blanquito (1).png" className='h-12'/>
            <a className="btn btn-ghost font-montserrat normal-case text-xl text-white invisible md:visible"> 
            Metro Art Collection</a>
        </div>
        <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-white font-montserrat">
            <li><a>Inicio</a></li>
                <li><a>Tours</a></li>
                <li><a>Perfil</a></li>
                <li><a>Opiniones</a></li>
            </ul>
        </div>
        <div className="navbar-end gap-x-2">
            <a className="btn btn-sm bg-[#FF8C42] normal-case font-montserrat text-white">Registrarse</a>
            <a className="btn btn-sm bg-[#FF8C42] normal-case font-montserrat text-white">Iniciar sesión</a>
        </div>
        </div>
  )
}

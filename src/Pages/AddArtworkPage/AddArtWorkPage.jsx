import React, {useState} from 'react'


export function AddArtworkPage() {

    const [titulo, setTitulo] = useState("...");

    const handleOnChange = (event) => {
        setTitulo(event.target.value);
    };

  return (
    <div className='py-10 lg:px-52 flex flex-col items-center gap-y-7 md:flex-row'>
        <div className='flex flex-col gap-5 md:w-full lg:w-1/3'>
            <h1 className=' font-raleway font-bold text-2xl text-center text-[#001A72]'>
                {titulo}
            </h1>
            
            

            <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full lg:h-[70vh] md: h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG or JPG (MAX. 800x400px)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                </label>
            </div> 


        </div>
        <div className='font-montserrat grid gap-3 p-1 w-2/3 md:p-7'>
            <h2 className="font-bold text-center md:text-start">Información de la obra</h2>
            <div className='bg-black w-full h-0.5 '></div>
            <div className='flex gap-x-1 h-fit text-justify'>
                <p className='font-bold text-sm'>Nombre:</p>
                <input type="text" placeholder="Ej. En la mira del verdugo" className="input input-bordered input-sm w-full max-w-xs" onChange={handleOnChange}/>
            </div>
            <div className='flex gap-x-1 h-fit text-justify'>
                <p className='font-bold text-sm'>Ubicación: </p>
                <input type="text" placeholder="Ej. Biblioteca Pedro Grasses" className="input input-bordered input-sm w-full max-w-xs" />
            </div>
            <div className='flex gap-x-1 h-fit text-justify'>
                <p className='font-bold text-sm'>Tipo: </p>
                <input type="text" placeholder="Ej. Pintura al óleo" className="input input-bordered input-sm w-full max-w-xs" />
            </div>
            <div className='flex gap-x-1 h-fit text-justify'>
                <p className='font-bold text-sm'>Autor: </p>
                <input type="text" placeholder="Ej. Luis Dominguez Salazar" className="input input-bordered input-sm w-full max-w-xs" />
            </div>
            <div className='h-fit text-justify'>
                <p className='font-bold text-sm'>Descripción </p>
                <textarea className="textarea textarea-bordered h-44 w-full" placeholder="Ej. Pintura de Luis Dominguez Salazar quien se caracterizaba por su estilo inclinado al dominio del claroscuro..."></textarea>
            </div>
            <div className='flex gap-3 lg:ms-auto md: justify-around'>
                <button className="btn md:btn-sm lg:btn-md normal-case">Agregar</button>
                <button className="btn btn-error md:btn-sm lg:btn-md normal-case">Cancelar</button>
            </div>
        </div>
    </div>
  )
}
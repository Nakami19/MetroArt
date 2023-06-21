import React from 'react'

export function ProfilePage() {
  return (
    <div>
    <div className="md: h-36 lg:h-48 w-full p-4 bg-[url('https://www.unimet.edu.ve/wp-content/uploads/2019/11/bannerdade-1200x630.jpg')]  justify-center rounded-3xl bg-clip-border mx-auto  bg-no-repeat bg-cover border-8 border-white">
        <div className="avatar">
            <div className="lg:w-36 md: w-24 lg:mt-20 md: mt-16 lg:ml-12 md: ml-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2   transition duration-200 transform hover:scale-110">
                <img src="https://user-images.githubusercontent.com/11250/39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e.jpg" />
            </div>
        </div>
    </div>
        <input type="file" className="file-input-xs file-input-ghost w-1/4 max-w-xs mt-16 ml-6" />



        
   </div>
    
  )
}


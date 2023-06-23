import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { Footer } from '../Footer/Footer'
import { UserContextProvider } from '../../contexts/UserContext'

export default function Layout() {
  return (
    <main>
      <UserContextProvider>
        <Navbar/>

        <section className="body">
            <Outlet/>
        </section>

        <Footer/>
      </UserContextProvider>
    </main>
  )
}

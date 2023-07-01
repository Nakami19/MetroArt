import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { Footer } from '../Footer/Footer'
import { UserContextProvider } from '../../contexts/UserContext'
import { GlobalProvider } from '../../contexts/GlobalContext'

export default function Layout() {
  return (
    <main>
      <UserContextProvider>
        <GlobalProvider>
        <Navbar/>

        <section className="body">
            <Outlet/>
        </section>

        <Footer/>
      </GlobalProvider>
      </UserContextProvider>
    </main>
  )
}

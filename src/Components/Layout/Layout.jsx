import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { Footer } from '../Footer/Footer'

export default function Layout() {
  return (
    <main>
        <Navbar/>

        <section className="body">
            <Outlet/>
        </section>

        <Footer/>
    </main>
  )
}

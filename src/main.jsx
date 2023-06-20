import React from 'react'
import ReactDOM from 'react-dom/client'
import { HomePage } from './Pages/HomePage/HomePage'
import { SignupPage } from './Pages/SignupPage/SignupPage'
import { LoginPage } from './Pages/LoginPage/LoginPage'
import { ProfilePage } from './Pages/ProfilePage/ProfilePage'
import './index.css'
import {Routes, Route, BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
    <BrowserRouter> {/*es como una pila de url*/}
    <Routes>{/*desde aqui se empiezan a declarar las diferentes rutas de la pagina*/}
      <Route path="/" element={<HomePage/>}  />  {/*cada route es una ruta de la pagina*/}
      <Route path="/signup" element={<SignupPage/>}  /> 
      <Route path="/login" element={<LoginPage/>}  /> 
      <Route path="/profile" element={<ProfilePage/>}  /> 
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,

)

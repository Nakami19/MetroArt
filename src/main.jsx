import React from 'react'
import ReactDOM from 'react-dom/client'
import { HomePage } from './Pages/HomePage/HomePage'
import './index.css'
import {Routes, Route, BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
    <BrowserRouter> {/*es como una pila de url*/}
    <Routes>{/*desde aqui se empiezan a declarar las diferentes rutas de la pagina*/}
      <Route path="/" element={<HomePage/>}  />  {/*cada route es una ruta de la pagina*/}
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,

)

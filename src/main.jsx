import React from 'react'
import ReactDOM from 'react-dom/client'
import { HomePage } from './Pages/HomePage/HomePage'
import './index.css'
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Layout from './Components/Layout/Layout';
import { HOME_URL } from './constants/url';
import { ToursPage } from './Pages/ToursPage/ToursPage';
import { ArtDetailsPage } from './Pages/ArtDetailsPage/ArtDetailsPage';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
    <BrowserRouter> {/*es como una pila de url*/}
    <Routes>{/*desde aqui se empiezan a declarar las diferentes rutas de la pagina*/}
      <Route element={<Layout/>}>
        <Route path={HOME_URL} element={<HomePage/>}/>  {/*cada route es una ruta de la pagina*/}
      </Route>
    <Route element={<Layout/>}>
        <Route path="/" element={<HomePage/>}/>  {/*cada route es una ruta de la pagina*/}
        <Route path='/tours' element={<ToursPage/>}/>
        <Route path='/artdetails' element={<ArtDetailsPage/>}/>
    </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,

)

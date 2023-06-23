import React from 'react'
import ReactDOM from 'react-dom/client'
import { HomePage } from './Pages/HomePage/HomePage'
import './index.css'
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Layout from './Components/Layout/Layout';
import { ARTDETAIL_URL, HOME_URL, TOURDETAILS_URL, RESERVATION_URL, LOGIN_URL, PROFILE_URL, REGISTER_URL, TOURS_URL, COMPLETE_URL, ADDARTWORK_URL } from './constants/url';
import { ToursPage } from './Pages/ToursPage/ToursPage';
import { ArtDetailsPage } from './Pages/ArtDetailsPage/ArtDetailsPage';
import { SignupPage } from './Pages/SignupPage/SignupPage'
import { LoginPage } from './Pages/LoginPage/LoginPage'
import { CompletePage } from './Pages/CompletePage/CompletePage'
import { ProfilePage } from './Pages/ProfilePage/ProfilePage'
import { TourDetailsPage } from './Pages/TourDetailsPage/TourDetailsPage';
import { ReservationPage } from './Pages/ReservationPage/ReservationPage';
import { PrivateRoute } from './Components/PrivateRoute/PrivateRoute';
import { PublicRoute } from './Components/PublicRoute/PublicRoute';
import { AddArtworkPage } from './Pages/AddArtworkPage/AddArtWorkPage';
import { EditArtworkPage } from './Pages/EditArtworkPage/EditArtWorkPage';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
    <BrowserRouter> 
    <Routes>
    <Route element={<Layout/>}>
        <Route path={HOME_URL} element={<HomePage/>}/> 
        <Route path={TOURS_URL} element={<ToursPage/>}/>
        <Route path={'/obras/:artId'} element={<ArtDetailsPage/>}/>
        <Route path={'/tours/:tourId'} element={<TourDetailsPage/>}/>
        <Route path={LOGIN_URL} element={<LoginPage/>}/>
        <Route path={REGISTER_URL} element={<SignupPage/>}/>
        <Route path={COMPLETE_URL} element={<CompletePage/>}/>
        <Route path={PROFILE_URL} element={<ProfilePage/>}/>
        <Route path={RESERVATION_URL} element={<ReservationPage/>}/>
        <Route path={ADDARTWORK_URL} element={<AddArtworkPage/>}/>
        <Route path={'/editartwork/:artId'} element={<EditArtworkPage/>}/>
        <Route path='*' element={<h1 className='my-80 text-3xl'>NOT FOUND!</h1>}></Route>
    </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,

)

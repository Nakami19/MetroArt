import React from 'react'
import ReactDOM from 'react-dom/client'
import { HomePage } from './Pages/HomePage/HomePage'
import './index.css'
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Layout from './Components/Layout/Layout';
import { ARTDETAIL_URL, HOME_URL, TOURDETAILS_URL, RESERVATION_URL, LOGIN_URL, PROFILE_URL, REGISTER_URL, TOURS_URL, COMPLETE_URL } from './constants/url';
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

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
    <BrowserRouter> 
    <Routes>
    <Route element={<Layout/>}>
        <Route path={HOME_URL} element={<HomePage/>}/> 
        <Route path={TOURS_URL} element={<ToursPage/>}/>
        <Route path={'/obras/:artId'} element={<PrivateRoute><ArtDetailsPage/></PrivateRoute>}/>
        <Route path={'/tours/:tourId'} element={<PrivateRoute><TourDetailsPage/></PrivateRoute>}/>
        <Route path={LOGIN_URL} element={<PublicRoute><LoginPage/></PublicRoute>}/>
        <Route path={REGISTER_URL} element={<PublicRoute><SignupPage/></PublicRoute>}/>
        <Route path={COMPLETE_URL} element={<PublicRoute><CompletePage/></PublicRoute>}/>
        <Route path={PROFILE_URL} element={<PrivateRoute><ProfilePage/></PrivateRoute>}/>
        <Route path={RESERVATION_URL} element={<PrivateRoute><ReservationPage/></PrivateRoute>}/>
    </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,

)

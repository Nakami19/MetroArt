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
import { PrivateRouteAdmin } from './Components/PrivateRouteAdmin/PrivateRouteAdmin';
import { PublicRoute } from './Components/PublicRoute/PublicRoute';
import { SemiPrivateRoute } from './Components/SemiPrivateRoute/SemiPrivateRoute';
import { PrivateRouteVisitante } from './Components/PrivateRouteVisitante copy/PrivateRouteVisitante';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
    <BrowserRouter> 
    <Routes>
    <Route element={<Layout/>}>
        <Route path={HOME_URL} element={<SemiPrivateRoute><HomePage/></SemiPrivateRoute>}/> 
        <Route path={TOURS_URL} element={<SemiPrivateRoute><ToursPage/></SemiPrivateRoute>}/>
        <Route path={'/obras/:artId'} element={<SemiPrivateRoute><ArtDetailsPage/></SemiPrivateRoute>}/>
        <Route path={'/tours/:tourId'} element={<SemiPrivateRoute><TourDetailsPage/></SemiPrivateRoute>}/>
        <Route path={LOGIN_URL} element={<PublicRoute><LoginPage/></PublicRoute>}/>
        <Route path={REGISTER_URL} element={<PublicRoute><SignupPage/></PublicRoute>}/>
        <Route path={COMPLETE_URL} element={<SemiPrivateRoute><CompletePage/></SemiPrivateRoute>}/>
        <Route path={PROFILE_URL} element={<SemiPrivateRoute><ProfilePage/></SemiPrivateRoute>}/>
        <Route path={RESERVATION_URL} element={<SemiPrivateRoute><ReservationPage/></SemiPrivateRoute>}/>
    </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,

)

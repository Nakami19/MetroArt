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
import { PrivateRouteAdmin } from './Components/PrivateRouteAdmin/PrivateRouteAdmin';
import { PublicRoute } from './Components/PublicRoute/PublicRoute';
import { SemiPrivateRoute } from './Components/SemiPrivateRoute/SemiPrivateRoute';
import { PrivateRouteVisitante } from './Components/PrivateRouteVisitante copy/PrivateRouteVisitante';
import { AddArtworkPage } from './Pages/AddArtworkPage/AddArtWorkPage';
import { EditArtworkPage } from './Pages/EditArtworkPage/EditArtWorkPage';
import { EditTourPage } from './Pages/EditTourPage/EditTourPage';
import { SemiPublicRoute } from './Components/SemiPublicRoute/SemiPublicRoute';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
    <BrowserRouter> 
    <Routes>
    <Route element={<Layout/>}>
        <Route path={HOME_URL} element={<SemiPublicRoute><HomePage/></SemiPublicRoute>}/> 
        <Route path={TOURS_URL} element={<SemiPublicRoute><ToursPage/></SemiPublicRoute>}/>
        <Route path={'/obras/:artId'} element={<ArtDetailsPage/>}/>
        <Route path={'/tours/:tourId'} element={<TourDetailsPage/>}/>
        <Route path={'/toursedit/:tourId'} element={<EditTourPage/>}/>
        <Route path={LOGIN_URL} element={<PublicRoute><LoginPage/></PublicRoute>}/>
        <Route path={REGISTER_URL} element={<PublicRoute><SignupPage/></PublicRoute>}/>
        <Route path={COMPLETE_URL} element={<SemiPrivateRoute><CompletePage/></SemiPrivateRoute>}/>
        <Route path={PROFILE_URL} element={<SemiPrivateRoute><ProfilePage/></SemiPrivateRoute>}/>
        <Route path={RESERVATION_URL} element={<SemiPrivateRoute><ReservationPage/></SemiPrivateRoute>}/>
        <Route path={ADDARTWORK_URL} element={<SemiPrivateRoute><AddArtworkPage/></SemiPrivateRoute>}/>
        <Route path={'/editartwork/:artId'} element={<SemiPrivateRoute><EditArtworkPage/></SemiPrivateRoute>}/>
        <Route path='*' element={<h1 className='my-80 text-3xl'>NOT FOUND!</h1>}></Route>
    </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,

)

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Register from './components/auth/registration';
import ListingPatients from './components/listing_patients/listing';
import Auth from './components/auth/auth';
import HomePage from './components/home_page/home_page';
import Profil_Kine from './components/profil_page/profil_page';
import reportWebVitals from './reportWebVitals';
import {Route, BrowserRouter, Routes} from 'react-router-dom';

import {CookiesProvider} from 'react-cookie';

function Router(){

  return (
    <React.StrictMode>
      <CookiesProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<HomePage/>}/>
            <Route exact path="/login" element={<Auth/>}/>
            <Route exact path="/patients" element={<ListingPatients/>}/>
            <Route exact path="/espace_prive" element={<Profil_Kine/>}/>
            <Route exact path="/inscription" element={<Register/>}/>
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
    </React.StrictMode>
  )
}

ReactDOM.render(<Router/>, document.getElementById('root')
);

reportWebVitals();

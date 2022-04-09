import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Register from './components/auth/registration';
import ListingPatients from './components/listing_patients/listing';
import Auth from './components/auth/auth';
import HomePage from './components/home_page/home_page';
import Commentaire from './components/commentaires/commentaires';
import Profil_Kine from './components/profil_page/profil_page';
import Fiche_Sante from './components/fiche_sante/fiche_sante';
import PageError404 from './components/404Error/404_page_error';
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
            <Route exact path="/espace_prive/fiche_sante" element={<Fiche_Sante/>}/>
            <Route exact path="/inscription" element={<Register/>}/>
            <Route exact path="/commentaires" element={<Commentaire/>}/>
            <Route exact path="*" element={<PageError404/>}/>
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
    </React.StrictMode>
  )
}

ReactDOM.render(<Router/>, document.getElementById('root')
);

reportWebVitals();

import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Register from './components/auth/registration';
import ListingPatients from './components/listing_patients/listing';
import Auth from './components/auth/auth';
import HomePage from './components/home_page/home_page';
import Commentaire from './components/commentaires/commentaires';
import Profil_Kine from './components/profil_page/profil_page';
import Fiche_Sante from './components/fiche_sante/fiche_sante';
import AccueilRdv from './components/RendezVous/AccueilRdv';
import AncienRdv from './components/RendezVous/AncienRdv';
import FuturRdv from './components/RendezVous/FuturRdv';
import ProgrammerRdv from './components/RendezVous/ProgrammerRdv';
import MessageAccueil from './components/message/message_accueil';
import MessageAccueilCorrect from './components/message/message_accueil_correcte';
import PageError404 from './components/404Error/404_page_error';
import reportWebVitals from './reportWebVitals';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {useCookies} from 'react-cookie';
import {CookiesProvider} from 'react-cookie';
import {API} from './api-service';

function Router(){

  const [token, setToken, deleteToken] = useCookies([('mr-token')]);
  const [ficheId, setFicheId] = useState('');
  const [loading, setLoading] = useState(false);
  const [typeKine, setTypeKine] = useState('');
  const [username, setUsername] = useState('');

  useEffect(()=>{
    if(token['mr-token']){
      setLoading(true)
      API.gettingDataFromToken({'token': token['mr-token']})
        .then(function(resp){
            return resp.json()
        }).then(function(resp){
            setTypeKine(resp['type_kine'])
            setUsername(resp['username'])
            setFicheId(resp['fiche'])
        })
    setLoading(false)
    }
    }, [])

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
            <Route exact path="/rendez_vous" element={<AccueilRdv/>}/>
            {!token && !ficheId != ""? null : 
            <>
              <Route exact path="/rendez_vous/anciens" element={<AncienRdv fiche={ficheId != "" ? ficheId : null}/>}/>
              <Route exact path="/rendez_vous/futurs" element={<FuturRdv fiche={ficheId != "" ? ficheId : null}/>}/>
            </>
            }
            {!token && !ficheId? null : 
            <Route exact path="/rendez_vous/programmer" element={<ProgrammerRdv type_kine={typeKine} fiche={ficheId != "" ? ficheId : null}/>}/>
            }
            {username != '' && ficheId != "" ? 
            <>
              <Route exact path="/messagerie" element={<MessageAccueilCorrect fiche={ficheId} username={username}/>}/>
              <Route exact path="/messagerie/envoyer" element={<MessageAccueil fiche={ficheId} username={username}/>}/>
            </> : null
            }
            
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

import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Register from './components/auth/registration';
import ListingPatients from './components/listing_patients/listing';
import GestionRoutine from './components/listing_patients/gestionRoutine';
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
import Messagerie from './components/message/messageBoite';
import Routine from './components/fiche_sante/routine';
import ProgrammerIndisponilibites from './components/RendezVous/ProgrammerIndisponibilités';
import VoirIndispos from './components/RendezVous/VoirIndispo';
import PageError404 from './components/404Error/404_page_error';
import reportWebVitals from './reportWebVitals';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {useCookies} from 'react-cookie';
import {CookiesProvider} from 'react-cookie';
import {API} from './api-service';
import Footer from './components/footer/footer';

function Router(){

  const [token, setToken, deleteToken] = useCookies([('mr-token')]);
  const [userId, setUserId] = useState("");
  const [ficheId, setFicheId] = useState('');
  const [loading, setLoading] = useState(false);
  const [typeKine, setTypeKine] = useState('');
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [adresse, setAdresse] = useState('');
  const [descriptProb, setDescriptProb] = useState('');
  const [isAutorise, setIsAutorise] = useState('');

  useEffect(()=>{
    if(token['mr-token']){
      setLoading(true)
      API.gettingDataFromToken({'token': token['mr-token']})
        .then(function(resp){
            return resp.json()
        }).then(function(resp){
            setUserId(resp["id"])
            setTypeKine(resp['type_kine'])
            setUsername(resp['username'])
            if(resp["fiche"]){
              setFicheId(resp['fiche'])
            }
            setAge(resp['age'])
            setAdresse(resp['adresse'])
            setDescriptProb(resp['probleme'])
            setIsAutorise(resp['autorisation'])
        })
    setLoading(false)
    }
    }, [])

  return (
    <React.Fragment>
      <CookiesProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<HomePage/>}/>
            <Route exact path="/commentaires" element={<Commentaire username={username!=''?username:null}/>}/>
            <Route exact path="/login" element={<Auth/>}/>
            <Route exact path="/inscription" element={<Register/>}/>
            {username=="ArthurSchamroth" || username=="ThomasPenning" ? 
              <>
                <Route exact path="/patients" element={<ListingPatients/>}/> 
                <Route exact path="/gestion_routine" element={<GestionRoutine/>}/>
              </>: 
                <Route exact path='/routines' element={<Routine username={username != "" ? username : null} fiche={ficheId != "" ? ficheId : null}/>}/>
            }
            {!token || ficheId == "" ? null : 
            <>
              <Route exact path="/rendez_vous/anciens" element={<AncienRdv fiche={ficheId != "" ? ficheId : null} username={username != "" ? username : null}/>}/>
              <Route exact path="/rendez_vous/futurs" element={<FuturRdv fiche={ficheId != "" ? ficheId : null} username={username != "" ? username : null}/>}/>
              <Route exact path="/rendez_vous/indispos" element={<VoirIndispos fiche={ficheId != "" ? ficheId : null} username={username != "" ? username : null}/>}/>
            </>
            }
            {!token || ficheId == "" ? null : 
            <>
              <Route exact path="/rendez_vous/programmer" element={<ProgrammerRdv type_kine={typeKine} fiche={ficheId != "" ? ficheId : null}/>}/>
              <Route exact path="/rendez_vous/add_indisponibilites" element={<ProgrammerIndisponilibites type_kine={typeKine} fiche={ficheId != "" ? ficheId : null}/>}/>
              <Route exact path="/rendez_vous" element={<AccueilRdv/>}/>
              <Route exact path="/messagerie" element={<MessageAccueilCorrect fiche={ficheId} username={username}/>}/>
              <Route exact path="/messagerie/boite" element={<Messagerie fiche={ficheId} username={username}/>}/>
              <Route exact path="/messagerie/envoyer" element={<MessageAccueil fiche={ficheId} username={username}/>}/>
            </>
            }
            {username && username != '' ? 
            <>
              <Route exact path="/espace_prive" element={<Profil_Kine/>}/>
              <Route exact path="/espace_prive/fiche_sante" element={<Fiche_Sante user={userId != "" ? userId : null} username={username != "" ? username : null} fiche={ficheId != "" ? ficheId : null} type_kine = {typeKine != "" ? typeKine : null}
              age={age != "" ? age : null} adresse={adresse != "" ? adresse : null} descriptProb = {descriptProb != "" ? descriptProb : null} autorisation={isAutorise != "" ? isAutorise : null}/> }/>
            </> : null
            }
            
            <Route exact path="*" element={<PageError404/>}/>
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
      <Footer/>
    </React.Fragment>
  )
}

ReactDOM.render(<Router/>, document.getElementById('root')
);

reportWebVitals();

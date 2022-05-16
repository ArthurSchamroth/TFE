import React, {useEffect, useState} from 'react';
import {useCookies} from 'react-cookie';
import Navbar from '../navbar/navbar';
import "./profil_page.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import {API} from '../../api-service';
import Footer from '../footer/footer'

function Profil_Kine(){
    const [token, setToken, deleteToken] = useCookies([('mr-token')]);
    const [pseudo, setPseudo] = useState('');
    const [fiche, setFiche] = useState('');

    const logoutUser = () => {
        deleteToken(["mr-token"]);
        window.location.href = "/login"
    }

    useEffect(()=>{
        API.gettingDataFromToken({'token': token['mr-token']})
        .then(function(resp){
            return resp.json()
        }).then(function(resp){
            const a = (resp["username"])
            if(resp["fiche"]){
                setFiche(resp['fiche'])
            }
            setPseudo(a)
        })
    }, []);

    return(
        <>
            <Navbar/>
            <div className="App">
                <div className="salutation_profil">Bonjour {pseudo}</div> 
                {fiche == "" ? <p className='fiche_incomplete_error'>Veuillez compléter une première fois votre fiche santé avant de pouvoir accéder aux autres fonctionnalités.</p> : null}
                <div className="profil_container">
                    {pseudo == "ArthurSchamroth" || pseudo == "ThomasPenning" ? 
                    <div className="profil_button_container">
                        <h1>Listing Patients</h1>
                        <p>Retrouvez ici tous vos patients avec leurs informations personnelles. Vos rendez-vous déjà effectués avec eux, ...</p>
                        <a href="/patients"><button className='profil_redirection'>Listing</button></a>
                    </div>
                    : <>
                        <div className="profil_button_container">
                            <h1>Fiche Santé</h1>
                            <p>Voici votre fiche santé, informations auxquelles M.Penning a accès.</p>
                            <a href="/espace_prive/fiche_sante"><button className='profil_redirection'>Fiche Santé</button></a>
                        </div>
                    </>}

                    {fiche == "" ? null :
                        <>
                                <div className="profil_button_container">
                                <h1>Messagerie</h1>
                                <p>Envoyez vos indications, vos questions à vos patients ou répondez à Monsieur Penning, ...</p>
                                <a href="/messagerie"><button className='profil_redirection'>Messagerie</button></a>
                            </div>

                            <div className="profil_button_container">
                                <h1>Rendez-vous</h1>
                                <p>Visualisez vos futurs rendez-vous et vos disponibilités.</p>
                                <a href="/rendez_vous"><button className='profil_redirection'>RDV</button></a>
                            </div>
                            
                            {pseudo == "ArthurSchamroth" || pseudo == "ThomasPenning" ?
                            <>

                                <div className="profil_button_container">
                                    <h1>Gestion des Commentaires</h1>
                                    <p>Gérez les commentaires laissés par vos différents patients sur votre site.</p>
                                    <a href="/commentaires"><button className='profil_redirection'>Commentaires</button></a>
                                </div>
                                <div className="profil_button_container">
                                    <h1>Gestion des Routines</h1>
                                    <p>Gérez les Routines attribuables aux patients.</p>
                                    <a href="/gestion_routine"><button className='profil_redirection'>Commentaires</button></a>
                                </div>
                            </> : 
                                <div className="profil_button_container">
                                    <h1>Routine(s)</h1>
                                    <p>Visualiser vos routines.</p>
                                    <a href="/routines"><button className='profil_redirection'>Routines</button></a>
                                </div>
                            }
                        </>
                    }

                    <div className="profil_button_container_deco">
                        <h1 id="test">Déconnexion</h1>
                        <p>Gérez les commentaires laissés par vos différents patients sur votre site.</p>
                        <a onClick={logoutUser} id="deco_btn"><FontAwesomeIcon icon={faRightFromBracket}/>Déconnexion</a>
                    </div>

                </div>
                <Footer/>
            </div>
        </>
    )
}

export default Profil_Kine;
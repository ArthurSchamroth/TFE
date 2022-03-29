import React from 'react';
import {useCookies} from 'react-cookie';
import Navbar from '../navbar/navbar';
import "./profil_page.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons'

function Profil_Kine(){
    const [token, setToken, deleteToken] = useCookies([('mr-token')]);

    const logoutUser = () => {
        deleteToken(["mr-token"]);
        window.location.href = "/login"
    }

    return(
        <>
            <Navbar/>
            <div className="App">
                <div className="profil_container">
                    <div className="profil_button_container">
                        <h1>Listing Patients</h1>
                        <p>Retrouvez ici tous vos patients avec leurs informations personnelles. Vos rendez-vous déjà effectués avec eux, ...</p>
                        <a href="/patients"><button className='profil_redirection'>Listing</button></a>
                    </div>

                    <div className="profil_button_container">
                        <h1>Messagerie</h1>
                        <p>Envoyez vos messages à vos patients, leurs vidéos d'exercices, ...</p>
                        <a href="/"><button className='profil_redirection'>Messagerie</button></a>
                    </div>

                    <div className="profil_button_container">
                        <h1>Rendez-vous</h1>
                        <p>Visualisez vos futurs rendez-vous et vos disponibilités.</p>
                        <a href="/patients"><button className='profil_redirection'>RDV</button></a>
                    </div>

                    <div className="profil_button_container">
                        <h1>Gestion des Comptes</h1>
                        <p>Gérez les différents comptes inscrits sur votre site.</p>
                        <a href="/patients"><button className='profil_redirection'>Comptes</button></a>
                    </div>

                    <div className="profil_button_container">
                        <h1>Gestion des Commentaires</h1>
                        <p>Gérez les commentaires laissés par vos différents patients sur votre site.</p>
                        <a href="/patients"><button className='profil_redirection'>Commentaires</button></a>
                    </div>

                    <div className="profil_button_container_deco">
                        <h1 id="test">Déconnexion</h1>
                        <p>Gérez les commentaires laissés par vos différents patients sur votre site.</p>
                        <a onClick={logoutUser} id="deco_btn"><FontAwesomeIcon icon={faRightFromBracket}/>Déconnexion</a>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Profil_Kine;
import React, {useState, useEffect} from 'react';
import Navbar from '../navbar/navbar';
import './message_accueil.css';
import Footer from '../footer/footer';

function MessageAccueilCorrect(props){
    return(
        <>
            <Navbar/>
            <div className='App'>
                <div className="container_button_redirect_msg">
                    <p style={{fontSize: 20, fontWeight: 'bold'}}>Bonjour {props.username}, Bievenue dans votre messagerie, que voulez-vous faire ?</p>
                    <div className="btn_container">
                        <a className='redirect_link_rdv' href="/messagerie/boite"><button className='redirection_rdv_btn'>Voir mes messages</button></a>
                        <a className='redirect_link_rdv' href="/messagerie/envoyer"><button className='redirection_rdv_btn'>Envoyer un message</button></a>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default MessageAccueilCorrect;
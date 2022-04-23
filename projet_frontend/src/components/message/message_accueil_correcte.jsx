import React, {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';
import Navbar from '../navbar/navbar';
import './message_accueil.css';
import {API} from '../../api-service';

function MessageAccueilCorrect(props){
    return(
        <>
            <Navbar/>
            <div className='App'>
                Bonjour {props.username}, Bievenue dans votre messagerie, que voulez faire ?
                <a className='redirect_link_rdv' href="/messagerie/boite"><button className='redirection_rdv_btn'>Voir mes messages</button></a>
                <a className='redirect_link_rdv' href="/messagerie/envoyer"><button className='redirection_rdv_btn'>Envoyer un message</button></a>
            </div>
            
        </>
    )
}

export default MessageAccueilCorrect;
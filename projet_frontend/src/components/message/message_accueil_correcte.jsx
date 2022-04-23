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
                COUCOU {props.fiche} {props.username}
            </div>
            
        </>
    )
}

export default MessageAccueilCorrect;
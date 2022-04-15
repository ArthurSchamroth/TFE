import React, {useEffect, useState} from 'react';
import {useCookies} from 'react-cookie';
import Navbar from '../navbar/navbar';
import "./Rdv.css";
import {API} from '../../api-service';


function AccueilRdv(){
    
    const [token, setToken, deleteToken] = useCookies([('mr-token')]);
    const [adresse_mail, setEmail] = useState('');
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [username, setUsername] = useState('');
    const [user, setUser] = useState('');

    useEffect(()=>{
        API.gettingDataFromToken({'token': token['mr-token']})
            .then(function(resp){
                return resp.json()
            }).then(function(resp){
                setEmail(resp['email']);
                setUser(resp['id']);
                setPrenom(resp['prenom']);
                setNom(resp['nom']);
                setUsername(resp['username']);
            })
        
    }, []);

    return(
        <>
            <Navbar/>
            <div className="App">
                <div className='container_link_rdv'>
                    <h1>Bienvenue dans la section consacrée aux rendez-vous !</h1>
                    <h2>Que voulez-vous faire ?</h2>
                    <a className='redirect_link_rdv' href="/rendez_vous/futurs"><button className='redirection_rdv_btn'>Voir mes futurs rendez-vous</button></a>
                    <a className='redirect_link_rdv' href="/rendez_vous/anciens"><button className='redirection_rdv_btn'>Voir mes précédents rendez-vous</button></a>
                    <a className='redirect_link_rdv' href="/rendez_vous/programmer"><button className='redirection_rdv_btn'>Organiser un nouveau rendez-vous</button></a>
                </div>
            </div>
        </>
    )
}

export default AccueilRdv;
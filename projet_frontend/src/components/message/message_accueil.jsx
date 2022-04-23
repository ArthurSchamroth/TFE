import React, {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';
import Navbar from '../navbar/navbar';
import './message_accueil.css';
import {API} from '../../api-service';

function MessageAccueil(props){
    const [auteur, setAuteur] = useState('');
    const [destinataire, setDestinataire] = useState('');
    const [contenuMessage, setContenuMessage] = useState('');

    const envoyerMessage = () => {
        if(props.username != "ArthurSchamroth"){
            var user = props.fiche
            var destinataire = 'ArthurSchamroth'
            var today = new Date();
            var date = today.getFullYear()  + "-" + today.getMonth() + "-" + today.getDate()
            var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
            API.sendingMessage({
                'user': user, 'date': date,'heure': time,  
                'contenu': contenuMessage, 'dest': destinataire
            })
        }
    }

    return(
        <>
            <Navbar/>
            <div className='App'>
                <h1>{props.username}, Vous pouvez ici envoyer vos messages.</h1>
                <div className="messageContainer">
                    {props.username == "ArthurSchamroth" ? 
                        <>  
                            <label htmlFor="destinataire">Destinataire</label>
                            <input type="text" id="destinataire" onChange={evt => setDestinataire(evt.target.value)}/>
                        </>: 
                        <>
                            <label htmlFor="destinaire">Destinataire</label>
                            <input disabled type="text" id="destinaire" value="Monsieur Penning" onChange={null}/>
                        </>
                    }

                    <label htmlFor="contenuMessage">Contenu</label>
                    <textarea name="contenuMessage" id="contenuMessage" cols="30" rows="5" onChange={evt => setContenuMessage(evt.target.value)}
                    placeholder="Contenu de votre message"></textarea>
                    

                    <label htmlFor="auteur">Auteur</label>
                    <input id="auteur" type="text" disabled value={props.username}
                    onChange={evt=>setAuteur(evt.target.value)}/><br/>

                    <button className='btn_co_re' onClick={envoyerMessage}>Envoyer Message</button>
                </div>
                
            </div>
            
        </>
    )
}

export default MessageAccueil;
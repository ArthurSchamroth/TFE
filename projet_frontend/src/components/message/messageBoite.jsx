import React, {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';
import Navbar from '../navbar/navbar';
import './message_accueil.css';
import {API} from '../../api-service';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleMinus, faReply} from '@fortawesome/free-solid-svg-icons';

function Messagerie(props){
    const [messages, setMessages] = useState([]);
    const [auteurs, setAuteurs] = useState([]);
    const [auteurSelected, setAuteurSelected] = useState("");
    const [messagesFromSpecificUser, setMessagesFromSpecificUser] = useState([]);

    useEffect(()=>{
        if(props.username == "ArthurSchamroth" || props.username == "ThomasPenning"){
            API.getAuthors().then(function(resp){
                return resp.json()
            }).then(function(resp){
                setAuteurs(resp['result'])
            })
        }
        API.gettingMessageSpecific({'dest': props.username})
            .then(function(resp){
                return resp.json()
            }).then(function(resp){
                setMessages(resp['result'])
            })
    }, [])

    const auteurClicked = (auteur, auteur_nom) => {
        API.getMsgFromAAuthor({'user': auteur}).then(function(resp){
            return resp.json()
        }).then(function(resp){
            setAuteurSelected(auteur_nom)
            setMessagesFromSpecificUser(resp['result']);
        })
    }

    const deleteClicked = msg => {
        API.deletingMessage({id: msg.id});
        window.location.href = "/messagerie/boite";
    }

    return(
        <>
            <Navbar/>
            <div className='App'>
                <h2>Ceci est votre boite de réception.</h2>
                {props.username == "ArthurSchamroth" || props.username == "ThomasPenning" ? 
                    auteurs != [] ? 
                        auteurs.map(auteur => {
                            return(
                                <>
                                {auteur.auteur.split(" ")[0] + auteur.auteur.split(" ")[1] == props.username ?
                                    null : 
                                    <button className='btn_auteur' key={auteur.id} onClick={() => auteurClicked(auteur.auteur_id, auteur.auteur)}>{auteur.auteur}</button>
                                }
                                </>
                            )
                        }) 
                        : null
                    : 
                    <div className="boiteMessageContainer">
                    {messages != [] ? 
                    messages.map(msg => {
                        return(
                            <div key={msg['id']} className="messageContent">
                                {msg['date']} {msg['heure']}<br/>{msg['contenu']}
                            </div>
                        )
                        })
                        : null}
                    </div>
                }
                {auteurSelected != "" && messagesFromSpecificUser != [] ? 
                    <div className="message_specific_sender">
                        {messagesFromSpecificUser.map(message => {
                            return(
                                <>
                                <div key={message.id} className="message_container">
                                    <p>Date et Heure : {message.date} {message.heure}</p>
                                    <p>Contenu : <br/>{message.contenu}</p>
                                    <p>
                                        Supprimer : <FontAwesomeIcon className='supprimer_msg' onClick={() => deleteClicked(message)} icon={faCircleMinus}/>
                                        Répondre : <FontAwesomeIcon className='rep_msg' onClick={() => window.location.href = "/messagerie/envoyer"} icon={faReply}/>
                                    </p>
                                </div></>
                            )
                        })}
                    </div>
                    : null
                }
                
            </div>
            
        </>
    )
}

export default Messagerie;
import React, {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';
import Navbar from '../navbar/navbar';
import './message_accueil.css';
import {API} from '../../api-service';

function Messagerie(props){
    const [messages, setMessages] = useState([]);

    useEffect(()=>{
        API.gettingMessageSpecific({'dest': props.username})
            .then(function(resp){
                return resp.json()
            }).then(function(resp){
                setMessages(resp['result'])
                console.log(resp)
            })
    }, [])

    return(
        <>
            <Navbar/>
            <div className='App'>
                {props.username}, voici vos messages.
                <div className="boiteMessageContainer">
                    {messages != [] ? 
                    messages.map(msg => {
                        return(
                            <div key={msg['id']} className="messageContent">
                                {msg['date']} {msg['heure']}<br/>{msg['contenu']}
                            </div>
                        )
                    })
                    : console.log('pas ok')}
                </div>
            </div>
            
        </>
    )
}

export default Messagerie;
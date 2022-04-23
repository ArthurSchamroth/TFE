import React, {useState, useEffect} from 'react';
import Navbar from '../navbar/navbar';
import Select from 'react-select';
import './message_accueil.css';
import {API} from '../../api-service';

function MessageAccueil(props){
    const [auteur, setAuteur] = useState('');
    const [destinataire, setDestinataire] = useState('');
    const [contenuMessage, setContenuMessage] = useState('');
    const [destPossibles, setDestPossibles] = useState([]);
    const [destPossibleValues, setDestPossiblesValues] = useState([]);
    const [test, setTest] = useState('');

    useEffect(()=>{
        const liste = []
        const liste_value = []
        API.gettingEveryFiche()
            .then(function(resp){
                return resp.json()
            }).then(function(resp){
                for(const i of resp){
                    const username = i['prenom']+i['nom']
                    liste.push(username)
                    if(username != "ArthurSchamroth" || username != "ThomasPenning"){
                        liste_value.push({value: username, label: username})
                    }
                }
                setDestPossibles(liste)
                setDestPossiblesValues(liste_value)
            })
    }, [])

    useEffect(()=>{
        if(destinataire != {}){
            console.log(destinataire)
            setTest(destinataire)
        }
    }, [destinataire])

    const envoyerMessage = () => {
        if(props.username != "ThomasPenning"){
            var user = props.fiche
            var destinataire = 'ThomasPenning'
            var today = new Date();
            var date = today.getFullYear()  + "-" + today.getMonth() + "-" + today.getDate()
            var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
            API.sendingMessage({
                'user': user, 'date': date,'heure': time,  
                'contenu': contenuMessage, 'dest': test
            })
        }
        else{
            
                console.log("oui")
                var user = props.fiche
                var today = new Date();
                var dest = destinataire
                var date = today.getFullYear()  + "-" + today.getMonth() + "-" + today.getDate()
                var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
                console.log("oui", user, destinataire, date, time, contenuMessage)
                API.sendingMessage({
                    'user': user, 'date': date,'heure': time,  
                    'contenu': contenuMessage, 'dest': dest
                })
        }
    }

    return(
        <>
            <Navbar/>
            <div className='App'>
                {test != "" ? console.log(test) : console.log('NOOOOOOOOPE')}
                <h1>{props.username}, Vous pouvez ici envoyer vos messages.</h1>
                <div className="messageContainer">
                    {props.username == "ArthurSchamroth" || props.username == "ThomasPenning"? 
                        <>  
                            <label htmlFor="destinataire">Destinataire</label>
                            {destPossibleValues != [] ? 
                                <>
                                    <select name="destinataire" id="destinataire" onChange={evt => setDestinataire(evt.target.value)}>
                                        {destPossibleValues.map(dest => {
                                            return(
                                                <option value={dest.value}>{dest.label}</option>
                                            )
                                        })}
                                    </select>
                                </>
                                : console.log('pas ok')
                            }
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
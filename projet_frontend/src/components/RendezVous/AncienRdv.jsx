import React, {useEffect, useState} from 'react';
import {useCookies} from 'react-cookie';
import Navbar from '../navbar/navbar';
import "./Rdv.css";
import {API} from '../../api-service';


function AncienRdv(props){
    
    const [token, setToken, deleteToken] = useCookies([('mr-token')]);
    const [adresse_mail, setEmail] = useState('');
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [username, setUsername] = useState('');
    const [user, setUser] = useState('');
    const [ficheId, setFicheId] = useState(props.fiche);
    const [listeRdv, setListeRdv] = useState([]);
    const [loading, setLoading] = useState(false);

    
    useEffect(()=>{
        setLoading(true)
        if(props.fiche){
            API.gettingRdvsFromSpecificUser({'fiche': props.fiche})
                .then(function(resp){
                    console.log(resp)
                    return resp.json()
                }).then(function(resp){
                    console.log(resp['result'])
                    setListeRdv(resp['result'])
                    
                    return listeRdv
                })
                setLoading(false)
        }
        else{
            console.log('oui')
        }
        
    }, [props.fiche]);
    
    return(
        <>  
            <Navbar/>
            <div className="App">
                {props.fiche}
                {listeRdv && listeRdv.map(rdv => {
                    return(
                        <p>{rdv.date}</p>
                    )
                })}
            </div>
        </>
    )
}

export default AncienRdv;
import React, {useEffect, useState} from 'react';
import {useCookies} from 'react-cookie';
import Navbar from '../navbar/navbar';
import "./Rdv.css";
import {API} from '../../api-service';


function ProgrammerRdv(props){
    
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
        
    }, [props.fiche]);
    
    return(
        <>  
            <Navbar/>
            <div className="App">
                <h1>vous pouvez ici programmer vos prochains rendez-vous avec Monsieur Penning</h1>
            </div>
        </>
    )
}

export default ProgrammerRdv;
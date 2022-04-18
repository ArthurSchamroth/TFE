import React, {useEffect, useState} from 'react';
import {useCookies} from 'react-cookie';
import Navbar from '../navbar/navbar';
import "./Rdv.css";
import {API} from '../../api-service';


function AncienRdv(props){
    
    const [listeRdv, setListeRdv] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true)
        console.log(props.fiche)
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
                <h1>Voici vos précédents rendez-vous.</h1>
                {props.fiche}
                <table id='tableau_rdv_precedents'>
                    <thead>
                        <tr>
                            <th className='titre_rdv_tableau'>Nom Prénom</th>
                            <th className='titre_rdv_tableau'>Date</th>
                            <th className='titre_rdv_tableau'>Heure</th>
                            <th className='titre_rdv_tableau'>Type de soin</th>
                            <th className='titre_rdv_tableau'>Domicile ou cabinet</th>
                            <th className='titre_rdv_tableau'>Adresse</th>
                        </tr>
                        
                    </thead>
                    <tbody>
                    {listeRdv && listeRdv.map(rdv => {
                        return(

                            <tr key={rdv.id}>
                                <td>{rdv.nom} {rdv.prenom}</td>
                                <td>{rdv.date}</td>
                                <td>{rdv.heure}</td>
                                {rdv.type_rdv == "D" ? <td>Domicile</td> : <td>Cabinet</td>}
                                {rdv.type_kine == "KR" ? <td>Kinésithérapie respiratoire</td> : 
                                rdv.type_kine == "K" ? <td>Kinésithérapie</td> :
                                rdv.type_kine == "OS" ? <td>Osthéopatie</td> : rdv.type_kine == "P" ? <td>Pédiatrie</td> : <td></td>}
                                <td>{rdv.adresse}</td>
                            </tr>
                            
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AncienRdv;
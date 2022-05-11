import React, {useEffect, useState} from 'react';
import {useCookies} from 'react-cookie';
import Navbar from '../navbar/navbar';
import "./Rdv.css";
import {API} from '../../api-service';
import Popup from 'reactjs-popup';


function AncienRdv(props){
    
    const [listeRdv, setListeRdv] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentDate] = useState(new Date().toLocaleDateString("fr-CA", {year: "numeric", month:'2-digit', day: '2-digit'}));

    const deleteClicked = rdv => {
        API.delRdv({id: rdv.id})
        window.location.href = "/rendez_vous/anciens/"
    }

    useEffect(()=>{
        const test = []
        const trier = (a, b) =>{
            if(a.date < b.date){
                return -1
            }
            if(a.date > b.date){
                return 1
            }
            return 0
        }
        setLoading(true)
        if(props.fiche){
            if(props.username == "ThomasPenning" || props.username == "ArthurSchamroth"){
                API.gettingRdvsWithName()
                .then(function(resp){
                    return resp.json()
                }).then(function(resp){
                    for(const i of resp['result']){
                        test.push(i)
                    }
                    const liste_triee = test.sort(trier)
                    setListeRdv(liste_triee)
                    
                    return listeRdv
                })
            }else{
                API.gettingRdvsFromSpecificUser({'fiche': props.fiche})
                .then(function(resp){
                    return resp.json()
                }).then(function(resp){
                    for(const i of resp['result']){
                        test.push(i)
                    }
                    const liste_triee = test.sort(trier)
                    console.log(liste_triee)
                    setListeRdv(liste_triee)
                    
                    return listeRdv
                })
                setLoading(false)
            }
        }
        
    }, [props.fiche]);
    
    return(
        <>  
            <Navbar/>
            <div className="App">
                <h1>Voici vos précédents rendez-vous.</h1>
                <div className="tableau_container">
                <table id='tableau_rdv_precedents'>
                    <thead>
                        <tr>
                            <th className='titre_rdv_tableau'>Nom Prénom</th>
                            <th className='titre_rdv_tableau'>Date</th>
                            <th className='titre_rdv_tableau'>Heure</th>
                            <th className='titre_rdv_tableau'>Type de soin</th>
                            <th className='titre_rdv_tableau'>Description</th>
                            {props.username == "ArthurSchamroth" || props.username == "ThomasPenning" ? 
                                <th className='titre_rdv_tableau'>Supprimer RDV</th> : null
                            }
                        </tr>
                        
                    </thead>
                    <tbody>
                    {listeRdv && listeRdv.map(rdv => {
                        return(
                            <>
                            {rdv.date <=  currentDate && rdv.description != "Indisponible"? 
                                <tr key={rdv.id}>
                                    <td className='premiere_colonne'>{rdv.nom} {rdv.prenom}</td>
                                    <td>{rdv.date}</td>
                                    <td>{rdv.heure}</td>
                                    {rdv.type_soin == "KR" ? <td>Kinésithérapie respiratoire</td> : 
                                    rdv.type_soin == "K" ? <td>Kinésithérapie</td> :
                                    rdv.type_soin == "OS" ? <td>Osthéopatie</td> : rdv.type_soin == "P" ? <td>Pédiatrie</td> : <td></td>}
                                    <td>{rdv.description}</td>
                                    <td className='derniere_colonne'>
                                        <Popup trigger={<button className='del_rdv_btn'>Supprimer</button>} position='bottom center'>
                                            <div>Êtes-vous sûr de vouloir supprimer ce rendez-vous ?</div>
                                            <button  onClick={() => deleteClicked(rdv)}>Supprimer</button>
                                        </Popup>
                                    </td>
                                </tr> : null
                            }
                            
                            </>
                        )
                    })}
                    </tbody>
                </table>
                </div>
            </div>
        </>
    )
}

export default AncienRdv;
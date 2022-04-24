import React, {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';

function FichePatientsDetails(props){

    const [token] = useCookies([('mr-token')]);
    const [str_mail, setStr_mail] = useState('');

    useEffect(() => {
        if(props.fichePatient){
        setStr_mail("mailto:" + props.fichePatient.adresse_mail)
    } 
    }, [props])
    
    return (
        <div>
            {props.fichePatient ? (
                <>  
                    <div className="details_fiche">
                        <h2 className='nom_patient'>Fiche Santé de {props.fichePatient.prenom} {props.fichePatient.nom}</h2>
                        <p>Nom : {props.fichePatient.nom}</p> 
                        <p>Prénom : {props.fichePatient.prenom}</p>
                        <p>Date de naissance : {props.fichePatient.age}</p>
                        <p className='redirection_mail_button'>Adresse Mail : <a href={str_mail}>{props.fichePatient.adresse_mail}</a></p>
                        <p className='redirection_maps_button' onClick={()=>{
                            window.open('https://maps.google.com?q='+props.fichePatient.adresse)
                        }}>Adresse : {props.fichePatient.adresse}</p>
                        <p>Description Problème : {props.fichePatient.description_probleme}</p>
                    </div>
                </>
                
            ) : null}
        </div>
    )
}

export default FichePatientsDetails;
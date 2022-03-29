import React from 'react';
import {useCookies} from 'react-cookie';

function FichePatientsDetails(props){

    const [token] = useCookies([('mr-token')]);

    return (
        <div>
            {props.fichePatient ? (
                <>  
                    <div className="details_fiche">
                        <h2 className='nom_patient'>Fiche Santé de {props.fichePatient.prenom} {props.fichePatient.nom}</h2>
                        <p>Nom : {props.fichePatient.nom}</p> 
                        <p>Prénom : {props.fichePatient.prenom}</p>
                        <p>Date de naissance : {props.fichePatient.age}</p>
                        <p>Adresse Mail : {props.fichePatient.adresse_mail}</p>
                        <p>Adresse : {props.fichePatient.adresse}</p>
                        <p>Description Problème : {props.fichePatient.description_probleme}</p>
                    </div>
                </>
                
            ) : null}
        </div>
    )
}

export default FichePatientsDetails;
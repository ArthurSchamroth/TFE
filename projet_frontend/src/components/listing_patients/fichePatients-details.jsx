import React from 'react';
import {useCookies} from 'react-cookie';

function FichePatientsDetails(props){

    const [token] = useCookies([('mr-token')]);

    return (
        <div>
            {props.fichePatient ? (
                <>
                    <h2 className='nom_patient'>Fiche Santé de {props.fichePatient.prenom} {props.fichePatient.nom}</h2>
                    
                </>
                
            ) : null}
        </div>
    )
}

export default FichePatientsDetails;
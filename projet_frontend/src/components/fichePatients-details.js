import React from 'react';
import {useCookies} from 'react-cookie';

function FichePatientsDetails(props){

    const [token] = useCookies([('mr-token')]);

    return (
        <div>
            {props.fichePatient ? (
                <h1>{props.fichePatient.age}</h1>
            ) : null}
        </div>
    )
}

export default FichePatientsDetails;
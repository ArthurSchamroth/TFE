import React from 'react';

function FichePatientsDetails(props){
    return (
        <div>
            {props.fichePatient ? (
                <h1>{props.fichePatient.age}</h1>
            ) : null}
        </div>
    )
}

export default FichePatientsDetails;
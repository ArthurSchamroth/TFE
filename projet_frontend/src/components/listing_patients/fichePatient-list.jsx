import React from 'react';

function FichePatientsList(props){

    const fichePatientClicked = fichePatient => evt => {
        props.fichePatientClicked(fichePatient)
    }

    return (
        <div>
            {props.fichePatients && props.fichePatients.map(fichePatient => {
                return(
                    fichePatient.prenom + fichePatient.nom == "ThomasPenning" || fichePatient.prenom + fichePatient.nom == "ArthurSchamroth" ?
                        null :
                        <div key={fichePatient.id} className="fiche-item">
                        <h2 onClick={fichePatientClicked(fichePatient)}>{fichePatient.prenom + " " + fichePatient.nom}</h2>
                        </div>
                    
                    
                )
            })}
        </div>
    )
}

export default FichePatientsList;
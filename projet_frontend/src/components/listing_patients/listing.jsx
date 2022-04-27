import React, {useState, useEffect} from 'react';
import './listing.css';
import FichePatientsList from './fichePatient-list';
import FichePatientsDetails from './fichePatients-details';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../navbar/navbar';

function ListingPatients(props) {

    const [fichePatients, setFichePatients] = useState([]);
    const [selectedFichePatients, setSelectedFichePatients] = useState(null)

    useEffect(() => {
        fetch("http://192.168.1.21:8000/api/fichePatient/", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token 32fd88f63f1e9f169ea9c09d9dd19d46ae7a2f4f'
        }
        })
        .then(resp => resp.json())
        // Permet de remplir le tableau fichePatients
        .then(resp => setFichePatients(resp))
        .catch(error => console.log(error))
    }, [])

    const fichePatientClicked = fichePatient => {
        setSelectedFichePatients(fichePatient)
    }

    return (
        <>
            <Navbar/>
            <div className="App">
                <h1 className='titre_liste'>Liste des patients</h1>
                        <div className="layout">
                            <div className='listing_patients'><FichePatientsList fichePatients={fichePatients} fichePatientClicked={fichePatientClicked}/></div>
                            <div className="details_listing_patients"><FichePatientsDetails fichePatient={selectedFichePatients}/></div>
                        </div>
                </div>
                
        </>
        
    );
}

export default ListingPatients;

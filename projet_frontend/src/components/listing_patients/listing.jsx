import React, {useState, useEffect} from 'react';
import './listing.css';
import FichePatientsList from './fichePatient-list';
import FichePatientsDetails from './fichePatients-details';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../navbar/navbar';
import {API} from '../../api-service';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function ListingPatients(props) {

    const [fichePatients, setFichePatients] = useState([]);
    const [selectedFichePatients, setSelectedFichePatients] = useState(null);
    const [isSuiviMedical, setIsSuiviMedical] = useState(false);
    const [listeRdvPatient, setListeRdvPatient] = useState([]);
    const [isRdv, setIsRdv] = useState(false);
    const [isRoutine, setIsRoutine] = useState(false);

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
        if(selectedFichePatients){
            API.gettingRdvsFromAUser({'patient': selectedFichePatients.id}).then(function(resp){
                return resp.json()
            }).then(function(resp){
                for(const i of resp['result']){
                    test.push(i)
                }
                const liste_triee = test.sort(trier)
                setListeRdvPatient(liste_triee)
            })
            
        }
    }, [isRdv])

    const fichePatientClicked = fichePatient => {
        setIsRdv(false);
        setSelectedFichePatients(fichePatient);
    }

    const activerRdv = () => {
        setIsRdv(!isRdv);
        setIsRoutine(false);
    }

    const activerRoutine = () => {
        setIsRoutine(!isRoutine);
        setIsRdv(false);
    }

    return (
        <>
            <Navbar/>
            <div className="App">
                <h1 className='titre_liste'>Liste des patients</h1>
                        <div className="layout">
                            <div className='listing_patients'><FichePatientsList fichePatients={fichePatients} fichePatientClicked={fichePatientClicked}/></div>
                            <div className="details_listing_patients"><FichePatientsDetails onChange={(isSuivi)=>setIsSuiviMedical(isSuivi)} fichePatient={selectedFichePatients}/></div>
                        </div>
                        {selectedFichePatients  ? 
                            isSuiviMedical ? 
                            
                            <div className='container_suivi_patient'>
                                <h3 className='titre_suivi_container'>Ceci est le suivi du patient : {selectedFichePatients.prenom} {selectedFichePatients.nom}<br/>
                                Que souhaitez-vous faire ?</h3>
                                <div className='container_btn_suivi'>
                                    <button className='redirection_btn_suivi' onClick={()=>activerRdv()}>Voir les rendez-vous</button>
                                    <button className='redirection_btn_suivi' onClick={()=>activerRoutine()}>Voir routines</button>
                                </div>
                                <div className='section_suivi'>
                                    {isRdv ? 
                                        <div className='section_suivi_rdv'>
                                            {listeRdvPatient && listeRdvPatient != [] ? 
                                                listeRdvPatient.map(rdv => {
                                                    return(
                                                        <div className='rdv_item' key={rdv.id}>
                                                            Date & Heure : {rdv.date} {rdv.heure}<br/>
                                                            Description RDV : {rdv.description}
                                                        </div>
                                                    )
                                                })
                                            : null}
                                        </div>
                                        :
                                        isRoutine ? 
                                        <>
                                            <div className="titre_gestion_routine_patient">
                                                <h4>Voici la routine de ce patient</h4>
                                                <a href="/gestion_routine" id='add_routine_btn'><FontAwesomeIcon title='Ajouter routine' icon={faPlus}/></a>
                                            </div>
                                        </>
                                        : null
                                    }
                                </div>
                            </div> 
                            
                            : null : null
                        } 
                </div>
                
        </>
        
    );
}

export default ListingPatients;

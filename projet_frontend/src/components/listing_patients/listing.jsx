import React, {useState, useEffect} from 'react';
import './listing.css';
import FichePatientsList from './fichePatient-list';
import FichePatientsDetails from './fichePatients-details';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../navbar/navbar';
import {API} from '../../api-service';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlus, faCaretDown, faCaretRight, faPaperclip } from '@fortawesome/free-solid-svg-icons';

function ListingPatients(props) {

    const [fichePatients, setFichePatients] = useState([]);
    const [selectedFichePatients, setSelectedFichePatients] = useState(null);
    const [isSuiviMedical, setIsSuiviMedical] = useState(false);
    const [listeRdvPatient, setListeRdvPatient] = useState([]);
    const [isRdv, setIsRdv] = useState(false);
    const [isRoutine, setIsRoutine] = useState(false);
    const [isRoutineOuverte, setIsRoutineOuverte] = useState(false);
    const [listeRoutines, setListeRoutines] = useState([]);
    const [routine, setRoutine] = useState([]);
    const [optionsRoutine, setOptionsRoutine] = useState([]);
    const [isAttributionRoutine, setIsAttributionRoutine] = useState(false);

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

    useEffect(()=>{
        if(selectedFichePatients){
            API.getRoutineSpecificUser({user: selectedFichePatients['id']}).then(function(resp){
                return resp.json()
            }).then(function(resp){
                setRoutine(resp['result'])
            })
        }
        
    }, [isRoutine])

    useEffect(()=>{
        
    }, [isRoutineOuverte])

    useEffect(()=>{
        setIsRoutine(false)
    }, [selectedFichePatients])

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
        console.log(routine)
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
                                <h3 className='titre_suivi_container'>Ceci est le suivi de {selectedFichePatients.prenom} {selectedFichePatients.nom}<br/>
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
                                                        <div key={rdv.id} className='rdv_item'>
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
                                            <br/>
                                            <div className="routine_container">
                                            {console.log(routine)}
                                            {routine != [] ?
                                                routine.map(resp => {
                                                    return(
                                                        <>  
                                                            {isRoutineOuverte ? 
                                                                <div key={resp.id}>
                                                                    <div className="ficheRoutine">
                                                                    <div className='titre_routine'>{resp.titre_routine} <FontAwesomeIcon className='icon_dev' icon={faCaretRight} onClick={()=>setIsRoutineOuverte(!isRoutineOuverte)}/></div>
                                                                    </div>
                                                                </div>
                                                                : 
                                                                <>
                                                                <div key={resp.id} className="ficheRoutine">
                                                                <div className='titre_routine'>{resp.titre_routine} <FontAwesomeIcon className='icon_dev' icon={faCaretDown} onClick={()=>setIsRoutineOuverte(!isRoutineOuverte)}/></div>
                                                                    <br/> 
                                                                    <div className="routine_developpee">
                                                                    <div className="sous_titres_fiche">Description :</div>{resp.description_detaillee} 
                                                                    <br/> 
                                                                    <div className="sous_titres_fiche">Vidéos d'exercices :</div>
                                                                        {resp.videos != [] ? 
                                                                            resp.videos.map(video => {
                                                                                return(
                                                                                    <div id={video.id} className="video_container">
                                                                                        Titre : {video.titre} <br/>
                                                                                        <a href={video.url}>{video.titre}</a>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        : null}
                                                                        
                                                                    </div>
                                                                </div>
                                                                </>
                                                                }
                                                        </>
                                                    )
                                                })
                                            : <p>ok</p>
                                            }
                                            </div>
                                        </>
                                        : 
                                        null
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

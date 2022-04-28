import React, {useState, useEffect} from 'react';
import './listing.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../navbar/navbar';
import {API} from '../../api-service';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlus, faClapperboard, faCamera } from '@fortawesome/free-solid-svg-icons';

function GestionRoutine(props) {

    const [isCreer, setIsCreer] = useState(false);
    const [isAjouter, setIsAjouter] = useState(false);
    const [isLister, setIsLister] = useState(false);
    const [titreVideo, setTitreVideo] = useState('');
    const [urlVideo, setUrlVideo] = useState('');
    const [listeVideos, setListeVideos] = useState([]);

    const creationClicked = () => {
        setIsCreer(!isCreer);
        setIsAjouter(false);
        setIsLister(false);
    }

    const ajouterClicked = () => {
        setIsAjouter(!isAjouter)
        setIsCreer(false);
        setIsLister(false);
    }

    const listerClicked = () => {
        setIsLister(!isLister);
        setIsCreer(false);
        setIsAjouter(false);
        
    }

    const envoyerVideo = () => {
        API.envoyerVideo({titre: titreVideo, url: urlVideo})
        alert("Vidéo ajoutée !")
        console.log(titreVideo, urlVideo)
    }

    return (
        <>
            <Navbar/>
            <div className="App">
                <h1>Vous pouvez ici créer, modifier, supprimer des routines.</h1>
                <h2>Que souhaitez-vous faire ?</h2>
                <div id='container_btn_routine'>
                    Créer routine : <FontAwesomeIcon onClick={creationClicked} className='btn_gestion_routine' title='créer routine' icon={faPlus}/>
                    Ajouter vidéo d'exercice :<FontAwesomeIcon onClick={ajouterClicked} className='btn_gestion_routine' title='ajouter vidéo à utiliser' icon={faClapperboard}/>
                    Lister Vidéos d'exercice :<FontAwesomeIcon onClick={listerClicked} className='btn_gestion_routine' title='ajouter vidéo à utiliser' icon={faCamera}/>
                </div>
                <div className='container_gestion_routine'>
                    {isCreer ?
                        <div className='ajouter_routin_container'>
                            <label htmlFor="description_routine">Description Complète</label>
                            <textarea name="description_complete" id="description_routine" cols="30" rows="4" placeholder='Décrivez la routine (nombre de répétition par jour, nombre de semaine, ...'></textarea>
                        </div>
                        : isAjouter ? 
                            <div className='ajouter_video_container'>
                                <label htmlFor="titre_video">Titre Descriptif</label>
                                <input id='titre_video' type="text" onChange={evt => setTitreVideo(evt.target.value)}/>
                                <label htmlFor="url_video">URL Vidéo</label>
                                <input id='url_video' type="url" onChange={evt => setUrlVideo(evt.target.value)}/>
                                <button onClick={envoyerVideo}>Envoyer</button>
                            </div>
                            : isLister ?
                                <div>ok</div>
                                
                                : null
                    }
                </div>
            </div>
        </>
    );
}

export default GestionRoutine;

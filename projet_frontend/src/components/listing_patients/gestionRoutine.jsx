import React, {useState, useEffect} from 'react';
import './listing.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../navbar/navbar';
import {API} from '../../api-service';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlus, faClapperboard, faCamera } from '@fortawesome/free-solid-svg-icons';
import Footer from '../footer/footer';

function GestionRoutine(props) {

    const [isCreer, setIsCreer] = useState(false);
    const [isAjouter, setIsAjouter] = useState(false);
    const [isLister, setIsLister] = useState(false);
    const [titreVideo, setTitreVideo] = useState('');
    const [urlVideo, setUrlVideo] = useState('');
    const [listeVideos, setListeVideos] = useState([]);
    const [titre, setTitre] = useState('');
    const [listeVideosRoutine, setListeVideosRoutine] = useState([]);
    const [description, setDescription] = useState('');


    const creationClicked = () => {
        setIsCreer(!isCreer);
        setIsAjouter(false);
        setIsLister(false);
        API.listerVideos()
        .then(function(resp){
            return resp.json()
        }).then(function (resp){
            setListeVideos(resp)
        })
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
        API.listerVideos()
        .then(function(resp){
            return resp.json()
        }).then(function (resp){
            setListeVideos(resp)
        })
    }

    const envoyerRoutine = () => {
        API.envoyerRoutine({user: 1, titre: titre, description_detaillee: description, videos: [1]})
    }

    const valueHandle = (e) => {
        const test = []
        const getvalue = (e?test.push(e.target.value):[]);
    } 

    const envoyerVideo = () => {
        API.envoyerVideo({titre: titreVideo, url: urlVideo})
        alert("Vidéo ajoutée !")
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
                            <label htmlFor="titre_routine">Titre routine</label>
                            <input onChange={evt => setTitre(evt.target.value)} name="titre_routine" id="titre_routine" placeholder='Titre' type='text'></input>
                            <label htmlFor="description_routine">Description Complète</label>
                            <textarea onChange={evt => setDescription(evt.target.value)} name="description_complete" id="description_routine" cols="30" rows="4" placeholder='Décrivez la routine (nombre de répétition par jour, nombre de semaine, ...'></textarea>
                            <label htmlFor="description_routine">Choix vidéos tuto (maintenez ctrl pour en sélectionner plusieurs)</label><br/>
                            {listeVideos != [] ? 
                                <><select onSelect={evt => setListeVideosRoutine(evt.target.value)} onChange={valueHandle} name="choice_video" id="choice_video_select" multiple>
                                {listeVideos.map(video => {
                                    return(
                                        <option key={video.id} value={video.id}>{video.titre}</option>
                                    )
                                })}
                                </select><br/>
                                    <button id='envoyer_routine_btn' onClick={envoyerRoutine}>
                                        Envoyer routine
                                    </button>
                                </>
                                :null
                            }
                            
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
                                listeVideos != [] ? 
                                    listeVideos.map(video => {
                                        return(
                                            <div key={video.id} className='video_item_list'>
                                                {video.url.split('?v=')[1] ? 
                                                    <img height='25%' width='25%' src={`https://img.youtube.com/vi/${video.url.split('?v=')[1].split('&')[0]}/hqdefault.jpg`} alt="img_video" /> : 
                                                    <img height='25%' width='25%' src={`https://img.youtube.com/vi/${video.url.split('?v=')[0].split('be/')[1].split('?t=')[0]}/hqdefault.jpg`} alt="img_video" /> 
                                                }
                                            <a href={video.url}>{video.titre}</a></div>
                                        )
                                    }) 
                                : null : null
                    }
                </div>
            </div>
        </>
    );
}

export default GestionRoutine;

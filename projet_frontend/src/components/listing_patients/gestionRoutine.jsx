import React, {useState, useEffect} from 'react';
import './listing.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../navbar/navbar';
import {API} from '../../api-service';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlus, faClapperboard, faCamera, faDumbbell } from '@fortawesome/free-solid-svg-icons';
import Footer from '../footer/footer';
import Select from 'react-select';

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
    const [listeOptionsVideos, setListeOptionsVideos] = useState([]);
    const [isListerRoutine, setIsListerRoutine] = useState(false);
    const [listeVideosInfos, setListeVideosInfos] = useState([]);
    const [listeRoutines, setListeRoutines] = useState([]);
    const [isInputVide, setIsInputVide] = useState(false);
    const [iseVideoInputVide ,setIsVideoInputVide] = useState(false);


    const creationClicked = () => {
        setIsCreer(!isCreer);
        setIsAjouter(false);
        setIsLister(false);
        setIsListerRoutine(false);
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
        setIsListerRoutine(false);
    }

    const listerRoutineClicked = () => {
        setIsListerRoutine(!isListerRoutine)
        setIsCreer(false);
        setIsLister(false);
        setIsAjouter(false);
        API.getInfosAllVideos()
        .then(function(resp){
            return resp.json()
        }).then(function (resp){
            console.log(resp)
            setListeVideosInfos(resp)
        })
        API.getRoutines()
        .then(function(resp){
            return resp.json()
        }).then(function (resp){
            setListeRoutines(resp)
        })
    }

    const listerClicked = () => {
        setIsLister(!isLister);
        setIsCreer(false);
        setIsAjouter(false);
        setIsListerRoutine(false);
        API.listerVideos()
        .then(function(resp){
            return resp.json()
        }).then(function (resp){
            setListeVideos(resp)
        })
    }

    const envoyerRoutine = () => {
        if(titre == "" || description == ""){
            setIsInputVide(true);
        }else{
            API.envoyerRoutine({user: 2, titre_routine: titre, description_detaillee: description, videos: listeVideosRoutine})
            alert("Routine cr????e !")
            window.href("/gestion_routine")
        }
        
    }

    const envoyerVideo = () => {
        if(titreVideo == "" || urlVideo == ""){
            setIsVideoInputVide(true);
        }else{
            API.envoyerVideo({titre: titreVideo, url: urlVideo})
            alert("Vid??o ajout??e !")
        }
    }

    const delClicked = (routine) => {
        const test = routine.id
        API.supprimerRoutine({id: test})
        alert("Routine Supprim??e")
        window.location ="/gestion_routine"
    }

    const handleChange = (e) => {
        const f = e
        setListeVideosRoutine(Array.isArray(f) ? f.map(x => x.value) : []);
    }

    const customStyles = {
        control: (base, state) => ({
        ...base,
        background: "#1688f1",
        borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
        boxShadow: state.isFocused ? null : null,
        "&:hover": {
        borderColor: state.isFocused ? "red" : "blue"
        }
    }),
    menu: (base) => ({
        ...base,
        borderRadius: 0,
        marginTop: 0,
        fontColor: "white"
    }),
    menuList: (base, state) => ({
        ...base,
        background: "#1688f1",
        padding: 0,
        "&:hover": {
        borderColor: state.isFocused ? "red" : "blue",
        background: "#1688f1",
        color: state.isFocused ? "white" : "white" 
        }
    })
    };

    useEffect(() => {
        if(listeVideos != []){
            const liste = []
            for(const i of listeVideos){
                const obj = {value: i.id, label:i.titre}
                liste.push(obj)
            }
            setListeOptionsVideos(liste)
        }
    }, [listeVideos])

    return (
        <>
            <Navbar/>
            <div className="App">
                <h1>Vous pouvez ici cr??er, modifier, supprimer des routines.</h1>
                <h2>Que souhaitez-vous faire ?</h2>
                <div id='container_btn_routine'>
                    <p>Cr??er routine : <FontAwesomeIcon onClick={creationClicked} className='btn_gestion_routine' title='cr??er routine' icon={faPlus}/></p>
                    <p>Ajouter vid??o d'exercice :<FontAwesomeIcon onClick={ajouterClicked} className='btn_gestion_routine' title='ajouter vid??o ?? utiliser' icon={faClapperboard}/></p>
                    <p>Lister Vid??os d'exercice :<FontAwesomeIcon onClick={listerClicked} className='btn_gestion_routine' title='lister les vid??os' icon={faCamera}/></p>
                    <p>Lister les diff??rentes routines:<FontAwesomeIcon onClick={listerRoutineClicked} className='btn_gestion_routine' title="lister les routines" icon={faDumbbell}/></p>
                </div>
                <div className='container_gestion_routine'>
                    {isCreer ?
                        <div className='ajouter_routin_container'>
                            <label htmlFor="titre_routine">Titre routine</label>
                            <input onChange={evt => setTitre(evt.target.value)} name="titre_routine" id="titre_routine" placeholder='Titre' type='text'></input>
                            <label htmlFor="description_routine">Description Compl??te</label>
                            <textarea onChange={evt => setDescription(evt.target.value)} name="description_complete" id="description_routine" cols="30" rows="4" placeholder='D??crivez la routine (nombre de r??p??tition par jour, nombre de semaine, ...'></textarea>
                            <label htmlFor="description_routine">Choix vid??os tuto (maintenez ctrl pour en s??lectionner plusieurs)</label><br/>
                            {listeVideos != [] ? 
                                <><Select 
                                styles={customStyles}
                                options={listeOptionsVideos}
                                onChange={handleChange}
                                placeholder="Choisissez les vid??os pour cette routine"
                                theme={(theme) => ({
                                    ...theme,
                                    borderRadius: 0,
                                    colors: {
                                        menuColor: '#1688f1',
                                        text: 'orangered',
                                    }
                                })}
                                isMulti
                            /><br/>
                                {isInputVide ?
                                    <p style={{fontWeight:"bold", color:'red'}}>Veuillez compl??ter les champs du formulaire</p> : null
                                }
                                    
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
                                <label htmlFor="url_video">URL Vid??o</label>
                                <input id='url_video' type="url" onChange={evt => setUrlVideo(evt.target.value)}/>
                                {iseVideoInputVide ? 
                                    <p style={{fontWeight:"bold", color:'red'}}>Veuillez compl??ter les champs du formulaire</p> : null
                                }
                                <button id='envoyer_routine_btn' onClick={envoyerVideo}>Envoyer</button> 
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
                                : null : 
                                isListerRoutine ? 
                                    listeRoutines.map(routine => {
                                        return(
                                            <div key={routine.id} className="routine_container_liste">
                                                Titre: {routine.titre_routine}<br/>
                                                Description: <br/> {routine.description_detaillee}<br/>
                                                Supprimer : <button onClick={() => delClicked(routine)}>Supprimer</button>
                                            </div>
                                        )
                                    })
                                    
                                    :null
                    }
                </div>
            </div>
        </>
    );
}

export default GestionRoutine;

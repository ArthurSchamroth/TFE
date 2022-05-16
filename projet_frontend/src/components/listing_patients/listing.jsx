import React, {useState, useEffect} from 'react';
import './listing.css';
import FichePatientsList from './fichePatient-list';
import FichePatientsDetails from './fichePatients-details';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../navbar/navbar';
import {API} from '../../api-service';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Select from 'react-select';
import { faCircleMinus, faCaretDown, faCaretRight, faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';
import Footer from '../footer/footer';

function ListingPatients(props) {

    const [fichePatients, setFichePatients] = useState([]);
    const [selectedFichePatients, setSelectedFichePatients] = useState(null);
    const [isSuiviMedical, setIsSuiviMedical] = useState(false);
    const [listeRdvPatient, setListeRdvPatient] = useState([]);
    const [isRdv, setIsRdv] = useState(false);
    const [isRoutine, setIsRoutine] = useState(true);
    const [isRoutineOuverte, setIsRoutineOuverte] = useState(false);
    const [isAjouterRoutine, setIsAjouterRoutine] = useState(false);
    const [listeRoutines, setListeRoutines] = useState([]);
    const [routine, setRoutine] = useState([]);
    const [optionsRoutine, setOptionsRoutine] = useState([]);
    const [routineSelected, setRoutineSelected] = useState("");
    const [routinePreCharged, setRoutinePreCharged] = useState("");
    const [idUser, setIdUser] = useState("");
    const [titreRoutine, setTitreRoutine] = useState("");
    const [descriptionRoutine, setDescriptionRoutine] = useState("");
    const [videosRoutine, setVideosRoutine] = useState([]);
    const [isErreur, setIsErreur] = useState(false);
    const [isAjouterVideo, setIsAjouterVideo] = useState(false);
    const [listeVideos, setListeVideos] = useState([]);
    const [videoRoutineSelected, setVideoRoutineSelected] = useState([]);
    const [videosDispos, setVideosDispos] = useState([]);
    const [nouvellesVideos, setNouvellesVideos] = useState([]);

    useEffect(() => {
        fetch("http://192.168.1.21:8000/api/fichePatient/", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${process.env.REACT_APP_API_token}`
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
                setIdUser(selectedFichePatients['id'])
            })
        }
    }, [selectedFichePatients])

    useEffect(() =>{
        const new_liste = listeVideos.push(videoRoutineSelected)
        setVideosRoutine(new_liste)
    }, [videoRoutineSelected])

    useEffect(()=>{
        API.getRoutines().then(function(resp){
            return resp.json()
        }).then(function(resp){
            setListeRoutines(resp)
            var liste = []
            for(const i of resp){
                const object = {}
                object['value'] = i.titre_routine
                object['label'] = i.titre_routine
                liste.push(object)
            }
            setOptionsRoutine(liste)
        })
    }, [isAjouterRoutine])

    useEffect(()=>{
        setIsRoutine(false);
        setIsAjouterRoutine(false);
    }, [selectedFichePatients])

    useEffect(() => {
        if(routineSelected != ""){
            setRoutineSelected(routineSelected)
            API.getInfosSpecificRoutine({routine: routineSelected}).then(function(resp){
                return resp.json()
            }).then(function (resp){
                setRoutinePreCharged(resp['result'])
                setTitreRoutine(resp["result"][0].titre_routine)
                setDescriptionRoutine(resp["result"][0].description_detaillee)
                const videos = []
                for(const i of resp["result"][0].videos){
                    videos.push(i.id)
                }
                setVideosRoutine(videos)
            })
        }
    }, [routineSelected])

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

    const activerAjouterRoutine = () => {
        setIsAjouterRoutine(!isAjouterRoutine);
        setIsRdv(false);
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

    const delVideoClicked = video => {
        const new_liste = videosRoutine.filter(function(f) {return f !== video.id})
        setVideosRoutine(new_liste)
        document.getElementById(video.id).innerHTML = ""
    }

    const ajouterVideoClicked = () => {
        setIsAjouterVideo(true)
        API.listerVideos()
        .then(function(resp){
            return resp.json()
        }).then(function (resp){
            setListeVideos(resp)
        })
    }

    useEffect(() => {
        const liste = []
        for(const i of listeVideos){
            const obj = {value: i.id, label:i.titre}
            liste.push(obj)
        }
        setVideosDispos(liste)
    }, [listeVideos])

    const envoyerRoutine = e => {
        e.preventDefault();
        const titreRoutines = []
        for(const i of optionsRoutine){
            titreRoutines.push(i.label)
        }
        if(titreRoutines.includes(titreRoutine)){
            setIsErreur(true)
        }else{
            API.envoyerRoutine({user: selectedFichePatients.id, titre_routine: titreRoutine, 
                description_detaillee: descriptionRoutine, videos: videosRoutine}).then(function(resp){
                alert("Routine attribuée !")
                window.location.href = "/patients"
            })
        }
    }

    const handleChange = (e) => {
        const f = e
        setNouvellesVideos(Array.isArray(f) ? f.map(x => x.value) : []);
    }

    useEffect(()=>{
        const a = videosRoutine
        for(const i of nouvellesVideos){
            if(!a.includes(i)){
                a.push(i)
            }
        }
        setVideosRoutine(a)
    }, [nouvellesVideos])


    const deleteRoutine = routine => {
        API.supprimerRoutine({"id": routine.id})
        alert("Routine Supprimée !")
        window.location.href = "/patients"
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
                                    {routine.length != 0 ? 
                                        <button className='redirection_btn_suivi' onClick={()=>activerRoutine()}>Voir routines</button> :
                                        <button className='redirection_btn_suivi' onClick={()=>activerAjouterRoutine()}>Ajouter routine</button> 
                                    }
                                    
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
                                            {routine != [] ?
                                                routine.map(resp => {
                                                    return(
                                                        <div key={resp.id}>  
                                                            {isRoutineOuverte ? 
                                                                <div key={resp.id}>
                                                                    <div className="ficheRoutine">
                                                                    <div className='titre_routine'>{resp.titre_routine} <FontAwesomeIcon className='icon_dev' icon={faCaretRight} onClick={()=>setIsRoutineOuverte(!isRoutineOuverte)}/> <button className='icon_del' onClick={() => deleteRoutine(resp)}><FontAwesomeIcon icon={faTrashCan}/></button></div>
                                                                    </div>
                                                                </div>
                                                                : 
                                                                <>
                                                                <div key={resp.id} className="ficheRoutine">
                                                                <div className='titre_routine'>{resp.titre_routine} <FontAwesomeIcon className='icon_dev' icon={faCaretDown} onClick={()=>setIsRoutineOuverte(!isRoutineOuverte)}/> <button className='icon_del' onClick={() => deleteRoutine(resp)}><FontAwesomeIcon icon={faTrashCan}/></button></div>
                                                                    <br/> 
                                                                    <div className="routine_developpee">
                                                                    <div className="sous_titres_fiche">Description :</div>{resp.description_detaillee} 
                                                                    <br/> 
                                                                    <div className="sous_titres_fiche">Vidéos d'exercices :</div>
                                                                        {resp.videos != [] ? 
                                                                            resp.videos.map(video => {
                                                                                return(
                                                                                    <div key={video.id} id={video.id} className="video_container">
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
                                                        </div>
                                                    )
                                                })
                                            : null
                                            }
                                            </div>
                                        </>
                                        : 
                                        isAjouterRoutine && optionsRoutine.length != 0 ? 
                                            <><div className='select_container'>
                                                <h3>Sélectionner la routine sur laquelle vous voulez vous baser.</h3>
                                                <Select 
                                                    onChange={evt=>setRoutineSelected(evt.label)}
                                                    options={optionsRoutine}
                                                    styles={customStyles}
                                                    label="Sélectionner la routine que vous voulez attribuer"
                                                    theme={(theme) => ({
                                                        ...theme,
                                                        borderRadius: 0,
                                                        colors: {
                                                            menuColor: '#1688f1',
                                                            text: 'orangered',
                                                        }
                                                    })}
                                                />
                                            </div>
                                            {routinePreCharged != "" ? 
                                                <div className="container_preloaded_routine">
                                                    <p>Veuillez au moins changer le titre de la routine avant d'envoyer !</p>
                                                    <form>
                                                        <label htmlFor="Titre">Titre</label>
                                                        <input type="text" onChange={evt => setTitreRoutine(evt.target.value)} defaultValue={routinePreCharged[0].titre_routine}/>
                                                        <label htmlFor="Description">Description</label>
                                                        <textarea  onChange={evt => setDescriptionRoutine(evt.target.value)} name="description" id="description" cols="31" rows="4" defaultValue={routinePreCharged[0].description_detaillee}/>
                                                        <label htmlFor="vidéos">Vidéos d'exercice</label> <FontAwesomeIcon title="Ajouter vidéo à la routine" icon={faPlus} onClick={() => ajouterVideoClicked()}/><br/>
                                                        {routinePreCharged[0].videos.map(video => {
                                                            return(
                                                            <div key={video.id} id={video.id}>
                                                            <a href={video.url}>{video.titre}</a><br/><FontAwesomeIcon onClick={() => delVideoClicked(video)} icon={faCircleMinus}/><br/>
                                                            </div>
                                                        )})}
                                                        {isAjouterVideo && listeVideos && videosDispos != [] ?
                                                            <>
                                                            <Select 
                                                                styles={customStyles}
                                                                options={videosDispos}
                                                                onChange={handleChange}
                                                                placeholder="Choisissez les vidéos pour cette routine"
                                                                theme={(theme) => ({
                                                                    ...theme,
                                                                    borderRadius: 0,
                                                                    colors: {
                                                                        menuColor: '#1688f1',
                                                                        text: 'orangered',
                                                                    }
                                                                })}
                                                                isMulti
                                                            />
                                                            </>
                                                            :null
                                                        }
                                                        {isErreur ? <p className='error_msg'>Veuillez changer au moins le titre de la routine</p> : null}
                                                        <button onClick={(e) => envoyerRoutine(e)}>Ajouter</button>
                                                    </form>
                                                </div>
                                                
                                                : null
                                            }
                                            </>
                                        : null
                                    }
                                </div>
                            </div> 
                            : null : null
                        } 
                <Footer/>
                </div>
        </>
        
    );
}

export default ListingPatients;

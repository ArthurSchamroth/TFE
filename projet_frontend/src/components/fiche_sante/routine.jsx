import React, {useEffect, useState} from 'react';
import {useCookies} from 'react-cookie';
import Navbar from '../navbar/navbar';
import "./fiche_sante.css";
import {API} from '../../api-service';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretDown, faCaretRight} from '@fortawesome/free-solid-svg-icons';
import Footer from '../footer/footer';

function Routine(props){
    
    const [routines, setRoutines] = useState([]);
    const [isVideoShowed, setIsVideoShowed] = useState(false);

    useEffect(()=>{
        API.getRoutineSpecificUser({'user': props.fiche}).then(function(resp){
            return resp.json()
        }).then(function(resp){
            setRoutines(resp['result'])
        })
    }, [props])

    return(
        <>
            <Navbar/>
            <div className="App">
                <h1>Voici votre/vos routine(s) mise(s) en place par Monsieur Penning</h1>
                {routines != [] ? 
                    routines.map(routine => {
                        return(
                            <div key={routine.id} className="container_routine">
                                <h2>Titre : {routine.titre_routine}</h2>
                                <h2>Description : </h2>
                                <p>
                                    {routine.description_detaillee}
                                </p>
                                {!isVideoShowed ? 
                                    <div><h2>Voir vidéos d'exercices <FontAwesomeIcon icon={faCaretRight} onClick={()=>setIsVideoShowed(!isVideoShowed)}/></h2></div>:
                                    <div className="container_videos_exos">
                                        <div><h2>Voir vidéos d'exercices <FontAwesomeIcon icon={faCaretDown} onClick={()=>setIsVideoShowed(!isVideoShowed)}/></h2></div>
                                        <div className='videos_container'>
                                        {routine.videos.map(video => {
                                            return(<>
                                                <a href={video.url}>{video.titre}</a>
                                                <div className="illustration_video">
                                                {video.url.split('?v=')[1] ? 
                                                    <img height='100%' width='100%' src={`https://img.youtube.com/vi/${video.url.split('?v=')[1].split('&')[0]}/hqdefault.jpg`} alt="img_video" /> : 
                                                    <img height='100%' width='100%' src={`https://img.youtube.com/vi/${video.url.split('?v=')[0].split('be/')[1].split('?t=')[0]}/hqdefault.jpg`} alt="img_video" /> 
                                                
                                                }</div><br/>
                                            </>)
                                        })}
                                        </div>
                                    </div>
                                }
                                
                            </div>
                        )
                    })
                : null}
            <Footer/>
            </div>
        </>
    )
}

export default Routine;
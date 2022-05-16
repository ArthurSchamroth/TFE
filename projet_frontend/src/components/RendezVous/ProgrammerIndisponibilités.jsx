import React, {useEffect, useState} from 'react';
import {useCookies} from 'react-cookie';
import Navbar from '../navbar/navbar';
import ReactDatePicker from 'react-datepicker';
import "./Rdv.css";
import {API} from '../../api-service';
import 'react-datepicker/dist/react-datepicker.css'
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import Footer from '../footer/footer';

function ProgrammerIndisponilibites(props){
    
    const [date, setDate] = useState('');
    const [heure, setHeure] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [rdvDateHeure, setRdvDateHeure] = useState([]);
    const [dates, setDates] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isUnJour, setIsUnJour] = useState(false);
    const [isPlsJours, setIsPlsJours] = useState(false);
    const [isPlsJoursSelected, setIsPlsJoursSelected] = useState(false);
    const [heuresSelected, setHeuresSelected] = useState([]);
    const [isHeuresSelected, setIsHeuresSelected] = useState(false);


    const heures_rdv = ["8:00", "9:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"]
    
    const envoyerRdv = () => {API.addingRdv({'user': props.fiche, 'date': date, 'heure': heure, 
                    'type_rdv': "D", 'description': "Indisponible",
                    'type_soin': "K"})
                    window.location.href = "/rendez_vous/indisponibilites"
    } 

    function handleDateChange(date) {
        // initial change: start by setting the startDate
        if (!startDate && !endDate) {
            setStartDate(date);
         // startDate has been set, set the end date
        } else if (startDate && !endDate) {
            setEndDate(date);
        }
    
        // user is choosing another range => set the start date
        // and set the endDate back to null
        if (startDate && endDate) {
            setStartDate(date);
            setEndDate(null);
        }
    }

    var getDaysArray = function(start, end) {
        for(var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
            arr.push(new Date(dt));
        }
        return arr;
    };

    const envoyerIndisponibilités = () => {
        for(const i of dates){
            for(const j of heuresSelected){
                API.addingRdv({'user': props.fiche, 'date': i, 'heure': j + ":00" , 
                    'type_rdv': "D", 'description': "Indisponible",
                    'type_soin': "K"})
            }
        }
        alert("Indisponibilités enregistrées.")
    }

    useEffect(()=> {
        if(startDate && endDate){
            var dayList = getDaysArray(new Date(startDate), new Date(endDate));
            const jours = []
            dayList.map((v) => jours.push(v.toLocaleDateString("fr-CA", {year: "numeric", month:'2-digit', day: '2-digit'})))
            if(jours != []){
                setDates(jours)
            }
        }
        
    }, [endDate])

    useEffect(()=>{
        const result = []
        if(date != ""){
            setLoading(true)
            API.gettingRdvsFromSpecificDate({'date': date})
                .then(function(resp){
                    return resp.json()
                }).then(function(resp){
                    for(const i of resp['result']){
                        result.push(i['heure'])
                    }
                    setRdvDateHeure(result)
                    
                    return rdvDateHeure
                })
                setLoading(false)
        }
    }, [date])

    useEffect(() => {
        setIsPlsJoursSelected(true);
    }, [dates])

    useEffect(() => {
        if(heuresSelected.length != 0){
            setIsHeuresSelected(true)
        }
    }, [heuresSelected])

    const jourPrecisClicked = () => {
        setIsUnJour(!isUnJour);
        setIsPlsJours(false);
    }

    const jourPlsClicked = () => {
        setIsPlsJours(!isPlsJours);
        setIsUnJour(false);
    }

    return(
        <>  
            <Navbar/>
            <div className="App">
                <h1>Enregistrez ici vos dates d'indisponibilités</h1>
                <button className='btn_choix_jour' onClick={jourPrecisClicked}>Jour Précis</button>
                <button className='btn_choix_jour' onClick={jourPlsClicked}>Plusieurs jours</button>
                {isUnJour ? 
                    <div className='form_rdv_envoi_container'>
                    <label htmlFor="date">Date</label><br/>
                    <input id='date' type="date" value={date}
                    onChange={evt => setDate(evt.target.value)}/><br/>
                    {date != "" ? 
                        <div className='radio-group'>
                            {heures_rdv.map(heure=>{
                                return(
                                    <div key={`key-${heure}`}>  
                                        {rdvDateHeure.includes(heure+":00") || rdvDateHeure.includes("0"+heure+":00")? 
                                            null:
                                            <>
                                                <div className='heure_dispo'>
                                                    <input className='heure_radio' name="choix_heure" value={heure} onChange={evt => setHeure(evt.target.value)} type="radio" id={`id-${heure}`}/>
                                                    <label className="heure_label" htmlFor={`id-${heure}`}>{heure}</label>
                                                </div>
                                            </>
                                        }
                                        
                                    </div>
                                )
                            })}

                        <button className='btn_co_re' onClick={envoyerRdv}>Envoyer Indisponibilités</button>
                        </div>:
                        null
                    } 
                    </div> : 
                        isPlsJours ? 
                        <>
                        <h2>Sélectionnez vos dates</h2>
                        <ReactDatePicker
                                onChange={(date) => handleDateChange(date)}
                                selectsStart={true}
                                selected={startDate}
                                startDate={startDate}
                                endDate={endDate}
                                inline={true}
                            />
                        {isPlsJoursSelected && dates.length != 0 ? 
                            <>  
                                <button className='btn_select_houres' onClick={() => setHeuresSelected(heures_rdv.slice(0, 4))}>Matin</button>
                                <button className='btn_select_houres' onClick={() => setHeuresSelected(heures_rdv.slice(4, 9))}>Après-midi</button>
                                <button className='btn_select_houres' onClick={() => setHeuresSelected(heures_rdv.slice(0, 9))}>Journée Entière</button>
                                {isHeuresSelected ? 
                                    <button className='btn_envoyer_indispo' onClick={envoyerIndisponibilités}>
                                        Envoyer
                                    </button> : 
                                    null
                                }
                            </> 
                            : null
                        }
                        </> 
                        : null
                }
                <Footer/>
                </div>
        </>
    )
}

export default ProgrammerIndisponilibites;


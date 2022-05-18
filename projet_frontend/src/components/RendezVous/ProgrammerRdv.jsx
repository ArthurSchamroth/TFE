import React, {useEffect, useState} from 'react';
import {useCookies} from 'react-cookie';
import Navbar from '../navbar/navbar';
import {Datepicker} from '@mobiscroll/react'
import "./Rdv.css";
import {API} from '../../api-service';
import 'react-datepicker/dist/react-datepicker.css'
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import Footer from '../footer/footer';

function ProgrammerRdv(props){
    
    const [date, setDate] = useState('');
    const [heure, setHeure] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [rdvDateHeure, setRdvDateHeure] = useState([]);

    const date_ajd = new Date().toLocaleDateString();
    const heures_rdv = ["8:00", "9:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"]
    
    const envoyerRdv = () => {API.addingRdv({'user': props.fiche, 'date': date, 'heure': heure, 
                    'type_rdv': "D", 'description': description,
                    'type_soin': props.type_kine})
                    window.location.href = "/rendez_vous/programmer"
    } 

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

    var minDate = new Date().toISOString().split("T")[0];

    if(document.getElementById("date2")){
        const picker = document.getElementById("date2");
        picker.addEventListener('input', function(e){
            var day = new Date(this.value).getUTCDay();
            if([6,0].includes(day)){
                e.preventDefault();
                this.value = "";
                alert("Les weekends ne sont pas autorisés.")
            }
        })
    }
    

    return(
        <>  
            <Navbar/>
            <div className="App">
                <h1>vous pouvez ici programmer vos prochains rendez-vous avec Monsieur Penning</h1>
                <div className='form_rdv_envoi_container'>
                    <label htmlFor="date">Date</label><br/>
                    <input id='date2' type="date" value={date}
                    onChange={evt => setDate(evt.target.value)} min={minDate}/><br/>
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
                        </div>:
                        null
                    }

                    <label htmlFor="description">Description</label><br/>
                    <input id='description' type="text" value={description}
                    onChange={evt => setDescription(evt.target.value)}/><br/>

                    <button className='btn_co_re' onClick={envoyerRdv}>Envoyer Rdv</button>
                </div>
            </div>
        </>
    )
}

export default ProgrammerRdv;


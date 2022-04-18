import React, {useEffect, useState} from 'react';
import {useCookies} from 'react-cookie';
import Navbar from '../navbar/navbar';
import {Datepicker} from '@mobiscroll/react'
import "./Rdv.css";
import {API} from '../../api-service';
import 'react-datepicker/dist/react-datepicker.css'
import "@mobiscroll/react/dist/css/mobiscroll.min.css";

function ProgrammerRdv(props){
    
    const [date, setDate] = useState('');
    const [heure, setHeure] = useState('');
    const [typeRdv, setTypeRdv] = useState('');
    const [description, setDescription] = useState('');

    const date_ajd = new Date().toLocaleDateString();
    
    const envoyerRdv = () => {
        API.addingRdv({'user': props.fiche, 'date': date, 'heure': heure, 
                    'type_rdv': typeRdv, 'description': description,
                    'type_soin': props.type_kine})
    } 

    return(
        <>  
            <Navbar/>
            <div className="App">
                {props.type_kine}
                <h1>vous pouvez ici programmer vos prochains rendez-vous avec Monsieur Penning</h1>
                <div className='form_rdv_envoi_container'>
                    <label htmlFor="date">Date</label><br/>
                    <input id='date' type="date" value={date}
                    onChange={evt => setDate(evt.target.value)}/><br/>

                    <label htmlFor="heure">Heure</label><br/>
                    <input id='heure' type="time" value={heure}
                    onChange={evt => setHeure(evt.target.value)}/><br/>

                    <label htmlFor="type_rdv">Type Rendez-vous</label><br/>
                    <input id='type_rdv' type="text" value={typeRdv}
                    onChange={evt => setTypeRdv(evt.target.value)}/><br/>

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
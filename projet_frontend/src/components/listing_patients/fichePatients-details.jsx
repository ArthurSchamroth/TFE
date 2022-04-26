import React, {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons';
import Popup from 'reactjs-popup';
import {API} from '../../api-service';

function FichePatientsDetails(props){

    const [token] = useCookies([('mr-token')]);
    const [str_mail, setStr_mail] = useState('');
    const [user, setUser] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [adresseMail, setAdresseMail] = useState('');
    const [naissance, setNaissace] = useState('');
    const [adresse, setAdresse] = useState('');
    const [typeSoin, setTypeSoin] = useState('');
    const [descriptionProb, setDescriptionProb] = useState('');
    const [isModification, setIsModification] = useState(false);

    const dateMax = new Date().toISOString().split('T')[0];

    useEffect(() => {
        if(props.fichePatient){
            setStr_mail("mailto:" + props.fichePatient.adresse_mail);
            setUser(props.fichePatient.user)
            setNom(props.fichePatient.nom);
            setPrenom(props.fichePatient.prenom);
            setAdresseMail(props.fichePatient.adresse_mail);
            setNaissace(props.fichePatient.age);
            setAdresse(props.fichePatient.adresse);
            setTypeSoin(props.fichePatient.type_kine);
            setDescriptionProb(props.fichePatient.description_probleme);
        setIsModification(false);
    } 
    }, [props])

    const modificationClicked = () => {
        setIsModification(true)
    }

    const deleteClicked = () => {
        API.deletingFiche({id: user})
        window.location.href ='/patients'
    }

    const envoyerModif = () => {
        API.updatingFiche({
            'user': user, 'nom': nom, 'prenom': prenom, 'adresse_mail': adresseMail, 'description_probleme': descriptionProb, 'type_kine': typeSoin, 'adresse': adresse
        })
    }
    
    return (
        <div>
            {props.fichePatient ? (
                <>  
                    <div className="details_fiche">
                        <h2 className='nom_patient'>Fiche Santé de {props.fichePatient.prenom} {props.fichePatient.nom}</h2>
                        {!isModification ? 
                            <>
                                <p>Nom : {props.fichePatient.nom}</p> 
                                <p>Prénom : {props.fichePatient.prenom}</p>
                                <p>Date de naissance : {props.fichePatient.age}</p>
                                <p className='redirection_mail_button'>Adresse Mail : <a href={str_mail}>{props.fichePatient.adresse_mail}</a></p>
                                <p className='redirection_maps_button' onClick={()=>{
                                    window.open('https://maps.google.com?q='+props.fichePatient.adresse)
                                }}>Adresse : {props.fichePatient.adresse}</p>
                                <p>Description Problème : {props.fichePatient.description_probleme}</p><br/>
                                <Popup trigger={<button className='del_btn_user'><FontAwesomeIcon className='button_del_fiche' icon={faTrashCan}/></button>} position='bottom center'>
                                    <div>Voulez-vous supprimer ce patient ? (Toutes les informations le concernant seront supprimées !)</div>
                                    <button onClick={deleteClicked}>Modifier avis</button>
                                </Popup>
                                <FontAwesomeIcon className='button_edit_fiche' icon={faPencil} onClick={modificationClicked}/>
                            </> :
                            <>
                                <h3>Modifier la fiche de {props.fichePatient.prenom} {props.fichePatient.nom} {props.fichePatient.id}</h3>

                                <label htmlFor="nom_input">Nom</label>
                                <input type="text" name='nom_input' defaultValue={props.fichePatient.nom} onChange={evt => setNom(evt.target.value)}/>

                                <label htmlFor="prenom_input">Prénom</label>
                                <input type="text" name='prenom_input' defaultValue={props.fichePatient.prenom} onChange={evt => setPrenom(evt.target.value)}/>

                                <label htmlFor="adresse_mail_input">Adresse Mail</label>
                                <input type="text" name='adresse_mail_input' defaultValue={props.fichePatient.adresse_mail} onChange={evt => setAdresseMail(evt.target.value)}/>
                                
                                <label htmlFor='naissance'>Date de naissance</label>
                                <input type="date" name='naissance' defaultValue={dateMax} max={dateMax} min='1910-12-31'
                                onChange={evt => setNom(evt.target.value)}/>

                                <label htmlFor="adresse_input">Adresse</label>
                                <input type="text" name='adresse_input' defaultValue={props.fichePatient.adresse} onChange={evt => setAdresse(evt.target.value)}/>

                                <label htmlFor="type_kine_input">Type de soin</label><br/>
                                <select name="type_kine" id="typeKine" defaultValue={props.fichePatient.type_kine} onChange={evt => setTypeSoin(evt.target.value)}>
                                    {props.fichePatient.type_kine == "OS" ? 
                                        <>
                                            <option value=''>Type de kiné.</option>
                                            <option value="K">Kinésithérapie</option>
                                            <option value="OS" selected>Osthéopatie</option>
                                            <option value="KR">Kinésithérapie Respiratoire</option>
                                            <option value="P">Pédiatrie</option>
                                        </>: props.fichePatient.type_kine == "K" ? 
                                            <>
                                                <option value=''>Type de kiné.</option>
                                                <option value="K" selected>Kinésithérapie</option>
                                                <option value="OS">Osthéopatie</option>
                                                <option value="KR">Kinésithérapie Respiratoire</option>
                                                <option value="P">Pédiatrie</option>
                                            </> : props.fichePatient.type_kine == "KR" ? 
                                                <>
                                                    <option value=''>Type de kiné.</option>
                                                    <option value="K">Kinésithérapie</option>
                                                    <option value="OS">Osthéopatie</option>
                                                    <option value="KR" selected>Kinésithérapie Respiratoire</option>
                                                    <option value="P">Pédiatrie</option>
                                                </> : props.fichePatient.type_kine == "P" ?
                                                    <>
                                                        <option value=''>Type de kiné.</option>
                                                        <option value="K">Kinésithérapie</option>
                                                        <option value="OS">Osthéopatie</option>
                                                        <option value="KR">Kinésithérapie Respiratoire</option>
                                                        <option value="P" selected>Pédiatrie</option>
                                                    </> :
                                                        <>
                                                            <option value='' selected>Type de kiné.</option>
                                                            <option value="K">Kinésithérapie</option>
                                                            <option value="OS">Osthéopatie</option>
                                                            <option value="KR">Kinésithérapie Respiratoire</option>
                                                            <option value="P">Pédiatrie</option>
                                                        </>
                                    }
                                    
                                </select><br/>

                                <label htmlFor="descrip_prob_input">Description Problème Physique</label>
                                <textarea name="description_prob" id="contenuMessage" cols="30" rows="4" 
                                defaultValue={props.fichePatient.description_probleme} onChange={evt => setDescriptionProb(evt.target.value)}></textarea>
                                <Popup trigger={<button>Modifier</button>} position='right center'>
                                    <div>Les nouvelles informations entrées sont-elles correctes ?</div>
                                    <button onClick={() => envoyerModif()}>Modifier</button>
                                </Popup>
                            </>
                        }
                        
                    </div>
                </>
                
            ) : null}
        </div>
    )
}

export default FichePatientsDetails;
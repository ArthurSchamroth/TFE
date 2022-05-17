import React, {useEffect, useState} from 'react';
import {useCookies} from 'react-cookie';
import Navbar from '../navbar/navbar';
import "./fiche_sante.css";
import {API} from '../../api-service';
import Footer from '../footer/footer';


function Fiche_Sante(props){
    
    const [token, setToken, deleteToken] = useCookies([('mr-token')]);
    const [adresse_mail, setEmail] = useState('');
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [username, setUsername] = useState('');
    const [user, setUser] = useState(props.user);
    const [listingFiches, setListingFiches] = useState([]);
    const [listingFiche_id, setListingFiche_id ] = useState([])
    const [age, setAge] = useState('');
    const [type_kine, setType_besoin] = useState('');
    const [adresse, setAdresse] = useState('');
    const [description_probleme, setDetail_prob] = useState('');
    const [isAutorisationChecked, setIsAutorisationChecked] = useState("Non");
    const [isAlert, setIsAlert] = useState(false);
    const [dateDef, setDateDef] = useState("");
    const [test, setTest] = useState(false);

    const dateMax = new Date().toISOString().split('T')[0];

    useEffect(()=>{
        if(props.fiche){
            API.gettingDataFromFiche({'username': props.username})
                .then(function(resp){
                    return resp.json()
                }).then(function (resp){
                    setAge(resp['naissance'])
                    setPrenom(resp['prenom'])
                    setNom(resp['nom'])
                    setAdresse(resp['adresse'])
                    setEmail(resp['adresse_mail'])
                    setDetail_prob(resp['description_prob'])
                    setType_besoin(resp['type_kine'])
                    setTest(true)
                })
        }
    }, [])

    useEffect(()=>{
        setDateDef(age)
    }, [test])

    useEffect(() => {
        if(props.fiche){
            API.gettingDataFromFiche({'username': props.username})
                .then(function(resp){
                    return resp.json()
                }).then(function (resp){
                    if(resp["naissance"]){
                        setAge(resp['naissance'])
                    }
                    setPrenom(resp['prenom'])
                    setNom(resp['nom'])
                    setAdresse(resp['adresse'])
                    setEmail(resp['adresse_mail'])
                    setDetail_prob(resp['description_prob'])
                    setType_besoin(resp['type_kine'])
                })
        }
    }, [props])

    useEffect(()=>{
        if(!props.fiche){
            API.gettingDataFromToken({'token': token['mr-token']})
            .then(function(resp){
                return resp.json()
            }).then(function(resp){
                setEmail(resp['email']);
                setPrenom(resp['prenom']);
                setNom(resp['nom']);
                setUsername(resp['username']);
            })
        }
    }, []);

    useEffect(()=>{
        const liste = []
        const liste_id = []
        API.gettingEveryFiche()
        .then(function(resp){
            return resp.json()
        }).then(function(resp){
            for(const i of resp){
                liste.push(i)
                liste_id.push(i['user'])
            }
            setListingFiches(liste)
            setListingFiche_id(liste_id)
        })
    }, [])

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    const envoyer_fiche = () => {
        if(nom == "" || prenom == "" || age == "" || adresse_mail == "" || type_kine == "" || description_probleme == "" || adresse == ""){
            setIsAlert(true);
        }else{
            API.creatingFiche({user, nom, prenom, age, adresse_mail, type_kine, description_probleme, adresse, autorisation_consultation: isAutorisationChecked})
            alert("Fiche créée !")
            window.location.href = "/espace_prive/fiche_sante"
        }
        
    }

    const modifier_fiche = () => {
        API.updatingFiche({user, nom, prenom, age, adresse_mail, type_kine, description_probleme, adresse});
        alert("Fiche modifée !");
        window.location.href = "/espace_prive/fiche_sante"
    }

    const autorisationChecked = () => {
        if(isAutorisationChecked == "non" || isAutorisationChecked == "Non"){
            setIsAutorisationChecked("oui");
        }else{
            setIsAutorisationChecked("non");
        }
        
    }

    return(
        <>
            <Navbar/>
            <div className="App">
                <h1>Bienvenue sur votre Fiche Santé!</h1>
                {listingFiche_id.includes(user) ? 
                    null :
                    <p id='message_accueil'>
                        S'il s'agit de votre premier accès à votre fiche santé, vous êtes censé envoyer celle-ci une fois les informations complétées.<br/>
                        Vous aurez encore la possibilité de modifier ces informations.
                    </p>                
                }
                <div className='formulaireFicheContainer'>
                    <label htmlFor='nom'>Nom</label>
                    <input className='not_modifiable_input' type="text" name='nom' disabled defaultValue={nom}/>
                    <label htmlFor='prenom'>Prénom</label>
                    <input className='not_modifiable_input' type="text" name='prenom' disabled defaultValue={prenom}/>
                    <label htmlFor='adresse_mail'>Email</label>
                    <input className='not_modifiable_input' type="text" name='adresse_mail' disabled defaultValue={adresse_mail}/>
                    <label htmlFor='naissance'>Date de naissance</label>
                    {age != ""? 
                        <>
                        <input className='not_modifiable_input' type="date" name='naissance' defaultValue={age} max={dateMax} min='1910-12-31'
                        onChange={evt=>setAge(evt.target.value)} disabled/></>:
                        <>
                        <input type="date" name='naissance' defaultValue={'2000-07-28'} max={dateMax} min='1910-12-31'
                        onChange={evt=>setAge(evt.target.value)}/></>
                    }
                    
                    <label htmlFor='type_kine'>Type besoin</label><br/>
                    <select name="type_kine" id="typeKine"onChange={evt=>setType_besoin(evt.target.value)} defaultValue={props.type_kine}>
                        {props.type_kine == "OS" ? 
                            <>
                                <option value=''>Type de kiné.</option>
                                <option value="K">Kinésithérapie</option>
                                <option value="OS" selected>Osthéopatie</option>
                                <option value="KR">Kinésithérapie Respiratoire</option>
                                <option value="P">Pédiatrie</option>
                            </>: props.type_kine == "K" ? 
                                <>
                                    <option value=''>Type de kiné.</option>
                                    <option value="K" selected>Kinésithérapie</option>
                                    <option value="OS">Osthéopatie</option>
                                    <option value="KR">Kinésithérapie Respiratoire</option>
                                    <option value="P">Pédiatrie</option>
                                </> : props.type_kine == "KR" ? 
                                    <>
                                        <option value=''>Type de kiné.</option>
                                        <option value="K">Kinésithérapie</option>
                                        <option value="OS">Osthéopatie</option>
                                        <option value="KR" selected>Kinésithérapie Respiratoire</option>
                                        <option value="P">Pédiatrie</option>
                                    </> : props.type_kine == "P" ?
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
                    <label htmlFor='adresse'>Adresse</label>
                    <input  type="text" name='adresse' defaultValue={props.adresse}
                    onChange={evt=>setAdresse(evt.target.value)}/>
                    <label htmlFor='description_prob'>Détail problème</label>
                    {props.descriptProb ? 
                    <textarea name="description_prob" id="contenuMessage" cols="30" rows="5" 
                    onChange={evt=>setDetail_prob(evt.target.value)} 
                    defaultValue={props.descriptProb}/>:
                    <textarea name="description_prob" id="contenuMessage" cols="30" rows="5" 
                    onChange={evt=>setDetail_prob(evt.target.value)} 
                    placeholder="Décrivez brièvement la raison de votre présence chez Monsieur Penning"></textarea>
                    }

                    {props.autorisation ? 
                        <div className="autorisation_container">
                        {props.autorisation == "oui" ? <p><strong>Monsieur Penning a accès à votre dossier médical.</strong></p> : <p><strong>Monsieur Penning n'a pas accès à votre dossier médical.</strong></p>}
                        <br/></div> : 
                        <>
                        <label htmlFor="autorisation_dossier">Cochez pour autoriser Monsieur Penning à accéder à votre dossier médical.</label>
                        <input id="autorisation_dossier" className='radio_autorisation' type="checkbox" onChange={() => autorisationChecked()}/>
                        {isAutorisationChecked == "oui" ? <p>Monsieur Penning a accès à votre dossier.</p> : null}
                        <br/></>
                    }
                    {isAlert ? 
                        <p className='alert_fiche'>Veuillez compléter tous les champs !</p> : null
                    }
                    {!listingFiche_id.includes(user) ? 
                    <button className='validation_fiche_button' onClick={envoyer_fiche}>Envoyer</button>:
                    <button className='validation_fiche_button' onClick={modifier_fiche}>Modifier</button>
                }
                </div>
                <Footer/>
            </div>
        </>
    )
}

export default Fiche_Sante;
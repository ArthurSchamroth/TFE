import React, {useEffect, useState} from 'react';
import {useCookies} from 'react-cookie';
import Navbar from '../navbar/navbar';
import "./commentaires.css";
import {API} from '../../api-service';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPenToSquare, faCircleMinus} from '@fortawesome/free-solid-svg-icons'

function Commentaire(){
    
    const [token, setToken, deleteToken] = useCookies([('mr-token')]);
    const [listeCommentaires, setListeCommentaires] = useState([]);
    const [user, setUser] = useState('');
    const [commentaire, setAvis] = useState('');
    const [auteur_prenom, setPrenom] = useState('');
    const [auteur_nom, setNom] = useState('');
    const liste_id = []

    useEffect(() => {
        
        fetch("http://127.0.0.1:8000/api/commentaires/", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token 32fd88f63f1e9f169ea9c09d9dd19d46ae7a2f4f'
        }
        })
        .then(resp => resp.json())
        // Permet de remplir le tableau commentaires
        .then(resp => setListeCommentaires(resp))
        .catch(error => console.log(error))
    }, [])

    useEffect(()=>{
        API.gettingDataFromToken({'token': token['mr-token']})
            .then(function(resp){
                return resp.json()
            }).then(function(resp){
                setUser(resp['id']);
                setPrenom(resp['prenom']);
                setNom(resp['nom']);
            })
        
    }, []);

    const envoyerAvis = async() => {
        API.sendingAvis({user, auteur_nom, auteur_prenom, commentaire})
    }

    const supprimerAvis = async() => {
        console.log('je supprime')
    }

    const modifierAvis = async() => {
        console.log('je modifie')
    }

    return(
        <>
            <Navbar/>
            <div className="App">
                <h1>Bienvenue dans la section Avis !</h1>
                <h2>N'hésitez pas à laisser un avis respectueux sur votre expérience avec Mr Penning.</h2>
                {listeCommentaires.map(elem => {
                    liste_id.push(elem.user)
                })}
                <div className="listeCommentairesContainer">
                    {listeCommentaires.map(commentaire => {
                        return(
                            <div key={commentaire.id} className='commentaire_contenu'>
                                <div>
                                    {commentaire.auteur_prenom}
                                    {commentaire.auteur_nom}
                                    {commentaire.user}
                                    ({commentaire.date_heure})
                                </div>
                                <div className="texte_commentaire/">{commentaire.commentaire}</div>
                                <div className='comment_modifiable'>
                                    <FontAwesomeIcon icon={faPenToSquare} onClick={modifierAvis}/>
                                    <FontAwesomeIcon icon={faCircleMinus} onClick={supprimerAvis}/>
                                </div>
                            </div>
                        )
                    })}
                </div>
                {token['mr-token'] ? 
                    <div className='ajouter_commentaire'>
                        <label htmlFor="username">Ajouter avis</label><br/>
                        <input className='contenu_commentaire' type="text" placeholder="Quel est votre avis par rapport à votre expérience ?" value={commentaire}
                        onChange={evt => setAvis(evt.target.value)}/><br/>
                        <button onClick={envoyerAvis}>Envoyer avis</button>
                    </div>:
                    
                    <p>Veuillez vous connecter afin de laisser un avis.</p>
                }
            </div>
        </>
    )
}

export default Commentaire;
import React, {useEffect, useState} from 'react';
import {useCookies} from 'react-cookie';
import Navbar from '../navbar/navbar';
import "./commentaires.css";
import {API} from '../../api-service';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPenToSquare, faCircleMinus} from '@fortawesome/free-solid-svg-icons';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function Commentaire(props){
    
    const [token, setToken, deleteToken] = useCookies([('mr-token')]);
    const [listeCommentaires, setListeCommentaires] = useState([]);
    const [user, setUser] = useState('');
    const [commentaire, setAvis] = useState('');
    const [auteur_prenom, setPrenom] = useState('');
    const [auteur_nom, setNom] = useState('');
    const [isModification, setIsModification] = useState(false);
    const [selectedComment, setSelectedComment] = useState({});
    const [selectedCommentDel, setSelectedCommentDel] = useState({});
    const [auteurConnu, setAuteurConnu] = useState(false);
    const liste_id = []

    useEffect(() => {
        
        fetch("http://192.168.1.21:8000/api/commentaires/", {
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
        if (listeCommentaires != []){
            for(const i of listeCommentaires){
                if(i['auteur_prenom']+i['auteur_nom'] == props.username){
                    alert("Vous avez déjà écrit votre commentaire, vous pouvez toujours modifier celui-ci.")
                    window.location.href = '/commentaires'
                    break;
                }else{
                    console.log(user, auteur_nom, auteur_prenom, commentaire)
                    API.sendingAvis({user, auteur_nom, auteur_prenom, commentaire})
                    window.location.href = '/commentaires'
                }
            }
        }else{
            console.log('pas ok')
            API.sendingAvis({user, auteur_nom, auteur_prenom, commentaire})
            window.location.href = '/commentaires'
        }
        
    }

    const delClicked = comment => {
        API.deletingAvis({"id": comment.id})
        alert(`Commentaire de ${comment.auteur_prenom} ${comment.auteur_nom} supprimé !`)
        window.location.href = '/commentaires'
    }

    const editClicked = comment => {
        setIsModification(true)
        setAuteurConnu(true)
        setSelectedComment(comment)
    }

    const modifierAvis = async() => {
        if(commentaire == ''){
            alert("Veuillez entrer un commentaire valide !")
        }else{
                API.updatingAvis({'user':selectedComment.user, 'auteur_nom': selectedComment.auteur_nom,
                                'auteur_prenom': selectedComment.auteur_prenom, 'commentaire': commentaire})
                window.location.href = "/commentaires"
        }
        setIsModification(false)
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
                                    <div>{commentaire.auteur_prenom} {commentaire.auteur_nom}</div>  <div>{commentaire.date_heure.split('T')[0]} ({commentaire.date_heure.split('T')[1].split('.')[0].split('+')[0]})</div>
                                </div>
                                {props.username == "ArthurSchamroth" || props.username == "ThomasPenning" ?
                                    <>
                                        <div className="texte_commentaire/">{commentaire.commentaire}</div>
                                        <div className='comment_modifiable'>
                                            <Popup trigger={<button className='del_comm_btn'><FontAwesomeIcon icon={faCircleMinus}/></button>} position='bottom center'>
                                                <div>Êtes-vous sûr de vouloir supprimer ce commentaire ?</div>
                                                <button onClick={() => delClicked(commentaire)}>Supprimer</button>
                                            </Popup>
                                        </div>
                                    </>:
                                    commentaire.auteur_prenom+commentaire.auteur_nom == props.username ?
                                        <>
                                        {!isModification ? 
                                            <>
                                            <div className="texte_commentaire/">{commentaire.commentaire}</div>
                                            <div className='comment_modifiable'>
                                                <FontAwesomeIcon className='modif_comm_btn' icon={faPenToSquare} onClick={() => editClicked(commentaire)}/>
                                                <Popup trigger={<button className='del_comm_btn'><FontAwesomeIcon icon={faCircleMinus}/></button>} position='bottom center'>
                                                    <div>Êtes-vous sûr de vouloir supprimer ce commentaire ?</div>
                                                    <button  onClick={() => delClicked(commentaire)}>Supprimer</button>
                                                </Popup>
                                            </div>
                                            </>
                                            :
                                            <>
                                                <label htmlFor="username">Modifier votre commentaire</label><br/>
                                                <input className='contenu_commentaire' type="text" placeholder="Quel est votre avis par rapport à votre expérience ?" defaultValue={commentaire.commentaire}
                                                onChange={evt => setAvis(evt.target.value)}/><br/>
                                                <Popup trigger={<button>Modifier avis</button>} position='bottom center'>
                                                    <div>Êtes-vous sûr de votre nouveau commentaire ?</div>
                                                    <button onClick={modifierAvis}>Modifier avis</button>
                                                </Popup>
                                            </>
                                        }
                                        </> 
                                        : 
                                        <div className="texte_commentaire/">{commentaire.commentaire}</div>
                                    }
                                
                                </div>
                        )
                    })}
                </div>
                {token['mr-token'] && listeCommentaires != [] ? 
                    <> 
                        {!auteurConnu ? 
                            <div className='ajouter_commentaire'>
                                <label htmlFor="username">Ajouter avis</label><br/>
                                <textarea name="contenu_commentaire" id="contenu_commentaire" cols="31" rows="4" placeholder="Quel est votre avis par rapport à votre expérience ?"
                                onChange={evt => setAvis(evt.target.value)}
                                />
                                <button onClick={envoyerAvis}>Envoyer avis</button>
                            </div>:
                            null
                        }
                    </>
                    :
                    <p>Veuillez vous connecter afin de laisser un avis.</p>
                }
            </div>
        </>
    )
}

export default Commentaire;
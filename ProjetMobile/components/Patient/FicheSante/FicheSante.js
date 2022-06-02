import React, {useState, useEffect} from 'react';
import { API } from '../../api-service';
import { StyleSheet, Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

const TOKEN = process.env.REACT_APP_API_token

export default function FicheSante(props) {

    const [user, setUser] = useState('');
    const [userModifie, setUserModifie] = useState('');
    const [isUserModifie, setIsUserModifie] = useState(false);

    useEffect(async () => {
        await AsyncStorage.getItem("user")
            .then(resp => setUser(JSON.parse(resp)))
    }, [])

    useEffect(() => {
        API.gettingDataFromFiche({'username': user.UsernameUser})
        .then(function(resp){
            return resp.json()
        }).then(function(resp){
            console.log(resp)
            if(resp != user){
                setIsUserModifie(true)
                setUserModifie(resp)
            }
        })
    }, [user])

    useEffect(() => {
        console.log(userModifie)
    }, [userModifie])

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Voici votre fiche santé</Text>
                <View style={styles.fiche}>
                    {isUserModifie ?
                        <>
                            <Text style={styles.subtitle}>Nom :</Text><Text style={styles.texte}>{userModifie.nom}</Text>
                            <Text style={styles.subtitle}>Prénom :</Text><Text style={styles.texte}>{userModifie.prenom}</Text>
                            <Text style={styles.subtitle}>Adresse Mail :</Text><Text style={styles.texte}>{userModifie.adresse_mail}</Text>
                            <Text style={styles.subtitle}>Date de naissance :</Text><Text style={styles.texte}>{userModifie.naissance}</Text>
                            <Text style={styles.subtitle}>Type Soin :</Text><Text style={styles.texte}>
                                {userModifie.type_kine === 'K' ?
                                <Text>Kinésithérapie</Text> :
                                    userModifie.type_kine === 'KR' ? 
                                        <Text>Kinésithérapie Respiratoire</Text> : 
                                            userModifie.type_kine === 'OS' ?
                                            <Text>Ostéopatie</Text> :
                                                userModifie.type_kine === 'P' ?
                                                <Text>Pédiatrie</Text> : null
                                }
                            </Text>
                            <Text style={styles.subtitle}>Adresse :</Text><Text style={styles.texte}>{userModifie.adresse}</Text>
                            <Text style={styles.subtitle}>Description problème :</Text><Text style={styles.texte}>{userModifie.description_prob}</Text>
                            <Text style={styles.subtitle}>Autorisation consultation dossier médical :</Text><Text>
                                {user.AuthorisationConsultationUser === "oui" ?
                                    <Text style={styles.texte}>Monsieur Penning est autorisé à consulter votre dossier médical.</Text> :
                                    <Text style={styles.texte}>Monsieur Penning n'est pas autorisé à consulter votre dossier médical.</Text>
                                }
                            </Text>
                        </>
                        :
                        <>
                            <Text style={styles.subtitle}>Nom :</Text><Text style={styles.texte}>{user.NomUser}</Text>
                            <Text style={styles.subtitle}>Prénom :</Text><Text style={styles.texte}>{user.PrenomUser}</Text>
                            <Text style={styles.subtitle}>Adresse Mail :</Text><Text style={styles.texte}>{user.EmailUser}</Text>
                            <Text style={styles.subtitle}>Date de naissance :</Text><Text style={styles.texte}>{user.AgeUser}</Text>
                            <Text style={styles.subtitle}>Type Soin :</Text><Text>
                                {user.TypeKineUser === 'K' ?
                                <Text style={styles.texte}>Kinésithérapie</Text> :
                                        user.TypeKineUser === 'KR' ? 
                                        <Text style={styles.texte}>Kinésithérapie Respiratoire</Text> : 
                                            user.TypeKineUser === 'OS' ?
                                            <Text style={styles.texte}>Ostéopatie</Text> :
                                                user.TypeKineUser === 'P' ?
                                                <Text> style={styles.texte}Pédiatrie</Text> : null
                                }
                            </Text>
                            <Text style={styles.subtitle}>Adresse :</Text><Text style={styles.texte}>{user.AdresseUser}</Text>
                            <Text style={styles.subtitle}>Description problème :</Text><Text style={styles.texte}>{user.ProblemeUser}</Text>
                            <Text style={styles.subtitle}>Autorisation consultation dossier médical :</Text><Text>
                                {user.AuthorisationConsultationUser === "oui" ?
                                    <Text style={styles.texte}>Monsieur Penning est autorisé à consulter votre dossier médical.</Text> :
                                    <Text style={styles.texte}>Monsieur Penning n'est pas autorisé à consulter votre dossier médical.</Text>
                                }
                            </Text>
                        </>
                    }
                    
                </View>
            </View>
        </>
    );
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
        },
        subtitle:{
            fontWeight: 'bold',
            textDecorationLine: 'underline',
            fontSize: 16
        },
        fiche:{
            top: 50,
        },
        title:{
            color: 'white',
            fontSize:20,
            fontWeight: 'bold',
            textAlign: 'center',
            textDecorationStyle: 'solid',
            backgroundColor: '#005eb6',
            padding: 10,
        },
});

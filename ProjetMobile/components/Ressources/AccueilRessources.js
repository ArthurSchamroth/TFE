import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {REACT_APP_API_token} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AccueilRessources(props) {

    const [listeFiches, setListeFiches] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState();
    const [nomUser, setNomUser] = useState('');
    const [prenomUser, setPrenomUser] = useState('');
    const [isFiche, setIsFiche] = useState(false);

    useEffect(async () => {
        await AsyncStorage.getItem("user")
            .then(resp => setUser(JSON.parse(resp)))
    }, [AsyncStorage])

    useEffect(() => {
        if(user){
            setNomUser(user['NomUser'])
            setPrenomUser(user['PrenomUser'])
            if(user['FicheIdUser']){
                setIsFiche(true);
            }
        }else{
            setIsFiche(false);
        }
    }, [user])

    const decoClicked = async () => {
        console.log("déconnexion")
        await AsyncStorage.removeItem('user')
        props.navigation.navigate('Auth')
        return true
    }

    return (
        user && nomUser == "" ?
            <View style={styles.container}>
                <Text>Veuillez vous connecter afin d'avoir accès à vous ressources.</Text>
                <Button title='Se connecter' onPress={()=>decoClicked()} color="#939597"/>
            </View>
        :
        isFiche ?
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Bonjour {prenomUser} {nomUser}</Text>
                {prenomUser + nomUser == "ThomasPenning" || prenomUser + nomUser == "ArthurSchamroth" ? 
                    <View>
                        <View style={styles.buttonPresentation}>
                            <Button title='Gestion des patients' onPress={()=>props.navigation.navigate('AffichagePatients')} color="#3AACF6"/>
                        </View>
                        <View style={styles.buttonPresentation}>
                            <Button title='Gestion des rendez-vous' onPress={()=>props.navigation.navigate('RendezVous')} color="#3AACF6"/>
                        </View>
                        <View style={styles.buttonPresentation}>
                            <Button title='Messagerie' onPress={()=>props.navigation.navigate('Messagerie')} color="#3AACF6"/>
                        </View>
                    </View> : 
                    <View>
                        <View style={styles.buttonPresentation}>
                            <Button title='Voir votre fiche santé' onPress={()=>props.navigation.navigate('FicheSanté')} color="#3AACF6"/>
                        </View>
                        <View style={styles.buttonPresentation}>
                            <Button title="Aperçu de vos rendez-vous" onPress={()=>props.navigation.navigate('RendezVous')} color="#3AACF6"/>
                        </View>
                        <View style={styles.buttonPresentation}>
                            <Button title="Aperçu de votre routine" onPress={()=>props.navigation.navigate('Routine')} color="#3AACF6"/>
                        </View>
                        <View style={styles.buttonPresentation}>
                            <Button title='Messagerie' onPress={()=>props.navigation.navigate('Messagerie')} color="#3AACF6"/>
                        </View>
                    </View>
                }
            </View>
        </> : 
        <>  
            <Text style={styles.title}>Veuillez compléter votre fiche santé afin d'avoir accès à toutes les ressources de l'application.</Text>
            <View style={styles.buttonPresentation}>
                <Button title='Créer ma fiche santé' onPress={()=>props.navigation.navigate('NouvelleFiche')} color="#3AACF6"/>
            </View>
            <View style={styles.buttonPresentation}>
                <Button title='Se déconnecter' onPress={()=>decoClicked()} color="#3AACF6"/>
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
    item: {
        flex: 1,
        padding: 10,
        height: 50,
        backgroundColor: '#282C35'
    },
    title: {
        backgroundColor: '#005eb6',
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        width: 350,
        marginBottom: 10,
        padding: 10,
    },  
    itemText: {
        color: '#fff',
        fontSize: 24
    },
    buttonPresentation: {
        marginBottom: 10,
        width: 300,
    }
});

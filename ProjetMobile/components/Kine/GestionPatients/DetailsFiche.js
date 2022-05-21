import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Details(props) {

    const [listeFiches, setListeFiches] = useState([]);

    fetch(`https://tfe-osteoclic.herokuapp.com/api/fichePatient`, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${process.env.REACT_APP_API_token}`
        }
    })
    .then(resp => resp.json())
    .then(resp => setListeFiches(resp))

    const fiche = props.navigation.getParam('fiche', null)

    return (
        <View style={styles.container}>
            <Text style={styles.titre}>Bienvenue sur la fiche de {fiche.prenom} {fiche.nom}</Text>
            <Text style={styles.fiche}>
                <Text style={styles.sous_titre}>Nom :</Text> {fiche.nom} {'\n'}{'\n'}
                <Text style={styles.sous_titre}>Prénom :</Text> {fiche.prenom} {'\n'}{'\n'}
                <Text style={styles.sous_titre}>Date de naissance :</Text> {fiche.age} {'\n'}{'\n'}
                <Text style={styles.sous_titre}>Adresse Mail :</Text> {fiche.adresse_mail} {'\n'}{'\n'}
                <Text style={styles.sous_titre}>Description Problème :</Text> {fiche.description_probleme} {'\n'}{'\n'}
                <Text style={styles.sous_titre}>Adresse :</Text> {fiche.adresse} {'\n'}{'\n'}
                <Text style={styles.sous_titre}>Type de soin :</Text> {fiche.type_kine == "KR" ? 
                    "Kinésithérapie Respiratoire" : fiche.type_kine == "K" ? "Kinésithérapie" : fiche.type_kine == "P" ? "Pédiatrie" : "Osthéopatie"
                }
            </Text>
        </View>
    );
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            paddingTop: 100,
        },
        titre: {
            textDecorationLine: 'underline',
            fontSize: 20,
            textAlign: 'center'
        },
        fiche: {
            paddingTop: 20,
            fontSize: 16,
            borderStyle: 'solid'
        },
        sous_titre: {
            textDecorationLine: 'underline'
        }
    
});

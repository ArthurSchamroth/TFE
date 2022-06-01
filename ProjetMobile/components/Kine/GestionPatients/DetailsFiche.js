import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import { API } from '../../api-service';

export default function Details(props) {

    const [listeFiches, setListeFiches] = useState([]);
    const [idSelected, setIdSelected] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isVerificationRunning, setIsVerificationRunning] = useState(false);

    fetch(`https://tfe-osteoclic.herokuapp.com/api/fichePatient`, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${process.env.REACT_APP_API_token}`
        }
    })
    .then(resp => resp.json())
    .then(resp => setListeFiches(resp))

    const fiche = props.navigation.getParam('fiche', null)

    const handleModal = () => { 
        setIsModalVisible(!isModalVisible);
        props.navigation.navigate('Ressources')
    }

    const delPatientClicked = id => {
        setIsVerificationRunning(true);
        setIsModalVisible(false);
        setIdSelected(id)
        
    }

    const annulerClicked = () => {
        setIsModalVisible(false);
        setIsVerificationRunning(false);
    }

    const delPatientClickedConfirmed = () => {
        setIsVerificationRunning(false);
        console.log(idSelected)
        API.deletingFiche({id: idSelected});
        setIsModalVisible(true);
        
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titre}>Bienvenue sur la fiche de {fiche.prenom} {fiche.nom}</Text>
            <Text style={styles.fiche}>
                <Text style={styles.sous_titre}>Nom</Text> : {fiche.nom} {'\n'}{'\n'}
                <Text style={styles.sous_titre}>Prénom</Text> : {fiche.prenom} {'\n'}{'\n'}
                <Text style={styles.sous_titre}>Date de naissance</Text> : {fiche.age} {'\n'}{'\n'}
                <Text style={styles.sous_titre}>Adresse Mail</Text> : {fiche.adresse_mail} {'\n'}{'\n'}
                <Text style={styles.sous_titre}>Description Problème</Text> : {fiche.description_probleme} {'\n'}{'\n'}
                <Text style={styles.sous_titre}>Adresse</Text> : {fiche.adresse} {'\n'}{'\n'}
                <Text style={styles.sous_titre}>Type de soin</Text> {fiche.type_kine == "KR" ? 
                    "Kinésithérapie Respiratoire" : fiche.type_kine == "K" ? "Kinésithérapie" : fiche.type_kine == "P" ? "Pédiatrie" : "Osthéopatie" 
                }{'\n'}{'\n'}
                Supprimer Patient : <Icon name='close' size={60} color='red' onPress={() => delPatientClicked(fiche.user)}/>
            </Text>
            <View style={styles.container2}>
                <Modal isVisible={isVerificationRunning}>
                    <View style={styles.popup}>
                    <Text style={styles.text}>Êtes-vous sûr de vouloir supprimer cette fiche patient ?</Text>
                    <Button color='#33414A' font style={styles.bouton} title="Annuler" onPress={annulerClicked} />
                    <Button color='#33414A' font style={styles.bouton} title="Supprimer" onPress={() => delPatientClickedConfirmed()} />
                    </View>
                </Modal>
            </View>
            <View style={styles.container2}>
                <Modal isVisible={isModalVisible}>
                    <View style={styles.popup}>
                    <Text style={styles.text}>La fiche patient a été correctement supprimée</Text>
                    <Button color='#33414A' font style={styles.bouton} title="Fermer" onPress={handleModal} />
                    </View>
                </Modal>
            </View>
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
        },
        container2: {
            alignItems: "center",
            justifyContent: "center",
        },
        title: {
            fontSize: 20,
            fontWeight: "bold",
        },
        text: {
            fontSize: 16,
            fontWeight: "400",
            textAlign: "center",
            color: 'white',
            padding: 10,
            marginBottom: 15
        },
        separator: {
            marginVertical: 30,
            height: 1,
            width: "80%",
        },
        popup: {
            height: 200,
            alignItems: 'center',
            justifyContent: "center",
            textAlign: 'center',
            backgroundColor: '#282C35',
            borderRadius: 70,
        }
});

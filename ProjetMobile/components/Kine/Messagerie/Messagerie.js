import React, {useState, useEffect} from 'react';
import { API } from '../../api-service';
import { StyleSheet, Text, View, Button, FlatList, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import Modal from 'react-native-modal';

const TOKEN = process.env.REACT_APP_API_token

export default function Messagerie(props) {

    const [username, setUsername] = useState('');
    const [ficheId, setFicheId] = useState('');
    const [isVoirAuteurs, setIsVoirAuteur] = useState(false);
    const [auteurSelected, setAuteurSelected] = useState('');
    const [listeAuteurs, setListeAuteurs] = useState([]);
    const [listeMessagesSpecific, setListeMessagesSpecific] = useState([]);
    const [user, setUser] = useState();
    const [nomUser, setNomUser] = useState('');
    const [isVoirMessageDuKine, setIsVoirMessageDuKine] = useState(false);
    const [isRepondre, setIsRepondre] = useState(false);
    const [messageRecus, setMessagesRecus] = useState([]);
    const [destPossibles, setDestPossibles] = useState([]);
    const [destPossibleValues, setDestPossiblesValues] = useState([]);
    const [destinataireChoisi, setDestinataireChoisi] = useState('');
    const [contenuMessage, setContenuMessage] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(async () => {
        await AsyncStorage.getItem("user")
            .then(resp => setUser(JSON.parse(resp)))
    }, [])

    useEffect(() => {
        console.log('nooooooooooon', user)
    }, [user])

    const handleModal = () => { 
        setIsModalVisible(!isModalVisible);
        props.navigation.navigate('Ressources')
    }

    useEffect(() => {
        const liste = []
        const liste_value = []
        API.gettingEveryFiche()
            .then(function(resp){
                return resp.json()
            }).then(function(resp){
                for(const i of resp){
                    const username = i['prenom']+i['nom']
                    liste.push(username)
                    liste_value.push({value: username, label: username})
                }
                setDestPossibles(liste)
                setDestPossiblesValues(liste_value)
            })
    }, [user])

    useEffect(() => {
        if(user){
            setFicheId(user['FicheIdUser']);
            setUsername(user["PrenomUser"] + user["NomUser"])
        }
    }, [user])

    const voirMessagesClicked = async () => {
        setIsVoirAuteur(!isVoirAuteurs)
        API.getAuthors().then(function(resp){
            return resp.json()
        }).then(function(resp){
            setListeAuteurs(resp['result'])
        })
    }    
    
    const auteurClicked = auteur => {
        setAuteurSelected(auteur.auteur)
        const auteur_id = auteur.auteur_id
        API.getMsgFromAAuthor({'user': auteur_id}).then(function(resp){
            return resp.json()
        }).then(function(resp){
            console.log("111", resp)
            setListeMessagesSpecific(resp['result']);
        })
    }

    const voirMessagesClickedPatient = () => {
        API.gettingMessageSpecific({'dest': user.UsernameUser})
        .then(function(resp){
            return resp.json()
        }).then(function(resp){
            setMessagesRecus(resp['result'])
        })
        setIsVoirMessageDuKine(!isVoirMessageDuKine);
        setIsRepondre(false);
    }

    const RepondreMessageClicked = () => {
        setIsRepondre(!isRepondre)
        setIsVoirAuteur(false);
    }

    const envoyerMessage = () => {
        console.log(destinataireChoisi, contenuMessage)
        var today = new Date();
        var date = today.getFullYear()  + "-" + today.getMonth() + "-" + today.getDate()
        var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
        API.sendingMessage({
            'user': user.FicheIdUser, 'date': date,'heure': time,  
            'contenu': contenuMessage, 'dest': destinataireChoisi
        })
        setIsModalVisible(true);
    }

    return (
        <>
        <View>
            <Text style={styles.title}>Voici votre messagerie : {nomUser}</Text>
            {username == "ThomasPenning" || username == "ArthurSchamroth" ? 
                <>
                <Button title='Voir mes messages' onPress={()=>voirMessagesClicked()} color="#939597"/>  
                <Button title='Envoyez un message' onPress={()=>RepondreMessageClicked()} color="#939597"/>
                </> : 
                <>
                    <Button title='Voir mes messages' onPress={()=>voirMessagesClickedPatient()} color="#939597"/> 
                    {isVoirMessageDuKine ?
                        <View style={styles.container}>
                        <ScrollView style={styles.container_messages}>
                        {messageRecus.map(message => {
                            return(
                                <View style={styles.message} key={message.id}>
                                    <Text>Auteur : Thomas Penning</Text>
                                    <Text>Date : {message.date}</Text>
                                    <Text>Heure : {message.heure}</Text>
                                    <Text>Contenu : {message.contenu}</Text>
                                </View>
                            )
                        })}
                        </ScrollView>
                        </View>
                        : isRepondre ?
                            <>
                                <Text>Coucou</Text>
                            </>
                            : null
                    }
                </>
            }
        </View>
        {isVoirAuteurs ?
            listeAuteurs.length != 0 ? 
                <>
                <FlatList 
                data={listeAuteurs}
                renderItem = {({item}) => (
                    <TouchableOpacity onPress={() => auteurClicked(item)}>
                        <View style={styles.item}>
                            <Text style={styles.itemText}>{item.auteur}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
                />
                <ScrollView>
                    {listeMessagesSpecific.map(message => {
                        return(
                            <View style={styles.message} key={message.id}>
                                <Text>Auteur : {auteurSelected} Date et Heure : {message.date} {message.heure}</Text>
                                <Text>Contenu : {message.contenu}</Text>   
                            </View>
                        )
                    })}
                </ScrollView>
                </>
            : <Text>Aucun patient ne vous a envoyé de message !</Text> 
            : isRepondre ?
                <>
                    <RNPickerSelect
                        onValueChange={(value) => setDestinataireChoisi(value)}
                        items={destPossibleValues}
                    />
                    <Text>Entrez votre message :</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder="Votre message"
                        onChangeText={text => setContenuMessage(text)}
                        value={contenuMessage}
                    />
                    <Button color="#6B889B" style={{borderRadius: 10}} onPress={()=>envoyerMessage()} title="Envoyer"/>
                    <View style={styles.container2}>
                        <Modal isVisible={isModalVisible}>
                            <View style={styles.popup}>
                            <Text style={styles.text}>Le message a été correctement envoyé !</Text>
                            <Button color='#33414A' font style={styles.bouton} title="Fermer" onPress={handleModal} />
                            </View>
                        </Modal>
                </View>
                </> : null
        }
        </>
    );
}

    const styles = StyleSheet.create({
        container: {
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
        item: {
            marginTop: 10,
            padding: 10,
            height: 50,
            backgroundColor: '#282C35'
        },
        title: {
            backgroundColor: '#005eb6',
            fontSize: 20,
            textAlign: 'center',
            color: 'white',
            marginBottom: 10
        },  
        itemText: {
            color: '#fff',
            fontSize: 24,
            textAlign: 'center'
        },
        container_all_msgs:{
            justifyContent: 'center'
        },
        container_msg: {
            backgroundColor: 'red',
            width: 250,
            borderColor: 'black'
        },
        container_messages:{
            width: 200,
        },
        message:{
            borderColor: 'black',
            borderStyle: 'solid',
            borderWidth: 2,
            padding: 5,
            marginTop: 10,
            marginBottom: 10
        },
        container2: {
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: 'white',
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

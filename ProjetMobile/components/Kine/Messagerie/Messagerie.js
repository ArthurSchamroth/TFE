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
    const [isDetinataireVide, setIsDetinataireVide] = useState(false);
    const [isContenuVide, setIsContenuVide] = useState(false);
    const [isRepondreAuKine, setIsRepondreAuKine] = useState(false);

    useEffect(async () => {
        await AsyncStorage.getItem("user")
            .then(resp => setUser(JSON.parse(resp)))
    }, [])

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

    const RepondreMessageClickedPatient = () => {
        console.log('okok')
        setIsVoirMessageDuKine(false);
        setIsRepondreAuKine(!isRepondreAuKine)
    }

    const envoyerMessageAuKine = () => {
        if(contenuMessage == ''){
            setIsContenuVide(true)
        }else{
            console.log(contenuMessage)
            var today = new Date();
            var date = today.getFullYear()  + "-" + today.getMonth() + "-" + today.getDate()
            var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
            API.sendingMessage({
                'user': user.FicheIdUser, 'date': date,'heure': time,  
                'contenu': contenuMessage, 'dest': 'ThomasPenning'
            })
            setIsModalVisible(true);
        }
    }

    const envoyerMessage = () => {
        if(destinataireChoisi == ''){
            setIsDetinataireVide(true);
        }
        if(contenuMessage == ''){
            setIsDetinataireVide(false);
            setIsContenuVide(true);
        }
        else{
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
        
    }

    return (
        <>
        <View style={{alignItems: 'center', backgroundColor:'white'}}>
            
            {username == "ThomasPenning" || username == "ArthurSchamroth" ? 
                <>
                    <View style={styles.container_liste}>
                        <Text style={styles.title}>Voici votre messagerie : {nomUser}</Text>
                        <View style={styles.item}>
                            <Button title='Voir mes messages' onPress={()=>voirMessagesClicked()} color="#3AACF6"/>
                        </View>
                        <View style={styles.item}>
                            <Button title='Envoyez un message' onPress={()=>RepondreMessageClicked()} color="#3AACF6"/>
                        </View>
                    </View>
                </> : 
                <View style={{backgroundColor: 'white', width: 300}}>
                    <View style={styles.container_liste}>
                        <Text style={styles.title}>Voici votre messagerie : {nomUser}</Text>
                        <View style={styles.item}>
                            <Button title='Voir mes messages' onPress={()=>voirMessagesClickedPatient()} color="#3AACF6"/> 
                        </View>
                        <View style={styles.item}>
                            <Button title='Envoyez un message' onPress={()=>RepondreMessageClickedPatient()} color="#3AACF6"/>
                        </View>
                    </View>
                    <View>
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
                        : isRepondreAuKine ?
                            <>
                                <View>
                                    <Text style={{fontSize: 20, marginTop: 10, fontWeight: 'bold', textDecorationLine: 'underline'}}>Destinataire :</Text>
                                    <Text style={{fontSize: 18}}>Thomas Penning</Text>
                                    <Text style={{fontSize: 20, marginBottom: 10, fontWeight: 'bold', textDecorationLine: 'underline'}}>Entrez votre message :</Text>
                                    <TextInput 
                                        style={styles.input}
                                        placeholderTextColor= 'white'
                                        placeholder="Votre message"
                                        onChangeText={text => setContenuMessage(text)}
                                        value={contenuMessage}
                                        color='black'
                                    />
                                    <View style={{marginTop: 10, marginBottom: 10}}>
                                        <Button color="#005eb6" style={{borderRadius: 10,}} onPress={()=>envoyerMessageAuKine()} title="Envoyer"/>
                                    </View>
                                    {isContenuVide ? <Text style={styles.erreur}>Veuillez entre un message valide</Text> : null} 
                                </View>
                                <View style={styles.container2}>
                                    <Modal isVisible={isModalVisible}>
                                        <View style={styles.popup}>
                                        <Text style={styles.text}>Le message a été correctement envoyé !</Text>
                                        <Button color='#005eb6' font style={styles.bouton} title="Fermer" onPress={handleModal} />
                                        </View>
                                    </Modal>
                                </View>
                            </>
                            : null
                    }
                    </View>
                </View>
            }
        </View>
        {isVoirAuteurs ?
            listeAuteurs.length != 0 ? 
                <>
                <View style={styles.container_liste}>
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
                <ScrollView >
                    {listeMessagesSpecific.map(message => {
                        return(
                            <View style={styles.message} key={message.id}>
                                <Text style={{fontWeight: 'bold'}}>Auteur : </Text><Text>{auteurSelected}</Text><Text style={{fontWeight: 'bold'}}>Date et Heure : </Text><Text>{message.date} {message.heure}</Text>
                                <Text style={{fontWeight: 'bold'}}>Contenu : </Text><Text>{message.contenu}</Text>   
                            </View>
                        )
                    })}
                </ScrollView>
                </View>
                </>
            : <Text>Aucun patient ne vous a envoyé de message !</Text> 
            : isRepondre ?
                <>  
                    <Text style={{marginTop: 10, fontWeight: 'bold', textDecorationLine: 'underline', left: 20}}>Destinataire :</Text>
                    <RNPickerSelect
                        onValueChange={(value) => setDestinataireChoisi(value)}
                        items={destPossibleValues}
                        placeholder={{ label: "Sélectionner votre destinataire", value: null, color: '#3AACF6' }}
                        style={pickerStyle}
                    />
                    <Text style={{marginBottom: 10, fontWeight: 'bold', textDecorationLine: 'underline', left: 20}}>Entrez votre message :</Text>
                    
                    <View style={{marginRight:10, marginLeft:10, marginBottom: 10, borderRadius: 10}}>
                        <TextInput 
                        style={styles.input}
                        placeholderTextColor="white"
                        placeholder="Votre message"
                        onChangeText={text => setContenuMessage(text)}
                        value={contenuMessage}
                        color='black'
                        />    
                    </View>
                    <View style={{margin: 10}}>
                        <Button color="#005eb6" style={{borderRadius: 10}} onPress={()=>envoyerMessage()} title="Envoyer"/>
                    </View>
                    {isDetinataireVide ?
                        <Text style={styles.erreur}>Veuillez sélectionner un destinataire !</Text> : isContenuVide ? <Text style={styles.erreur}>Veuillez entre un message valide</Text> : null
                    }
                    <View style={styles.container2}>
                        <Modal isVisible={isModalVisible}>
                            <View style={styles.popup}>
                            <Text style={styles.text}>Le message a été correctement envoyé !</Text>
                            <Button color='#005eb6' font style={styles.bouton} title="Fermer" onPress={handleModal} />
                            </View>
                        </Modal>
                    </View>
                </> : null
        }
        </>
    );
}

const pickerStyle = {
	inputIOS: {
		color: 'black',
		paddingTop: 13,
		paddingHorizontal: 10,
		paddingBottom: 12,
        marginLeft: 10
	},
	inputAndroid: {
		color: 'black',
        marginLeft: 10
	},
	placeholderColor: 'white',
	underline: { borderTopWidth: 0 },
	icon: {
		position: 'absolute',
		backgroundColor: 'transparent',
		borderTopWidth: 5,
		borderTopColor: '#00000099',
		borderRightWidth: 5,
		borderRightColor: 'transparent',
		borderLeftWidth: 5,
		borderLeftColor: 'transparent',
		width: 0,
		height: 0,
		top: 20,
		right: 15,
	},
};

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
        backgroundColor: '#3AACF6',
    },
    title: {
        backgroundColor: '#005eb6',
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        padding: 10,
        marginBottom: 10,
        width: 350
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
        width: 350,
        left: 50
    },
    message:{
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 2,
        padding: 5,
        marginTop: 10,
        marginBottom: 10,
        width: 250
    },
    input: {
        backgroundColor: '#3AACF6',
        width: '100%',
        height: 50,
        color: 'white',
        padding: 5
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
        backgroundColor: '#3AACF6',
        borderRadius: 70,
    },
    erreur: {
        marginTop: 15,
        marginBottom: 15,
        color: 'red',
        fontWeight: 'bold'
    },
    item: {
        height: 35,
        backgroundColor: '#3AACF6',
        marginBottom: 10,
        width: 200
    }, 
    container_liste:{
        alignItems: 'center'
    },
});

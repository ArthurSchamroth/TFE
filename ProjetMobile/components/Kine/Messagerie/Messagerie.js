import React, {useState, useEffect} from 'react';
import { API } from '../../api-service';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

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

    useEffect(async () => {
        await AsyncStorage.getItem("user")
            .then(resp => setUser(JSON.parse(resp)))
    }, [])

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

    useEffect(() => {
        console.log("voici la liste", listeMessagesSpecific)
    }, [listeMessagesSpecific])

    return (
        <>
        <View>
            <Text style={styles.title}>Voici votre accueil de rendez-vous : {nomUser}</Text>
            {username == "ThomasPenning" || username == "ArthurSchamroth" ? 
                <Button title='Voir mes messages' onPress={()=>voirMessagesClicked()} color="#939597"/> : null
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
                            <View style={styles.container_msg} key={message.id}>
                                <Text>Auteur : {auteurSelected} Date et Heure : {message.date} {message.heure}</Text>
                                <Text>Contenu : {message.contenu}</Text>   
                            </View>
                        )
                    })}
                </ScrollView>
                </>
            : <Text>Aucun patient ne vous a envoyé de message !</Text> 
            : null
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
        }
});

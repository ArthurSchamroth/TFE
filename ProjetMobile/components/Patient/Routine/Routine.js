import React, {useState, useEffect} from 'react';
import { API } from '../../api-service';
import { StyleSheet, Text, View, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

const TOKEN = process.env.REACT_APP_API_token

export default function Routine(props) {

    const [user, setUser] = useState('');
    const [routine, setRoutine] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [videos, setVideos] = useState([]);
    const [isRoutineVide, setIsListeVide] = useState(false);
    
    useEffect(async () => {
        await AsyncStorage.getItem("user")
            .then(resp => setUser(JSON.parse(resp)))
    }, [])

    useEffect(async () => {
        API.getRoutineSpecificUser({'user': user.FicheIdUser}).then(function(resp){
            return resp.json()
        }).then(function(resp){
            console.log('test', resp)
            if(resp['result'].length == 0){
                setIsListeVide(true);
                setIsLoading(false);
            }else{
                if(resp['result'] != 'pas de user'){
                    setRoutine(resp['result'])
                    const listeVideos = []
                    for(const i of resp['result'][0]['videos']){
                        const object = {'titre': i['titre'], 'url': i['url']}
                        listeVideos.push(object)
                    }
                    setVideos(listeVideos)
                    setIsLoading(false);
            }
            }
        })
    }, [user])

    return (
        <>
            {isLoading ?
                null :
                <View style={styles.container}>
                    <View>
                        {isRoutineVide ? 
                            <Text style={styles.title}>Vous n'avez pas encore de routine, vous pouvez contacter Monsieur Penning pour en obtenir une.</Text> : 
                            <>
                                <Text style={styles.title}>Voici votre routine.</Text>
                                <Text style={styles.titre_routine}>{routine[0].titre_routine}</Text>
                                <Text style={styles.subtitle}>Description routine : </Text><Text style={styles.texte}>{routine[0].description_detaillee}</Text>
                                <Text style={styles.subtitle}>Vidéo(s) d'exercices : </Text>
                                <View>
                                    {videos.map(video =>{
                                        return(
                                            <View key={video.id}>
                                                <View>
                                                    <Text style={styles.titre_video}>Titre : </Text>
                                                    <Text style={styles.titre_video}>{video.titre}</Text>
                                                </View>
                                                <View>
                                                    <Text style={styles.url_video} onPress={()=>Linking.openURL(`${video.url}`)}>Cliquez pour être redirigé vers la vidéo.</Text>
                                                </View>
                                            </View>
                                            
                                        )
                                    })}
                                </View>
                            </>
                        }
                    </View>
                </View>
            }
            
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
            fontSize: 16,
            marginBottom: 10,
            color:'black'
        },
        texte:{
            color:'black',
            marginBottom: 5,
        },
        titre_video:{
            color: 'black',
            fontWeight: 'bold',
        },
        url_video:{
            color:'#005eb6',
            textDecorationLine: 'underline',
            marginBottom: 20
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
        titre_routine:{
            color:'black',
            marginTop:20,
            fontSize:20,
            fontWeight:'bold',
        }

});

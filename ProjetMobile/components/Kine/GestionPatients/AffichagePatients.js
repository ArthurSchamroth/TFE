import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {REACT_APP_API_token} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN = process.env.REACT_APP_API_token

export default function AffichagePatients(props) {

    const [listeFiches, setListeFiches] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState();
    const [nomUser, setNomUser] = useState('');

    useEffect(async () => {
        await AsyncStorage.getItem("user")
            .then(resp => setUser(JSON.parse(resp)))
    }, [])

    useEffect(() => {
        if(user){
            setNomUser(user['NomUser'])
        }
    }, [user])

    useEffect(() => {
        if(!isLoading){
            fetch(`https://tfe-osteoclic.herokuapp.com/api/fichePatient`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${REACT_APP_API_token}`
                }
            })
            .then(resp => resp.json())
            .then(resp => setListeFiches(resp))
            .catch(error => console.log(error))
            setIsLoading(true)
        }
    }, [])
    

    const ficheClicked = (fiche) => {
        props.navigation.navigate("Details", {fiche:fiche})
    }

    return (
        <View style={{alignItems: 'center'}}>
            <Text style={styles.title}>Voici vos patients.</Text>
            <View style={{width: 300}}>
            {listeFiches !=  [] ? 
                <FlatList 
                    data={listeFiches}
                    renderItem = {({item}) => (
                        <>
                            {item.prenom + item.nom == "ThomasPenning" || item.prenom + item.nom == "ArthurSchamroth" ? 
                                null :
                                <TouchableOpacity onPress={() => ficheClicked(item)}>
                                    <View style={styles.item}>
                                        <Text style={styles.itemText}>{item.nom} {item.prenom}</Text>
                                    </View>
                                </TouchableOpacity>
                            }
                            
                        </>
                        
                    )}
                    keyExtractor={(item, index) => index.toString()}
                /> 
                : null
            }
            </View>
            <StatusBar style="auto" />
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        flex: 1,
        padding: 10,
        height: 50,
        backgroundColor: '#3AACF6',
        marginBottom: 10,
    },
    title: {
        backgroundColor: '#005eb6',
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        marginBottom: 10,
        padding: 10,
        fontWeight: 'bold',
        width: 350
    },  
    itemText: {
        color: '#fff',
        fontSize: 24,
        textAlign: 'center'
    }
    
});

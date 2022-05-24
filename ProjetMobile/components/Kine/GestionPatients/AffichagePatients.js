import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {REACT_APP_API_token} from '@env';

const TOKEN = process.env.REACT_APP_API_token
console.log(TOKEN)

export default function AffichagePatients(props) {

    const [listeFiches, setListeFiches] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
        <View>
            <Text style={styles.title}>Bienvenue dans l'application mobile de Monsieur Penning</Text>
            {listeFiches !=  [] ? 
                <FlatList 
                    data={listeFiches}
                    renderItem = {({item}) => (
                        <TouchableOpacity onPress={() => ficheClicked(item)}>
                            <View style={styles.item}>
                                <Text style={styles.itemText}>{item.nom} {item.prenom}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                /> 
                : null
            }
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
        fontSize: 24
    }
    
});

import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function AffichagePatients(props) {

    const [patients, setPatients] = useState([]);

    useEffect(() => {

        fetch("http://192.168.1.21:8000/api/fichePatient/", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'authorization': 'Token 32fd88f63f1e9f169ea9c09d9dd19d46ae7a2f4f'
            }
        })
        .then(jsonResponse => setPatients(jsonResponse))
        .then(jsonResponse => console.log(jsonResponse))
        .catch(error => console.log(error))
    }, [])

    return (
        <View style={styles.container}>
            <Text>Bienvenue dans l'application mobile de Monsieur Penning</Text>
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
    }
});

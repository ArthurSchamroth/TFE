import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Edit(props) {

    const [listeFiches, setListeFiches] = useState([]);

    fetch(`http://192.168.1.21:8000/api/fichePatient`, {
        method: 'GET',
        headers: {
            'Authorization': 'Token 32fd88f63f1e9f169ea9c09d9dd19d46ae7a2f4f'
        }
    })
    .then(resp => resp.json())
    .then(resp => setListeFiches(resp))

    const fiche = props.navigation.getParam('fiche', null)

    return (
        <View style={styles.container}>
            <Text>EDIT</Text>
        </View>
    );
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            paddingTop: 100,
        }
    
});

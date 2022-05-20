import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Edit(props) {

    const [listeFiches, setListeFiches] = useState([]);

    fetch(`http://127.0.0.1:8000/api/fichePatient`, {
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

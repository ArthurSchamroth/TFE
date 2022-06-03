import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Home(props, route) {

    const [isLoading, setIsLoading] = useState(true);
    const [currentToken, setToken] = useState()
    const [nomUser, setNomUser] = useState("");
    const [prenomUser, setPrenomUser] = useState("");
    const [user, setUser] = useState();
    const [isConnected, setIsConnected] = useState(false);

    useEffect(async () => {
        await AsyncStorage.getItem("user")
            .then(resp => setUser(JSON.parse(resp)))
    }, [])

    const token = props.navigation.getParam('token', null)

    useEffect(() => {
        if(token){
            console.log('token')
            setIsConnected(true)
            setIsLoading(false);
        }
    })

    useEffect(async () => {
        if(user){
            setToken(user['TokenUser']);
            setNomUser(user['NomUser']);
            setPrenomUser(user['PrenomUser']) ;
            setIsLoading(false);
        }
        
    }, [user])

    const decoClicked = async () => {
        console.log("déconnexion")
        await AsyncStorage.removeItem('user')
        props.navigation.navigate('Auth')
        return true
    }

    const ressourcesClicked = () => {
        props.navigation.navigate('Ressources')
    }

    return (
        !isLoading ?
        <View style={styles.container}>
            {isConnected ?
                <>  
                    <Text>Bienvenue, voici vos différentes options.</Text>
                    <Button title='Accès à mes ressources' onPress={()=>ressourcesClicked()} color="#939597"/>
                    <Button title='Déconnexion' onPress={()=>decoClicked()} color="#939597"/>

                </> :
                <>
                    <Text>Bienvenue dans l'application mobile de Monsieur Penning</Text>
                    <Button title='Connexion' onPress={()=>props.navigation.navigate('Auth')} color="#939597"/>
                </>
            } 
            <StatusBar style="auto" />
        </View> : 
        <>
            <View style={styles.container}>
                <Text>Bienvenue dans l'application mobile de Monsieur Penning</Text>
                <Button title='Connexion' onPress={()=>props.navigation.navigate('Auth')} color="#939597"/>
            </View>
        </>
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

import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
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
                    <Image style={{width: 150, height: 150, marginBottom: 60}} source={require('./img/photo_presentation.png')}/>
                    <View style={styles.containerPresentation}>
                        <Text style={styles.textPresentation}>Bienvenue, voici vos différentes options.</Text>
                        <View style={styles.buttonPresentation}>
                            <Button title='Accès à mes ressources' onPress={()=>ressourcesClicked()} color="#3AACF6"/>
                        </View>
                        <View style={styles.buttonPresentation}>
                            <Button  title='Déconnexion' onPress={()=>decoClicked()} color="#3AACF6"/>
                        </View>
                        
                    </View>

                </> :
                <>
                    <Image style={{width: 150, height: 150, marginBottom: 60}} source={require('./img/photo_presentation.png')}/>
                    <View style={styles.containerPresentation}>
                        <Text style={styles.textPresentation}>Bienvenue dans l'application mobile de Monsieur Penning !</Text>
                        <Text style={styles.textPresentation}>Vous pouvez retrouver ici des informations liées à votre suivi.</Text>
                        <Text style={styles.textPresentation}>Connectez ou inscrivez vous !</Text>
                        <Button title='Connexion' onPress={()=>props.navigation.navigate('Auth')} color="#3AACF6"/>
                    </View>
                    
                </>
            } 
            <StatusBar style="auto" />
        </View> : 
        <>
            <View style={styles.container}>
                <Image style={{width: 150, height: 150, marginBottom: 60}} source={require('./img/photo_presentation.png')}/>
                <Text style={styles.textPresentation}>Bienvenue dans l'application mobile de Monsieur Penning.</Text>
                <Text style={styles.textPresentation}>Vous pouvez retrouver ici des informations liées à votre suivi.</Text>
                <Text style={styles.textPresentation}>Connectez ou inscrivez vous !</Text>
                <Button title='Connexion' onPress={()=>props.navigation.navigate('Auth')} color="#3AACF6"/>
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
    },
    containerPresentation:{
        width: 300,
    },
    textPresentation:{
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 20,
    },
    buttonPresentation: {
        marginBottom: 10
    }
});

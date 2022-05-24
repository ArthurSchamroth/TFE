import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Home(props, route) {

    const [currentToken, setToken] = useState(props.navigation.getParam('token', null))

    const getData = async() => {
        token = await AsyncStorage.getItem("Appli_Token")
        if(token){
            console.log(token)
        }else{
            console.log("non")
        }
    }

    useEffect(() => {
        const nom = AsyncStorage.getItem("NomUser")
        console.log("testesteste" + nom._U)
    }, [AsyncStorage])

    const decoClicked = () => {
        console.log("déconnexion")
        props.navigation.navigate('Auth')
    }

    return (
        <View style={styles.container}>
            <Text>Bienvenue dans l'application mobile de Monsieur Penning</Text>
            {currentToken ?
                <Button title='Déconnexion' onPress={()=>decoClicked()} color="#939597"/> :
                <Button title='Connexion' onPress={()=>props.navigation.navigate('Auth')} color="#939597"/>
            } 
            <Button title='AffichagePatients' onPress={()=>props.navigation.navigate('AffichagePatients')} color="#939597"/>
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

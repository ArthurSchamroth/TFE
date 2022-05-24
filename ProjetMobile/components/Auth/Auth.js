import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Button, TextInput, AsyncStorage } from 'react-native';
import { API } from '../api-service';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: Async Storage has been extracted from react-native core']);

export default function Auth(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [listeToken, setListeToken] = useState([]);
    const [token, setToken] = useState("");
    const [adresse, setAdresse] = useState("");
    const [age, setAge] = useState("");
    const [autorisation, setAutorisation] = useState("");
    const [email, setEmail] = useState("");
    const [idFiche, setIdFiche] = useState("");
    const [idUser, setIdUser] = useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [probleme, setProbleme] = useState("");
    const [typeKine, setTypeKine] = useState("");
    const [usernameUser, setUsernameUser] = useState("");

    const test = []

    useEffect(() => {
        API.listingTokens()
        .then(resp => setListeToken(resp))
        API.listingUser()
        .then(function(resp){
            return resp.json()
        }).then(function (resp){
            const liste = resp
            for(const i of liste){
                test.push(i["username"])
            }
        })
        //.then(resp => setToken(, resp.token))
        .then(resp => console.log(resp))
        .catch(error => console.log(error))
    }, []);

    useEffect(() => {
        
    }, [])

    const auth = () => {
        API.loginUser({username, password})
            .then(response =>{
                console.log(response)
                for(let i of listeToken){
                    if(response.token === (i['key'])){
                        setToken(response.token);
                        saveData(response.token);
                        API.gettingDataFromToken({token: response.token})
                        .then(function(resp){
                            return resp.json()
                        }).then(function(resp){
                            console.log(resp)
                            console.log(resp)
                            setNom(resp["nom"]);
                            setPrenom(resp["prenom"]);
                            setEmail(resp["email"]);
                            setUsernameUser(resp["username"]);
                            setIdUser(resp['id']);
                            if(resp["fiche"]){
                                console.log(resp['adresse'])
                                setAdresse(resp['adresse']);
                                setAge(resp["age"]);
                                setAutorisation(resp["autorisation"]);
                                setIdFiche(resp["fiche"])
                                setTypeKine(resp["type_kine"])
                                setProbleme(resp["probleme"])
                                saveData(resp['nom'], resp.prenom, resp.email, resp.id,
                                    resp.username, resp.adresse, resp.age, resp.autorisation, resp.fiche, resp.type_kine,
                                    resp.probleme)
                            }
                            //props.navigation.navigate('Home', {token:response.token});
                        })
                        
                        .catch(err => console.log(err))
                    }
                }
            } 
        )
    }

    const saveToken = async(token, nom, prenom, email, idUser, usernameUser, adresse, age, autorisation, idFiche, typeKine, probleme) => {
        console.log(token, nom, prenom, email, idUser, usernameUser, adresse, age, autorisation, idFiche, typeKine, probleme)
        await AsyncStorage.setItem('Appli_Token', token)
    }

    const saveData = async(token, nom, prenom, email, idUser, usernameUser, adresse, age, autorisation, idFiche, typeKine, probleme) => {
        console.log(token, nom, prenom, email, idUser, usernameUser, adresse, age, autorisation, idFiche, typeKine, probleme)
        await AsyncStorage.setItem('Appli_Token', token)
        await AsyncStorage.setItem('NomUser', nom)
        await AsyncStorage.setItem('PrenomUser', prenom)
        await AsyncStorage.setItem('EmailUser', email)
        await AsyncStorage.setItem('IdUser', idUser)
        await AsyncStorage.setItem('UsernameUser', usernameUser)
        await AsyncStorage.setItem('AdresseUser', adresse)
        await AsyncStorage.setItem('AgeUser', age)
        await AsyncStorage.setItem('AuthorisationConsultationUser', autorisation)
        await AsyncStorage.setItem('FicheIdUser', idFiche)
        await AsyncStorage.setItem('TypeKineUser', typeKine)
        await AsyncStorage.setItem('ProblemeUser', probleme)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Username</Text>
            <TextInput 
                style={styles.input}
                placeholder="Username"
                onChangeText={text => setUsername(text)}
                value={username}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput 
                style={styles.input}
                placeholder="Password"
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry={true}
                autoCapitalize={'none'}
            />
            <Button onPress={()=>auth()} title="Login"/>
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

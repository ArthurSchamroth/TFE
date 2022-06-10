import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Button, TextInput } from 'react-native';
import { API } from '../api-service';
import { LogBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
    const [isChampsVide, setIsChampsVide] = useState(false);
    const [isMauvaisIdentifiant, setIsMauvaisIdentifiant] = useState(false);

    const test = []

    useEffect(async() => {
        await AsyncStorage.removeItem('user')
    }, [])

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
        .catch(error => console.log(error))
    }, []);

    const auth = () => {
        if(username == '' || password == ''){
            setIsChampsVide(true);
        }
        else{API.loginUser({username, password})
            .then(response =>{
                if(response['non_field_errors']){
                    setIsChampsVide(false);
                    setIsMauvaisIdentifiant(true);
                }
                for(let i of listeToken){
                    if(response.token === (i['key'])){
                        setToken(response.token);
                        API.gettingDataFromToken({token: response.token})
                        .then(function(resp){
                            return resp.json()
                        }).then(function(resp){
                            console.log(resp)
                            setNom(resp["nom"]);
                            setPrenom(resp["prenom"]);
                            setEmail(resp["email"]);
                            setUsernameUser(resp["username"]);
                            setIdUser(resp['id']);
                            if(resp["fiche"]){
                                setAdresse(resp['adresse']);
                                setAge(resp["age"]);
                                setAutorisation(resp["autorisation"]);
                                setIdFiche(resp["fiche"])
                                setTypeKine(resp["type_kine"])
                                setProbleme(resp["probleme"])
                                saveData(response.token, resp.nom, resp.prenom, resp.email, resp.id,
                                    resp.username, resp.adresse, resp.age, resp.autorisation, resp.fiche, resp.type_kine,
                                    resp.probleme)
                            }
                            else{
                                saveData2(response.token, resp.nom, resp.prenom, resp.email, resp.id, resp.username)
                            }
                            props.navigation.navigate('Home', {token:response.token});
                        })
                        
                        .catch(err => console.log(err))
                    }
                }
            } 
        )}
    }

    const saveData2 = async(token, nom, prenom, email, idUser, usernameUser) => {
        console.log("save...", nom, prenom, email, idUser, usernameUser)
        let obj = {
            TokenUser: token,
            NomUser: nom,
            PrenomUser: prenom,
            EmailUser: email,
            IdUser: idUser,
            UsernameUser: usernameUser
        }
        AsyncStorage.setItem('utilisateur', JSON.stringify(obj))
    }

    const saveData = async(token, nom, prenom, email, idUser, usernameUser, adresse, age, autorisation, idFiche, typeKine, probleme) => {
        console.log("save...", nom, prenom, email, idUser, usernameUser, adresse, age, autorisation, idFiche, typeKine, probleme)
        let obj = {
            TokenUser: token,
            NomUser: nom,
            PrenomUser: prenom,
            EmailUser: email,
            IdUser: idUser,
            UsernameUser: usernameUser,
            AdresseUser: adresse,
            AgeUser: age,
            AuthorisationConsultationUser: autorisation,
            FicheIdUser: idFiche,
            TypeKineUser: typeKine,
            ProblemeUser: probleme
        }
        AsyncStorage.setItem('user', JSON.stringify(obj))
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Pseudo</Text>
            <TextInput 
                style={styles.input}
                placeholder="PrénomNom"
                placeholderTextColor="white"
                onChangeText={text => setUsername(text)}
                value={username}
            />
            <Text style={styles.label}>Mot de passe</Text>
            <TextInput 
                style={styles.input}
                placeholder="MotDePasse123"
                placeholderTextColor="white"
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry={true}
                autoCapitalize={'none'}
            />
            {isChampsVide ? 
                <Text style={{color: 'red', fontWeight: 'bold', marginTop: 20}}>Veuillez compléter tous les champs du formulaire.</Text> : 
                isMauvaisIdentifiant ? 
                <Text style={{color: 'red', fontWeight: 'bold', marginTop: 20}}>Identifiant/Mot de passe incorrect.</Text> : null
            }
            <View style={{margin: 20}}>
                <Button color="#3AACF6" style={{borderRadius: 10}} onPress={()=>auth()} title="Se connecter"/>
            </View>
            <TouchableOpacity onPress={()=> props.navigation.navigate('Inscription')}>
                <View>
                    <Text style={{color: '#3AACF6', textDecorationLine: 'underline'}}>
                        Pas encore de compte ? Inscrivez-vous ici
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            paddingTop: 100,
            borderColor: 'black'
        },
        input: {
            backgroundColor: '#3AACF6',
            width: 250,
            height: 50,
            color: 'white',
            borderRadius: 20,
            padding: 5
        },
        label: {
            fontSize: 20,
            textDecorationLine: 'underline',
            margin: 5            
        },
        envoyer: {
            backgroundColor: 'red'
        }
});

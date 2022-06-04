import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, FlatList, Button, TextInput } from 'react-native';
import { API } from '../api-service';
import { LogBox } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

LogBox.ignoreLogs(['Warning: Async Storage has been extracted from react-native core']);

export default function Inscription(props) {

    const [password, setPassword] = useState('');
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [email, setEmail] = useState('');
    const [repeated_password, setRepeated_password] = useState("");
    const [listeToken, setListeToken] = useState([]);
    const [username, setUsername] = useState(first_name + last_name);
    const [listeInscrits, setListeInscrits] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [dejaFait, setDejaFait] = useState(false);
    const [isModalVisibleInputVide, setIsModalVisibleInputVide] = useState(false);
    const [isModalVisibleMdpDifferents, setIsModalVisibleMdpDifferents] = useState(false);
    const [isModalVisibleDejaConnu, setIsModalVisibleDejaConnu] = useState(false);


    let liste_utilisateurs = []

    useEffect( async () => {
        const tokens = await API.listingTokens()
        setListeToken(tokens)
        API.listingUser()
        .then(function(resp){
            return resp.json()
        }).then(function (resp){
            const liste = resp
            for(const i of liste){
                liste_utilisateurs.push(i["username"])
            }
        }).then(setListeInscrits(liste_utilisateurs))

        
    }, []);

    const handleModal = () => { 
        setIsModalVisible(!isModalVisible);
        props.navigation.navigate('Auth')
    }

    const handleModal2 = () => {
        setIsModalVisibleInputVide(!isModalVisibleInputVide);
        props.navigation.navigate('Auth')
    }

    const handleModal3 = () => {
        setIsModalVisibleMdpDifferents(!isModalVisibleMdpDifferents);
        props.navigation.navigate('Auth')
    }

    const handleModal4 = () => {
        setIsModalVisibleDejaConnu(!isModalVisibleDejaConnu);
        props.navigation.navigate('Auth')
    }

    useEffect(()=>{
        const pseudo = first_name + last_name;
        setUsername(pseudo);
    }, [first_name, last_name])

    const registerClicked = () => {
        console.log('test', repeated_password, password, first_name, last_name, email)
        const tokens = API.listingTokens()
        setListeToken(tokens)
        for(const i of listeToken){
            API.gettingDataFromToken({token: i.key}).then(function(resp){
                return resp.json()
            }).then(function(resp){
                if(resp.username == username){
                    console.log('utilisateur déjà connu')
                }
            })
        }
        var passw=  /^[A-Za-z0-9]\w{7,25}$/;
        // User vide
        const pseudo = first_name.concat(last_name)
        setUsername(pseudo)
        if(repeated_password.length == 0 && password.length == 0 && first_name.length == 0 && last_name.length == 0 && email.length == 0){
            console.log("peut être")
            setIsModalVisibleInputVide(true)
        }else{
            if(repeated_password.length == 0 || password.length == 0 || first_name.length == 0 || last_name.length == 0 || email.length == 0){
                setIsModalVisibleInputVide(true)
            }
                if(password!="" && repeated_password!="" && password == repeated_password){
                    if(listeInscrits.includes(pseudo)){
                        setIsModalVisibleDejaConnu(true)
                    }else{
                        API.registerUser({username, password, first_name, last_name, email})
                        setIsModalVisible(true);
                    }
                }
                else{
                    setIsModalVisibleMdpDifferents(true);
                }
        }
    }

    return (
        <ScrollView>
        <View style={styles.container}>
            <Text style={styles.label}>Prénom</Text>
            <TextInput 
                style={styles.input}
                placeholder="Prénom"
                onChangeText={text => {setFirst_name(text)}}
                value={first_name}
            />
            <Text style={styles.label}>Nom</Text>
            <TextInput 
                style={styles.input}
                placeholder="Nom"
                onChangeText={text => {setLast_name(text)}}
                value={last_name}
            />
            <Text style={styles.label}>Adresse Mail</Text>
            <TextInput 
                style={styles.input}
                placeholder="Prénom"
                email
                onChangeText={text => {setEmail(text)}}
                value={email}
            />
            <Text style={styles.label}>Mot de passe</Text>
            <TextInput 
                style={styles.input}
                placeholder="Mdp123"
                value={password}
                secureTextEntry={true}
                onChangeText={text => {setPassword(text)}}
            />
            <Text style={styles.label}>Répéter mot de passe</Text>
            <TextInput 
                style={styles.input}
                placeholder="Mdp123"
                onChangeText={text => {setRepeated_password(text)}}
                value={repeated_password}
                secureTextEntry={true}
            />
            <View>
        </View>
            <View style={{margin: 20}}>
                <Button color="#6B889B" style={{borderRadius: 10}} onPress={()=> registerClicked()} title="S'inscrire"/>
            </View>
            <TouchableOpacity onPress={()=> props.navigation.navigate('Auth')}>
                <View>
                    <Text style={{color: '#6B889B', textDecorationLine: 'underline'}}>
                        Déjà un compte ? Connectez vous ici
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
        <View style={styles.container2}>
            <Modal isVisible={isModalVisible}>
                <View style={styles.popup}>
                <Text style={styles.text}>{first_name} {last_name} a bien été inscrit !</Text>
                <Button color='#33414A' font style={styles.bouton} title="Fermer" onPress={handleModal} />
                </View>
            </Modal>
        </View>
        <View style={styles.container2}>
            <Modal isVisible={isModalVisibleInputVide}>
                <View style={styles.popup}>
                <Text style={styles.text}>Veuillez compléter tous les champs !</Text>
                <Button color='#33414A' font style={styles.bouton} title="Fermer" onPress={handleModal2} />
                </View>
            </Modal>
        </View>
        <View style={styles.container2}>
            <Modal isVisible={isModalVisibleMdpDifferents}>
                <View style={styles.popup}>
                <Text style={styles.text}>Veuillez remplir deux fois le même mot de passe !</Text>
                <Button color='#33414A' font style={styles.bouton} title="Fermer" onPress={handleModal3} />
                </View>
            </Modal>
        </View>
        <View style={styles.container2}>
            <Modal isVisible={isModalVisibleDejaConnu}>
                <View style={styles.popup}>
                <Text style={styles.text}>{first_name} {last_name} déjà connu !</Text>
                <Button color='#33414A' font style={styles.bouton} title="Fermer" onPress={handleModal4} />
                </View>
            </Modal>
        </View>
        </ScrollView>
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
            backgroundColor: '#6B889B',
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
        },
        container2: {
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: 'white',
        },
        text: {
            fontSize: 16,
            fontWeight: "400",
            textAlign: "center",
            color: 'white',
            padding: 10,
            marginBottom: 15
        },
        separator: {
            marginVertical: 30,
            height: 1,
            width: "80%",
        },
        popup: {
            height: 200,
            alignItems: 'center',
            justifyContent: "center",
            textAlign: 'center',
            backgroundColor: '#282C35',
            borderRadius: 70,
        },
});

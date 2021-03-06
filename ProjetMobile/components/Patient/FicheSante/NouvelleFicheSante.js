import React, {useState, useEffect} from 'react';
import { API } from '../../api-service';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

const TOKEN = process.env.REACT_APP_API_token

export default function NouvelleFicheSante(props) {

    const [currentDate] = useState(new Date().toLocaleDateString("fr-CA", {year: "numeric", month:'2-digit', day: '2-digit'}));
    const [user, setUser] = useState('');
    const [idUser, setIdUser] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [typeBesoin, setTypeBesoin] = useState('');
    const [adresse, setAdresse] = useState('');
    const [detailProb, setDetailProb] = useState('');
    const [autorisation, setAutorisation] = useState('non');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAlert, setIsAlert] = useState(false);

    useEffect(async () => {
        await AsyncStorage.getItem("utilisateur")
            .then(resp => setUser(JSON.parse(resp)))
    }, [])

    const handleModal = async () => { 
        setIsModalVisible(!isModalVisible);
        await AsyncStorage.removeItem('utilisateur')
        props.navigation.navigate('Auth')
    }

    const changerAutorisation = () => {
        if(autorisation == 'non'){
            setAutorisation('oui')
        }
        if(autorisation == 'oui'){
            setAutorisation('non')
        }
    }

    useEffect(() => {
        console.log(user)
        setNom(user.NomUser);
        setPrenom(user.PrenomUser);
        setEmail(user.EmailUser);
        setIdUser(user.IdUser)
    }, [user])

    useEffect(() => {
        console.log(date.toString().split()[0])
    }, [date])

    const envoyerFiche = () => {
        console.log(idUser, nom, prenom, email, detailProb, typeBesoin, adresse, date, autorisation)
        
        if(nom == "" || prenom == "" || date == "" || email == "" || typeBesoin == "" || detailProb == "" || adresse == ""){
            setIsAlert(true);
        }else{
            API.creatingFiche({'user': idUser, nom, prenom, adresse_mail: email, description_prob: detailProb, type_kine: typeBesoin, adresse, age: date, autorisation_consultation: autorisation})
            setIsModalVisible(true);
        }
    }

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Cr??er votre fiche sant??.</Text>
                <View style={styles.fiche}>
                    <Text style={styles.subtitle}>Date de naissance</Text>
                    <DatePicker
                        style={styles.datePickerStyle}
                        date={date}
                        mode="date"
                        placeholder="S??lectionnez votre date de naissance"
                        format="YYYY-MM-DD"
                        minDate="1900-01-01"
                        maxDate={currentDate}
                        confirmBtnText="Confirmer"
                        cancelBtnText="Cancel"
                        useNativeDriver={true}
                        customStyles={{
                            dateIcon: {
                            position: 'absolute',
                            right: -5,
                            top: 4,
                            marginLeft: 0,
                            },
                            dateInput: {
                            borderColor : "gray",
                            alignItems: "flex-start",
                            borderWidth: 0,
                            borderBottomWidth: 1,
                            },
                            placeholderText: {
                            fontSize: 17,
                            color: "gray"
                            },
                            dateText: {
                            fontSize: 17,
                            }
                        }}
                        onDateChange={(date) => {
                            setDate(date);
                        }}
                    />
                    <Text style={styles.subtitle}>Type de soin</Text>
                    <RNPickerSelect 
                        onValueChange={(value) => setTypeBesoin(value)}
                        items={[
                            {label: 'Kin??sith??rapie', value: 'K'},
                            {label: 'Kin??sith??rapie Respiratoire', value: 'KR'},
                            {label: 'Ost??opatie', value: 'O'},
                            {label: 'P??diatrie', value: 'P'},
                        ]}
                        placeholder={{ label: "S??lectionner votre destinataire", value: null, color: 'red' }}
                        style={pickerStyle}
                    />
                    <Text style={styles.subtitle}>Adresse</Text>
                    <TextInput
                        placeholder="Rue de l'exemple n??1 Bruxelles"
                        onChangeText={text => setAdresse(text)}
                        value={adresse}
                    />
                    <Text style={styles.subtitle}>Description probl??me physique</Text>
                    <TextInput
                        placeholder="Probl??mes partout"
                        onChangeText={text => setDetailProb(text)}
                        value={detailProb}
                    />
                    <TouchableOpacity onPress={()=> changerAutorisation()}>
                        <View style={{marginTop: 10, marginBottom: 10}}>
                            {autorisation == 'non' ?
                                <><Text>Le kin?? n'a pas acc??s ?? votre dossier m??dical.</Text>
                                <Text>Cliquez ici pour modifier.</Text></> : 
                                <><Text>Le kin?? a acc??s ?? votre dossier m??dical.</Text>
                                <Text>Cliquez ici pour modifier.</Text></>
                            }
                        </View>
                    </TouchableOpacity>
                {isAlert ? 
                    <View style={{width: '50%'}}>
                        <Text style={{color: 'red', fontWeight:'bold'}}>Veuillez compl??ter tous les champs du formulaire avant d'envoyer !</Text> 
                    </View>
                    : null
                }
                <Button color="#6B889B" style={{borderRadius: 10}} onPress={()=>envoyerFiche()} title="Envoyer Fiche"/>
                <View style={styles.container2}>
                    <Modal isVisible={isModalVisible}>
                        <View style={styles.popup}>
                        <Text style={styles.text}>La fiche a ??t?? correctement cr????e !</Text>
                        <Button color='#33414A' font style={styles.bouton} title="Fermer" onPress={handleModal} />
                        </View>
                    </Modal>
                </View>
                </View>
            </View>
        </>
    );
    }

const pickerStyle = {
    inputIOS: {
        color: 'black',
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        width: 300
    },
    inputAndroid: {
        color: 'black',
        width: 300,
    },
    placeholderColor: 'white',
    underline: { borderTopWidth: 0 },
    icon: {
        position: 'absolute',
        backgroundColor: 'transparent',
        borderTopWidth: 5,
        borderTopColor: '#00000099',
        borderRightWidth: 5,
        borderRightColor: 'transparent',
        borderLeftWidth: 5,
        borderLeftColor: 'transparent',
        width: 0,
        height: 0,
        top: 20,
        right: 15,
    },
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    subtitle:{
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        fontSize: 16
    },
    fiche:{
        top: 50,
    },
    title:{
        color: 'white',
        fontSize:20,
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationStyle: 'solid',
        backgroundColor: '#005eb6',
        padding: 10,
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

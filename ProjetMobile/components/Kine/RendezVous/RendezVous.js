import React, {useState, useEffect} from 'react';
import { API } from '../../api-service';
import { StyleSheet, Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

const TOKEN = process.env.REACT_APP_API_token

export default function RendezVous(props) {

    const [currentDate] = useState(new Date().toLocaleDateString("fr-CA", {year: "numeric", month:'2-digit', day: '2-digit'}));
    const [username, setUsername] = useState('');
    const [ficheId, setFicheId] = useState('');
    const [isFuturRdv, setIsFuturRdv] = useState(false);
    const [listeFuturRdvs, setListeFuturRdvs] = useState([]);
    const [user, setUser] = useState();
    const [nomUser, setNomUser] = useState('');
    const [isRdvDuJour, setIsRdvDuJour] = useState(false);

    useEffect(async () => {
        await AsyncStorage.getItem("user")
            .then(resp => setUser(JSON.parse(resp)))
    }, [])

    useEffect(() => {
        const test = []
        const trier = (a, b) =>{
            if(a.date < b.date){
                return -1
            }
            if(a.date > b.date){
                return 1
            }
            return 0
        }
        if(ficheId){
            if(username == "ThomasPenning" || username == "ArthurSchamroth"){
                API.gettingRdvsWithName()
                .then(function(resp){
                    return resp.json()
                }).then(function(resp){
                    for(const i of resp['result']){
                        test.push(i)
                    }
                    const liste_triee = test.sort(trier)
                    setListeFuturRdvs(liste_triee)
                    
                    return listeFuturRdvs
                })
            }else{
                API.gettingRdvsFromSpecificUser({'fiche': ficheId})
                .then(function(resp){
                    return resp.json()
                }).then(function(resp){
                    for(const i of resp['result']){
                        test.push(i)
                    }
                    const liste_triee = test.sort(trier)
                    setListeRdv(liste_triee)
                    
                    return listeFuturRdvs
                })
            }
        }
    })

    useEffect(() => {
        if(user){
            setFicheId(user['FicheIdUser']);
            setUsername(user["PrenomUser"] + user["NomUser"])
        }
    }, [user])

    const rendezVousFuturClicked = () => {
        setIsFuturRdv(!isFuturRdv);
        setIsRdvDuJour(false);
    }    

    const rendezVousDuJourClicked = () => {
        setIsRdvDuJour(!isRdvDuJour);
        setIsFuturRdv(false);
    }

    const delRdvClicked = rdv => {
        API.delRdv({id: rdv.id});
        props.navigation.navigate('Ressources');
    }
    

    return (
        <>
        <View>
            <Text style={styles.title}>Voici votre accueil de rendez-vous : {nomUser}</Text>
            <Button title='Rendez-vous du jour' onPress={()=>rendezVousFuturClicked()} color="#939597"/>
            <Button title='Futurs rendez-vous' onPress={()=>rendezVousDuJourClicked()} color="#939597"/>
        </View>
        {isFuturRdv ? 
            <>
                <Text style={styles.subtitle}>Bienvenue dans les rendez-vous du jour</Text>
                <ScrollView style={styles.container_rdvs}>
                {listeFuturRdvs.map(rdv => {
                    return(
                        <View style={styles.rdv_carte} key={rdv.id}>
                        {rdv.prenom + rdv.nom != "ThomasPenning" && new Date(rdv.date).toLocaleDateString("fr-CA", {year: "numeric", month:'2-digit', day: '2-digit'}) == currentDate ? 
                            <View key={rdv.id}>
                                <Text style={styles.text}>Date : {rdv.date} Heure : {rdv.heure}</Text>
                                <Text style={styles.text}>Patient : {rdv.nom} {rdv.prenom}</Text>
                                <Text style={styles.text}>Description: {rdv.description}</Text>
                                <Button title='Supprimer' onPress={() => delRdvClicked(rdv)}/>
                            </View>
                            : null
                        }                      
                        </View>
                    )
                })}
                </ScrollView>
            </>
            
            : isRdvDuJour ? 
            <>
            <Text style={styles.subtitle}>Bienvenue dans les futurs rendez-vous</Text>
            <ScrollView style={styles.container_rdvs}>
            {listeFuturRdvs.map(rdv => {
                return(
                    <View key={rdv.id}>
                    {rdv.prenom + rdv.nom != "ThomasPenning" && new Date(rdv.date).toLocaleDateString("fr-CA", {year: "numeric", month:'2-digit', day: '2-digit'}) > currentDate ? 
                        <View style={styles.rdv_carte} key={rdv.id}>
                            <Text style={styles.text}>Date : {rdv.date} Heure : {rdv.heure}</Text>
                            <Text style={styles.text}>Patient : {rdv.nom} {rdv.prenom}</Text>
                            <Text style={styles.text}>Description: {rdv.description}</Text>
                            <Button title='Supprimer' onPress={() => delRdvClicked(rdv)}/>
                        </View>
                        : null
                    }                      
                    </View>
                )
            })}
            </ScrollView>
        </>
            // si pas rdv du jour ni futur 
            : null
        }
        </>
    );
    }

    const styles = StyleSheet.create({
        title:{
            color: 'white',
            fontSize:20,
            fontWeight: 'bold',
            textAlign: 'center',
            textDecorationStyle: 'solid',
            marginBottom:20,
            backgroundColor: '#005eb6',
            padding: 10,
        },
        subtitle:{
            margin: 15,
            fontSize:18,
            textAlign: 'center'
        },
        rdv_carte:{
            backgroundColor: '#939597',
            textAlign: 'center',
            alignContent: 'center',
        },
        container_rdvs:{
            flex: 1,
            padding: 15,
            margin: 10,
        },
        text:{
            color: 'white',
            marginBottom: 2,
            textAlign: 'center'
        }
});

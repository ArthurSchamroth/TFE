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

    useEffect(async () => {
        await AsyncStorage.getItem("user")
            .then(resp => setUser(JSON.parse(resp)))
    }, [])

    useEffect(() => {
        if(user){
            setFicheId(user['FicheIdUser']);
            setUsername(user["PrenomUser"] + user["NomUser"])
        }
    }, [user])

    const rendezVousFuturClicked = () => {
        setIsFuturRdv(!isFuturRdv);
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
    }    
    

    return (
        <>
        <View>
            <Text style={styles.title}>Voici votre accueil de rendez-vous : {nomUser}</Text>
            <Button title='Rendez-vous du jour' onPress={()=>rendezVousFuturClicked()} color="#939597"/>
            <Button title='Futurs rendez-vous' onPress={()=>props.navigation.navigate('AffichagePatients')} color="#939597"/>
        </View>
        {isFuturRdv ? 
            <>
                <Text>Bienvenue dans les futurs rendez-vous</Text>
                <ScrollView>
                {listeFuturRdvs.map(rdv => {
                    return(
                        <>
                        {console.log(rdv.date, currentDate)}
                        {rdv.prenom + rdv.nom != "ThomasPenning" && rdv.date > currentDate ? 
                            <View key={rdv.id}>
                                <Text>Date : {rdv.date} Heure : {rdv.heure}</Text>
                                <Text>Patient : {rdv.nom} {rdv.prenom}</Text>
                            </View>
                            : null
                        }                      
                        </>
                    )
                })}
                </ScrollView>
            </>
            
            : null
        }
        </>
    );
    }

    const styles = StyleSheet.create({
    
});

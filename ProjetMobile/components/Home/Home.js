import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Home(props) {

    return (
        <View style={styles.container}>
            <Text>Bienvenue dans l'application mobile de Monsieur Penning</Text>
            <Button title='Connexion' onPress={()=>props.navigation.navigate('Auth')} color="#939597"/>
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

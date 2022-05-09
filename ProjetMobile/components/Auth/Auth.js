import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Button, TextInput } from 'react-native';

export default function Auth(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const auth = () => {
        console.log('ok ')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Username</Text>
            <TextInput 
                style={styles.input}
                placeholder="Username"
                onChangeText={text => setUsername(text)}
                value={username}
                autoCapitalize={'none'}
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

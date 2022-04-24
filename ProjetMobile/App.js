import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import AffichagePatients from './components/Kine/GestionPatients/AffichagePatients';

const AppNavigator = createStackNavigator({
  Home: {screen: Home},
  Auth: {screen: Auth},
  AffichagePatients: {screen: AffichagePatients}
})

const App = createAppContainer(AppNavigator)

export default App;

import { StatusBar } from 'expo-status-bar';
import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import AffichagePatients from './components/Kine/GestionPatients/AffichagePatients';
import Details from './components/Kine/GestionPatients/DetailsFiche';
import Edit from './components/Kine/GestionPatients/EditPatient';

const AppNavigator = createStackNavigator({
  Home: {screen: Home},
  Auth: {screen: Auth},
  AffichagePatients: {screen: AffichagePatients},
  Details: {screen: Details},
  Edit: {screen: Edit}
})

const App = createAppContainer(AppNavigator)

export default App;

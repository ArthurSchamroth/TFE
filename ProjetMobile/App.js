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
import AccueilRessources from './components/Ressources/AccueilRessources';
import RendezVous from './components/Kine/RendezVous/RendezVous';
import Messagerie from './components/Kine/Messagerie/Messagerie';

const AppNavigator = createStackNavigator({
  Home: {screen: Home},
  Auth: {screen: Auth},
  AffichagePatients: {screen: AffichagePatients},
  Details: {screen: Details},
  Edit: {screen: Edit},
  Ressources: {screen: AccueilRessources},
  RendezVous: {screen: RendezVous},
  Messagerie: {screen: Messagerie},
})

const App = createAppContainer(AppNavigator)

export default App;

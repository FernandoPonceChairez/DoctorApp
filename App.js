import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState } from 'react';

import WelcomeScreen from './WelcomeScreen';
import SignUpScreen from './SignUpScreen';
import SignInScreen from './SignInScreen';
import MainScreen from './MainScreen';
import SearchSpecialistScreen from './SearchSpecialistScreen';  // Pantalla de búsqueda de especialistas
import SearchResultsScreen from './SearchResultsScreen';  // Resultados de búsqueda
import SpecialistInfoScreen from './SpecialistInfoScreen';  // Información detallada del especialista
import AppointmentScreen from './AppointmentScreen';  // Pantalla de agendar cita
import VideoCallScreen from './VideoCallScreen';  // Pantalla de agendar cita

const Stack = createStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? 'Main' : 'Welcome'}>
        {/* Pantallas de autenticación */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SignUp">
          {(props) => (
            <SignUpScreen
              {...props}
              onSignUp={() => {
                setIsAuthenticated(true); // Cambia el estado a autenticado
              }}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="SignIn">
          {(props) => (
            <SignInScreen
              {...props}
              onSignIn={() => {
                setIsAuthenticated(true); // Cambia el estado a autenticado
              }}
            />
          )}
        </Stack.Screen>

        {/* Pantalla principal */}
        <Stack.Screen name="Main" component={MainScreen} />

        {/* Nuevas pantallas */}
        <Stack.Screen name="SearchSpecialist" component={SearchSpecialistScreen} />
        <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
        <Stack.Screen name="SpecialistInfo" component={SpecialistInfoScreen} />
        <Stack.Screen name="Appointment" component={AppointmentScreen} />
        <Stack.Screen name="VideoCall" component={VideoCallScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/* Set-ExecutionPolicy RemoteSigned -Scope Process */

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState } from 'react';

import WelcomeScreen from './WelcomeScreen';
import SignUpScreen from './SignUpScreen';
import SignInScreen from './SignInScreen';
import MainScreen from './MainScreen';
import DoctorsScreen from './DoctorsScreen';
import SearchSpecialistScreen from './SearchSpecialistScreen';  // Pantalla de búsqueda de especialistas
import SearchResultsScreen from './SearchResultsScreen';  // Resultados de búsqueda
import SpecialistInfoScreen from './SpecialistInfoScreen';  // Información detallada del especialista
import AppointmentScreen from './AppointmentScreen';  // Pantalla de agendar cita
import VideoCallScreen from './VideoCallScreen';  // Pantalla de agendar cita
import NotificationsScreen from './NotificationsScreen';
import MessagesScreen from './MessagesScreen';
import ChatScreen from './ChatScreen';
import MyAppointmentScreen from './MyAppointmentScreen';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';

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

        <Stack.Screen
        name="Doctors"
        component={DoctorsScreen}
        options={{ title: 'Doctors' }}
        />

        <Stack.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{ title: 'Notifications' }}
        />

        <Stack.Screen
          name="Messages"
          component={MessagesScreen}
          options={{ title: 'Messages' }}
        />

        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{ title: 'Chat' }}
        />

        <Stack.Screen
          name="MyAppointment"
          component={MyAppointmentScreen}
          options={{ title: 'Appointments', headerShown: false }} // Título en la barra superior
        />

        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: 'Profile', headerShown: false }} // Título en la barra superior
        />

        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: 'Settings', headerShown: false }} // Título en la barra superior
        />
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

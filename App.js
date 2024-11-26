import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState } from 'react';

import WelcomeScreen from './WelcomeScreen';
import SignUpScreen from './SignUpScreen';
import SignInScreen from './SignInScreen';
import MainScreen from './MainScreen';
import DoctorsScreen from './DoctorsScreen';
import SearchSpecialistScreen from './SearchSpecialistScreen';  
import SearchResultsScreen from './SearchResultsScreen';  
import SpecialistInfoScreen from './SpecialistInfoScreen';  
import AppointmentScreen from './AppointmentScreen';  
import VideoCallScreen from './VideoCallScreen';  
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
      <Stack.Navigator 
        initialRouteName={isAuthenticated ? 'Main' : 'Welcome'} 
        screenOptions={{ headerShown: false }} // Oculta el encabezado en todas las pantallas
      >
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
        <Stack.Screen name="Doctors" component={DoctorsScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Messages" component={MessagesScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="MyAppointment" component={MyAppointmentScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />

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

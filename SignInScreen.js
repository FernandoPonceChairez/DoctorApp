import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      // Obtener el usuario almacenado en AsyncStorage
      const storedUser = await AsyncStorage.getItem('user');
      const user = JSON.parse(storedUser);

      // Verificar si las credenciales coinciden
      if (user && user.email === email && user.password === password) {
        Alert.alert('Success', 'Logged in successfully');
        navigation.navigate('Main'); // Navegar a la pantalla principal
      } else {
        Alert.alert('Error', 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error reading user', error);
    }
  };

  return (
    <ImageBackground
    source={require('./assets/Back2.png')} 
      style={styles.background}
      resizeMode="cover"
    >

    
    <Text style={styles.title}>Sign In</Text>

      <View style={styles.title2}>
          <Text style={styles.title3}>Don't have an account?</Text>
          <TouchableOpacity  onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.title4}>Sign Up!</Text>
          </TouchableOpacity>
      </View>

    <View style={styles.container}>

      <Text style={styles.subin}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder=""
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.subin}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder=""
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.sign} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      
    </View>
    </ImageBackground>
  );
}



const styles = StyleSheet.create({
  
  container: {
      flex: 1,
      paddingHorizontal: 15,
      justifyContent: 'center',
      marginLeft: 15,
      marginBottom:200,
   
  },
  background: {
    flex: 1,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignItems: "baseline",
    color: '#000000',
    marginLeft:35,
    marginTop:80,
  },
  title4:{
    marginLeft:5,
    color:"#2582ff",
    fontWeight: 'bold',

  },
  title3:{
    color: '#000000',

  },
  title2:{
    flexDirection: 'row', // Los elementos se colocarán horizontalmente
    padding: 5,
    marginLeft: 27,

  },
  input: {
    width: 300,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo semitransparente para mejor visibilidad
  },
  subin:{
    color:'gray',
    marginBottom:2,

  },
  sign: {
    width: 300,
    backgroundColor: '#2582ff',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    height: 45,
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

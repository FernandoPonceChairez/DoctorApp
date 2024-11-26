import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Guardar la información del usuario en AsyncStorage
    try {
      const user = { username, email, password, phone };
      await AsyncStorage.setItem('user', JSON.stringify(user));
      Alert.alert('Success', 'User registered successfully');
      navigation.navigate('SignIn'); // Navegar a la pantalla de inicio de sesión
    } catch (error) {
      console.error('Error saving user', error);
    }
  };

  return (
    <ImageBackground
      source={require('./assets/Back2.png')} 
      style={styles.background}
      resizeMode="cover"
    >
      <View>
        <Text style={styles.title}>Create Account</Text>

        <View style={styles.title2}>
          <Text style={styles.title3}>Already have an account?</Text>
          <TouchableOpacity  onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.title4}>Sign In!</Text>
          </TouchableOpacity>
        </View>
        
      </View>
      <View style={styles.container}>
        
        <Text style={styles.subin}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          value={username}
          onChangeText={setUsername}
        />

        <Text style={styles.subin}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.subin}>Phone</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <Text style={styles.subin}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.subin}>Confirm password</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.sign} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'center',
    marginLeft: 15,
    marginTop:-60,
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
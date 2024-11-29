import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import api from './api';

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Verifica formato de correo válido
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; // Permite números de 10 dígitos
    return phoneRegex.test(phone);
  };

  const handleSignUp = async () => {
    // Validaciones
    if (!username.trim()) {
      Alert.alert('Error', 'El nombre de usuario no puede estar vacío.');
      return;
    }

    if (!email.trim() || !validateEmail(email)) {
      Alert.alert('Error', 'Ingresa un correo electrónico válido.');
      return;
    }

    if (!phone.trim() || !validatePhone(phone)) {
      Alert.alert('Error', 'Ingresa un número de teléfono válido de 10 dígitos.');
      return;
    }

    if (!password.trim() || password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    // Enviar solicitud a la API
    try {
      await api.post('/users/register', { name: username, email, phone, password });
      Alert.alert('Éxito', 'Usuario registrado correctamente.');
      navigation.navigate('SignIn');
    } catch (error) {
      console.error('Error durante el registro:', error.response?.data || error.message);
      Alert.alert('Error', error.response?.data?.message || 'Error al registrar el usuario.');
    }
  };

  return (
    <ImageBackground
      source={require('./assets/Back2.png')} 
      style={styles.background}
      resizeMode="cover"
    >
      <Text style={styles.title}>Crear Cuenta</Text>
      <View style={styles.title2}>
        <Text style={styles.title3}>¿Ya tienes una cuenta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.title4}>¡Inicia Sesión!</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.subin}>Nombre de usuario</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Juan Pérez"
          value={username}
          onChangeText={setUsername}
        />
        <Text style={styles.subin}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          placeholder="correo@ejemplo.com"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.subin}>Teléfono</Text>
        <TextInput
          style={styles.input}
          placeholder="1234567890"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <Text style={styles.subin}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Mínimo 6 caracteres"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Text style={styles.subin}>Confirmar contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Repite tu contraseña"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity style={styles.sign} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Registrar</Text>
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
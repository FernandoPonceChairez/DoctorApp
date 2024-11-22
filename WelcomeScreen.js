import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground 
      source={require('./assets/Back.png')} 
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>DOCTOR'S POINT</Text>
        <View style={styles.buttonContainer}>

          <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signInButton} onPress={() => navigation.navigate('SignIn')}> 
          <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>

        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Asegura que la imagen cubra todo el fondo
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 40,
  },
  buttonContainer: {
    marginTop:100,

  },
  signUpButton: {
        backgroundColor: '#34D1BF', // Color verde claro para el botón de Sign Up
        paddingVertical: 12,
        paddingHorizontal: 110,
        borderRadius: 8,
        marginBottom: 15,
        marginTop:60,
    },
    signUpButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    signInButton: {
        borderColor: '#FFFFFF',
        borderWidth: 1,
        paddingVertical: 12,
        paddingHorizontal: 110,
        borderRadius: 8,
        marginBottom:100,
    },
    signInButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

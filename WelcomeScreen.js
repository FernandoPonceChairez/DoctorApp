import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>DOCTOR'S POINT</Text>
      <View style={styles.buttonContainer}>
        <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
        <Button title="Sign In" onPress={() => navigation.navigate('SignIn')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0052D4', // El color azul principal
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

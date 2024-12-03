import React from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

function ForgotPasswordScreen() {
    return (
        <ImageBackground
            source={require('../../assets/images/Back2.png')} 
            style={styles.container}
            resizeMode="cover">

            <View style={styles.container}>
                <Text style={styles.title}>Recover Password</Text>
                <Text>Enter your email</Text>
                <TextInput style={styles.input} placeholder="" keyboardType="email-address" />
                
                <TouchableOpacity style={styles.buttonS}
                onPress={() => Alert.alert('Recovery email sent')}>
                <Text style={styles.buttonText}>Send Recovery Email</Text>
                </TouchableOpacity>

            </View>

        </ImageBackground>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop:100,
        marginBottom:50,
        alignItems:"baseline",
    },
    input: {
        width: 300,
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    buttonS: {
        width: 300,
        backgroundColor: '#2582ff',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        height: 45,
        marginTop:30,
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign:"justify",
        fontWeight:"bold"
      },
});

export default ForgotPasswordScreen;
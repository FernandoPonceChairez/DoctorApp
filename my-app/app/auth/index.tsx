import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import "../../global.css";

export default function Index() {
    const router = useRouter();

    return (
        <ImageBackground 
            source={require('../../assets/images/Back.png')} 
            style={styles.container}
            resizeMode="cover" 
        >
            <View style={styles.containerdoc}>
                <Text style={styles.title}>DOCTOR'S POINT</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.signUpButton} onPress={() => router.push('/auth/sign-up')}>
                    <Text style={styles.signUpButtonText}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signInButton} onPress={() => router.push('/auth/sign-in')}>
                    <Text style={styles.signInButtonText}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    containerdoc: {
        marginTop:300,
        justifyContent: 'center',
        alignItems: 'baseline',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    buttonContainer: {
        marginTop:100,
        alignItems: 'baseline',
    },
    signUpButton: {
        backgroundColor: '#34D1BF', // Color verde claro para el botón de Sign Up
        paddingVertical: 12,
        paddingHorizontal: 110,
        borderRadius: 8,
        marginBottom: 15,
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
    },
    signInButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});
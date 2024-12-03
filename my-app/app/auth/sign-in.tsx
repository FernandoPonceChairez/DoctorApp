import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../constants/firebaseConfig'; 



function SignInScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('../main/inicio'); // Navega a la pantalla principal si es exitoso
        } catch (error) {
            const errorMessage = (error as Error).message;
            Alert.alert('Error', errorMessage);
        }
    };

    return (
        <ImageBackground 
            source={require('../../assets/images/Back2.png')} 
            style={styles.container}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <Text style={styles.title}>Sign In</Text>
                <View style={styles.dont}>
                    <Text>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => router.push('../auth/sign-up')}>
                        <Text style={styles.link2}>Sign Up!</Text>
                    </TouchableOpacity>
                </View>
                <Text>Email</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Enter your email" 
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
                <Text>Password</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Enter your password" 
                    secureTextEntry={true} 
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => router.push('../auth/forgot-password')}>
                    <Text style={styles.link}>Forgot your Password?</Text>
                </TouchableOpacity>
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
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 100,
        marginBottom: 5,
        alignItems: "baseline",
    },
    input: {
        width: 300,
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    link: {
        color: '#1A73E8',
        marginBottom: 30,
        marginTop: 5,
    },
    link2: {
        color: '#1A73E8',
        marginLeft: 5,
    },
    sign: {
        width: 300,
        backgroundColor: '#2582ff',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        height: 45,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: "justify",
        fontWeight: "bold"
    },
    dont: {
        flexDirection: 'row',
        alignItems: 'center', 
        marginBottom: 30,
    },
});

export default SignInScreen;

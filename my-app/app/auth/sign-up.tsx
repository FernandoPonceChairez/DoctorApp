import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { db, auth } from '../../constants/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function SignUpScreen() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    
    const onSignUp = async () => {
        if (!isValidEmail(email)) {
            Alert.alert("Error", "Por favor ingresa un correo electrónico válido");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Error", "Las contraseñas no coinciden");
            return;
        }

        try {
            // Crea el usuario en el autenticador de Firebase
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Guarda información adicional del usuario en Firestore
            await addDoc(collection(db, 'usuarios'), {
                uid: user.uid,
                username,
                email,
                phone,
            });

            Alert.alert('Éxito', 'Cuenta creada exitosamente');
            router.push('../auth/sign-in');
        } catch (error) {
            Alert.alert('Error', 'Hubo un problema al crear la cuenta');
            console.error("Error al crear la cuenta: ", error);
        }
    };

    return (
        <ImageBackground
            source={require('../../assets/images/Back2.png')} 
            style={styles.container}
            resizeMode="cover">

            <View style={styles.container}>
                <Text style={styles.title}>Create Account</Text>

                <View style={styles.sigup}>
                    <Text>Already have an account?</Text>
                    <TouchableOpacity onPress={() => router.push('../auth/sign-in')}>
                        <Text style={styles.link}>Sign In!</Text>
                    </TouchableOpacity>
                </View>
                <Text>Username</Text>
                <TextInput style={styles.input} placeholder="" value={username} onChangeText={setUsername} />
                <Text>Email</Text>
                <TextInput style={styles.input} placeholder="" keyboardType="email-address" value={email} onChangeText={setEmail} />
                <Text>Phone</Text>
                <TextInput style={styles.input} placeholder="" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
                <Text>Password</Text>
                <TextInput style={styles.input} placeholder="" secureTextEntry={true} value={password} onChangeText={setPassword} />
                <Text>Confirm password</Text>
                <TextInput style={styles.input} placeholder="" secureTextEntry={true} value={confirmPassword} onChangeText={setConfirmPassword} />
                
                <TouchableOpacity style={styles.sign} onPress={onSignUp}>
                    <Text style={styles.buttonText}>Sign Up</Text>
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
        marginTop:100,
        alignItems:"baseline",
    },
    input: {
        width: 300,
        padding: 10,
        marginBottom: 15,
        marginTop:5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    link: {
        color: '#1A73E8',
        marginVertical: 5,
        marginLeft:5,
    },
    sign: {
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
      sigup: {
        flexDirection: 'row',
        alignItems: 'center', 
        marginBottom:40,
      },
});

export default SignUpScreen;

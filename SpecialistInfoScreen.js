import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Para íconos de los botones

const SpecialistInfoScreen = ({ route, navigation }) => {
  const { doctor } = route.params;

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: 'https://img.freepik.com/foto-gratis/personaje-estilo-dibujos-animados-3d_23-2151034061.jpg' }} />
      <Text style={styles.name}>{doctor.name}</Text>
      <Text>{doctor.specialty}</Text>
      <Text>{doctor.clinic}</Text>
      <Text style={styles.subtitle}>About {doctor.name}</Text>
      <Text>{doctor.bio || 'This is the bio of the doctor'}</Text>
      <View style={styles.footer}>
        <Text>Patients: 1.08K</Text>
        <Text>Experience: 8 Years</Text>
        <Text>Reviews: 2.05K</Text>
      </View>

      {/* Botones de llamada, videollamada y mensajes */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="call" size={30} color="#4F8EF7" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('VideoCall')}>
          <Ionicons name="videocam" size={30} color="#4F8EF7" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="chatbubbles" size={30} color="#4F8EF7" />
        </TouchableOpacity>
      </View>

      <Button title="Book an Appointment" onPress={() => navigation.navigate('Appointment')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  image: { width: 100, height: 100, borderRadius: 50 },
  name: { fontSize: 24, fontWeight: 'bold', marginVertical: 10 },
  subtitle: { fontSize: 18, marginVertical: 10 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 },
  buttonContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginVertical: 20 
  },
  iconButton: {
    backgroundColor: '#eee',
    padding: 15,
    borderRadius: 50,
    marginHorizontal: 10,
  },
});

export default SpecialistInfoScreen;

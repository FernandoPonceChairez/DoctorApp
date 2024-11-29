import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Para íconos de los botones
import api from './api'; // Asegúrate de que este archivo esté configurado para conectar a tu API

const SpecialistInfoScreen = ({ route, navigation }) => {
  const { doctorId } = route.params; // Recibimos el ID del doctor
  const [doctor, setDoctor] = useState(null); // Para almacenar la información del doctor
  const [loading, setLoading] = useState(true); // Estado para cargar la información

  // Fetch de los datos del doctor desde la API
  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        console.log('Doctor ID:', doctorId); // Verifica que el doctorId esté correctamente recibido

        // Realizamos la consulta a la API usando el doctorId
        const response = await api.get(`/doctors/${doctorId}`);
        console.log('Doctor Data:', response.data); // Verifica los datos de la respuesta

        // Verifica si la respuesta es válida
        if (response && response.data) {
          setDoctor(response.data); // Asignamos los datos del doctor a la variable de estado
        } else {
          throw new Error('Doctor no encontrado');
        }

        setLoading(false); // Cuando los datos se obtienen, cambiamos el estado de carga
      } catch (error) {
        console.error('Error al obtener información del doctor:', error);
        setLoading(false); // Desactivamos el estado de carga
        Alert.alert('Error', 'No se pudo obtener la información del doctor.');
      }
    };

    fetchDoctorInfo();
  }, [doctorId]);

  // Si aún estamos cargando, mostramos un mensaje de carga
  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando información del doctor...</Text>
      </View>
    );
  }

  // Si no hay datos del doctor, mostramos un mensaje de error
  if (!doctor) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>No se encontró información del doctor.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#4E89E8" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{doctor.name}</Text>
      </View>

      {/* Imagen del Doctor */}
      <Image 
        style={styles.image}
        source={{ uri: doctor.image_url || 'https://via.placeholder.com/150' }} // Usamos el image_url del doctor, si está disponible
      />

      <View style={styles.infoContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.iconButton1}>
            <Ionicons name="call" size={15} style={styles.iconb} />
            <Text style={styles.textbut}>Voice Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton2} onPress={() => navigation.navigate('VideoCall')}>
            <Ionicons style={styles.iconb} name="videocam" size={15} />
            <Text style={styles.textbut}>Video Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton3} onPress={() => {
            console.log('Doctor ID:',  doctorId); // Verifica que el ID se pase correctamente
            navigation.navigate('Chat', { doctorId: doctorId }); // Navega a la pantalla de Chat pasando el ID del doctor
          }}>
            <Ionicons name="chatbubbles" size={15} style={styles.iconb} />
            <Text style={styles.textbut}>Message</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.specia}>{doctor.specialty}</Text>
        <Text style={styles.cli}>{doctor.clinic}</Text>
        <Text style={styles.subtitle}>About {doctor.name}</Text>
        <Text>{doctor.bio || 'Highly skilled professional with experience in the field. Has participated in various advanced training programs.'}</Text>

        <View style={styles.footer}>
          <View>
            <Text style={styles.patien}>Patients</Text>
            <Text style={styles.patien2}>{doctor.patient_count || 'N/A'}</Text>
          </View>
          <View>
            <Text style={styles.patien}>Experience</Text>
            <Text style={styles.patien2}>{doctor.experience_years || 'N/A'}</Text>
          </View>
          <View>
            <Text style={styles.patien}>Reviews</Text>
            <Text style={styles.patien2}>{doctor.review_count || 'N/A'}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.botonc} onPress={() => navigation.navigate('Appointment', { doctor: doctor })}>
          <Text style={styles.buttonText}>Book an Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  image: {
    width: '100%',
    height: 250,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    height: 90,
    width: '100%',
    padding: 20,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 70,
  },
  specia: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
  },
  cli: {
    fontSize: 15,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    marginTop: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    marginTop: 40,
  },
  patien: {
    color: 'gray',
  },
  patien2: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#1C1C1C',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  iconButton1: {
    backgroundColor: '#00BFFF',
    padding: 5,
    borderRadius: 10,
    marginHorizontal: 5,
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconButton2: {
    backgroundColor: '#C6AADB',
    padding: 5,
    borderRadius: 10,
    marginHorizontal: 5,
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconButton3: {
    backgroundColor: '#F2C68C',
    padding: 5,
    borderRadius: 10,
    marginHorizontal: 5,
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textbut: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  iconb: {
    color: '#ffffff',
    width: 20,
  },
  botonc: {
    width: 325,
    backgroundColor: '#2582ff',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 50,
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SpecialistInfoScreen;

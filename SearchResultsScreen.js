import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from './api'; // Asegúrate de que este archivo esté configurado para conectar a tu API

export default function SearchResultsScreen({ route, navigation }) {
  const { specialty, area, date } = route.params; // Recibimos los parámetros

  const [doctors, setDoctors] = useState([]);

  // Realizar la consulta a la API con los filtros
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const query = {};
        if (specialty) query.specialty = specialty;
        if (area) query.area = area;
        if (date) query.date = date;

        const response = await api.get('/doctors', { params: query });
        setDoctors(response.data);
      } catch (error) {
        console.error('Error al obtener doctores:', error);
      }
    };

    fetchDoctors();
  }, [specialty, area, date]);

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#4E89E8" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Selected Area</Text>
        <Ionicons name="chatbubble-ellipses-outline" size={24} color="#4E89E8" />
      </View>

      <FlatList
        ListHeaderComponent={() => (
          <>
            <Text style={styles.sectionTitle}>All Doctor</Text>
          </>
        )}
        data={doctors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              console.log('Doctor ID:', item.id); // Verifica que el ID se pase correctamente
              navigation.navigate('SpecialistInfo', { doctorId: item.id });
            }}
          >
            <Image
              source={{
                uri: item.image_url || 'https://via.placeholder.com/100',
              }}
              style={styles.image}
            />
            <View style={styles.infoContainer}>


              <View style={styles.infoContainer1}>
                <Text style={styles.name}>{item.name}</Text>
                <Image
                  source={require('./assets/estrellas.png')}
                  style={styles.image1}
                />
                
              </View>
              
              <Text style={styles.specialty}>{item.specialty} (MBBS, FCPS)</Text>
              <Text style={styles.timing}>Available: {item.available_hours}</Text>
              <Text style={styles.clinic}>{item.clinic}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={() => (
          <>
            <Text style={styles.sectionTitle}>Available Doctor</Text>
            <View style={styles.additionalDoctors}>
              {doctors.map((doctor) => (

                <View key={doctor.id} style={styles.additionalCard}>

                  <View>
                    <Text style={styles.additionalName}>{doctor.name}</Text>
                    <Image
                      source={require('./assets/estrellas.png')}
                      style={styles.image1}
                    />
                    <Text style={styles.additionalDetails}>Experience</Text>
                    <Text style={styles.additionalDetails1}>{doctor.experience_years} Years</Text>
                    <Text style={styles.additionalDetails}>Patients</Text>
                    <Text style={styles.additionalDetails1}>{doctor.patient_count}</Text>
                  </View>

                  <Image
                    source={{
                      uri: doctor.image_url || 'https://via.placeholder.com/100',
                    }}
                    style={styles.additionalImage}
                  />

                </View>
              ))}
            </View>
          </>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFC',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop:35,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 15,
  },
  image1:{
    width:70,
    height:10,

  },
  infoContainer: {
    flex: 1,
  },
  infoContainer1:{
    flexDirection:'row',
    alignItems:'center',

  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight:3
  },
  specialty: {
    marginTop:5,
    fontSize: 14,
    color: '#555',
  },
  timing: {
    marginTop:5,
    fontSize: 12,
    color: '#777',
  },
  clinic: {
    fontSize: 12,
    color: '#999',
  },
  additionalDoctors: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  additionalCard: {
    width:150,
    height:150,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
    elevation: 3,
    flexDirection:'row',
  },
  additionalImage: {
    width: 60,
    height: 80,
    marginTop:80,
    marginLeft:80,
    position:'absolute'

  },
  additionalName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom:3
  },
  additionalDetails: {
    fontSize: 12,
    color: '#777',
    marginTop:10,
  },
  additionalDetails1: {
    fontSize: 15,
    color: '#000',
    fontWeight:'bold'
  },
});

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from './api'; // Configuración de Axios para la API
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DoctorsScreen({ navigation }) {
  const [selectedSpecialty, setSelectedSpecialty] = useState('Pediatrician');
  const [doctors, setDoctors] = useState([]); // Lista de doctores
  const [loading, setLoading] = useState(true);
  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const specialties = ['Pediatrician', 'Neurosurgeon', 'Cardiologist', 'Psychiatrist'];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await api.get('/doctors', {
          params: { specialty: selectedSpecialty },
        });
        setDoctors(response.data);
        setLoading(false); // Cuando se obtiene la respuesta, paramos la carga
      } catch (error) {
        console.error('Error al obtener doctores:', error);
        Alert.alert('Error', 'Hubo un problema al cargar los doctores');
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [selectedSpecialty]);

  // Función para obtener la imagen del doctor
  const getDoctorImage = (imageUrl) => {
    return imageUrl || 'https://via.placeholder.com/100.png?text=Doctor';
  };

  // Función para navegar a la pantalla de detalles del doctor
  const handleDoctorPress = (doctorId) => {
    navigation.navigate('SpecialistInfo', { doctorId });
  };

  // Si estamos cargando, mostramos el indicador de carga
  if (loading) {
    return <Text>Cargando doctores...</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Available</Text>
          <Text style={styles.titleBold}>Specialist</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('SearchSpecialist')}>
            <Ionicons name="search" size={24} color="#4E89E8" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 20 }}>
            <Ionicons name="chatbubble-ellipses-outline" size={24} color="#4E89E8" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Categorías */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        <View style={styles.categories}>
          {specialties.map((specialty) => (
            <TouchableOpacity
              key={specialty}
              style={[styles.category, selectedSpecialty === specialty && styles.categorySelected]}
              onPress={() => setSelectedSpecialty(specialty)}
            >
              <Text
                style={[styles.categoryText, selectedSpecialty === specialty && styles.categoryTextSelected]}
              >
                {specialty}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>


      {/* Lista de doctores */}
      <FlatList
        data={doctors}
        style={styles.card2}
        keyExtractor={(item) => item.id.toString()} // Aseguramos que el ID sea único
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleDoctorPress(item.id)} // Navegar al chat con el doctor
          >
            <View>
              <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.specialty}>{item.specialty}</Text>
                <Image source={require('./assets/estrellas.png')} style={styles.image2} />
                <Text style={styles.details}>Experience</Text>
                <Text style={styles.details2}>{item.experience_years} Years</Text>
                <Text style={styles.details}>Patients</Text>
                <Text style={styles.details2}>{item.patient_count}K</Text>
              </View>
            </View>
            <View>
              <Image
                source={{
                  uri: getDoctorImage(item.image_url), // Imagen del doctor desde la API
                }}
                style={styles.image}
              />
            </View>
          </TouchableOpacity>
        )}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
      />


      {/* Menú flotante */}
      {isMenuVisible && (
        <View style={styles.floatingMenu}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              navigation.navigate('MyAppointment'); // Pantalla My Appointment
            }}
          >
            <Ionicons name="calendar-outline" size={24} color="#FFF" />
            <Text style={styles.menuText}>My Appointment</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              navigation.navigate('Profile'); // Pantalla Profile
            }}
          >
            <Ionicons name="person-outline" size={24} color="#FFF" />
            <Text style={styles.menuText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              navigation.navigate('Settings'); // Pantalla Settings
            }}
          >
            <Ionicons name="settings-outline" size={24} color="#FFF" />
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false); // Cierra el menú flotante
              navigation.reset({
                index: 0,
                routes: [{ name: 'SignIn' }], // Redirige al inicio de sesión
              });
            }}
          >
            <Ionicons name="log-out-outline" size={24} color="#FFF" />
            <Text style={styles.menuText}>Log Out</Text>
          </TouchableOpacity>

        </View>
      )}

      {/* Barra de navegación inferior */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Main')}>
          <Ionicons name="home" size={24} color="#4E89E8" />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabItem, styles.tabItemActive]}>
          <Ionicons name="stethoscope" size={24} color="#FFF" />
          <Text style={[styles.tabLabel, styles.tabLabelActive]}>Doctors</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Notifications')}>
          <Ionicons name="notifications" size={24} color="#4E89E8" />
          <Text style={styles.tabLabel}>Alerts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={toggleMenu}>
          <Ionicons name="grid" size={24} color="#4E89E8" />
          <Text style={styles.tabLabelInactive}>More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Barra de navegación inferior ajustada
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFC', padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 30 },
  title: { fontSize: 20, color: '#333' },
  titleBold: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  iconContainer: { flexDirection: 'row', marginLeft: 150 },
  scrollContainer: { paddingHorizontal: 10, height: 80 },
  categories: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 },
  category: { padding: 10, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  categorySelected: { borderBottomColor: '#4E89E8' },
  categoryText: { fontSize: 16, color: '#777' },
  categoryTextSelected: { color: '#4E89E8', fontWeight: 'bold' },
  listContainer: { paddingBottom: 20 },
  row: { justifyContent: 'space-between' },
  card: { width: 150, height: 150, backgroundColor: '#FFF', borderRadius: 10, padding: 15, marginBottom: 20, marginRight:4, elevation: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  card2: { width: '100%', height: 100,borderRadius: 10, padding: 15, marginBottom: 20, flexDirection: 'row', marginTop:-500 },

  image: { width: 60, height: 100,position:'absolute', marginLeft:-55, marginTop:-25},
  infoContainer: {},
  name: { fontSize: 14, fontWeight: 'bold', color: '#333', textAlign: 'center' },
  specialty: { fontSize: 12, color: '#777' },
  details: { fontSize: 12, color: '#555', marginTop: 5 },
  details2: { fontSize: 14, color: '#000', fontWeight: 'bold' },
  image2: { width: 50, height: 10 },

  // Estilos de la barra de navegación inferior ajustada
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#DDD',
    position: 'absolute',
    bottom: 0,
    left: -20,
    right: 0,
    width: '120%',
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent:'center',
    justifyContent:'center',
    paddingHorizontal: 10,
  },
  tabItemActive: {
    backgroundColor: '#4E89E8',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  tabLabelInactive: {
    color: '#4E89E8',
    fontSize: 12,
    marginTop: 5,
    marginLeft:3,
  },
  tabLabel:{
    color:'#4E89E8',
    marginLeft:3,

  },
  tabLabelActive: {
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft:3,
  },floatingMenu: {
    position: 'absolute',
    bottom: 90,
    left: 20,
    right: 20,
    backgroundColor: '#4E89E8',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 10,
  },menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
  },
  menuText: {
    marginLeft: 15,
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const doctors = [
  { id: '1', name: 'Dr. Serena Gomez', specialty: 'Pediatrician', experience: '8 Years', patients: '1.08K', rating: 5 },
  { id: '2', name: 'Dr. Farid Raihan', specialty: 'Pediatrician', experience: '7 Years', patients: '3.09K', rating: 5 },
  { id: '3', name: 'Dr. Kiran Shakia', specialty: 'Pediatrician', experience: '8 Years', patients: '1.08K', rating: 4 },
  { id: '4', name: 'Dr. Masuda Khan', specialty: 'Pediatrician', experience: '1 Year', patients: '2.10K', rating: 4 },
  { id: '5', name: 'Dr. Johir Raihan', specialty: 'Pediatrician', experience: '4 Years', patients: '937', rating: 4 },
  { id: '6', name: 'Dr. Saima Khan', specialty: 'Pediatrician', experience: '2 Years', patients: '569', rating: 3 },
  { id: '7', name: 'Dr. Depika Khan', specialty: 'Pediatrician', experience: '5 Years', patients: '1.5K', rating: 5 },
  { id: '8', name: 'Dr. Rahima Khan', specialty: 'Pediatrician', experience: '3 Years', patients: '790', rating: 4 },

  // Neurosurgeon
  { id: '9', name: 'Dr. Samuel Adams', specialty: 'Neurosurgeon', experience: '10 Years', patients: '2.5K', rating: 5 },
  { id: '10', name: 'Dr. Eleanor White', specialty: 'Neurosurgeon', experience: '12 Years', patients: '3.2K', rating: 5 },
  { id: '11', name: 'Dr. Michael Brown', specialty: 'Neurosurgeon', experience: '9 Years', patients: '1.9K', rating: 4 },

  // Cardiologist
  { id: '12', name: 'Dr. Emily Stone', specialty: 'Cardiologist', experience: '15 Years', patients: '4.1K', rating: 5 },
  { id: '13', name: 'Dr. Chris Evans', specialty: 'Cardiologist', experience: '8 Years', patients: '2.7K', rating: 4 },
  { id: '14', name: 'Dr. Rachel Green', specialty: 'Cardiologist', experience: '11 Years', patients: '3.5K', rating: 5 },
];

export default function DoctorsScreen({ navigation }) {
  const [selectedSpecialty, setSelectedSpecialty] = useState('Pediatrician');

  const specialties = ['Pediatrician', 'Neurosurgeon', 'Cardiologist', 'Psychiatrist'];

  const filteredDoctors = doctors.filter((doctor) => doctor.specialty === selectedSpecialty);

  const getDoctorImage = (name) => {
    const femaleDoctors = [
      'Dr. Serena Gomez',
      'Dr. Kiran Shakia',
      'Dr. Masuda Khan',
      'Dr. Saima Khan',
      'Dr. Depika Khan',
      'Dr. Rahima Khan',
      'Dr. Eleanor White',
      'Dr. Emily Stone',
      'Dr. Rachel Green',
    ];

    if (femaleDoctors.includes(name)) {
      return 'https://via.placeholder.com/100.png?text=Female+Doctor';
    } else {
      return 'https://via.placeholder.com/100.png?text=Male+Doctor';
    }
  };

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
        data={filteredDoctors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('SpecialistInfo', { doctor: item })}
          >
            <View>
              <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.specialty}>{item.specialty}</Text>
                <Image source={require('./assets/estrellas.png')} style={styles.image2} />
                <Text style={styles.details}>Experience</Text>
                <Text style={styles.details2}>{item.experience}</Text>
                <Text style={styles.details}>Patients</Text>
                <Text style={styles.details2}>{item.patients}</Text>
              </View>
            </View>
            <View>
              <Image
                source={{
                  uri: getDoctorImage(item.name),
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

      {/* Barra de navegación inferior */}
      <View style={styles.tabBar}>
  <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
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
  <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Menu')}>
    <Ionicons name="grid" size={24} color="#4E89E8" />
    <Text style={styles.tabLabel}>More</Text>
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
  card: { width: '48%', height: 150, backgroundColor: '#FFF', borderRadius: 10, padding: 15, marginBottom: 20, elevation: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  image: { width: 60, height: '100%' },
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
    width: '110%',
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  tabItemActive: {
    backgroundColor: '#4E89E8',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  tabLabel: {
    fontSize: 12,
    color: '#777',
    marginLeft: 8,
  },
  tabLabelActive: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

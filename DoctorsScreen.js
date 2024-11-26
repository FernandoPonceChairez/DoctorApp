import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

  const specialties = [
    'Pediatrician',
    'Neurosurgeon',
    'Cardiologist',
    'Psychiatrist',
  ];

  const filteredDoctors = doctors.filter(
    (doctor) => doctor.specialty === selectedSpecialty
  );

// Asignar imágenes basadas en el género
const getDoctorImage = (name) => {
  const femaleDoctors = [
    'Dr. Serena Gomez', 'Dr. Kiran Shakia', 'Dr. Masuda Khan', 'Dr. Saima Khan', 'Dr. Depika Khan', 'Dr. Rahima Khan', 'Dr. Eleanor White', 'Dr. Emily Stone', 'Dr. Rachel Green'
  ];

  if (femaleDoctors.includes(name)) {
    return 'https://via.placeholder.com/100.png?text=Female+Doctor';  // Imágen de doctora
  } else {
    return 'https://via.placeholder.com/100.png?text=Male+Doctor';  // Imagen de doctor
  }
};


  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.title}>Available</Text>
        <Text style={styles.titleBold}>Specialist</Text>
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
      <View style={styles.categories}>
        {specialties.map((specialty) => (
          <TouchableOpacity
            key={specialty}
            style={[
              styles.category,
              selectedSpecialty === specialty && styles.categorySelected,
            ]}
            onPress={() => setSelectedSpecialty(specialty)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedSpecialty === specialty && styles.categoryTextSelected,
              ]}
            >
              {specialty}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista de doctores */}
      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('SpecialistInfo', { doctor: item })}
          >
            <Image
              source={{
                uri: getDoctorImage(item.name), // Se asigna la imagen según el nombre
              }}
              style={styles.image}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.specialty}>{item.specialty}</Text>
              <Text style={styles.details}>Experience: {item.experience}</Text>
              <Text style={styles.details}>Patients: {item.patients}</Text>
            </View>
          </TouchableOpacity>
        )}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
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
    marginBottom: 20,
    marginTop: 30
  },
  title: {
    fontSize: 20,
    color: '#333',
  },
  titleBold: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  category: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  categorySelected: {
    borderBottomColor: '#4E89E8',
  },
  categoryText: {
    fontSize: 16,
    color: '#777',
  },
  categoryTextSelected: {
    color: '#4E89E8',
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  infoContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  specialty: {
    fontSize: 12,
    color: '#777',
  },
  details: {
    fontSize: 12,
    color: '#555',
  },
});

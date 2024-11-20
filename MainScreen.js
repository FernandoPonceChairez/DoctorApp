import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Importamos íconos de Ionicons

const doctors = [
  { name: 'Dr. Serena Gomez', specialty: 'Medicine Specialist', experience: '8 Years', patients: '1.8K', image: 'https://via.placeholder.com/100', reviews: '2.05K' },
  { name: 'Dr. Asma Khan', specialty: 'Medicine Specialist', experience: '5 Years', patients: '2.7K', image: 'https://via.placeholder.com/100', reviews: '1.5K' },
];

export default function MainScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Your Specialist</Text>

      <FlatList
        data={doctors}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.doctorCard} 
            onPress={() => navigation.navigate('DoctorDetails', { doctor: item })}
          >
            <Image source={{ uri: item.image }} style={styles.doctorImage} />
            <View style={styles.infoContainer}>
              <Text style={styles.doctorName}>{item.name}</Text>
              <Text style={styles.doctorSpecialty}>{item.specialty}</Text>
              <Text style={styles.doctorDetails}>Experience: {item.experience}</Text>
              <Text style={styles.doctorDetails}>Patients: {item.patients}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Footer con iconos */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('MenuScreen')}>
          <Ionicons name="menu" size={30} color="#4F8EF7" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SearchSpecialist')}>
          <Ionicons name="search" size={30} color="#4F8EF7" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('NotificationsScreen')}>
          <Ionicons name="notifications" size={30} color="#4F8EF7" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
          <Ionicons name="settings" size={30} color="#4F8EF7" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  doctorCard: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  doctorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  doctorSpecialty: {
    color: '#555',
    marginBottom: 5,
  },
  doctorDetails: {
    color: '#888',
  },
  // Estilos para el footer
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});

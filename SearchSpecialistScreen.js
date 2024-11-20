import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const doctors = [
  { name: 'Dr. Serena Gomez', specialty: 'Medicine Specialist' },
  { name: 'Dr. Asma Khan', specialty: 'Medicine Specialist' },
  { name: 'Dr. John Doe', specialty: 'Cardiologist' },
  { name: 'Dr. Emily Stone', specialty: 'Dermatologist' },
];

export default function SearchSpecialistScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(query.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDoctors(filtered);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Your Specialist</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Enter doctor name or specialty"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.doctorCard} onPress={() => navigation.navigate('SearchResults', { doctor: item })}>
            <Text style={styles.doctorName}>{item.name}</Text>
            <Text style={styles.doctorSpecialty}>{item.specialty}</Text>
          </TouchableOpacity>
        )}
      />
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
  searchInput: {
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  doctorCard: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 5,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  doctorSpecialty: {
    color: '#555',
  },
});

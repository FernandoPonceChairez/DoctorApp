import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const specialists = [
  { id: '1', name: 'Dr. Serena Gomez', specialty: 'Cardiologist', clinic: 'New City Clinic' },
  { id: '2', name: 'Dr. Simata Baroi', specialty: 'Cardiologist', clinic: 'New City Clinic' },
];

const SearchResultsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Doctors</Text>
      <FlatList
        data={specialists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('SpecialistInfo', { doctor: item })}>
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>{item.specialty}</Text>
              <Text>{item.clinic}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  card: { padding: 15, borderWidth: 1, borderRadius: 5, marginBottom: 10 },
  name: { fontSize: 18, fontWeight: 'bold' },
});

export default SearchResultsScreen;

import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SearchResultsScreen({ route, navigation }) {
  const { results = [] } = route.params; // Obtiene los resultados filtrados de la búsqueda

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
            <Text style={styles.sectionTitle}>All Cardiologists</Text>
          </>
        )}
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('SpecialistInfo', { doctor: item })} // Redirige a SpecialistInfoScreen
          >
            <Image
              source={{
                uri: 'https://via.placeholder.com/100', // Reemplaza con URLs reales si existen
              }}
              style={styles.image}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.specialty}>{item.specialty} (MBBS, FCPS)</Text>
              <Text style={styles.timing}>12.00pm - 4.00pm</Text>
              <Text style={styles.clinic}>{item.clinic}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={() => (
          <>
            <Text style={styles.sectionTitle}>Available Doctors</Text>
            <View style={styles.additionalDoctors}>
              {results.map((doctor) => (
                <View key={doctor.id} style={styles.additionalCard}>
                  <Image
                    source={{
                      uri: 'https://via.placeholder.com/100', // Reemplaza con URLs reales si existen
                    }}
                    style={styles.additionalImage}
                  />
                  <Text style={styles.additionalName}>{doctor.name}</Text>
                  <Text style={styles.additionalDetails}>
                    Experience: 8 Years
                  </Text>
                  <Text style={styles.additionalDetails}>Patients: 1.08K</Text>
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
    marginBottom: 20,
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
    borderRadius: 30,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  specialty: {
    fontSize: 14,
    color: '#555',
  },
  timing: {
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
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
    elevation: 3,
  },
  additionalImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  additionalName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  additionalDetails: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
  },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const upcomingAppointments = [
  {
    id: '1',
    date: '03 August 2020',
    time: '2.20 PM',
    doctor: 'Dr. Adam Smith',
    type: 'Dentist',
    place: 'New City Clinic',
  },
  {
    id: '2',
    date: '04 August 2020',
    time: '3.30 PM',
    doctor: 'Dr. Jane Doe',
    type: 'Cardiologist',
    place: 'HealthCare Center',
  },
  {
    id: '3',
    date: '05 August 2020',
    time: '1.00 PM',
    doctor: 'Dr. John Wilson',
    type: 'Neurologist',
    place: 'City Hospital',
  },
  {
    id: '4',
    date: '06 August 2020',
    time: '11.00 AM',
    doctor: 'Dr. Sarah Brown',
    type: 'Pediatrician',
    place: 'Kids Health Clinic',
  },
  {
    id: '5',
    date: '07 August 2020',
    time: '9.00 AM',
    doctor: 'Dr. Emily Davis',
    type: 'General Physician',
    place: 'Downtown Medical Center',
  },
  {
    id: '6',
    date: '08 August 2020',
    time: '4.00 PM',
    doctor: 'Dr. Michael Lee',
    type: 'Orthopedic',
    place: 'OrthoPlus Clinic',
  },
];

const pastAppointments = [
  {
    id: '1',
    date: '01 July 2020',
    time: '10.00 AM',
    doctor: 'Dr. Nafiz Kamal',
    type: 'Dentist',
    place: 'New Town Clinic',
  },
  {
    id: '2',
    date: '20 June 2020',
    time: '4.30 PM',
    doctor: 'Dr. Adam Smith',
    type: 'Dermatologist',
    place: 'New City Clinic',
  },
  {
    id: '3',
    date: '15 June 2020',
    time: '12.00 PM',
    doctor: 'Dr. Laura Green',
    type: 'Psychiatrist',
    place: 'Wellness Clinic',
  },
  {
    id: '4',
    date: '10 June 2020',
    time: '3.00 PM',
    doctor: 'Dr. Robert Brown',
    type: 'Cardiologist',
    place: 'HeartCare Hospital',
  },
  {
    id: '5',
    date: '05 June 2020',
    time: '11.30 AM',
    doctor: 'Dr. Susan Taylor',
    type: 'Endocrinologist',
    place: 'Diabetes Center',
  },
  {
    id: '6',
    date: '01 June 2020',
    time: '8.00 AM',
    doctor: 'Dr. Peter White',
    type: 'Neurologist',
    place: 'Brain Health Clinic',
  },
];

export default function MyAppointmentScreen({ navigation }) {
  const [tab, setTab] = useState('Upcoming');

  const renderAppointment = ({ item }) => (
    <View style={styles.appointmentCard}>
      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{item.date}</Text>
        </View>
        <View>
          <Text style={styles.label}>Time</Text>
          <Text style={styles.value}>{item.time}</Text>
        </View>
        <View>
          <Text style={styles.label}>Doctor</Text>
          <Text style={styles.value}>{item.doctor}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Appointment Type</Text>
          <Text style={styles.value}>{item.type}</Text>
        </View>
        <View>
          <Text style={styles.label}>Place</Text>
          <Text style={styles.value}>{item.place}</Text>
        </View>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Encabezado y pestañas con fondo blanco */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>My Appointment</Text>
        </View>

        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, tab === 'Upcoming' && styles.activeTab]}
            onPress={() => setTab('Upcoming')}
          >
            <Text
              style={[styles.tabText, tab === 'Upcoming' && styles.activeTabText]}
            >
              Upcoming
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, tab === 'Past' && styles.activeTab]}
            onPress={() => setTab('Past')}
          >
            <Text style={[styles.tabText, tab === 'Past' && styles.activeTabText]}>
              Past
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Lista de citas */}
      <FlatList
        data={tab === 'Upcoming' ? upcomingAppointments : pastAppointments}
        keyExtractor={(item) => item.id}
        renderItem={renderAppointment}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFC',
  },
  headerContainer: {
    backgroundColor: '#FFF',
    paddingBottom: 0, // Quitamos cualquier padding extra debajo del encabezado
    elevation: 2, // Sombra para el encabezado
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    position: 'relative',
    marginTop: 35,
  },
  backButton: {
    position: 'absolute',
    left: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1, // Línea separadora entre pestañas y contenido
    borderBottomColor: '#EEE',
    backgroundColor: '#FFF', // Fondo blanco para que coincida con el encabezado
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#4E89E8',
  },
  tabText: {
    fontSize: 16,
    color: '#777',
  },
  activeTabText: {
    color: '#4E89E8',
    fontWeight: '600',
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingTop: 10, // Espacio entre las pestañas y la lista de citas
    paddingBottom: 10,
  },
  appointmentCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    fontSize: 12,
    color: '#888',
    flex: 1,
  },
  value: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    flex: 2,
  },
  cancelButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
});




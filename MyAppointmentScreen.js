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
    date: '03 August 2020',
    time: '2.20 PM',
    doctor: 'Dr. Adam Smith',
    type: 'Dentist',
    place: 'New City Clinic',
  },
];

const pastAppointments = [
  {
    id: '1',
    date: '01 January 2020',
    time: '2.20 PM',
    doctor: 'Dr. Nafiz Kamal',
    type: 'Dentist',
    place: 'New Town Clinic',
  },
  {
    id: '2',
    date: '21 February 2020',
    time: '2.20 PM',
    doctor: 'Dr. Adam Smith',
    type: 'Dentist',
    place: 'New City Clinic',
  },
  {
    id: '3',
    date: '20 March 2020',
    time: '2.20 PM',
    doctor: 'Dr. Adam Smith',
    type: 'Dentist',
    place: 'New City Clinic',
  },
];

export default function MyAppointmentScreen({ navigation }) {
  const [tab, setTab] = useState('Upcoming'); // Estado para controlar la pestaña activa

  const renderAppointment = ({ item }) => (
    <View style={styles.appointmentCard}>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Date</Text>
        <Text style={styles.value}>{item.date}</Text>
        <Text style={styles.label}>Time</Text>
        <Text style={styles.value}>{item.time}</Text>
        <Text style={styles.label}>Doctor</Text>
        <Text style={styles.value}>{item.doctor}</Text>
        <Text style={styles.label}>Appointment Type</Text>
        <Text style={styles.value}>{item.type}</Text>
        <Text style={styles.label}>Place</Text>
        <Text style={styles.value}>{item.place}</Text>
      </View>
      {tab === 'Upcoming' ? (
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.rescheduleButton}>
          <Text style={styles.rescheduleButtonText}>Reschedule</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#4E89E8" />
        </TouchableOpacity>
        <Text style={styles.title}>My Appointment</Text>
      </View>

      {/* Pestañas */}
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
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 20,
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
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 20,
  },
  appointmentCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: '#555',
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cancelButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  rescheduleButton: {
    backgroundColor: '#4E89E8',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  rescheduleButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

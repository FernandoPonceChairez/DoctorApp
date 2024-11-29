import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from './api'; // Usamos la configuración de Axios para la API
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para obtener el user_id

const MyAppointmentScreen = ({ navigation }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState('Upcoming'); // Estado para controlar la pestaña activa

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
          Alert.alert('Error', 'No se encontró el ID del usuario.');
          return;
        }

        // Obtener las citas del usuario
        const response = await api.get(`/appointments/user/?user_id=${userId}`);
        if (response.data.length === 0) {
          setError('No tienes citas agendadas');
        } else {
          const appointmentsWithDoctorDetails = await Promise.all(response.data.map(async (appointment) => {
            // Obtener los detalles del doctor utilizando el doctor_id
            const doctorResponse = await api.get(`/doctors/${appointment.doctor_id}`);
            return {
              ...appointment,
              doctorName: doctorResponse.data.name,      // Nombre del doctor
              doctorSpecialty: doctorResponse.data.specialty,
              doctorZone: doctorResponse.data.zone,  // Especialidad del doctor
            };
          }));

          setAppointments(appointmentsWithDoctorDetails);  // Actualizamos las citas con los detalles del doctor
        }

        setLoading(false); // Finaliza la carga
      } catch (err) {
        console.error('Error al obtener citas:', err);
        setError('Hubo un problema al cargar tus citas');
        setLoading(false); // Finaliza la carga en caso de error
      }
    };

    fetchAppointments();
  }, []);

  // Si estamos cargando, mostrar un indicador de carga
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4E89E8" />
        <Text>Loading...</Text>
      </View>
    );
  }

  // Si hay un error, mostramos el mensaje de error
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  // Función para cancelar la cita
  const cancelAppointment = async (appointmentId) => {
    try {
      const response = await api.put(`/appointments/${appointmentId}`, {
        status: 'Past', // Actualizamos el estado de la cita a 'Past'
      });

      if (response.status === 200) {
        Alert.alert('Cita cancelada', 'La cita ha sido cancelada y movida a "Citas pasadas".');
        
        // Filtramos las citas para actualizar la lista en la UI
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment.id !== appointmentId)
        );
      } else {
        Alert.alert('Error', 'Hubo un problema al cancelar la cita.');
      }
    } catch (error) {
      console.error("Error al cancelar la cita:", error);
      Alert.alert('Error', 'No se pudo cancelar la cita.');
    }
  };

  const renderAppointment = ({ item }) => (
    <View style={styles.appointmentCard}>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Date</Text>
        <Text style={styles.value}>{new Date(item.date).toLocaleString()}</Text>
        <Text style={styles.label}>Doctor</Text>
        <Text style={styles.value}>{item.doctorName}</Text>
        <Text style={styles.label}>Appointment Type</Text>
        <Text style={styles.value}>{item.doctorSpecialty}</Text>
        <Text style={styles.label}>Place</Text>
        <Text style={styles.value}>{item.doctorZone}</Text>
      </View>
      {tab === 'Upcoming' ? (
        <TouchableOpacity 
          style={styles.cancelButton} 
          onPress={() => cancelAppointment(item.id)} // Cancelar la cita
        >
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
          <Text style={[styles.tabText, tab === 'Upcoming' && styles.activeTabText]}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, tab === 'Past' && styles.activeTab]}
          onPress={() => setTab('Past')}
        >
          <Text style={[styles.tabText, tab === 'Past' && styles.activeTabText]}>Past</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de citas */}
      <FlatList
        data={tab === 'Upcoming' ? appointments.filter((app) => app.status === 'Upcoming') : appointments.filter((app) => app.status === 'Past')}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderAppointment}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFC',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default MyAppointmentScreen;

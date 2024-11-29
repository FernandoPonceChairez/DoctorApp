import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // Para seleccionar la fecha y hora
import api from './api'; // Asegúrate de que este archivo esté configurado para conectar a tu API
import AsyncStorage from '@react-native-async-storage/async-storage'; // Usamos AsyncStorage para recuperar el user_id

const AppointmentScreen = ({ route, navigation }) => {
  const { doctor } = route.params || {}; // Asegúrate de que doctor no sea undefined
  const [selectedDate, setSelectedDate] = useState(new Date()); // Para guardar la fecha seleccionada (inicializada como Date)
  const [selectedSlot, setSelectedSlot] = useState(null); // Para guardar el slot de la cita seleccionado
  const [showDatePicker, setShowDatePicker] = useState(false); // Para mostrar el DateTimePicker

  // Fechas de ejemplo para el calendario
  const dates = [
    { day: 'Mon', date: '01' },
    { day: 'Tue', date: '02' },
    { day: 'Wed', date: '03' },
    { day: 'Thu', date: '04' },
    { day: 'Fri', date: '05' },
    { day: 'Sat', date: '06' },
    { day: 'Sun', date: '07' },
  ];

  // Horarios divididos en secciones
  const slots = {
    morning: ['10:10 am', '10:30 am', '10:50 am', '11:20 am', '11:40 am'],
    afternoon: ['02:00 pm', '02:20 pm', '02:40 pm'],
    evening: ['07:00 pm', '07:20 pm', '07:40 pm', '08:00 pm', '08:20 pm'],
  };

  // Estado para el usuario
  const [user, setUser] = useState(null); // Para almacenar la información del usuario

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId'); // Recuperar ID del usuario desde el almacenamiento
        if (!userId) {
          Alert.alert('Error', 'No se encontró información del usuario.');
          navigation.reset({ index: 0, routes: [{ name: 'SignIn' }] }); // Redirigir al inicio de sesión
          return;
        }
        const response = await api.get(`/users/${userId}`); // Obtener datos del usuario
        setUser(response.data); // Actualizar el estado con los datos del usuario
      } catch (error) {
        console.error('Error al cargar los datos del usuario:', error);
        Alert.alert('Error', 'No se pudieron cargar los datos del usuario.');
      }
    };

    fetchUserData();
  }, []);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date(); // Esto asegura que siempre sea un objeto Date.
    setShowDatePicker(false);
    setSelectedDate(currentDate); // Actualiza la fecha seleccionada como objeto Date
  };

  const handleConfirmAppointment = async () => {
    if (!user) {
      Alert.alert('Error', 'No se pudo obtener la información del usuario');
      return;
    }

    // Verificar que se haya seleccionado un slot y una fecha
    if (!selectedSlot) {
      Alert.alert('Error', 'Por favor selecciona un horario');
      return;
    }

    // Enviar la cita a la API
    try {
      const response = await api.post('/appointments', {
        user_id: user.id,
        doctor_id: doctor.id,
        date: selectedDate.toISOString(), // Convertir la fecha seleccionada a formato ISO
        time_slot: selectedSlot, // Hora seleccionada
        status: 'Upcoming',
      });

      if (response.status === 201) {
        Alert.alert('Cita Agendada', 'Tu cita ha sido agendada correctamente.');
        navigation.goBack(); // Volver a la pantalla anterior o a la lista de citas
      }
    } catch (error) {
      console.error("Error al agendar la cita:", error);
      Alert.alert('Error', 'Hubo un problema al agendar la cita');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointment</Text>

      {/* Selector de fecha */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateSelector}>
        {dates.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.dateItem, selectedDate.toDateString().slice(4, 10) === `${item.day} ${item.date}` && styles.selectedDateItem]}
            onPress={() => setSelectedDate(new Date(`2024-${item.date}`))} // Actualiza la fecha seleccionada con el nuevo valor
          >
            <Text style={styles.dateDay}>{item.day}</Text>
            <Text style={styles.dateNumber}>{item.date}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Slots de tiempo */}
      <ScrollView style={styles.slotsContainer}>
        <Text style={styles.slotSectionTitle}>Morning Slots</Text>
        <View style={styles.slotSection}>
          {slots.morning.map((time, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.slot, selectedSlot === time && styles.selectedSlot]}
              onPress={() => setSelectedSlot(time)}
            >
              <Text style={styles.slotText}>{time}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.slotSectionTitle}>Afternoon Slots</Text>
        <View style={styles.slotSection}>
          {slots.afternoon.map((time, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.slot, selectedSlot === time && styles.selectedSlot]}
              onPress={() => setSelectedSlot(time)}
            >
              <Text style={styles.slotText}>{time}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.slotSectionTitle}>Evening Slots</Text>
        <View style={styles.slotSection}>
          {slots.evening.map((time, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.slot, selectedSlot === time && styles.selectedSlot]}
              onPress={() => setSelectedSlot(time)}
            >
              <Text style={styles.slotText}>{time}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Botón de confirmación */}
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirmAppointment}
      >
        <Text style={styles.confirmButtonText}>Confirm Appointment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFC',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  dateSelector: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dateItem: {
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#E8EAF0',
    borderRadius: 10,
  },
  selectedDateItem: {
    backgroundColor: '#4E89E8',
  },
  dateDay: {
    fontSize: 14,
    color: '#555',
  },
  dateNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  slotsContainer: {
    flex: 1,
  },
  slotSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  slotSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  slot: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    margin: 5,
    backgroundColor: '#FFF',
  },
  selectedSlot: {
    backgroundColor: '#4E89E8',
    borderColor: '#4E89E8',
  },
  slotText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
  },
  confirmButton: {
    backgroundColor: '#4E89E8',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AppointmentScreen;

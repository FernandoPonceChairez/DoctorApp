import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const AppointmentScreen = () => {
  const [selectedDate, setSelectedDate] = useState('2024-11-19');
  const [selectedSlot, setSelectedSlot] = useState(null);

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
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Appointment</Text>
      </View>
      <Text style={styles.title2}>August</Text>
      

      {/* Selector de fecha */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateSelector}>
        {dates.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dateItem,
              selectedDate === item.date && styles.selectedDateItem,
            ]}
            onPress={() => setSelectedDate(item.date)}
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
              style={[
                styles.slot,
                selectedSlot === time && styles.selectedSlot,
              ]}
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
              style={[
                styles.slot,
                selectedSlot === time && styles.selectedSlot,
              ]}
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
              style={[
                styles.slot,
                selectedSlot === time && styles.selectedSlot,
              ]}
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
        onPress={() =>
          selectedSlot
            ? alert(`Appointment Confirmed for ${selectedSlot}`)
            : alert('Please select a time slot')
        }
      >
        <Text style={styles.confirmButtonText}>Confirm Appointment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6EFF9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop:20,
    height:'100%',
  },
  title2: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop:-10,
    marginBottom:10,
    marginLeft:30,
  },
  dateSelector: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor:'#ffffff',
    padding:5,
  },
  dateItem: {
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    height:60,
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor:'#ffffff',
    height:110,
    width:'100%',
    padding:20,
    paddingTop:50,
  },
});

export default AppointmentScreen;

import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

const AppointmentScreen = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);

  const slots = [
    { id: '1', time: '10:10 am' },
    { id: '2', time: '02:20 pm' },
    { id: '3', time: '07:00 pm' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select an Appointment Time</Text>
      <View style={styles.slotsContainer}>
        {slots.map((slot) => (
          <TouchableOpacity
            key={slot.id}
            style={[styles.slot, selectedSlot === slot.id && styles.selectedSlot]}
            onPress={() => setSelectedSlot(slot.id)}
          >
            <Text>{slot.time}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Button title="Confirm Appointment" onPress={() => alert('Appointment Confirmed!')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  slotsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 },
  slot: { padding: 10, borderWidth: 1, borderRadius: 5 },
  selectedSlot: { backgroundColor: 'lightblue' },
});

export default AppointmentScreen;

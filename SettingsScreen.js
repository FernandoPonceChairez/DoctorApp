import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function SettingsScreen({ navigation }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [messageOptionEnabled, setMessageOptionEnabled] = useState(false);
  const [callOptionEnabled, setCallOptionEnabled] = useState(true);
  const [videoCallOptionEnabled, setVideoCallOptionEnabled] = useState(false);

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
      </View>

      {/* Opciones de configuración */}
      <View style={styles.settingsContainer}>
        {/* Notificaciones */}
        <View style={styles.settingRow}>
          <Ionicons name="notifications-outline" size={24} color="#4E89E8" />
          <Text style={styles.settingLabel}>Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            thumbColor={notificationsEnabled ? '#4E89E8' : '#f4f3f4'}
            trackColor={{ false: '#E5E5EA', true: '#B3D4FF' }}
          />
        </View>

        {/* Opciones de Mensajes */}
        <View style={styles.settingRow}>
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="#4E89E8" />
          <Text style={styles.settingLabel}>Message Option</Text>
          <Switch
            value={messageOptionEnabled}
            onValueChange={setMessageOptionEnabled}
            thumbColor={messageOptionEnabled ? '#4E89E8' : '#f4f3f4'}
            trackColor={{ false: '#E5E5EA', true: '#B3D4FF' }}
          />
        </View>

        {/* Opciones de Llamada */}
        <View style={styles.settingRow}>
          <Ionicons name="call-outline" size={24} color="#4E89E8" />
          <Text style={styles.settingLabel}>Call Option</Text>
          <Switch
            value={callOptionEnabled}
            onValueChange={setCallOptionEnabled}
            thumbColor={callOptionEnabled ? '#4E89E8' : '#f4f3f4'}
            trackColor={{ false: '#E5E5EA', true: '#B3D4FF' }}
          />
        </View>

        {/* Videollamadas */}
        <View style={styles.settingRow}>
          <MaterialIcons name="video-call" size={24} color="#4E89E8" />
          <Text style={styles.settingLabel}>Video Call Option</Text>
          <Switch
            value={videoCallOptionEnabled}
            onValueChange={setVideoCallOptionEnabled}
            thumbColor={videoCallOptionEnabled ? '#4E89E8' : '#f4f3f4'}
            trackColor={{ false: '#E5E5EA', true: '#B3D4FF' }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF', // Fondo blanco para el encabezado
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    elevation: 2,
    marginTop: 29,
  },
  backButton: {
    position: 'absolute',
    left: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  settingsContainer: {
    marginTop: 20, // Separación ligera entre el encabezado y las opciones
    backgroundColor: '#FFF', // Fondo blanco para las opciones
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  settingLabel: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
});

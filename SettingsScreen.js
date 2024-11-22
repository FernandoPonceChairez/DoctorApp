import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen({ navigation }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [messageOptionEnabled, setMessageOptionEnabled] = useState(false);
  const [callOptionEnabled, setCallOptionEnabled] = useState(true);
  const [videoCallOptionEnabled, setVideoCallOptionEnabled] = useState(false);

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
      </View>

      {/* Opciones de configuración */}
      <View style={styles.settingsContainer}>
        <View style={styles.settingRow}>
          <Ionicons name="notifications-outline" size={24} color="#8E8E93" />
          <Text style={styles.settingLabel}>Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            thumbColor={notificationsEnabled ? '#4E89E8' : '#f4f3f4'}
            trackColor={{ false: '#E5E5EA', true: '#4E89E8' }}
          />
        </View>

        <View style={styles.settingRow}>
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="#8E8E93" />
          <Text style={styles.settingLabel}>Message Option</Text>
          <Switch
            value={messageOptionEnabled}
            onValueChange={setMessageOptionEnabled}
            thumbColor={messageOptionEnabled ? '#4E89E8' : '#f4f3f4'}
            trackColor={{ false: '#E5E5EA', true: '#4E89E8' }}
          />
        </View>

        <View style={styles.settingRow}>
          <Ionicons name="call-outline" size={24} color="#8E8E93" />
          <Text style={styles.settingLabel}>Call Option</Text>
          <Switch
            value={callOptionEnabled}
            onValueChange={setCallOptionEnabled}
            thumbColor={callOptionEnabled ? '#4E89E8' : '#f4f3f4'}
            trackColor={{ false: '#E5E5EA', true: '#4E89E8' }}
          />
        </View>

        <View style={styles.settingRow}>
          <Ionicons name="videocam-outline" size={24} color="#8E8E93" />
          <Text style={styles.settingLabel}>Video Call Option</Text>
          <Switch
            value={videoCallOptionEnabled}
            onValueChange={setVideoCallOptionEnabled}
            thumbColor={videoCallOptionEnabled ? '#4E89E8' : '#f4f3f4'}
            trackColor={{ false: '#E5E5EA', true: '#4E89E8' }}
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
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFF',
    elevation: 2,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  settingsContainer: {
    paddingHorizontal: 20,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  settingLabel: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
});

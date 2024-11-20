import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Íconos para la videollamada

const VideoCallScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Aquí puedes agregar la imagen del doctor en videollamada */}
      <View style={styles.videoContainer}>
        <Text style={styles.videoText}>Simulated Video Call with Doctor</Text>
      </View>

      {/* Botones de la videollamada */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="volume-mute" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="videocam" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="chatbubbles" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.controlButton, styles.hangupButton]} onPress={() => navigation.goBack()}>
          <Ionicons name="call" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  videoContainer: {
    width: '80%',
    height: '50%',
    backgroundColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  videoText: { color: '#fff', fontSize: 20 },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  controlButton: {
    backgroundColor: '#666',
    padding: 20,
    borderRadius: 50,
  },
  hangupButton: {
    backgroundColor: 'red',
  },
});

export default VideoCallScreen;

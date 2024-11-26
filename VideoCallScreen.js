import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const VideoCallScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Botón de retroceso */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={28} color="#333" />
      </TouchableOpacity>

      {/* Foto principal del doctor */}
      <View style={styles.doctorContainer}>
        <Image
          style={styles.doctorImage}
          source={{ uri: 'https://via.placeholder.com/300x400.png?text=Dr.+Adam+Smith' }}
        />
        <Text style={styles.doctorName}>Dr. Adam Smith</Text>
        <Text style={styles.callTime}>20:34</Text>
      </View>

      {/* Vista del paciente en la esquina */}
      <View style={styles.patientView}>
        <Image
          style={styles.patientImage}
          source={{ uri: 'https://via.placeholder.com/100x100.png?text=You' }}
        />
      </View>

      {/* Botones de control */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="mic-off" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="videocam" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.controlButton, styles.hangupButton]} onPress={() => navigation.goBack()}>
          <Ionicons name="call" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="chatbubbles" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFC',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
  },
  doctorContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  doctorImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 15,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  callTime: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  patientView: {
    position: 'absolute',
    top: 80,
    right: 20,
    width: 100,
    height: 100,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
  },
  patientImage: {
    width: '100%',
    height: '100%',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 50,
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

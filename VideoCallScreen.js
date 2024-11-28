import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const VideoCallScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('./assets/call.jpg')}
      style={styles.backgroundImage}
    >
      {/* Botón de retroceso */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={28} color="#333" />
      </TouchableOpacity>

      {/* Información del doctor */}
      <View style={styles.doctorContainer}>
        <Text style={styles.doctorName}>Dr. Adam Smith</Text>
        <Text style={styles.callTime}>20:34</Text>
      </View>

      {/* Vista del paciente en la esquina */}
      <View style={styles.patientView}>
      <Image
          source={require('./assets/patient.png')} 
          style={styles.patientImage}
          />
      </View>

      {/* Botones de control */}
      <View style={styles.controlsContainer}>

        <View>
          <TouchableOpacity style={[styles.controlButton2, styles.hangupButton]} onPress={() => navigation.goBack()}>
          <Ionicons style={styles.iconcel} name="call" size={25} color="#fff" />
        </TouchableOpacity>
        </View>

        <View style={styles.controless}>
          <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="mic-off" size={20} color="#000" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButtonm}>
          <Ionicons name="chatbubbles" size={20} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="videocam" size={20} color="#000" />
        </TouchableOpacity>
        </View>

        

      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    padding: 10,
    borderRadius: 50,
  },
  doctorContainer: {
    alignItems: 'center',
    marginTop: 250,
  },
  doctorName: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  callTime: {
    fontSize: 16,
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
    justifyContent: 'center',
    position: 'absolute',
    bottom: 50,
    width: '100%',
    paddingHorizontal: 20,
    marginLeft:50,
  },
  controlButton: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 100,
    width:60,
    marginBottom:50
  },
  controlButton2: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 100,
    width:70,
    height:70,
    marginLeft:75,
    justifyContent:'center'
  },
  controlButtonm: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 100,
    width:60,
    marginHorizontal:20,
    marginTop:50
  },
  controless:{
    flexDirection:'row',
    
  },
  hangupButton: {
    backgroundColor: 'red',
  },
  iconcel:{
    marginLeft:2
  }
});

export default VideoCallScreen;

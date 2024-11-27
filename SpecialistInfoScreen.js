import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Para íconos de los botones

const SpecialistInfoScreen = ({ route, navigation }) => {
  const { doctor } = route.params;

  return (
    <View >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#4E89E8" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} >{doctor.name}</Text>
      </View>
      <Image style={styles.image} source={{ uri: 'https://img.freepik.com/foto-gratis/disparo-aislado-medico-senior-maduro-exitoso-feliz-vistiendo-uniforme-medico-estetoscopio-expresion-facial-alegre-sonriendo-ampliamente-manteniendo-brazos-cruzados-sobre-pecho_343059-2254.jpg?t=st=1732722335~exp=1732725935~hmac=6e64c837bf8d38af1054990d07d8f89dc1794ff8882f93a7d37e7eabeedc9764&w=740' }} />
      <View style={styles.container}>
        
        <Text>{doctor.specialty}</Text>
        <Text>{doctor.clinic}</Text>
        <Text style={styles.subtitle}>About {doctor.name}</Text>
        <Text>{doctor.bio || 'This is the bio of the doctor'}</Text>
        <View style={styles.footer}>
          <Text>Patients: 1.08K</Text>
          <Text>Experience: 8 Years</Text>
          <Text>Reviews: 2.05K</Text>
      </View>
      {/* Botones de llamada, videollamada y mensajes */}
      <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="call" size={30} color="#4F8EF7" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('VideoCall')}>
            <Ionicons name="videocam" size={30} color="#4F8EF7" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="chatbubbles" size={30} color="#4F8EF7" />
          </TouchableOpacity>
        </View>

        <Button title="Book an Appointment" onPress={() => navigation.navigate('Appointment')} />
      </View>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    padding:15,
  },
  image: { 
    width: '100%', 
    height: 250,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'#ffffff',
    height:90,
    width:'100%',
    padding:20,
    paddingTop:50,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 70,
  },
  name: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginVertical: 10 
  },
  subtitle: { 
    fontSize: 18, 
    marginVertical: 10 
  },
  footer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginVertical: 20 },
  buttonContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginVertical: 20 
  },
  iconButton: {
    backgroundColor: '#eee',
    padding: 15,
    borderRadius: 50,
    marginHorizontal: 10,
  },
});

export default SpecialistInfoScreen;

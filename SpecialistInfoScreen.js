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

        {/* Botones de llamada, videollamada y mensajes */}
      <View style={styles.buttonContainer}>

          <TouchableOpacity style={styles.iconButton1}>
            <Ionicons name="call" size={15} style={styles.iconb} />
            <Text style={styles.textbut}>Voice Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton2} onPress={() => navigation.navigate('VideoCall')}>
            <Ionicons style={styles.iconb} name="videocam" size={15}/>
            <Text style={styles.textbut}>Video Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton3}>
            <Ionicons name="chatbubbles" size={15} style={styles.iconb} />
            <Text style={styles.textbut}>Message</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.specia}>{doctor.specialty}</Text>
        <Text style={styles.cli}> {doctor.clinic}</Text>
        <Text style={styles.subtitle}>About {doctor.name}</Text>
        <Text>{doctor.bio ||  'Highly skilled professional with experience in the field. Has participated in various advanced training programs.'}</Text>
        <View style={styles.footer}>

          <View>
            <Text style={styles.patien}>Patients</Text>
            <Text style={styles.patien2}>1.08K</Text>
          </View>
          <View>
            <Text style={styles.patien}>Experience</Text>
            <Text style={styles.patien2}>9 Years</Text>
          </View>
          <View>
            <Text style={styles.patien}>Reviews</Text>
            <Text style={styles.patien2}>2.05K</Text>
          </View>
          
      </View>

      <TouchableOpacity style={styles.botonc} onPress={() => navigation.navigate('Appointment')}>
        <Text style={styles.buttonText}>Book an Appointment</Text>
      </TouchableOpacity>

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
    fontWeight:'bold',
    marginVertical: 10,
    marginTop:20 
  },
  patien:{
    color:'gray'

  },
  patien2:{
    fontWeight:'bold',
    fontSize:25,
    color:'#1C1C1C'
  },
  specia:{
    fontWeight:'bold',
    fontSize:20,
    marginTop:10

  },
  cli:{
    fontSize:15,
  },
  footer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginVertical: 20,
    marginTop:40,
  },
  buttonContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginVertical: 20 
  },
  iconButton1: {
    backgroundColor: '#00BFFF',
    padding: 5,
    borderRadius: 10,
    marginHorizontal: 5,
    width:100,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    flexDirection: 'row',
  },
  iconButton2: {
    backgroundColor: '#C6AADB',
    padding: 5,
    borderRadius: 10,
    marginHorizontal: 5,
    width:100,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    flexDirection: 'row',
  },
  iconButton3: {
    backgroundColor: '#F2C68C',
    padding: 5,
    borderRadius: 10,
    marginHorizontal: 5,
    width:100,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    flexDirection: 'row',
  },
  textbut:{
    color:'#ffffff',
    fontWeight:'bold',

  },
  iconb:{
    color:'#ffffff',
    width:20,
  },
  botonc: {
    width: 325,
    backgroundColor: '#2582ff',
    padding: 10,
    justifyContent:'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 50,
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SpecialistInfoScreen;

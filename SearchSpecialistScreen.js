import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker'; // Importar DateTimePicker

export default function SearchSpecialistScreen({ navigation }) {
  const [area, setArea] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false); // Ocultar el selector
    setDate(currentDate);
  };

  const handleSearch = () => {
    // Enviar parámetros a la pantalla de resultados
    navigation.navigate('SearchResults', {
      specialty,
      area,
      date: date.toISOString(), // Pasamos la fecha como string ISO
    });
  };

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#4E89E8" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search Here</Text>
      </View>

      {/* Contenido principal */}
      <View style={styles.content}>
        <Text style={styles.title}>Search Your</Text>
        <Text style={styles.titleBold}>Specialist</Text>

        {/* Campo de selección de área */}
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={area}
            onValueChange={(value) => setArea(value)}
            style={styles.input}
          >
            <Picker.Item label="Select Area" value="" />
            <Picker.Item label="Downtown" value="Downtown" />
            <Picker.Item label="Uptown" value="Uptown" />
            <Picker.Item label="Suburbs" value="Suburbs" />
          </Picker>
          <Ionicons name="location-outline" size={20} color="#4E89E8" />
        </View>

        {/* Campo de selección de especialidad */}
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={specialty}
            onValueChange={(value) => setSpecialty(value)}
            style={styles.input}
          >
            <Picker.Item label="Select Specialty" value="" />
            <Picker.Item label="Cardiologist" value="Cardiologist" />
            <Picker.Item label="Dermatologist" value="Dermatologist" />
            <Picker.Item label="Pediatrician" value="Pediatrician" />
          </Picker>
          <MaterialCommunityIcons name="stethoscope" size={20} color="#4E89E8" />
        </View>

        {/* Campo de selección de fecha */}
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.input}>
            {date.toDateString() || 'Select Date'}
          </Text>
          <Ionicons name="calendar-outline" size={20} color="#4E89E8" />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        {/* Botón de búsqueda */}
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Imagen inferior */}
      <View style={styles.footerImage}>
        <ImageBackground source={require('./assets/SearchHerePhoto.png')} style={styles.background}>
          <Text style={{ color: 'transparent', fontSize: 16 }}>Search Here</Text>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6EFF9',
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
  background: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 85,
  },
  content: {
    flex: 1,
    padding:20,
  },
  title: {
    fontSize: 20,
    color: '#333',
  },
  titleBold: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    elevation: 3,
    height:60,
  },
  input: {
    flex: 1,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#4E89E8',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent:"center",
    height:60,
  },
  searchButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerImage: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

});

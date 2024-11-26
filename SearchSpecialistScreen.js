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

const doctors = [
  { id: '1', name: 'Dr. Serena Gomez', specialty: 'Cardiologist', area: 'Downtown', clinic: 'New City Clinic' },
  { id: '2', name: 'Dr. Simata Baroi', specialty: 'Cardiologist', area: 'Uptown', clinic: 'New City Clinic' },
  { id: '3', name: 'Dr. John Doe', specialty: 'Dermatologist', area: 'Downtown', clinic: 'HealthPlus Center' },
  { id: '4', name: 'Dr. Emily Stone', specialty: 'Dermatologist', area: 'Uptown', clinic: 'HealthCare Hospital' },
  { id: '5', name: 'Dr. Asma Khan', specialty: 'Pediatrician', area: 'Suburbs', clinic: 'Child Care Clinic' },
  { id: '6', name: 'Dr. Michael Ross', specialty: 'Orthopedic', area: 'Downtown', clinic: 'Bone & Joint Center' },
  { id: '7', name: 'Dr. Priya Sharma', specialty: 'Gynecologist', area: 'Suburbs', clinic: 'Women’s Health Center' },
  { id: '8', name: 'Dr. Ethan Hunt', specialty: 'Neurologist', area: 'Uptown', clinic: 'Brain & Spine Clinic' },
  { id: '9', name: 'Dr. Ana Lopez', specialty: 'Ophthalmologist', area: 'Downtown', clinic: 'Vision Care Clinic' },
  { id: '10', name: 'Dr. Nathan King', specialty: 'General Physician', area: 'Midtown', clinic: 'Family Health Clinic' },
  { id: '11', name: 'Dr. Sofia Martinez', specialty: 'Cardiologist', area: 'Suburbs', clinic: 'HeartCare Center' },
  { id: '12', name: 'Dr. James Lee', specialty: 'ENT Specialist', area: 'Downtown', clinic: 'Hearing & Nose Center' },
  { id: '13', name: 'Dr. Clara Oswald', specialty: 'Psychiatrist', area: 'Uptown', clinic: 'Mind Wellness Clinic' },
  { id: '14', name: 'Dr. Ali Rehman', specialty: 'Urologist', area: 'Midtown', clinic: 'Kidney Health Center' },
  { id: '15', name: 'Dr. Grace Taylor', specialty: 'Endocrinologist', area: 'Downtown', clinic: 'Diabetes Care Clinic' },
];


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
    const filteredDoctors = doctors.filter(
      (doctor) =>
        (area === '' || doctor.area === area) &&
        (specialty === '' || doctor.specialty === specialty)
    );

    navigation.navigate('SearchResults', { results: filteredDoctors });
  };

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#4E89E8" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} >Search Here</Text>
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

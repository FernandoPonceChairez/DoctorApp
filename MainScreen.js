import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const categories = [
  { id: '1', name: 'Pediatrician', icon: require('./assets/Pediatrician.png') },
  { id: '2', name: 'Neurosurgeon', icon: require('./assets/Neurosurgeon.png') },
  { id: '3', name: 'Cardiologist', icon: require('./assets/Cardiologist.png') },
  { id: '4', name: 'Psychiatrist', icon: require('./assets/Psychiatrist.png') },
];

const doctors = [
  {
    name: 'Dr. Serena Gomez',
    specialty: 'Medicine Specialist',
    experience: '8 Years',
    patients: '1.8K',
    image: require('./assets/doc1.png'),
    reviews: '2.05K',
  },
  {
    name: 'Dr. Asma Khan',
    specialty: 'Medicine Specialist',
    experience: '5 Years',
    patients: '2.7K',
    image: require('./assets/doc1.png'),
    reviews: '1.5K',
  },
];

const MainScreen = () => {
  const navigation = useNavigation();
  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  return (
    <View style={styles.container}>
      {/* NavBar */}
      <View style={styles.navBar}>
        <View>
          <Text style={styles.navBarTitle}>Find Your</Text>
          <Text style={styles.navBarTitleBold}>Specialist</Text>
        </View>
        <View style={styles.navBarIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('SearchSpecialist')}>
            <Ionicons name="search" size={24} color="#4E89E8" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Messages')} style={{ marginLeft: 20 }}>
            <Ionicons name="chatbubble-ellipses-outline" size={24} color="#4E89E8" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner promocional */}
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Looking For Your Desired Specialist Doctor?</Text>
          <View style={styles.linegreen}>
            <Text style={styles.bannerSubText}>Dr. Salina Zaman</Text>
            <Text style={styles.bannerSubText2}>Medicine & Heart Spelist</Text>
            <Text style={styles.bannerSubText2}>Good Health Clinic</Text>
          </View>
          
        </View>

        {/* Categorías */}
        <View style={styles.categoryContainer}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.categoryCard}>
                <Image 
                  source={item.icon} 
                  style={styles.categoryImage} 
                  resizeMode="contain" 
                />
                <Text style={styles.categoryText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Doctores disponibles */}
        <View style={styles.doctorContainer}>
          <Text style={styles.sectionTitle}>Available Doctor</Text>
          <FlatList
            data={doctors}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.name}
            contentContainerStyle={{ paddingHorizontal: 0 }} // Espaciado horizontal
            renderItem={({ item }) => (
              <View style={styles.doctorCard}>
                <Image source={item.image} style={styles.doctorImage} />
                <View style={styles.infoContainer}>
                  <Text style={styles.doctorName}>{item.name}</Text>
                  <Text style={styles.doctorSpecialty}>{item.specialty}</Text>
                  <Text style={styles.doctorDetails}>Experience: {item.experience}</Text>
                  <Text style={styles.doctorDetails}>Patients: {item.patients}</Text>
                </View>
              </View>
            )}
          />

        </View>
      </ScrollView>

      {/* Menú flotante */}
      {isMenuVisible && (
        <View style={styles.floatingMenu}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              navigation.navigate('MyAppointment'); // Pantalla My Appointment
            }}
          >
            <Ionicons name="calendar-outline" size={24} color="#FFF" />
            <Text style={styles.menuText}>My Appointment</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              navigation.navigate('Profile'); // Pantalla Profile
            }}
          >
            <Ionicons name="person-outline" size={24} color="#FFF" />
            <Text style={styles.menuText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              navigation.navigate('Settings'); // Pantalla Settings
            }}
          >
            <Ionicons name="settings-outline" size={24} color="#FFF" />
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              alert('Logged Out');
            }}
          >
            <Ionicons name="log-out-outline" size={24} color="#FFF" />
            <Text style={styles.menuText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.homeButton}>
          <Ionicons name="home" size={24} color="#FFF" />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Doctors')}>
          <MaterialCommunityIcons name="stethoscope" size={24} color="#4E89E8" />
          <Text style={styles.tabLabelInactive}>Doctors</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Notifications')}>
          <Ionicons name="notifications" size={24} color="#4E89E8" />
          <Text style={styles.tabLabelInactive}>Alerts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={toggleMenu}>
          <Ionicons name="grid" size={24} color="#4E89E8" />
          <Text style={styles.tabLabelInactive}>More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFC',
    padding: 20,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop:30,
  },
  navBarTitle: {
    fontSize: 20,
    color: '#333',
  },
  navBarTitleBold: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  navBarIcons: {
    flexDirection: 'row',
  },
  banner: {
    backgroundColor: '#4E89E8',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    
  },
  bannerText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bannerSubText: {
    color: '#FFF',
    fontSize: 16,
  },
  bannerSubText2: {
    color: '#FFF',
    fontSize: 12,
    marginTop: 5,
  },
  linegreen:{
    paddingLeft: 10, // Espaciado interno
    borderLeftWidth: 5, // Ancho del borde izquierdo
    borderLeftColor: '#39ff14',
    marginTop:30,
    borderRadius:5,

  },
  categoryContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryCard: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    elevation: 3,
  },
  categoryText: {
    marginTop: 10,
    fontSize: 12,
    color: '#333',
  },
  doctorContainer: {
    marginBottom: 20,
  },
  doctorCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    marginLeft:5,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  doctorSpecialty: {
    color: '#555',
    marginBottom: 5,
  },
  doctorDetails: {
    color: '#777',
    fontSize: 12,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF',
    height: 70,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    borderRadius: 20,
  },
  tabItem: {
    alignItems: 'center',
  },
  homeButton: {
    backgroundColor: '#4E89E8',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    top: -15,
  },
  tabLabel: {
    color: '#FFF',
    fontSize: 12,
    marginTop: 5,
    fontWeight: 'bold',
  },
  tabLabelInactive: {
    color: '#4E89E8',
    fontSize: 12,
    marginTop: 5,
  },
  floatingMenu: {
    position: 'absolute',
    bottom: 90,
    left: 20,
    right: 20,
    backgroundColor: '#4E89E8',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
  },
  menuText: {
    marginLeft: 15,
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MainScreen;

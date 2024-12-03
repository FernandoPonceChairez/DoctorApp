import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Define el tipo de cada objeto en el arreglo de datos
interface Doctor {
  NPI: string;
  FIRST_NAME: string;
  LAST_NAME: string;
  PROVIDER_TYPE_DESC: string;
  STATE_CD: string;
}

const DoctorScreen = () => {
  const [data, setData] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://data.cms.gov/data-api/v1/dataset/2457ea29-fc82-48b0-86ec-3b0755de7515/data');
        const json: Doctor[] = await response.json();
        setData(json);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      {/* Lista de doctores */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.NPI}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.name}>{item.FIRST_NAME} {item.LAST_NAME}</Text>
            <Text style={styles.details}>Specialty: {item.PROVIDER_TYPE_DESC}</Text>
            <Text style={styles.details}>State: {item.STATE_CD}</Text>
          </View>
        )}
      />

      {/* Barra de navegación inferior manual */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabItem, styles.tabItemFocused]}
          onPress={() => router.push('../doctors/doctors')}
        >
          <FontAwesome name="stethoscope" size={24} color="#fff" />
          <Text style={styles.tabText}>Doctor</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push('../home')}
        >
          <MaterialIcons name="home" size={24} color="#000" />
          <Text style={styles.tabTextInactive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push('../notifications/notifications')}
        >
          <Feather name="bell" size={24} color="#000" />
          <Text style={styles.tabTextInactive}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={toggleMenu}
        >
          <MaterialIcons name="apps" size={24} color="#000" />
          <Text style={styles.tabTextInactive}>Menu</Text>
        </TouchableOpacity>
      </View>

      {/* Menú desplegable */}
      {menuVisible && (
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('../appointment')}>
            <MaterialIcons name="event" size={24} color="#fff" />
            <Text style={styles.menuText}>My Appointment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('../profile/profile')}>
            <MaterialIcons name="person" size={24} color="#fff" />
            <Text style={styles.menuText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('../settings/settings')}>
            <MaterialIcons name="settings" size={24} color="#fff" />
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('../auth/sign-in')}>
            <MaterialIcons name="logout" size={24} color="#fff" />
            <Text style={styles.menuText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F1FA',
    padding: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  details: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#f4f4f4',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 5,
    elevation: 5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  tabItemFocused: {
    backgroundColor: '#1E90FF',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  tabText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
  },
  tabTextInactive: {
    color: '#000',
    fontSize: 12,
    marginTop: 5,
  },
  menuContainer: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    backgroundColor: '#1E90FF',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default DoctorScreen;

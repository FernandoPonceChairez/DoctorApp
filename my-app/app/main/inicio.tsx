import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity,  Image, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

const Tab = createBottomTabNavigator();

const Inicio = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <>
      {/* Encabezado superior con texto e iconos */}
      <View style={styles.header}>
            <View>
                <Text style={styles.headerTextTop}>Find Your</Text>
                <Text style={styles.headerTextBottom}>Specialist</Text>
            </View>
            <View style={styles.headerIcons}>
                <TouchableOpacity onPress={() => router.push('../search')}>
                    <Image
                        source={require('../../assets/Icons/lupa.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('../messages')}>
                    <Image
                        source={require('../../assets/Icons/mensaje.png')}
                        style={styles.icon}
                    />
                    
                </TouchableOpacity>
            </View>
        </View>

        <View style={styles.contentContainer}>
          <TouchableOpacity>
            
            <ImageBackground
            source={require('../../assets/images/card.png')}
            style={styles.icon2}>

              <View>
                <Text style={styles.text}>Looking For Your Desire</Text>
                <Text style={styles.text}>Specialist Doctor?</Text>
                <Text style={[styles.text,{ fontSize: 15, marginTop:30, marginBottom:5 }]}>Dr. Salina Zaman</Text>
                <Text style={styles.text2}>Medicine & Heart Spelist</Text>
                <Text style={styles.text2}>Good Health Clinic</Text>
              </View>
              
              <View>
                <TouchableOpacity>
                <Image
                source={require('../../assets/images/doc1.png')}
                style={styles.docinicio}
                />
                </TouchableOpacity>
              </View>
            </ImageBackground>


            <ImageBackground
            source={require('../../assets/images/card.png')}
            style={styles.icon2}>

              <View>
                <Text style={styles.text}>Looking For Your Desire</Text>
                <Text style={styles.text}>Specialist Doctor?</Text>
                <Text style={[styles.text,{ fontSize: 15, marginTop:30, marginBottom:5 }]}>Dr. Salina Zaman</Text>
                <Text style={styles.text2}>Medicine & Heart Spelist</Text>
                <Text style={styles.text2}>Good Health Clinic</Text>
              </View>
              
              <View>
                <TouchableOpacity>
                <Image
                source={require('../../assets/images/doc1.png')}
                style={styles.docinicio}
                />
                </TouchableOpacity>
              </View>
            </ImageBackground>

            <ImageBackground
            source={require('../../assets/images/card.png')}
            style={styles.icon2}>

              <View>
                <Text style={styles.text}>Looking For Your Desire</Text>
                <Text style={styles.text}>Specialist Doctor?</Text>
                <Text style={[styles.text,{ fontSize: 15, marginTop:30, marginBottom:5 }]}>Dr. Salina Zaman</Text>
                <Text style={styles.text2}>Medicine & Heart Spelist</Text>
                <Text style={styles.text2}>Good Health Clinic</Text>
              </View>
              
              <View>
                <TouchableOpacity>
                <Image
                source={require('../../assets/images/doc1.png')}
                style={styles.docinicio}
                />
                </TouchableOpacity>
              </View>
            </ImageBackground>


          </TouchableOpacity>
        </View>





      {/* Barra de navegación inferior */}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size }) => (
            <TouchableOpacity
              style={[
                styles.tabItem,
                focused ? styles.tabItemFocused : null,
                { flexDirection: 'row', alignItems: 'center' },
              ]}
              onPress={() => {
                switch (route.name) {
                  case 'Home':
                    break;
                  case 'Doctor':
                    router.push('../doctors/doctors');
                    break;
                  case 'Notifications':
                    router.push('../notifications/notifications');
                    break;
                  case 'Menu':
                    toggleMenu();
                    break;
                }
              }}
            >
              {route.name === 'Home' && (
                <>
                  <MaterialIcons name="home" size={size} color={focused ? '#fff' : '#000'} />
                  {focused && <Text style={styles.tabText}>Home</Text>}
                </>
              )}
              {route.name === 'Doctor' && (
                <>
                  <FontAwesome name="stethoscope" size={size} color={focused ? '#fff' : '#000'} />
                  {focused && <Text style={styles.tabText}>Doctor</Text>}
                </>
              )}
              {route.name === 'Notifications' && (
                <>
                  <Feather name="bell" size={size} color={focused ? '#fff' : '#000'} />
                  {focused && <Text style={styles.tabText}>Notifications</Text>}
                </>
              )}
              {route.name === 'Menu' && (
                <>
                  <MaterialIcons name="apps" size={size} color={focused ? '#fff' : '#000'} />
                  {focused && <Text style={styles.tabText}>Menu</Text>}
                </>
              )}
            </TouchableOpacity>
          ),
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#000',
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: { display: 'none' },
          tabBarItemStyle: styles.tabItemWrapper,
        })}
      >
        <Tab.Screen name="Home" component={View} options={{ tabBarLabel: 'Home' }} />
        <Tab.Screen name="Doctor" component={View} options={{ tabBarLabel: 'Doctor' }} />
        <Tab.Screen name="Notifications" component={View} options={{ tabBarLabel: 'Notifications' }} />
        <Tab.Screen name="Menu" component={View} options={{ tabBarLabel: 'Menu' }} />
      </Tab.Navigator>

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
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop:30,
    padding: 20,
},
headerTextTop: {
    fontSize: 20,
    color: '#000000',
},
headerTextBottom: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
},
headerIcons: {
    flexDirection: 'row',
},
icon: {
    width: 24,
    height: 24,
    marginHorizontal: 10,
},
  tabBar: {
    backgroundColor: '#f4f4f4',
    paddingVertical: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 5,
  },
  tabItemWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItem: {
    paddingTop: 0,
    paddingBottom: 5,
    borderRadius: 30,
    paddingHorizontal: 15,
  },
  tabItemFocused: {
    backgroundColor: '#1E90FF',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginHorizontal: -10,
    paddingVertical: 12,
  },
  tabText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 14,
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


 
  contentContainer: {
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    
  },
  icon2:{
    width:320,
    height:170,
    overflow: 'hidden',
    borderRadius: 15,
    padding:20,
    flexDirection: 'row',
    margin:5,
  },
  text2:{
    fontSize:15,
    color:"#ffffff"
  },
  docinicio:{
    width:140,
    height:170,
  },
});

export default Inicio;

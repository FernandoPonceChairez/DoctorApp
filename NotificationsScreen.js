import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const notifications = [
  {
    id: '1',
    title: 'Remind For Serial',
    description: 'It is a long established fact that a reader will be distracted.',
    time: '11 Min',
    type: 'info',
    date: 'Today',
  },
  {
    id: '2',
    title: 'Notification From Dr. Istiak',
    description: 'It is a long established fact that a reader will be distracted.',
    time: '23 Min',
    type: 'info',
    date: 'Today',
  },
  {
    id: '3',
    title: 'Notification From Dr. Shofik',
    description: 'It is a long established fact that a reader will be distracted.',
    time: '1 Hours',
    type: 'alert',
    date: 'Today',
  },
  {
    id: '4',
    title: 'Remind For Serial',
    description: 'It is a long established fact that a reader will be distracted.',
    time: '2 Hours',
    type: 'info',
    date: 'Yesterday',
  },
  {
    id: '5',
    title: 'Notification From Dr. Istiak',
    description: 'It is a long established fact that a reader will be distracted.',
    time: '5 Hours',
    type: 'alert',
    date: 'Yesterday',
  },
];

const NotificationItem = ({ item }) => (
  <View style={styles.notificationCard}>
    <View style={styles.iconContainer}>
      <Ionicons
        name={item.type === 'alert' ? 'notifications' : 'information-circle'}
        size={24}
        color={item.type === 'alert' ? '#FF6B6B' : '#4E89E8'}
      />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationDescription}>{item.description}</Text>
    </View>
    <Text style={styles.notificationTime}>{item.time}</Text>
  </View>
);

export default function NotificationsScreen({ navigation }) {
  const groupedNotifications = notifications.reduce((acc, notification) => {
    if (!acc[notification.date]) {
      acc[notification.date] = [];
    }
    acc[notification.date].push(notification);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
        <TouchableOpacity>
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="#4E89E8" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={Object.keys(groupedNotifications)}
        keyExtractor={(date) => date}
        renderItem={({ item: date }) => (
          <>
            <Text style={styles.sectionTitle}>{date}</Text>
            {groupedNotifications[date].map((notification) => (
              <NotificationItem key={notification.id} item={notification} />
            ))}
          </>
        )}
      />

      {/* Barra de navegación inferior */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={24} color="#4E89E8" />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Doctors')}>
          <FontAwesome5 name="stethoscope" size={24} color="#4E89E8" />
          <Text style={styles.tabLabel}>Doctors</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabItem, styles.tabItemActive]}>
          <Ionicons name="notifications" size={24} color="#FFF" />
          <Text style={[styles.tabLabel, styles.tabLabelActive]}>Alerts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Menu')}>
          <Ionicons name="grid" size={24} color="#4E89E8" />
          <Text style={styles.tabLabel}>More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFC',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
  },
  iconContainer: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationDescription: {
    fontSize: 14,
    color: '#777',
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  // Barra de navegación inferior
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#DDD',
    position: 'absolute',
    bottom: 0,
    left: -20, // Extiende la barra hacia el lado izquierdo
    right: 0,  // Asegura que llegue hasta el borde derecho
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  tabItemActive: {
    backgroundColor: '#4E89E8',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  tabLabel: {
    fontSize: 12,
    color: '#777',
    marginLeft: 8,
  },
  tabLabelActive: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

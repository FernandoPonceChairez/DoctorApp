import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const messages = [
  {
    id: '1',
    name: 'Dr. Malek Khan',
    message: 'It is a long established fact that a read and will be distracted lisece.',
    time: '23:57',
    image: 'https://via.placeholder.com/50',
  },
  {
    id: '2',
    name: 'Dr. Nurjahan Khan',
    message: 'It is a long established fact that a read and will be distracted lisece.',
    time: '22:51',
    image: 'https://via.placeholder.com/50',
  },
  {
    id: '3',
    name: 'Dr. Raisa Rashid',
    message: 'It is a long established fact that a read and will be distracted lisece.',
    time: '22:32',
    image: 'https://via.placeholder.com/50',
  },
  {
    id: '4',
    name: 'Dr. Salim Polash',
    message: 'It is a long established fact that a read and will be distracted lisece.',
    time: '22:02',
    image: 'https://via.placeholder.com/50',
  },
  {
    id: '5',
    name: 'Dr. Farid Raihan',
    message: 'It is a long established fact that a read and will be distracted lisece.',
    time: '20:32',
    image: 'https://via.placeholder.com/50',
  },
  {
    id: '6',
    name: 'Dr. Istiaka Hasan',
    message: 'It is a long established fact that a read and will be distracted lisece.',
    time: '20:12',
    image: 'https://via.placeholder.com/50',
  },
  {
    id: '7',
    name: 'Dr. Shak Faria Khan',
    message: 'It is a long established fact that a read and will be distracted lisece.',
    time: '20:04',
    image: 'https://via.placeholder.com/50',
  },
];

const MessageItem = ({ item, onPress }) => (
  <TouchableOpacity style={styles.messageCard} onPress={() => onPress(item)}>
    <Image source={{ uri: item.image }} style={styles.avatar} />
    <View style={styles.textContainer}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.message} numberOfLines={1}>
        {item.message}
      </Text>
    </View>
    <Text style={styles.time}>{item.time}</Text>
  </TouchableOpacity>
);

export default function MessagesScreen({ navigation }) {
  const handlePress = (item) => {
    navigation.navigate('Chat', { doctor: item });
  };

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#4E89E8" />
        </TouchableOpacity>
        <Text style={styles.title}>Message</Text>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="#4E89E8" />
        </TouchableOpacity>
      </View>

      {/* Lista de mensajes */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MessageItem item={item} onPress={handlePress} />
        )}
        contentContainerStyle={styles.listContainer}
      />
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
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  messageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  message: {
    fontSize: 14,
    color: '#777',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
});

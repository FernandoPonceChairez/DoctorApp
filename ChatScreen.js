import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const messages = [
  {
    id: '1',
    sender: 'user',
    text: 'Hello, Doctor! How Are You Doing?',
    time: '12:10',
    avatar: 'https://via.placeholder.com/50',
  },
  {
    id: '2',
    sender: 'doctor',
    text: 'We denounce with righteous indignation and dislike men with women that they cannot foresee the pain.',
    time: '12:37',
    avatar: 'https://via.placeholder.com/50',
  },
  {
    id: '3',
    sender: 'user',
    text: 'When nothing prevents our being able to do what we like best, every plea is to be welcomed.',
    time: '12:57',
    avatar: 'https://via.placeholder.com/50',
  },
  {
    id: '4',
    sender: 'doctor',
    text: "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything extraordinary.",
    time: '13:20',
    avatar: 'https://via.placeholder.com/50',
  },
  {
    id: '5',
    sender: 'user',
    text: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered.',
    time: '13:57',
    avatar: 'https://via.placeholder.com/50',
  },
];

const MessageItem = ({ item }) => (
  <View
    style={[
      styles.messageContainer,
      item.sender === 'user' ? styles.messageUser : styles.messageDoctor,
    ]}
  >
    {item.sender === 'doctor' && (
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
    )}
    <View
      style={[
        styles.messageBubble,
        item.sender === 'user' ? styles.bubbleUser : styles.bubbleDoctor,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.messageTime}>{item.time}</Text>
    </View>
    {item.sender === 'user' && (
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
    )}
  </View>
);

export default function ChatScreen({ route, navigation }) {
  const { doctor } = route.params;

  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      alert(`Message sent: ${newMessage}`);
      setNewMessage('');
    }
  };

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#4E89E8" />
        </TouchableOpacity>
        <Text style={styles.title}>{doctor.name}</Text>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="#4E89E8" />
        </TouchableOpacity>
      </View>

      {/* Lista de mensajes */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MessageItem item={item} />}
        contentContainerStyle={styles.messagesList}
      />

      {/* Barra de entrada */}
      <View style={styles.inputContainer}>
        <Ionicons name="happy-outline" size={24} color="#4E89E8" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Type Your Message"
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Ionicons name="send" size={24} color="#4E89E8" />
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
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  messagesList: {
    paddingBottom: 80,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 15,
  },
  messageUser: {
    justifyContent: 'flex-end',
  },
  messageDoctor: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  messageBubble: {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 10,
  },
  bubbleUser: {
    backgroundColor: '#4E89E8',
    borderTopRightRadius: 0,
  },
  bubbleDoctor: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 0,
    borderWidth: 1,
    borderColor: '#E8EAF0',
  },
  messageText: {
    fontSize: 14,
    color: '#333',
  },
  messageTime: {
    fontSize: 10,
    color: '#777',
    textAlign: 'right',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 5,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: '#F1F3F6',
    borderRadius: 20,
  },
});

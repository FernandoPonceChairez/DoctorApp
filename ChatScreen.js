import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from './api'; // Usamos la configuración de Axios para la API
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para obtener el user_id

// Componente de cada mensaje
const MessageItem = ({ item }) => (
  <View
    style={[styles.messageContainer, item.sender === 'user' ? styles.messageUser : styles.messageDoctor]}
  >
    {/* Mostrar la imagen del doctor si es un mensaje del doctor */}
    {item.sender === 'doctor' && (
      <Image
        source={{ uri: item.image_url || 'https://via.placeholder.com/50' }} // Usa una imagen por defecto si no tiene URL
        style={styles.avatar}
      />
    )}
    <View
      style={[styles.messageBubble, item.sender === 'user' ? styles.bubbleUser : styles.bubbleDoctor]}
    >
      <Text style={styles.messageText}>{item.message}</Text>
      <Text style={styles.messageTime}>{item.timestamp ? new Date(item.timestamp).toLocaleTimeString() : 'Unknown time'}</Text>
    </View>
    {/* Mostrar la imagen del usuario si es un mensaje del usuario */}
    {item.sender === 'user' && (
      <Image
        source={{ uri: item.image_url || 'https://via.placeholder.com/50' }} // Usa una imagen por defecto si no tiene URL
        style={styles.avatar}
      />
    )}
  </View>
);

export default function ChatScreen({ route, navigation }) {
  const { doctorId, doctorName } = route.params;  // Obtener el doctorId y doctorName desde las props
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Cargar los mensajes previos
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
          Alert.alert('Error', 'No se encontró el ID del usuario.');
          return;
        }

        // Obtener los mensajes entre el usuario y el doctor
        const response = await api.get(`/messages/user/${userId}/doctor/${doctorId}`);
        
        // Agregar URLs de imagen para el usuario y doctor si no las tienen
        const messagesWithImages = await Promise.all(response.data.map(async (msg) => {
          // Obtener la imagen del doctor si es un mensaje del doctor
          let doctorImageUrl = 'https://via.placeholder.com/50'; // Imagen por defecto
          if (msg.sender === 'doctor') {
            const doctorResponse = await api.get(`/doctors/${doctorId}`);
            doctorImageUrl = doctorResponse.data.image_url || 'https://via.placeholder.com/50'; // URL de imagen del doctor
          }

          // Obtener la imagen del usuario si es un mensaje del usuario
          let userImageUrl = 'https://via.placeholder.com/50'; // Imagen por defecto
          if (msg.sender === 'user') {
            const userResponse = await api.get(`/users/${userId}`);
            userImageUrl = userResponse.data.image_url || 'https://via.placeholder.com/50'; // URL de imagen del usuario
          }

          return {
            ...msg,
            image_url: msg.sender === 'user' ? userImageUrl : doctorImageUrl,
          };
        }));

        setMessages(messagesWithImages); // Asignar los mensajes a la lista
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los mensajes:', error);
        setLoading(false);
      }
    };

    fetchMessages();
  }, [doctorId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) {
      Alert.alert('Error', 'Por favor escribe un mensaje antes de enviarlo.');
      return;
    }

    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        Alert.alert('Error', 'No se encontró el ID del usuario.');
        return;
      }

      // Enviar el mensaje
      const response = await api.post('/messages', {
        user_id: userId,
        doctor_id: doctorId,
        message: newMessage,
        sender: 'user', // El mensaje es del usuario
        timestamp: new Date().toISOString(),
      });

      // Si el mensaje fue enviado correctamente, lo agregamos a la lista
      if (response.status === 201) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: newMessage,
            sender: 'user',
            timestamp: new Date().toISOString(),
            image_url: 'https://via.placeholder.com/50', // Agregar URL de imagen del usuario
          },
        ]);
        setNewMessage(''); // Limpiar el campo de entrada
      }
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      Alert.alert('Error', 'Hubo un problema al enviar el mensaje');
    }
  };

  if (loading) {
    return <Text>Cargando mensajes...</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#4E89E8" />
        </TouchableOpacity>
        <Text style={styles.title}>{doctorName}</Text>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="#4E89E8" />
        </TouchableOpacity>
      </View>

      {/* Lista de mensajes */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id ? item.id.toString() : `${item.timestamp}`} // Usar timestamp si no hay id
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
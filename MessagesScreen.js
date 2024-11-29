import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from './api'; // Configuración de Axios para la API
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyChatsScreen({ navigation }) {
  const [chats, setChats] = useState([]); // Lista de chats con los doctores
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
          Alert.alert('Error', 'Usuario no encontrado');
          return;
        }

        // Obtener los mensajes entre el usuario y los doctores
        const response = await api.get(`/messages/user/${userId}`);
        if (response.data.length === 0) {
          Alert.alert('No chats', 'No tienes chats previos');
        } else {
          // Agrupar los mensajes por doctor y obtener el último mensaje
          const chatsWithDoctorInfo = await Promise.all(
            response.data.map(async (message) => {
              // Obtener el doctor_id de cada mensaje
              const doctorResponse = await api.get(`/doctors/${message.doctor_id}`);
              return {
                ...message,
                doctorName: doctorResponse.data.name,
                doctorImage: doctorResponse.data.image_url || 'https://via.placeholder.com/50',
                created_at: message.created_at,
                doctor_id: message.doctor_id,
              };
            })
          );

          // Agrupar los chats por doctor y obtener el último mensaje
          const groupedChats = groupChatsByDoctor(chatsWithDoctorInfo);
          setChats(groupedChats);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los chats:', error);
        Alert.alert('Error', 'Hubo un problema al cargar los chats');
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  // Función para agrupar los mensajes por doctor y obtener el último mensaje
  const groupChatsByDoctor = (messages) => {
    const grouped = {};

    // Agrupamos los mensajes por doctor y seleccionamos el más reciente
    messages.forEach((message) => {
      if (!grouped[message.doctor_id]) {
        grouped[message.doctor_id] = {
          doctor_id: message.doctor_id,
          doctor_name: message.doctorName,
          doctor_image: message.doctorImage,
          last_message: message.message,  // Guardamos el primer mensaje como el último
          created_at: message.created_at, // Fecha del primer mensaje
        };
      } else {
        // Comparamos la fecha de creación para actualizar con el mensaje más reciente
        if (new Date(message.created_at) > new Date(grouped[message.doctor_id].created_at)) {
          grouped[message.doctor_id].last_message = message.message;
          grouped[message.doctor_id].created_at = message.created_at;
        }
      }
    });

    // Convertir el objeto en un array para usarlo en el FlatList
    return Object.values(grouped);
  };

  // Función para navegar al chat con el doctor
  const handleChatPress = (doctorId) => {
    navigation.navigate('Chat', { doctorId });
  };

  // Si estamos cargando, mostrar indicador de carga
  if (loading) {
    return <Text>Cargando chats...</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.title}>My Chats</Text>
      </View>

      {/* Lista de chats */}
      <FlatList
        data={chats}
        keyExtractor={(item) => item.doctor_id.toString()} // Usamos doctor_id como key
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatCard}
            onPress={() => handleChatPress(item.doctor_id)} // Navegar al chat
          >
            <Image
              source={{ uri: item.doctor_image }}
              style={styles.avatar}
            />
            <View style={styles.chatInfo}>
              <Text style={styles.chatDoctorName}>{item.doctor_name}</Text>
              {/* Muestra el último mensaje debajo del nombre */}
              <Text style={styles.chatLastMessage}>{item.last_message}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#4E89E8" />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.chatList}
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
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  chatList: {
    paddingBottom: 20,
  },
  chatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
    justifyContent: 'space-between',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  chatInfo: {
    flex: 1,
  },
  chatDoctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  chatLastMessage: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,  // Agregamos un margen para separar el mensaje del nombre
  },
});

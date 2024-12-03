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
import { getFirestore, collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default function MyChatsScreen({ navigation }) {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          Alert.alert('Error', 'Usuario no encontrado');
          return;
        }

        // Consulta para obtener los mensajes del usuario agrupados por doctor
        const messagesQuery = query(
          collection(db, 'messages'),
          where('userId', '==', user.uid),
          orderBy('timestamp', 'desc')
        );

        const unsubscribe = onSnapshot(messagesQuery, async (snapshot) => {
          const messages = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          // Agrupar los mensajes por doctor y obtener el último mensaje
          const groupedChats = groupChatsByDoctor(messages);
          setChats(groupedChats);
          setLoading(false);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error al obtener los chats:', error);
        Alert.alert('Error', 'Hubo un problema al cargar los chats');
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  const groupChatsByDoctor = (messages) => {
    const grouped = {};

    messages.forEach((message) => {
      if (!grouped[message.doctorId]) {
        grouped[message.doctorId] = {
          doctorId: message.doctorId,
          lastMessage: message.message,
          timestamp: message.timestamp,
        };
      } else if (new Date(message.timestamp.toDate()) > new Date(grouped[message.doctorId].timestamp.toDate())) {
        grouped[message.doctorId].lastMessage = message.message;
        grouped[message.doctorId].timestamp = message.timestamp;
      }
    });

    return Object.values(grouped);
  };

  const handleChatPress = (doctorId) => {
    navigation.navigate('Chat', { doctorId });
  };

  if (loading) {
    return <Text>Cargando chats...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Chats</Text>
      </View>

      <FlatList
        data={chats}
        keyExtractor={(item) => item.doctorId}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatCard}
            onPress={() => handleChatPress(item.doctorId)}
          >
            <Image
              source={{ uri: 'https://via.placeholder.com/50' }}
              style={styles.avatar}
            />
            <View style={styles.chatInfo}>
              <Text style={styles.chatDoctorName}>{`Doctor ${item.doctorId}`}</Text>
              <Text style={styles.chatLastMessage}>{item.lastMessage}</Text>
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
    marginTop: 5,
  },
});

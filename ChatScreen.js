import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getFirestore, collection, query, where, onSnapshot, addDoc, orderBy } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const MessageItem = ({ item }) => (
  <View
    style={[styles.messageContainer, item.sender === 'user' ? styles.messageUser : styles.messageDoctor]}
  >
    {item.sender === 'doctor' && (
      <Image
        source={{ uri: item.image_url || 'https://via.placeholder.com/50' }}
        style={styles.avatar}
      />
    )}
    <View
      style={[styles.messageBubble, item.sender === 'user' ? styles.bubbleUser : styles.bubbleDoctor]}
    >
      <Text style={styles.messageText}>{item.message}</Text>
      <Text style={styles.messageTime}>
        {item.timestamp ? new Date(item.timestamp.seconds * 1000).toLocaleTimeString() : 'Unknown time'}
      </Text>
    </View>
    {item.sender === 'user' && (
      <Image
        source={{ uri: item.image_url || 'https://via.placeholder.com/50' }}
        style={styles.avatar}
      />
    )}
  </View>
);

export default function ChatScreen({ route, navigation }) {
  const { doctorId, doctorName } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          Alert.alert('Error', 'Debes iniciar sesión para ver los mensajes.');
          return;
        }

        const messagesQuery = query(
          collection(db, 'messages'),
          where('doctorId', '==', doctorId),
          where('userId', '==', user.uid),
          orderBy('timestamp', 'asc')
        );

        const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
          const messagesData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMessages(messagesData);
          setLoading(false);
        });

        return () => unsubscribe();
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
      const user = auth.currentUser;
      if (!user) {
        Alert.alert('Error', 'Debes iniciar sesión para enviar un mensaje.');
        return;
      }

      // Enviar el mensaje del usuario
      await addDoc(collection(db, 'messages'), {
        userId: user.uid,
        doctorId,
        message: newMessage,
        sender: 'user', // El mensaje es del usuario
        timestamp: new Date(),
      });

      // Limpiar el campo de entrada
      setNewMessage('');

      // Responder automáticamente con un mensaje de "Lorem Ipsum"
      const loremMessage =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet accumsan arcu. Sed ullamcorper.";
      await addDoc(collection(db, 'messages'), {
        userId: user.uid,
        doctorId,
        message: loremMessage,
        sender: 'doctor', // El mensaje es del doctor
        timestamp: new Date(),
      });

      Alert.alert('Éxito', 'Mensaje enviado correctamente.');
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      Alert.alert('Error', 'Hubo un problema al enviar el mensaje.');
    }
  };

  if (loading) {
    return <Text>Cargando mensajes...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#4E89E8" />
        </TouchableOpacity>
        <Text style={styles.title}>{doctorName}</Text>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="#4E89E8" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MessageItem item={item} />}
        contentContainerStyle={styles.messagesList}
      />

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

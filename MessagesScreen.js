import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const initialMessages = [
  {
    id: '1',
    type: 'received',
    message: 'Hello Doctor! How are you doing?',
    time: '12:10',
    image: 'https://via.placeholder.com/40',
  },
];

export default function ChatScreen() {
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim() === '') return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'sent',
      message: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      image: 'https://via.placeholder.com/40',
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputText('');

    setTimeout(() => {
      const doctorMessage = {
        id: (Date.now() + 1).toString(),
        type: 'received',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        image: 'https://via.placeholder.com/40',
      };
      setMessages((prevMessages) => [...prevMessages, doctorMessage]);
    }, 1000); // Simula un retraso de 1 segundo
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.type === 'sent' ? styles.sentMessage : styles.receivedMessage,
      ]}
    >
      <Image source={{ uri: item.image }} style={styles.avatar} />
      <View style={styles.messageContent}>
        <View
          style={[
            styles.messageBubble,
            item.type === 'sent' ? styles.sentBubble : styles.receivedBubble,
          ]}
        >
          <Text style={styles.messageText}>{item.message}</Text> {/* Asegúrate de que el texto esté en <Text> */}
        </View>
        <Text style={styles.messageTime}>{item.time}</Text> {/* Hora dentro de <Text> */}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={24} color="#4E89E8" />
        </TouchableOpacity>
        <Text style={styles.title}>Dr. Nurjahan Khan</Text> {/* Título envuelto correctamente */}
        <View style={{ width: 24 }} /> {/* Espacio para centrar el título */}
      </View>

      {/* Chat Messages */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.chatContainer}
      />

      {/* Input Field */}
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          {/* Emoji Icon */}
          <TouchableOpacity>
            <Ionicons name="happy-outline" size={24} color="#B0B3C7" style={styles.icon} />
          </TouchableOpacity>

          {/* Attachment Icon */}
          <TouchableOpacity>
            <Ionicons name="attach-outline" size={24} color="#B0B3C7" style={styles.icon} />
          </TouchableOpacity>

          {/* Text Input */}
          <TextInput
            style={styles.textInput}
            placeholder="Type Your Message"
            placeholderTextColor="#B0B3C7"
            value={inputText}
            onChangeText={setInputText}
          />

          {/* Send Button */}
          <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
            <Ionicons name="send" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF', // Fondo blanco
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFF', // Fondo blanco sin sombras
    marginTop: 35, // Baja el encabezado
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -50 }],
  },
  chatContainer: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: '#F7F7F7', // Fondo gris claro
  },
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 8, // Imagen cuadrada
    marginHorizontal: 5,
  },
  messageContent: {
    maxWidth: '70%',
    alignItems: 'flex-start',
  },
  messageBubble: {
    padding: 10,
    borderRadius: 20,
    elevation: 1,
  },
  sentBubble: {
    backgroundColor: '#4E89E8',
  },
  receivedBubble: {
    backgroundColor: '#FFF',
    borderColor: '#DDD',
    borderWidth: 1,
  },
  messageText: {
    fontSize: 14,
    color: '#333',
  },
  messageTime: {
    fontSize: 10,
    color: '#888',
    marginTop: 5,
    textAlign: 'left',
  },
  inputContainer: {
    padding: 10,
    backgroundColor: '#F7F7F7', 
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 5, 
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    marginHorizontal: 10,
    color: '#333',
  },
  icon: {
    marginHorizontal: 5,
  },
  sendButton: {
    backgroundColor: '#4E89E8',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

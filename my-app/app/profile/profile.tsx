import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.editButton}>
          <MaterialIcons name="edit" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Imagen de perfil */}
      <View style={styles.profileImageContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }} // Reemplaza con la URL de la imagen
          style={styles.profileImage}
        />
      </View>

      {/* Información de perfil */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value="John Dao Michel" editable={false} />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value="johndummy@gmail.com" editable={false} />

        <Text style={styles.label}>Mobile Number</Text>
        <TextInput style={styles.input} value="+88 012 575 8465" editable={false} />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value="Rupsha, Khulna, Bangladesh"
          editable={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F1FA',
  },
  header: {
    backgroundColor: '#1E90FF',
    height: 150,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  editButton: {
    padding: 10,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginTop: -50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#E8F1FA',
  },
  infoContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default ProfileScreen;

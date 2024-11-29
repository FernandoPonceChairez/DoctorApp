import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import api from './api';

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null); // Estado inicial vacío
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  // Cargar datos del usuario al montar la pantalla
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId'); // Recuperar ID del usuario desde el almacenamiento
        if (!userId) {
          Alert.alert('Error', 'No se encontró información del usuario.');
          navigation.reset({ index: 0, routes: [{ name: 'SignIn' }] }); // Redirigir al inicio de sesión
          return;
        }
        const response = await api.get(`/users/${userId}`); // Obtener datos del usuario
        setUser(response.data); // Actualizar el estado con los datos del usuario
        setFormData(response.data); // Inicializar el formulario
      } catch (error) {
        console.error('Error al cargar los datos del usuario:', error);
        Alert.alert('Error', 'No se pudieron cargar los datos del usuario.');
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      await api.put(`/users/${user.id}`, formData); // Actualizar datos del usuario en la API
      setUser(formData); // Actualizar el estado del usuario con los datos editados
      setIsEditing(false); // Salir del modo de edición
      Alert.alert('Success', 'Perfil actualizado correctamente.');
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      Alert.alert('Error', 'No se pudo actualizar el perfil.');
    }
  };

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando perfil...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          <Ionicons name={isEditing ? 'checkmark-outline' : 'create-outline'} size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={{ uri: user.image_url }} style={styles.profileImage} />
      </View>

      {/* User Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailBox}>
          <Text style={styles.label}>Profile Image URL</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={formData.image_url}
              onChangeText={(text) => setFormData({ ...formData, image_url: text })}
              placeholder="https://example.com/image.jpg"
            />
          ) : (
            <Text style={styles.value}>{user.image_url || 'No Image URL'}</Text>
          )}
        </View>
        <View style={styles.detailBox}>
          <Text style={styles.label}>Name</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
          ) : (
            <Text style={styles.value}>{user.name}</Text>
          )}
        </View>
        <View style={styles.detailBox}>
          <Text style={styles.label}>Email</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
            />
          ) : (
            <Text style={styles.value}>{user.email}</Text>
          )}
        </View>
        <View style={styles.detailBox}>
          <Text style={styles.label}>Mobile Number</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={formData.phone}
              keyboardType="phone-pad"
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
            />
          ) : (
            <Text style={styles.value}>{user.phone}</Text>
          )}
        </View>
        <View style={styles.detailBox}>
          <Text style={styles.label}>Address</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={formData.address}
              onChangeText={(text) => setFormData({ ...formData, address: text })}
            />
          ) : (
            <Text style={styles.value}>{user.address}</Text>
          )}
        </View>
      </View>

      {/* Botón para guardar cambios */}
      {isEditing && (
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4E89E8',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop:40
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  detailsContainer: {
    paddingHorizontal: 20,
  },
  detailBox: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  label: {
    fontSize: 12,
    color: '#777',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
});

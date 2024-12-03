import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, Alert, ScrollView, TextInput, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Para íconos de los botones
import { getFirestore, collection, addDoc, query, where, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import api from './api'; // Asegúrate de que este archivo esté configurado para conectar a tu API

const SpecialistInfoScreen = ({ route, navigation }) => {
  const { doctorId } = route.params; // Recibimos el ID del doctor
  const [doctor, setDoctor] = useState(null); // Para almacenar la información del doctor
  const [loading, setLoading] = useState(true); // Estado para cargar la información
  const [reviews, setReviews] = useState([]); // Lista de reseñas
  const [newReview, setNewReview] = useState(''); // Comentario nuevo
  const [rating, setRating] = useState(0); // Calificación nueva (1-5 estrellas)

  const db = getFirestore(); // Inicializa Firestore
  const auth = getAuth(); // Inicializa Auth

  // Fetch de los datos del doctor desde la API
  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        const response = await api.get(`/doctors/${doctorId}`);
        if (response && response.data) {
          setDoctor(response.data);
        } else {
          throw new Error('Doctor no encontrado');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener información del doctor:', error);
        setLoading(false);
        Alert.alert('Error', 'No se pudo obtener la información del doctor.');
      }
    };

    fetchDoctorInfo();
  }, [doctorId]);

  // Fetch de las reseñas desde Firebase
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsQuery = query(
          collection(db, 'reviews'),
          where('doctorId', '==', doctorId)
        );

        const unsubscribe = onSnapshot(reviewsQuery, (snapshot) => {
          const reviewsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setReviews(reviewsData);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error al obtener las reseñas:', error);
        Alert.alert('Error', 'No se pudieron cargar las reseñas.');
      }
    };

    fetchReviews();
  }, [doctorId]);

  // Manejar la adición de una nueva reseña
  const handleAddReview = async () => {
    if (rating === 0 || newReview.trim() === '') {
      Alert.alert('Error', 'Por favor selecciona una calificación y escribe un comentario.');
      return;
    }

    try {
      const user = auth.currentUser; // Usuario actual
      if (!user) {
        Alert.alert('Error', 'Debes iniciar sesión para dejar una reseña.');
        return;
      }

      await addDoc(collection(db, 'reviews'), {
        doctorId,
        userId: user.uid,
        userName: user.displayName || 'Usuario Anónimo',
        rating,
        comment: newReview,
        createdAt: new Date(),
      });

      setNewReview('');
      setRating(0);
      Alert.alert('Éxito', 'Tu reseña se ha agregado correctamente.');
    } catch (error) {
      console.error('Error al agregar la reseña:', error);
      Alert.alert('Error', 'No se pudo agregar la reseña.');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando información del doctor...</Text>
      </View>
    );
  }

  if (!doctor) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>No se encontró información del doctor.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#4E89E8" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{doctor.name}</Text>
      </View>

      <Image 
        style={styles.image}
        source={{ uri: doctor.image_url || 'https://via.placeholder.com/150' }}
      />

      <View style={styles.infoContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.iconButton1}>
            <Ionicons name="call" size={15} style={styles.iconb} />
            <Text style={styles.textbut}>Voice Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton2} onPress={() => navigation.navigate('VideoCall')}>
            <Ionicons style={styles.iconb} name="videocam" size={15} />
            <Text style={styles.textbut}>Video Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton3} onPress={() => navigation.navigate('Chat', { doctorId })}>
            <Ionicons name="chatbubbles" size={15} style={styles.iconb} />
            <Text style={styles.textbut}>Message</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.specia}>{doctor.specialty}</Text>
        <Text style={styles.cli}>{doctor.clinic}</Text>
        <Text style={styles.subtitle}>About {doctor.name}</Text>
        <Text>{doctor.bio || 'Highly skilled professional with experience in the field.'}</Text>

        <View style={styles.footer}>
          <View>
            <Text style={styles.patien}>Patients</Text>
            <Text style={styles.patien2}>{doctor.patient_count || 'N/A'}</Text>
          </View>
          <View>
            <Text style={styles.patien}>Experience</Text>
            <Text style={styles.patien2}>{doctor.experience_years || 'N/A'}</Text>
          </View>
          <View>
            <Text style={styles.patien}>Reviews</Text>
            <Text style={styles.patien2}>{reviews.length || 'N/A'}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.botonc} onPress={() => navigation.navigate('Appointment', { doctor })}>
          <Text style={styles.buttonText}>Book an Appointment</Text>
        </TouchableOpacity>
      </View>

      {/* Agregar Nueva Reseña */}
      <View>
        <Text style={styles.subtitle}>Agregar Reseña</Text>
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => setRating(star)}>
              <Ionicons
                name={star <= rating ? 'star' : 'star-outline'}
                size={24}
                color="#FFD700"
              />
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu reseña aquí..."
          value={newReview}
          onChangeText={setNewReview}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddReview}>
          <Text style={styles.addButtonText}>Agregar Reseña</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Reseñas */}
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reviewItem}>
            <Text style={styles.reviewerName}>{item.userName}</Text>
            <Text style={styles.reviewText}>{item.comment}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 250,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    height: 90,
    width: '100%',
    padding: 20,
    paddingTop: 50,
  },
  infoContainer: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 70,
  },
  specia: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
  },
  cli: {
    fontSize: 15,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    marginTop: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    marginTop: 40,
  },
  patien: {
    color: 'gray',
  },
  patien2: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#1C1C1C',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  iconButton1: {
    backgroundColor: '#00BFFF',
    padding: 5,
    borderRadius: 10,
    marginHorizontal: 5,
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconButton2: {
    backgroundColor: '#C6AADB',
    padding: 5,
    borderRadius: 10,
    marginHorizontal: 5,
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconButton3: {
    backgroundColor: '#F2C68C',
    padding: 5,
    borderRadius: 10,
    marginHorizontal: 5,
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textbut: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  iconb: {
    color: '#ffffff',
    width: 20,
  },
  botonc: {
    width: 325,
    backgroundColor: '#2582ff',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 50,
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Estilo para la sección de reseñas
  reviewsContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  reviewItem: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  reviewText: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#F9F9F9',
  },
  addButton: {
    backgroundColor: '#4E89E8',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
  },
});


export default SpecialistInfoScreen;

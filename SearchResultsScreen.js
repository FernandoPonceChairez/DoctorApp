import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SearchResultsScreen({ route, navigation }) {
  const { results = [] } = route.params; // Obtiene los resultados filtrados de la búsqueda

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#4E89E8" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Selected Area</Text>
        <Ionicons name="chatbubble-ellipses-outline" size={24} color="#4E89E8" />
      </View>

      <FlatList
        ListHeaderComponent={() => (
          <>
            <Text style={styles.sectionTitle}>All Cardiologists</Text>
          </>
        )}
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('SpecialistInfo', { doctor: item })} // Redirige a SpecialistInfoScreen
          >
            <View style={styles.imagef}>
             <Image
              source={require('./assets/doc1.png')} 
              style={styles.image}
            /> 
            </View>
            
            <View style={styles.infoContainer}>
              <View style={styles.namestar}>
                <Text style={styles.name}>{item.name}</Text>
                <Image 
                    source={require('./assets/estrellas.png')} 
                    style={styles.image3}
                  />
                  <Image 
                    source={require('./assets/puntos.png')} 
                    style={styles.image4}
                  />
              </View>
              
              
              <Text style={styles.specialty}>{item.specialty} (MBBS, FCPS)</Text>

              <View style={styles.namestar2}>
                  <Image 
                    source={require('./assets/reloj.png')} 
                    style={styles.image5}
                  />
                <Text style={styles.timing}>12.00pm - 4.00pm</Text>
                <Image 
                    source={require('./assets/location.png')} 
                    style={styles.image5}
                  />
                <Text style={styles.clinic}>{item.clinic}</Text>
              </View>
              
            </View>
          </TouchableOpacity>
        )}
        
        
        ListFooterComponent={() => (
          <>
            <Text style={styles.sectionTitle}>Available Doctors</Text>
            
            <FlatList
                data={results}
                horizontal
                keyExtractor={(doctor) => doctor.id.toString()}
                renderItem={({ item: doctor }) => (
                  <View style={styles.additionalCard}>
                    
                    <View>
                      <Text style={styles.additionalName}>{doctor.name}</Text>
                    <Image 
                      source={require('./assets/estrellas.png')} 
                      style={styles.image2}
                    />
                    <View>
                      <Text style={styles.additionalDetails}>Experience</Text>
                      <Text style={styles.additionalDetails2}>8 Years</Text>
                    </View>
                    
                    <View>
                      <Text style={styles.additionalDetails}>Patients</Text>
                      <Text style={styles.additionalDetails2}>1.08K</Text>
                    </View>

                    </View>
                    

                    <View>
                    <Image
                      source={require('./assets/doc1.png')} 
                      style={styles.imageabajo}
                    /> 
                    </View>

                  </View>
                )}
                contentContainerStyle={styles.additionalDoctors}
                showsHorizontalScrollIndicator={false}
              />
          </>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFC',
    padding: 20,
    paddingTop:55,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    position:'absolute',
    top:-10,
    left:-1
    
  },

  imageabajo: {
    width: 130,
    height: 150,
    position:'absolute',
    marginLeft:-40,
    
  },
  imagef:{
    borderRadius: 5,
    backgroundColor:'#FFA07A',
    width:70,
    height:70,
    alignItems:'center',
    

  },
  image2:{
    width:90,
    height:15

  },
  image3:{
    width:70,
    height:10,
    marginLeft:10,
  },
  image4:{
    width:12,
    height:12,
    marginLeft:205,
    position:'absolute'
  },
  image5:{
    width:12,
    height:12,
  },
  infoContainer: {
    flex: 1,
    marginLeft:10
  },
  namestar:{
    flexDirection:'row',
    alignItems:'center',
  },
  namestar2:{
    flexDirection:'row',
    alignItems:'center',
    
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  specialty: {
    fontSize: 14,
    color: '#555',
    marginTop:5,
    marginBottom:5
  },
  timing: {
    fontSize: 12,
    color: '#777',
    marginLeft:2,
    marginRight:2
  },
  clinic: {
    fontSize: 12,
    color: '#999',
    marginLeft:5
  },
  additionalDoctors: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  additionalCard: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    paddingVertical:20,
    flexDirection:'row',
    height:200,
    width:200
  },
  additionalImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  additionalName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  additionalDetails: {
    fontSize: 12,
    color: '#777',
    marginTop:20,
  },
  additionalDetails2: {
    fontWeight:'bold',
    fontSize: 16,
  },
});
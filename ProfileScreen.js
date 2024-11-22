import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {
  const user = {
    name: 'John Dao Michel',
    email: 'johndummy@gmail.com',
    mobile: '+88 012 575 8465',
    address: 'Rupsha, Khulna, Bangladesh',
    profileImage: 'https://via.placeholder.com/150',
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity>
          <Ionicons name="create-outline" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
      </View>

      {/* User Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailBox}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{user.name}</Text>
        </View>
        <View style={styles.detailBox}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>
        <View style={styles.detailBox}>
          <Text style={styles.label}>Mobile Number</Text>
          <Text style={styles.value}>{user.mobile}</Text>
        </View>
        <View style={styles.detailBox}>
          <Text style={styles.label}>Address</Text>
          <Text style={styles.value}>{user.address}</Text>
        </View>
      </View>
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

import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

const ProfileScreen = ({navigation}) => {
  const user = {
    name: 'Halil İbrahim Kaan ',
    username: 'Yıldız',
    gender: 'Male',
    dateOfBirth: 2002,
    nationality: 'Turk',
    identity: '1111111111',
    email: 'john@gmail.com',
    phoneNumber: '05555555555',
    profilePic: require('../../assets/appIcon.png'), // Profil fotoğrafı
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: 'center',
          margin: 5,
          flex: 0.5,
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomWidth: 2,
        }}>
        <View style={styles.header}>
          <Image source={user.profilePic} style={styles.profilePic} />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            borderColor: 'black',
            margin: 5,
          }}>
          <Text style={styles.name}>
            {user.name}
            {user.username}
          </Text>
          <Text style={styles.username}>
            <Text style={{fontWeight: 'bold'}}>Gender : </Text>
            {user.gender}
          </Text>
          <Text style={styles.dateOfBirth}>
            <Text style={{fontWeight: 'bold'}}>Date Of Birth : </Text>
            {user.dateOfBirth}
          </Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.nationality}>
          <Text style={{fontWeight: 'bold'}}>Nationality :</Text>{' '}
          {user.nationality}
        </Text>
        <Text style={styles.id}>
          <Text style={{fontWeight: 'bold'}}>ID :</Text> {user.identity}
        </Text>
        <Text style={styles.email}>
          <Text style={{fontWeight: 'bold'}}>Email :</Text> {user.email}
        </Text>
        <Text style={styles.phoneNumber}>
          <Text style={{fontWeight: 'bold'}}>Phone Number :</Text>{' '}
          {user.phoneNumber}
        </Text>

        {/* Profil içeriği */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('Edit Profile');
          }}>
          <Text style={styles.buttonText}>Profili Düzenle</Text>
        </TouchableOpacity>
        {/* Diğer profil içeriği */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    color: '#000000',
    backgroundColor: '#e0ffe6',
  },

  profilePic: {
    width: 130,
    height: 130,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 5,
    borderColor: '#93a994',
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000000',
  },
  username: {
    color: 'gray',
    marginBottom: 10,
    color: '#000000',
    fontSize: 17,
  },
  nationality: {
    color: 'gray',
    marginBottom: 10,
    color: '#000000',
    fontSize: 22,
  },
  id: {
    color: 'gray',
    marginBottom: 10,
    color: '#000000',
    fontSize: 22,
  },
  email: {
    color: 'gray',
    marginBottom: 10,
    color: '#000000',
    fontSize: 22,
  },
  phoneNumber: {
    color: 'gray',
    marginBottom: 10,
    color: '#000000',
    fontSize: 22,
  },
  dateOfBirth: {
    color: 'gray',
    marginBottom: 10,
    color: '#000000',
    fontSize: 17,
  },
  bio: {
    textAlign: 'center',
    paddingHorizontal: 40,
    marginBottom: 20,
    color: '#000000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    color: '#000000',
    margin: 5,
  },
  button: {
    backgroundColor: '#c1c7c2',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
    color: '#000000',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default ProfileScreen;

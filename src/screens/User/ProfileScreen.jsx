import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {getToken} from '../../helpers/tokens';

const url = 'http://192.168.1.10:3000/user/profile';

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

  const [profile, setProfile] = useState([]);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

  const [profilePhoto, setProfilePhoto] = useState('');

  const getProfile = async () => {
    try {
      await getToken().then(async token => {
        const result = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(result.data[0]);
        console.log('Result', result.data[0]);
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      console.log('Error', error);
    }
  };

  const getProfilePhoto = async () => {
    try {
      await getToken().then(async token => {
        const result = await axios.get(
          'http://192.168.1.10:3000/user/get-profile-photo',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const uri = `data:image/jpeg;base64,${result.data.photoData}`;
        setProfilePhoto(uri);
        //console.log('Resultttttt', result.data.photoData);
      });
    } catch (error) {
      console.log('Error', error);
    }
  };

  useEffect(() => {
    getProfile();
    getProfilePhoto();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
          size="large"
          color="#000000"
        />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View
            style={{
              alignItems: 'center',
              margin: 20,
              flexDirection: 'column',
              borderBottomWidth: 3,
            }}>
            <Image source={{uri: profilePhoto}} style={styles.profilePic} />
            <Text style={styles.name}>
              {profile.name + ' '}
              {profile.surname}
            </Text>
            <Text style={styles.username}>
              <Text style={{fontWeight: 'bold'}}>Gender : </Text>
              {profile.gender}
            </Text>
            <Text style={styles.dateOfBirth}>
              <Text style={{fontWeight: 'bold'}}>Date Of Birth : </Text>
              {profile.dateOfBirth.substring(0, 4)}
            </Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.nationality}>
              <Text style={{fontWeight: 'bold'}}>Nationality :</Text>{' '}
              {profile.nationality}
            </Text>
            <Text style={styles.email}>
              <Text style={{fontWeight: 'bold'}}>Email :</Text> {profile.email}
            </Text>
            <Text style={styles.phoneNumber}>
              <Text style={{fontWeight: 'bold'}}>Phone Number :</Text>{' '}
              {profile.phoneNumber}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate('EditProfile');
              }}>
              <Text style={styles.buttonText}>Profili Düzenle</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
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
    fontSize: 25,
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
    fontSize: 20,
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
    fontSize: 20,
  },
  phoneNumber: {
    color: 'gray',
    marginBottom: 10,
    color: '#000000',
    fontSize: 20,
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
    fontSize: 17,
  },
});

export default ProfileScreen;
